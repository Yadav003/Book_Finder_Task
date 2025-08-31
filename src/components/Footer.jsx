import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-sky-800 text-white py-8 sm:py-12">
      <div className="w-full px-4 text-center">
        <p className="text-base sm:text-lg mb-4">&copy; 2025 Book Finder. All rights reserved.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <a href="#" className="text-sky-200 hover:text-white transition duration-300 text-sm sm:text-base">
            Privacy Policy
          </a>
          <a href="#" className="text-sky-200 hover:text-white transition duration-300 text-sm sm:text-base">
            Terms of Service
          </a>
          <a href="#" className="text-sky-200 hover:text-white transition duration-300 text-sm sm:text-base">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
