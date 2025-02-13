import React, { useState } from "react";
import { Link } from "react-router-dom"

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      console.log("Signup successful! Please log in.");
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded shadow-md p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-400 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp

