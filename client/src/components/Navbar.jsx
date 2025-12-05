import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Q.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-8 bg-[#0f1624]">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <FontAwesomeIcon icon={faChartLine} className="text-white text-2xl" />
        <h1 className="text-white text-2xl font-semibold">Quantro</h1>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
        <a href="#" className="hover:text-white transition">Home</a>
        {/* <a href="#" className="hover:text-white transition">Features</a> */}
        <a href="#" className="hover:text-white transition">Pricing</a>
        <a href="#" className="hover:text-white transition">About</a>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <button className="text-gray-300 hover:text-white font-medium transition">
          Login
        </button>
        <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-2 rounded-full font-medium transition">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
