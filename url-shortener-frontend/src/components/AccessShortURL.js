//this is the accessor landing page where any one having shorturl lands 
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/AccessShortURL.css"; 

const AccessShortURL = () => {
  const { shortCode } = useParams();
  const [accessorName, setAccessorName] = useState("");
  const [accessorEmail, setAccessorEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(" Checking Short Code:", shortCode);

    fetch(`http://localhost:5010/access/${shortCode}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(" Error:", error);
        setError("Failed to load URL. Try again.");
        setLoading(false);
      });
  }, [shortCode]);

  const handleAccessURL = async () => {
    if (!accessorName || !accessorEmail) {
      alert("Please enter your name and email.");
      return;
    }
  
    try {
      console.log(" Sending POST request to backend...");
  
      const response = await fetch(`http://localhost:5010/access/${shortCode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessorName, accessorEmail }),
      });
  
      console.log(" Response received:", response);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to access the URL");
      }
  
      const data = await response.json();
      console.log("Redirecting to:", data.originalURL);
  
      if (data.originalURL) {
        window.location.href = data.originalURL; //Redirect user
      } else {
        alert("Error: Original URL not found.");
      }
    } catch (error) {
      console.error("Error accessing URL:", error);
      alert("Error accessing the URL. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Access a Shortened URL</h2>
      {loading ? (
        <p className="loading"> Loading...</p>
      ) : error ? (
        <p className="error"> {error}</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Your Name"
            className="input-field"
            value={accessorName}
            onChange={(e) => setAccessorName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input-field"
            value={accessorEmail}
            onChange={(e) => setAccessorEmail(e.target.value)}
          />
          <button className="btn-primary" onClick={handleAccessURL}>Access URL</button>
        </>
      )}
    </div>
  );
};

export default AccessShortURL;
