import React, { useState } from "react";

const TimeCapsule = () => {
  const [memory, setMemory] = useState("");
  const [file, setFile] = useState(null);
  const [unlockDate, setUnlockDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement time capsule creation logic
    console.log("Time Capsule:", memory, file, unlockDate);
  };

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Create a Time Capsule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="memory" className="block mb-1">
            Memory
          </label>
          <textarea
            id="memory"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="block mb-1">
            Upload Photo/Document
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="unlockDate" className="block mb-1">
            Unlock Date
          </label>
          <input
            type="date"
            id="unlockDate"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">
          Create Time Capsule
        </button>
      </form>
    </div>
  );
};

export default TimeCapsule;