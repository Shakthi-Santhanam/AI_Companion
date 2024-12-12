import React, { useState } from 'react';
import backgroundImage from './assets/Img.jpg';

function App() {
  const [stressLevel, setStressLevel] = useState('');
  const [mood, setMood] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Validate stress level
  const handleStressLevelChange = (event) => {
    const value = event.target.value;
    
    // Check if the entered value is a valid number and between 1 and 10
    if (value && (value < 1 || value > 10)) {
      alert("Please enter a stress level between 1 and 10.");
      return;
    }
    
    setStressLevel(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Ensure stressLevel is treated as a number and validate it
    const stressValue = parseInt(stressLevel, 10);
    
    if (!stressLevel || !mood) {
      alert("Please fill in both fields.");
      return;
    }

    if (isNaN(stressValue) || stressValue < 1 || stressValue > 10) {
      alert("Please enter a valid stress level between 1 and 10.");
      return;
    }

    const moodData = {
      stressLevel: stressValue,
      mood,
    };

    fetch('http://127.0.0.1:8000/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moodData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);
        setMessage(data.message || "Mood and stress data saved successfully!");
        setMessageType('success');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        setMessage("Error saving data.");
        setMessageType('error');
      });
  };

  const progressBarColor = stressLevel <= 3 ? 'bg-green-500' : stressLevel <= 6 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Hero Section */}
      <section className="bg-white bg-opacity-75 text-center p-4 rounded-lg shadow-lg w-full sm:w-97 mb-6">
        <h1 className="text-4xl font-semibold text-blue-600 mb-2">Emotional Health AI Companion</h1>
        <p className="text-lg text-gray-700">Track your mood and stress levels to improve your emotional well-being.</p>
      </section>

      {/* Main Form Section */}
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Track Your Mood</h2>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="stressLevel" className="block text-lg text-gray-700 mb-2">Stress Level</label>
            <input
              id="stressLevel"
              type="number"
              value={stressLevel}
              onChange={handleStressLevelChange} // Use custom handler
              min="1"
              max="10"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out"
              required
            />
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-full ${progressBarColor} rounded-full`}
              style={{ width: `${(stressLevel / 10) * 100}%` }}
            />
          </div>

          <div>
            <label htmlFor="mood" className="block text-lg text-gray-700 mb-2">Mood</label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out"
              required
            >
              <option value="">Select Mood</option>
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Neutral">Neutral</option>
              <option value="Stressed">Stressed</option>
              <option value="Anxious">Anxious</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>

        {/* Success/Failure Message */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-white text-center ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
