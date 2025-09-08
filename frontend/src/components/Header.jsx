// Header Component - File: components/Header.jsx
import React from "react";
import { Hotel, Brain } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Hotel className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                BookingPredict AI
              </h1>
              <p className="text-sm text-blue-100">Hotel Cancellation Intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
            <Brain className="h-5 w-5 text-blue-200" />
            <span className="text-sm font-medium">ML Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;