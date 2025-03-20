require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase
const serviceAccount = require("./firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true }); // ✅ Ignore undefined values

const app = express();
const PORT = 5010;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

//  Shorten URL
app.post("/shorten", async (req, res) => {
  try {
    let { originalURL, ownerName, ownerEmail, expirationDate } = req.body;

    if (!originalURL || !ownerName || !ownerEmail) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Normalize URL
    if (!originalURL.startsWith("http://") && !originalURL.startsWith("https://")) {
      originalURL = `https://${originalURL}`;
    }

    const shortCode = Math.random().toString(36).substring(7);
    const shortURL = `http://localhost:3000/access/${shortCode}`;

    //  Ensure expirationDate is not undefined
    expirationDate = expirationDate || null;

    await db.collection("shortened_urls").doc(shortCode).set({
      originalURL,
      ownerName,
      ownerEmail,
      expirationDate,
      createdAt: new Date(),
    });

    console.log(` Stored in Firestore: ${shortCode} -> ${originalURL}`);
    res.json({ shortURL, shortCode });
  } catch (error) {
    console.error(" Error shortening URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Check if Short URL Exists
app.get("/access/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const docRef = db.collection("shortened_urls").doc(shortCode);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.json({ message: "Short URL exists" });
  } catch (error) {
    console.error(" Error checking short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Access Short URL (POST) - Ask for User Details First
app.post("/access/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { accessorName, accessorEmail } = req.body;

    if (!accessorName || !accessorEmail) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const docRef = db.collection("shortened_urls").doc(shortCode);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    const { originalURL, expirationDate, ownerEmail, ownerName } = doc.data();

    //  Check expiration
    if (expirationDate && new Date(expirationDate) < new Date()) {
      return res.status(410).json({ error: "This URL has expired" });
    }

    //  Send email notification
    await sendEmailNotification(ownerEmail, ownerName, accessorName, accessorEmail, originalURL);

    console.log(`🔹 ${accessorName} accessed: ${originalURL}`);
    
    // Return the original URL
    res.json({ originalURL });
  } catch (error) {
    console.error("Error processing access:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Email Notification
const sendEmailNotification = async (ownerEmail, ownerName, accessorName, accessorEmail, originalURL) => {
  try {
    if (!ownerEmail || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("⚠️ Email credentials missing. Skipping email notification.");
      return;
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let mailOptions = {
      from: process.env.SMTP_USER,
      to: ownerEmail,
      subject: "Your Shortened URL was Accessed",
      text: `Hello ${ownerName},\n\n${accessorName} (${accessorEmail}) accessed your shortened URL: ${originalURL}.\n\nRegards,\nURL Shortener Service`,
    };

    console.log(" Sending email notification...");
    await transporter.sendMail(mailOptions);
    console.log(" Email notification sent to", ownerEmail);
  } catch (error) {
    console.error(" Error sending email:", error);
  }
};

//Start Server Testing
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
