
import axios from "axios";
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for contests (replace with actual API calls)
  // const mockContests = [
  //   {
  //     id: 1,
  //     platform: 'LeetCode',
  //     name: 'Weekly Contest 395',
  //     startTime: '2024-07-28T08:00:00Z',
  //     duration: 90,
  //     status: 'upcoming',
  //     url: '#'
  //   },
  //   {
  //     id: 2,
  //     platform: 'CodeChef',
  //     name: 'Starters 125',
  //     startTime: '2024-07-31T20:00:00Z',
  //     duration: 120,
  //     status: 'upcoming',
  //     url: '#'
  //   },
  //   {
  //     id: 3,
  //     platform: 'GeeksforGeeks',
  //     name: 'Weekly Contest 45',
  //     startTime: '2024-07-28T19:00:00Z',
  //     duration: 60,
  //     status: 'upcoming',
  //     url: '#'
  //   },
  //   {
  //     id: 4,
  //     platform: 'Codeforces',
  //     name: 'Round #895 (Div. 3)',
  //     startTime: '2024-08-05T17:35:00Z',
  //     duration: 135,
  //     status: 'upcoming',
  //     url: '#'
  //   },
  //   {
  //     id: 5,
  //     platform: 'LeetCode',
  //     name: 'Biweekly Contest 128',
  //     startTime: '2024-08-03T20:00:00Z',
  //     duration: 90,
  //     status: 'upcoming',
  //     url: '#'
  //   }
  // ];

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

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntil = (dateString) => {
    const now = new Date();
    const contestDate = new Date(dateString);
    const diff = contestDate - now;
    
    if (diff <= 0) return 'Started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `in ${days}d ${hours}h`;
    if (hours > 0) return `in ${hours}h ${minutes}m`;
    return `in ${minutes}m`;
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'LeetCode': 'bg-orange-100 text-orange-800 border-orange-200',
      'CodeChef': 'bg-red-100 text-red-800 border-red-200',
      'GeeksforGeeks': 'bg-green-100 text-green-800 border-green-200',
      'Codeforces': 'bg-blue-100 text-blue-800 border-blue-200',
      'AtCoder': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[platform] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contest Tracker</h1>
          <p className="text-xl mb-8 opacity-90">
            Never miss a coding contest again. Track all your favorite programming platforms in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View All Contests
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Add Platform
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">4+</div>
              <div className="text-gray-600 dark:text-gray-300">Platforms</div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Monthly Contests</div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">1000+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contests Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
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
              {['upcoming', 'ongoing', 'completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                    activeTab === tab
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Contest Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
              ))
            ) : (
              contests.map((contest) => (
                <div key={contest.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPlatformColor(contest.platform)}`}>
                      {contest.platform}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {getTimeUntil(contest.startTime)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {contest.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatTime(contest.startTime)}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {contest.duration} minutes
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                    Register Now
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
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
                icon: '⏰',
                title: 'Real-time Updates',
                description: 'Get instant notifications for new contests and schedule changes'
              },
              {
                icon: '📱',
                title: 'Multi-Platform',
                description: 'Track contests from all major coding platforms in one place'
              },
              {
                icon: '🔔',
                title: 'Custom Alerts',
                description: 'Set reminders for your favorite contests and never miss one'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
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
      <section className="py-20 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Level Up?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who never miss a coding contest
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
