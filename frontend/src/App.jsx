import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TimeCapsule from "./components/TimeCapsule";
import CommunityFeed from "./components/CommunityFeed";
import PersonalityTest from "./components/PersonalityTest";
import AITherapy from "./components/AITherapy";
import TherapistBooking from "./components/TherapistBooking";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timecapsule" element={<TimeCapsule />} />
          <Route path="/community" element={<CommunityFeed />} />
          <Route path="/personality-test" element={<PersonalityTest />} />
          <Route path="/ai-therapy" element={<AITherapy />} />
          <Route path="/book-therapist" element={<TherapistBooking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
