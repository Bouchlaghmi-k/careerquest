import { useEffect, useState } from "react";

function Home() {
  const [backendMessage, setBackendMessage] = useState("Loading backend...");
  const [backendStatus, setBackendStatus] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/health/")
      .then((response) => response.json())
      .then((data) => {
        setBackendMessage(data.message);
        setBackendStatus(data.status);
      })
      .catch(() => {
        setBackendMessage("Unable to connect to backend");
        setBackendStatus("error");
      });
  }, []);

  return (
    <div className="page hero">
      <h1>Level up your career</h1>
      <p>
        CareerQuest turns professional growth into a game. Complete quests,
        unlock skills, gain experience, and evolve your avatar.
      </p>

      <button className="primary-btn">Start your journey</button>

      <div className="card" style={{ marginTop: "24px", maxWidth: "500px" }}>
        <h2>Backend connection</h2>
        <p><strong>Message:</strong> {backendMessage}</p>
        <p><strong>Status:</strong> {backendStatus}</p>
      </div>
    </div>
  );
}

export default Home;