import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("signup"); // 'signup' or 'login'
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetErrors = () => setError("");

  const validate = () => {
    resetErrors();
    if (!email) return "Please enter an email.";
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return "Please enter a valid email address.";
    if (!password || password.length < 6)
      return "Password must be at least 6 characters.";
    if (mode === "signup" && !fullname) return "Please enter your full name.";
    if (mode === "signup" && password !== confirm)
      return "Passwords do not match.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    setError("");
    try {
      // TODO: replace with real API call
      await new Promise((r) => setTimeout(r, 700));
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/6 rounded-xl shadow-md p-8"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            {mode === "signup" ? "Create Account" : "Sign In"}
          </h2>
          <p className="text-sm text-gray-300 mt-2">
            {mode === "signup"
              ? "Create a free account to start journaling your trades."
              : "Sign in to access your trading journal."}
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/30 p-3 rounded">
            {error}
          </div>
        )}

        {mode === "signup" && (
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your full name"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter password"
          />
        </div>

        {mode === "signup" && (
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Confirm password"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-2 mb-4 bg-primary hover:bg-[#2563eb] text-white px-4 py-2 rounded-full font-semibold text-lg transition disabled:opacity-60"
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : mode === "signup"
            ? "Create Account"
            : "Sign In"}
        </button>

        <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
          <div>
            {mode === "signup" ? (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    resetErrors();
                  }}
                  className="text-primary font-semibold cursor-pointer"
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    resetErrors();
                  }}
                  className="text-primary font-semibold cursor-pointer"
                >
                  Create account
                </button>
              </span>
            )}
          </div>
          {mode === "login" && (
            <button
              type="button"
              className="text-primary font-medium"
              onClick={() => alert("Reset flow - implement")}
            >
              Forgot?
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
