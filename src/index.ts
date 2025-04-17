import express, { Request, Response } from "express";
import path from "path";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import mongoose from "mongoose";
import argon2 from "argon2";
import dotenv from "dotenv";

const shortenUrl = require("./models/ShortenUrl");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL!;
app.use(express.urlencoded({ extended: true }));

const distDir = path.resolve(__dirname, "../dist");
const publicDir = path.join(distDir, "public");

const liveReloadServer = livereload.createServer({
  exts: ["css", "js"],
  delay: 300,
});
liveReloadServer.watch(publicDir);

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLivereload());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src/views")); // Pug files remain in `src/views`

app.use("/public", express.static(publicDir));

app.post("/", async (req: Request, res: Response) => {
  const originalUrl = req?.body?.url;
  const expiryDate = req?.body?.expiryDate;
  const baseDomain = `${req.protocol}://${req.get("host")}`;

  if (originalUrl.startsWith(baseDomain)) {
    return res.render("index", {
      title: "Welcome to PUG!",
      message: "Hello World!",
      errors: {
        url: "This URL is already shortened.",
      },
    });
  }

  if (!expiryDate || !originalUrl) {
    return res.render("index", {
      title: "Welcome to PUG!",
      message: "Hello World!",
      errors: {
        expiryDate: !expiryDate ? "Expiry date is required" : null,
        url: !originalUrl ? "URL is required" : null,
      },
    });
  }

  const hashedUrl = await argon2.hash(originalUrl, {
    salt: Buffer.from(process.env.SALT!),
    secret: Buffer.from(process.env.SECRET!),
    hashLength: 6,
    type: argon2.argon2id,
  });

  const base64Hash = hashedUrl.split("$").pop();
  const shortUrl = `${baseDomain}/${base64Hash}`;

  const findUrl = await shortenUrl.findOne({
    shortUrlHash: base64Hash,
  });

  if (findUrl) {
    return res.render("index", {
      title: "Welcome to PUG!",
      message: "Hello World!",
      errors: {
        url: "URL already exists!",
      },
    });
  }

  const isCreated = await shortenUrl.create({
    shortUrl,
    originalUrl,
    shortUrlHash: base64Hash,
    expiresIn: new Date(expiryDate).toISOString(),
  });

  if (isCreated) {
    return res.render("index", {
      title: "Welcome to PUG!",
      message: "Hello World!",
      shortUrl: isCreated.shortUrl,
    });
  }
});

app.get("/:url_hash", async (req: Request, res: Response) => {
  const data = await shortenUrl.findOne({
    shortUrlHash: req?.params?.url_hash,
  });
  if (data?.originalUrl) {
    res.redirect(data?.originalUrl);
  }
  res.send("some issue occured or url not found!");
});

app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "Welcome to PUG!",
    message: "Hello World!",
    errors: {},
  });
});

mongoose
  .connect(MONGO_URL)
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    
    console.log("Error while connecting to mongo database.");
  });
