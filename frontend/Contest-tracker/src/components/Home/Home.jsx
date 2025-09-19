import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get("/api/v1/contests/all"); // ✅ await here
        setContests(res.data?.data?.contest);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false); // ✅ only after request finishes
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading contests...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Contests</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contests.map((contest, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {contest.name}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                Platform: <span className="font-medium">{contest.platform}</span>
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Start:{" "}
                {new Date(contest.startTime).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <p className="text-sm text-gray-500">
                Duration: {Math.floor(contest.duration / 60)}h{" "}
                {contest.duration % 60}m
              </p>
            </div>
            <a
              href={contest.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
