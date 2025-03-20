ShortenURL Prototype
This is a URL Shortener prototype that I developed to apply for Google Summer of Code (GSoC) 2025 under the CCExtractor Systems idea list.
---

## **📌 Project Overview**  
This prototype allows users to:  
✅ **Shorten URLs** with customizable expiration and start dates.  
✅ **Sign in via email confirmation** (no passwords required).  
✅ **Receive email notifications** when someone accesses their short URL.  
✅ **Manage shortened URLs** via a frontend interface.  
✅ **Ensure scalability** by leveraging external services (Firebase, Cloudflare Workers, etc.).  

---

## **📁 Project Structure**  

### **Frontend (React) → `url-shortener-frontend/`**  
📌 Built using **React.js** to provide a clean and interactive UI for users.  
📌 Users can **create, manage, and access shortened URLs** with authentication.  

#### 🔹 **Key Files**  
- `src/components/ShortenURL.js` → Component for shortening URLs.  
- `src/components/AccessShortURL.js` → Component for accessing shortened URLs.  
- `src/CSS/ShortenURL.css` → Styling for the shortener UI.  
- `src/CSS/AccessShortURL.css` → Styling for the access page.  

---

### **Backend (Node.js + Express) → `url-shortener-backend/`**  
📌 Built with **Node.js and Express** to handle API requests for URL shortening and access.  
📌 Uses **Firebase** for storing shortened URLs and handling authentication.  

#### 🔹 **Key Files**  
- `server.js` → Main Express server file.  
- `package.json` → Manages backend dependencies.  
- `firebaseConfig.json` → Stores Firebase credentials (kept secret for security).  

---

## **🔄 How the Flow Works**  

### **Step 1: User Shortens a URL**  
1️⃣ User **enters a long URL** in the frontend.  
2️⃣ Backend **generates a unique short code** and stores it in the database.  
3️⃣ Backend **sends a response** with the shortened URL.  

### **Step 2: User Accesses a Shortened URL**  
1️⃣ User **clicks on the shortened URL**.  
2️⃣ Backend **checks if the URL is valid** (expiration/start dates).  
3️⃣ If valid, **redirects user to the original URL** and **sends a notification email**.  

---

## **🚀 Deployment (Under Development)**  

| **Component**  | **Hosting Service**  | **Status**  |
|--------------|----------------|-------------|
| **Frontend**  | Vercel / Netlify | **Under Development** |
| **Backend**  | Render / Railway  | **Under Development** |

👉 **Frontend is planned to be hosted on Vercel** for fast static deployment.  
👉 **Backend is planned to be hosted on Render** for seamless API management.  

---

## **🎯 Future Enhancements**  
🚀 **Analytics Dashboard** → Track number of clicks per short URL.  
🚀 **User Accounts** → Users can save and manage their URLs.  
🚀 **QR Code Generation** → Generate QR codes for shortened URLs.  
🚀 **Better Security** → Implement rate-limiting & better authentication.  

---

## **🛠️ Technologies Used**  
🔹 **Frontend**: React.js, Tailwind CSS  
🔹 **Backend**: Node.js, Express.js, Firebase  
🔹 **Database**: Firebase Firestore  
🔹 **Hosting**: Vercel (Frontend), Render (Backend)  

---

## **📬 Contact**  
Questions or feedback, feel free to reach out!  

📧 Email: [thisismegourav@gmail.com]  
🔗 GitHub: [github.com/gouravrayGithub](https://github.com/gouravrayGithub)  

---

Always open for modifications! 🚀😊
