## 🌐 URL Shortener

A simple and secure **URL shortener** built with Node.js, Express, MongoDB, and Argon2. Create custom short links that expire after a set time. Built with clean design and server-side rendering using Pug.

---

### 🚀 Features

- 🔐 **Secure** hashing with Argon2
- 📆 **Expiry** date for shortened URLs
- 🧠 Duplicate URL detection
- 🎨 Pug templating engine
- 🗂 MongoDB for storage

---

### 📸 Preview

![URL Shortener Screenshot](screenshot.png)  
<sub>Add your screenshot to the project directory as `screenshot.png`</sub>

---

### ⚙️ Tech Stack

- **Backend**: Node.js, Express
- **Hashing**: Argon2
- **Database**: MongoDB with Mongoose
- **Templating**: Pug
- **Styles**: CSS (custom or framework of choice)

---

### 📁 Project Structure

```
📆url-shortener/
 ├ 📂public/
 ┃ └ 📂css/
 ┃    └ style.css
 ├ 📂views/
 ┃ ├ index.pug
 ┃ └ layout.pug
 ├ 📂models/
 ┃ └ shortenUrl.ts
 ├ .env
 ├ .gitignore
 ├ app.ts
 ├ package.json
 └ README.md
```

---

### ⚖️ Setup & Run

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Create a `.env` file

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/url-shortener
BASE_URL=http://localhost:8080
```

#### 4. Run the App

```bash
npm run dev   # if using nodemon
# or
npm start
```

---

### 🧪 Sample Request

```bash
POST /create-short-url

Body:
{
  "url": "https://example.com",
  "expiryDate": "2025-04-30"
}
```

---

### 🗑 TODOs / Enhancements

- [ ] Add QR code generation
- [ ] Admin dashboard for analytics
- [ ] API versioning
- [ ] Password-protected URLs

---

### 📜 License

MIT License © [Your Name]

