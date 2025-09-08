// Footer Component - File: components/Footer.jsx
import React from "react";
import { Hotel } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Hotel className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">BookingPredict AI</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionizing hotel management with intelligent booking
              cancellation predictions powered by advanced machine learning
              algorithms.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                <span className="text-sm">t</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <span className="text-sm">in</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                Prediction Engine
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Analytics Dashboard
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Real-time Insights
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Revenue Optimization
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                Documentation
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                API Reference
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Contact Us
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            © 2025 BookingPredict AI. All rights reserved. Powered by advanced
            machine learning.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
