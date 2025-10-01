import axios from "axios";
import React, { useState, useEffect } from "react";
import NextContestSection from "./NextContestSection";
import {
  getPlatformClass,
  getPlatformDotClass,
  getTimeUntilDetailed,
  formatTime,
  getTimeUntil
} from "../../utils/contestHelpers.js";

const Home = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get("/api/v1/contests/all"); // ✅ await here

        setContests(res.data.data.contests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false); // ✅ only after request finishes
      }
    };
    fetchContests();
  }, []);


  

  const getPlatformColor = (platform) => {
    const colors = {
      LeetCode: "bg-orange-100 text-orange-800 border-orange-200",
      CodeChef: "bg-red-100 text-red-800 border-red-200",
      GeeksforGeeks: "bg-green-100 text-green-800 border-green-200",
      Codeforces: "bg-blue-100 text-blue-800 border-blue-200",
      AtCoder: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return colors[platform] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-[#121826]">
      <div className="max-w-[80vw] mx-auto">
        <div className=" text-3xl font-bold text-gray-900 dark:text-white pb-8 ">Next Contest</div>
        {/* Hero Section */}
        <div className="justify-center">
          <NextContestSection upcomingContests={contests} />
        </div>

        {/* Contests Section */}
          <section className="py-16">
        <div className="max-w-[80vw] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Contests
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Stay updated with all the upcoming coding competitions
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {["upcoming", "ongoing", "completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                    activeTab === tab
                      ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Contest Cards */}
          <div className="grid grid-cols-3 gap-4">
            {loading
              ? // Loading skeletons
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="contest-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
                  >
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                  </div>
                ))
              : contests.slice(1, 7).map((contest) => {
                  const platformClass = getPlatformClass(contest.platform);

                  return (
                    <div
                      key={contest.id}
                      className={`contest-card ${platformClass} bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-l-4 flex flex-col h-full`}
                    >
                      <div className="flex-grow">
                        {/* Contest Header */}
                        <div className="contest-header flex justify-between items-start mb-4">
                          <div className="contest-platform flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${getPlatformDotClass(contest.platform)}`}
                            ></span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                              {contest.platform}
                            </span>
                          </div>
                          <span className="contest-date text-sm text-gray-500 dark:text-gray-400">
                            {getTimeUntil(contest.startTime)}
                          </span>
                        </div>

                        {/* Contest Title */}
                        <h3 className="contest-title text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          {contest.name}
                        </h3>

                        {/* Contest Details */}
                        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>{formatTime(contest.startTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>{contest.duration} minutes</span>
                          </div>
                        </div>
                      </div>

                      {/* Countdown Timer */}
                      <div className="contest-countdown bg-gray-100 dark:bg-gray-700/50 p-2 rounded text-center mb-4">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {getTimeUntilDetailed(contest.startTime)}
                        </span>
                      </div>

                      {/* Register Button */}
                      <button
                        className="register-btn w-full bg-transparent border border-current text-current py-2 px-4 rounded-md hover:bg-[#60a5fa] hover:text-white transition-colors duration-200"
                        onClick={() => window.open(contest.url, '_blank')}
                      >
                        Register Now
                      </button>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Contest Tracker?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Everything you need to stay on top of your coding game
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⏰",
                title: "Real-time Updates",
                description:
                  "Get instant notifications for new contests and schedule changes",
              },
              {
                icon: "📱",
                title: "Multi-Platform",
                description:
                  "Track contests from all major coding platforms in one place",
              },
              {
                icon: "🔔",
                title: "Custom Alerts",
                description:
                  "Set reminders for your favorite contests and never miss one",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* CTA Section */}
        {/* <section className="py-20 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Level Up?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers who never miss a coding contest
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Free
            </button>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default Home;
