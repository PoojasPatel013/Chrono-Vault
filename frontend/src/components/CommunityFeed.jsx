import { useEffect, useState } from "react";

const CommunityFeed = () => {
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    // Fetch public capsules from the backend
    const fetchCapsules = async () => {
      // Simulated API call
      const response = await fetch("/api/timecapsules/public");
      const data = await response.json();
      setCapsules(data);
    };

    fetchCapsules();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Community Feed</h2>
      <div className="space-y-4">
        {capsules.map((capsule) => (
          <div key={capsule.id} className="border p-4 rounded">
            <p>{capsule.content}</p>
            <p className="text-sm text-gray-500">
              Created by {capsule.createdBy} on {new Date(capsule.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;