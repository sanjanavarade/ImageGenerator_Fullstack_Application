#FluffyBrush

# 🖼 ImageGenerator Full‑Stack Application

A powerful, intuitive full‑stack web app that uses HuggingFace API to instantly generate high‑quality images from text prompts. Inspired by Mid‑Journey and crafted with the MERN stack.

---
Live Link: https://github.com/sanjanavarade/ImageGenerator_Fullstack_Application

## 🚀 Demo

| Feature | Description |
|--------|-------------|
| Generate 😎 | Type what you imagine and watch an image appear. |
| Surprise Me 🎲 | Not sure what to generate? Click and be inspired. |
| Community Showcase | Browse, search, share, and download creations. |

---

## 📸 Screenshots

Below are snapshots of the app in action:

**Home / Browse Community**  
<img width="1873" height="952" alt="Screenshot 2025-06-20 235118" src="https://github.com/user-attachments/assets/6fa598cc-c227-4da4-b24a-8d0c4268511f" />


**Search & Community Display**  
<img width="1871" height="936" alt="Screenshot 2025-06-20 235042" src="https://github.com/user-attachments/assets/82dc6015-c305-493a-8a95-99692ec24e45" />

---

## 🧱 Tech Stack

- **Frontend**: React.js, CSS (or TailwindCSS if applicable)  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Image Hosting**: Cloudinary  
- **AI API**: Hugging Face  
- **Environment Management**: `.env` for API keys & DB credentials

---

## ⚙️ Features

- **Text-to-Image Generation**: Instantly creates images from text prompts.
- **Surprise Me**: Generates random prompts to inspire users.
- **Community Showcase**: Browse others’ creations, complete with search and download support.
- **Interactive UI**: Hover effects reveal prompt, author, download options.
- **Image Sharing**: Generate and share personal images to the public feed.

---

## 🏁 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/sanjanavarade/ImageGenerator_Fullstack_Application.git
cd ImageGenerator_Fullstack_Application

2. Setup Backend
cd backend
npm install

Create a .env file in /backend with the following:

env

OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_mongo_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

Start the backend server:

bash
npm start

3. Setup Frontend
bash
cd ../frontend
npm install
npm start

Frontend will run at http://localhost:3000, backend at http://localhost:5000.

Project Structure
bash

/backend     – Express server, HuggingFace & Cloudinary integration, MongoDB models
/frontend    – React SPA with components, pages, and API services
/screenshots – Screenshots for README
.gitignore   – Configuration for ignored files
README.md    – This file 📄
bash```
📚 Learnings & Highlights
Full-stack development using MERN

Integration with OpenAI’s DALL·E image generation

Cloud-based image storage with Cloudinary

Implemented search, upload, hover effects, download functionality

Built a polished, user-friendly UI

📬 Contact
Made with ❤️ by Sanjana Varade

🔗 https://www.linkedin.com/in/sanjana-varade-b52312250/

📧 Email: sanjanavarade248@gmail.com 

