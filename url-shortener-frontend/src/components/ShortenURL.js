//this file intend to short the given url by taking user details and storing in firebase
import React, { useState } from "react";
import "../CSS/ShortenURL.css"; 

const ShortenURL = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [shortURL, setShortURL] = useState(null);

  const handleShortenURL = async () => {
    if (!originalURL || !ownerName || !ownerEmail) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5010/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalURL, ownerName, ownerEmail, expirationDate }),
      });

      const data = await response.json();
      if (data.shortURL) {
        setShortURL(data.shortURL);
      } else {
        alert("Error shortening the URL.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Shorten Your URL</h2>
      <input
        type="text"
        placeholder="Original URL"
        className="input-field"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your Name"
        className="input-field"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        className="input-field"
        value={ownerEmail}
        onChange={(e) => setOwnerEmail(e.target.value)}
      />
      <label htmlFor="input-field">Enter the Expiry Date:</label>
      <input
        type="date"
        className="input-field"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <button className="btn-primary" onClick={handleShortenURL}>
        Shorten URL
      </button>

      {shortURL && (
        <div className="short-url-container">
          <p>
            Short URL:{" "}
            <a href={shortURL} className="short-url" target="_blank" rel="noopener noreferrer">
              {shortURL}
            </a>
          </p>
          <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(shortURL)}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default ShortenURL;
