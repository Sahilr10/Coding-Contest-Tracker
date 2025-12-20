import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#090f1d] via-[#0b1224] to-[#090f1d] border-b border-white/10 text-gray-400 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} ContestTracker. All rights reserved.
            </p>
          </div>

          {/* App Description */}
          <div className="text-center md:text-right">
            <p className="text-sm">
              Track coding contests and hackathons effortlessly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
