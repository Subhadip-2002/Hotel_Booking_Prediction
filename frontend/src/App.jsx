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
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const payload = {
        deposit_type: formData.deposit_type || "",
        country: formData.country || "",
        lead_time: Number(formData.lead_time) || 0,
        adr: Number(formData.adr) || 0,
        arrival_date_day_of_month: Number(formData.arrival_date_day_of_month) || 1,
        total_of_special_requests: Number(formData.total_of_special_requests) || 0,
        arrival_date_week_number: Number(formData.arrival_date_week_number) || 1,
        total_stay: Number(formData.total_stay) || 1,
        previous_cancellations: Number(formData.previous_cancellations) || 0,
        previous_bookings_not_canceled: Number(formData.previous_bookings_not_canceled) || 0,
        arrival_date_month: formData.arrival_date_month || "",
        market_segment: formData.market_segment || "",
        customer_type: formData.customer_type || "",
        assigned_room_type: formData.assigned_room_type || "",
        required_car_parking_spaces: Number(formData.required_car_parking_spaces) || 0,
        meal: formData.meal || "",
        booking_changes: Number(formData.booking_changes) || 0,
        distribution_channel: formData.distribution_channel || "",
        reserved_room_type: formData.reserved_room_type || "",
        total_guests: Number(formData.total_guests) || 1
      };

      const response = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      // ✅ Ensure safe defaults if backend doesn’t return probabilities
      setPrediction({
        prediction: data.prediction || "Unknown",
        probability_not_canceled: data.probability_not_canceled ?? null,
        probability_canceled: data.probability_canceled ?? null,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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

      console.log("Current prediction state:", prediction);
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
