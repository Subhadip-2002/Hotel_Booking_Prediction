// components/AnalyticsDashboard.jsx
import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

const AnalyticsDashboard = () => {
  const [stats] = useState({
    accuracy: 89,
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Analytics Overview</h2>
          <p className="text-gray-600 text-lg">Real-time insights into booking predictions and performance</p>
        </div>

        <div className="grid place-items-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{stats.accuracy}%</h3>
            <p className="text-gray-600">Prediction Accuracy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;