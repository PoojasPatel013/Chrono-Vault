import React, { useState } from "react";

const PersonalityTest = () => {
  const [answers, setAnswers] = useState({});

  const questions = [
    "I enjoy social gatherings and meeting new people.",
    "I prefer to work on projects alone rather than in a team.",
    "I often think about abstract concepts and ideas.",
    "I tend to make decisions based on logic rather than emotions.",
    "I like to plan things in advance rather than be spontaneous.",
  ];

  const handleAnswer = (question, value) => {
    setAnswers({ ...answers, [question]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement AI-based personality analysis
    console.log("Personality Test Answers:", answers);
    // Simulated API call for AI analysis
    const response = await fetch("/api/personality/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });
    const result = await response.json();
    console.log("AI Analysis Result:", result);
  };

  return (
    <div className="container mx-auto mt-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Personality Test</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <p>{question}</p>
            <div className="flex justify-between">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={1}
                  onChange={() => handleAnswer(question, 1)}
                  className="mr-2"
                />
                Strongly Disagree
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={3}
                  onChange={() => handleAnswer(question, 3)}
                  className="mr-2"
                />
                Neutral
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={5}
                  onChange={() => handleAnswer(question, 5)}
                  className="mr-2"
                />
                Strongly Agree
              </label>
            </div>
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalityTest;