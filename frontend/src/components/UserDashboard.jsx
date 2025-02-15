import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Calendar, Lock } from "lucide-react"

const UserDashboard = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [privacyOption, setPrivacyOption] = useState("public")

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch("/api/user/profile")
      const data = await response.json()
      setUserProfile(data)
    }
    fetchUserProfile()
  }, [])

  const handlePrivacyChange = async (option) => {
    setPrivacyOption(option)
    await fetch("/api/user/privacy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ privacyOption: option }),
    })
  }

  if (!userProfile) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl font-bold mb-8 text-center">
          Your Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <User className="mr-2" /> Profile Information
            </h2>
            <p className="mb-2"><strong>Name:</strong> {userProfile.name}</p>
            <p className="mb-2"><strong>Email:</strong> {userProfile.email}</p>
            <p className="mb-2"><strong>Chrono-Credits:</strong> {userProfile.credits}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2" /> Session Statistics
            </h2>
            <p className="mb-2"><strong>Upcoming Sessions:</strong> {userProfile.upcomingSessions}</p>
            <p className="mb-2"><strong>Completed Sessions:</strong> {userProfile.completedSessions}</p>
            <p className="mb-2"><strong>Time Capsules Created:</strong> {userProfile.timeCapsules}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Lock className="mr-2" /> Privacy Settings
            </h2>
            <div className="flex space-x-4">
              {["public", "private", "anonymous"].map((option) => (
                <button key={option} onClick={() => handlePrivacyChange(option)} className={`px-4 py-2 rounded-full ${privacyOption === option ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-700 transition-colors`}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition-colors">Edit Profile</button>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard