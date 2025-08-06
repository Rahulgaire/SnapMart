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

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex justify-center items-center py-10 h-auto  bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full text-center transition-all duration-300">
        <blockquote className="text-lg italic text-gray-700 mb-4 min-h-[80px]">
          {loading ? (
            <span className="animate-pulse text-gray-400">Loading...</span>
          ) : quote ? (
            `"${quote}"`
          ) : (
            "No quote available."
          )}
        </blockquote>
        <footer className="text-sm text-gray-600 mb-4">
          — {author || "Unknown"}
        </footer>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={fetchQuote}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all duration-300"
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default RandomQuote;
