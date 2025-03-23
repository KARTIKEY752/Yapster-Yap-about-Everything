# Yapster - Yap About Everything

## 🚀 Deployment
The app is deployed on **Render**. Check out the **live version** here:
🔗 **[Yapster Live](https://yapster-yap-about-everything.onrender.com)**


## 🚀 About the Project
**Yapster** is a **full-stack MERN** messaging web application that enables users to chat in **real-time**. It allows users to create an account, send messages, and share images, all while providing a seamless experience with **socket-based real-time messaging** and **online status tracking**. 

The app also features a **customizable theme** with **32 different themes** powered by **Daisy UI**, allowing users to personalize their experience. 

## 🌟 Features
- 🔹 **User Authentication** – Sign up and log in securely.
- 📩 **Real-Time Messaging** – Messages are updated instantly using **Sockets**.
- 📷 **Image Sharing** – Users can send images (**<1MB**, due to free **Cloudinary** storage limitations).
- 👥 **Online/Offline Status** – Users can see who is online and filter online users.
- 🎨 **Custom Themes** – Choose from **32 unique themes**.
- 🗂️ **Profile Management** – Update profile pictures in real-time.
- 🗃️ **MongoDB Database** – Stores users and messages securely.

## 📂 Tech Stack
### Frontend
- **React.js** (UI Development)
- **Daisy UI** (32 themes for styling)
- **Tailwind CSS** (For responsive design)
- **Socket.io-client** (For real-time communication)

### Backend
- **Node.js** (Server-side runtime)
- **Express.js** (Backend framework)
- **Socket.io** (WebSockets for real-time chat)
- **Cloudinary** (Image storage for chat images and profile pictures)
- **MongoDB + Mongoose** (Database for users and messages)

## 🎯 Getting Started
### Prerequisites
Make sure you have **Node.js** and **MongoDB** installed on your system.

### Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/yapster.git
   cd yapster
   ```

2. **Install dependencies**
   ```sh
   npm install
   cd client
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongo_db_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Start the backend server**
   ```sh
   npm run server
   ```

5. **Start the frontend**
   ```sh
   cd client
   npm start
   ```

## 🎨 UI Preview
![Yapster Chat UI](https://your-chat-ui-image-url.com)

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request.

## 📜 License
This project is licensed under the **MIT License**.

## 📧 Contact
- Developer: **Kartikey Vishwakarma**
- Email: **kartikey752@gmail.com**
- GitHub: **[Your GitHub](https://github.com/KARTIKEY752)**
