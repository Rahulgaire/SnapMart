import React, { useState, useEffect } from "react";
import axios from "axios";

function RandomQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://dummyjson.com/quotes/random");
      setQuote(response.data.quote);
      setAuthor(response.data.author);
    } catch (err) {
      setError("Failed to fetch a new quote.");
      setQuote("");
      setAuthor("");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a quote when component mounts initially
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: "2em auto", textAlign: "center" }}>
      <blockquote style={{ fontStyle: "italic" }}>
        {loading ? "Loading..." : quote ? `"${quote}"` : "No quote available."}
      </blockquote>
      <footer style={{ marginBottom: 16 }}>— {author}</footer>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={fetchQuote} disabled={loading}>
        New Quote
      </button>
    </div>
  );
}

export default RandomQuote;
