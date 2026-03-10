export const demoUser = {
  username: "demo_user",
  email: "demo@contesttracker.com",
  avatar: "/demo-avatar.png",
  createdAt: "2023-01-10T00:00:00Z",
  connectedAccounts: {
    codeforces: {
      username: "tourist",
      connected: true,
    },
    leetcode: {
      username: "leetcode_master",
      connected: true,
    },
  },
};

export const demoStats = {
  totalContests: 124,
  averageRating: 1820,
  problemsSolved: {
    total: 350,
    easy: 140,
    medium: 150,
    hard: 60,
  },
  badges: {
    total: 5,
    leetcode: 3,
    codeforces: 2,
  },
  winRate: 62.4,
  bestPerformance: 3.2, // %
};

export const demoRatingProgress = [
  { label: "Aug", rating: 1450 },
  { label: "Sep", rating: 1520 },
  { label: "Oct", rating: 1600 },
  { label: "Nov", rating: 1680 },
  { label: "Dec", rating: 1750 },
  { label: "Jan", rating: 1820 },
];
