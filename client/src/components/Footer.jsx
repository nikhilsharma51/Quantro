import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full text-gray-300 py-5 px-6 ">
      <div className="max-w-6xl mx-5 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left - Brand (1/3) */}
        <div className="flex flex-col items-start md:items-start">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor" aria-hidden>
              <path d="M3 13h2v6H3zM7 9h2v10H7zM11 5h2v14h-2zM15 3h2v16h-2zM19 7h2v12h-2z" />
            </svg>
            <h3 className="text-white text-2xl md:text-3xl font-extrabold">Quantro</h3>
          </div>
          <p className="mt-4 text-gray-300 max-w-md text-sm md:text-base italic">"A simple, fast and ad-free trading journal to help you learn, reflect and trade better every day."</p>
        </div>

        {/* Middle - Nav Links */}
        <div className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-gray-400 font-semibold">Product</span>
            <a href="#" className="hover:text-white transition">Overview</a>
            <a href="#" className="hover:text-white transition">Pricing</a>
            <a href="#" className="hover:text-white transition">Features</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-400 font-semibold">Company</span>
            <a href="#" className="hover:text-white transition">About</a>
            <a href="#" className="hover:text-white transition">Careers</a>
            <a href="#" className="hover:text-white transition">Blog</a>
          </div>
        </div>

        {/* Right - CTA / Copyright */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex items-center gap-3">
            <a href="#" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-full text-sm font-semibold">Get Started</a>
          </div>
          <div className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Quantro. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer