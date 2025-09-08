import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Footer from './components/Footer';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setShowForm(false);
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const payload = { /* ... your formData mapping ... */ };

      const response = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      setPrediction({
        prediction: Number(data.prediction),
        probability_not_canceled: Number(data.probability_not_canceled),
        probability_canceled: Number(data.probability_canceled),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Move console.log here
  console.log("Current prediction state:", prediction);

  return (
    <>
      <Header />
      <HeroSection onStartPrediction={() => setShowForm(true)} />
      <AnalyticsDashboard />

      <PredictionForm
        isVisible={showForm}
        onPredict={handlePredict}
        onClose={() => setShowForm(false)}
        isLoading={isLoading}
      />

      {prediction && <PredictionResult prediction={prediction} />}

      {error && (
        <div className="fixed bottom-6 right-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
        </div>
      )}

      <Footer />
    </>
  );
}


export default App;
