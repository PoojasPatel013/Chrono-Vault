"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TherapistBooking = () => {
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const therapistsResponse = await fetch("/api/therapists");
      const therapistsData = await therapistsResponse.json();
      setTherapists(therapistsData);

      const creditsResponse = await fetch("/api/user/credits");
      const creditsData = await creditsResponse.json();
      setCredits(creditsData.credits);
    };

    fetchData();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/therapists/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ therapistId: selectedTherapist, date: selectedDate, time: selectedTime }),
      });
      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setCredits(credits - result.cost);
      } else {
        throw new Error(result.message || "Booking failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Book a Therapist
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <form onSubmit={handleBooking} className="space-y-6">
            <div>
              <label htmlFor="therapist" className="block text-sm font-medium text-gray-300">
                Select Therapist
              </label>
              <select
                id="therapist"
                value={selectedTherapist}
                onChange={(e) => setSelectedTherapist(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Choose a therapist</option>
                {therapists.map((therapist) => (
                  <option key={therapist.id} value={therapist.id}>
                    {therapist.name} - {therapist.specialization} (Rating: {therapist.rating}/5)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300">
                Select Time
              </label>
              <select
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Choose a time</option>
                {selectedTherapist &&
                  therapists
                    .find((t) => t.id === selectedTherapist)
                    ?.availability.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Your Credits: {credits}</span>
              <span className="text-sm text-gray-300">
                Session Cost: {selectedTherapist && therapists.find((t) => t.id === selectedTherapist)?.price} credits
              </span>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Booking..." : "Book Session"}
              </button>
            </div>
          </form>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-center text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-center text-sm text-green-600"
            >
              Session booked successfully! Your new credit balance: {credits}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TherapistBooking;
