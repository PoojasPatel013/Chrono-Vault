import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, Video } from "lucide-react"

const BookSession = () => {
  const [therapists, setTherapists] = useState([])
  const [selectedTherapist, setSelectedTherapist] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionType, setSessionType] = useState("in-person")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [credits, setCredits] = useState(0)
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          (error) => {
            console.error("Error getting user location:", error)
          }
        )
      }

      const therapistsResponse = await fetch("/api/therapists")
      const therapistsData = await therapistsResponse.json()
      setTherapists(therapistsData)

      const creditsResponse = await fetch("/api/user/credits")
      const creditsData = await creditsResponse.json()
      setCredits(creditsData.credits)
    }

    fetchData()
  }, [])

  const handleBooking = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await fetch("/api/therapists/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ therapistId: selectedTherapist, date: selectedDate, time: selectedTime, sessionType }),
      })
      const result = await response.json()

      if (response.ok) {
        setSuccess(true)
        setCredits(credits - result.cost)
      } else {
        throw new Error(result.message || "Booking failed")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl font-bold mb-8 text-center">
          Book a Session
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-gray-800 p-6 rounded-lg shadow-md">
          <form onSubmit={handleBooking} className="space-y-6">
            <div>
              <label htmlFor="therapist" className="block text-sm font-medium text-gray-300">Select Therapist</label>
              <select id="therapist" value={selectedTherapist} onChange={(e) => setSelectedTherapist(e.target.value)} className="mt-1 block w-full py-2 px-3 border bg-gray-700 rounded-md">
                <option value="">Choose a therapist</option>
                {therapists.map((therapist) => (
                  <option key={therapist.id} value={therapist.id}>{therapist.name} - {therapist.specialization}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">Select Date</label>
              <input type="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="mt-1 block w-full py-2 px-3 border bg-gray-700 rounded-md" required />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300">Select Time</label>
              <select id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="mt-1 block w-full py-2 px-3 border bg-gray-700 rounded-md" required>
                <option value="">Choose a time</option>
                {selectedTherapist && therapists.find(t => t.id === selectedTherapist)?.availability.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Session Type</label>
              <div className="mt-2 flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input type="radio" className="form-radio" name="sessionType" value="in-person" checked={sessionType === "in-person"} onChange={() => setSessionType("in-person")} />
                  <span className="ml-2">In-person</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" className="form-radio" name="sessionType" value="video" checked={sessionType === "video"} onChange={() => setSessionType("video")} />
                  <span className="ml-2">Video Call</span>
                </label>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md">
              {loading ? "Booking..." : "Book Session"}
            </button>
          </form>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-red-600">{error}</motion.p>}
          {success && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-green-600">Session booked successfully! Your new credit balance: {credits}</motion.p>}
        </motion.div>
      </div>
    </div>
  )
}

export default BookSession
