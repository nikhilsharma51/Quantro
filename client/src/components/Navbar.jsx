import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/login');
  }

  return (
    <nav className="w-full flex justify-between items-center py-4 px-8 bg-[#0f1624]">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <FontAwesomeIcon icon={faChartLine} className="text-white text-2xl" />
        <h1 className="text-white text-2xl font-semibold">Quantro</h1>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
        <a href="/dashboard" className="hover:text-white transition">Home</a>
        {/* <a href="#" className="hover:text-white transition">Features</a> */}
        <a href="#" className="hover:text-white transition">Pricing</a>
        <a href="#" className="hover:text-white transition">About</a>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="mr-4 text-sm text-white">Sign in</Link>
            <Link to="/signup" className="text-sm bg-[#3b82f6] px-3 py-1 rounded text-white">Sign up</Link>
          </>
        ) : (
          <div className="font-poppins text-sm text-white">Hi, {user?.fullname}</div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
