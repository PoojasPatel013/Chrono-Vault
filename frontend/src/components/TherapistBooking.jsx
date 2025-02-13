import React, { useState, useEffect } from "react";

const TherapistBooking = () => {
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // TODO: Fetch therapists from the backend
    const fetchTherapists = async () => {
      // Simulated API call
      const response = await fetch("/api/therapists");
      const data = await response.json();
      setTherapists(data);
    };

    fetchTherapists();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    // TODO: Implement booking logic
    console.log("Booking:", selectedTherapist, selectedDate);
    // Simulated API call for booking
    const response = await fetch("/api/therapists/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ therapistId: selectedTherapist, date: selectedDate }),
    });
    const result = await response.json();
    console.log("Booking Result:", result);
  };

  return (
    <div className="container mx-auto mt-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Book a Therapist</h2>
      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label htmlFor="therapist" className="block mb-1">
            Select Therapist
          </label>
          <select
            id="therapist"
            value={selectedTherapist}
            onChange={(e) => setSelectedTherapist(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Choose a therapist</option>
            {therapists.map((therapist) => (
              <option key={therapist.id} value={therapist.id}>
                {therapist.name} - {therapist.specialization}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block mb-1">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default TherapistBooking;