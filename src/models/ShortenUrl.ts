import mongoose, { Schema } from "mongoose";

const ShortenUrlSchema = new Schema({
  originalUrl: {
    required: true,
    type: String,
  },
  shortUrlHash: {
    required: true,
    type: String,
  },
  shortUrl: {
    required: true,
    type: String,
  },
  expiresIn: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("ShortenUrl", ShortenUrlSchema);
