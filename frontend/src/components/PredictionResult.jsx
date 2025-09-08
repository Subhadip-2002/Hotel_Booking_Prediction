import React from "react";

function PredictionResult({ prediction }) {
  if (!prediction) return null;

//   console.log("Prediction prop received:", prediction);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-xl font-bold text-center mb-4">Prediction Result</h2>

      <p className="text-center text-gray-700 mb-2">
        <strong>Prediction:</strong>{" "}
        {prediction.prediction === 1
          ? "Booking will be Canceled"
          : "Booking will NOT be Canceled"}
      </p>

      <div className="flex justify-between mt-4">
        <p className="text-green-600">
          Probability Not Canceled:{" "}
          <strong>
            {prediction.probability_not_canceled !== undefined
              ? (prediction.probability_not_canceled * 100).toFixed(2) + "%"
              : "N/A"}
          </strong>
        </p>
        <p className="text-red-600">
          Probability Canceled:{" "}
          <strong>
            {prediction.probability_canceled !== undefined
              ? (prediction.probability_canceled * 100).toFixed(2) + "%"
              : "N/A"}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default PredictionResult;
