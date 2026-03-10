import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "./StatsCard";
import LoadingIndicatior from "./LoadingIndicatior";
import { useDemo } from "../context/DemoContext.jsx";
import { demoStats } from "../demo/DemoData.js";


const TotalContests = ({ user }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isDemo } = useDemo();

  useEffect(() => {

    if (isDemo) {
    setCount(demoStats.totalContests);
    setLoading(false);
    return;
  }

    if (!user?.connectedAccounts) {
      setLoading(false);
      return;
    }

    const fetchTotalContests = async () => {
      try {
        const res = await axios.get(
          "/users/total-contests",
          {
            params: {
              codeforces: user.connectedAccounts?.codeforces?.username,
              leetcode: user.connectedAccounts?.leetcode?.username,
            },
            withCredentials: true, // 🔑 needed for JWT cookie
          }
        );

        if (res.data?.success) {
          setCount(res.data.total);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching total contests:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalContests();
  }, [isDemo,user]);

  // 🔄 Loading state
  if (loading) {
    return <StatsCard label="Total Contests" loading loader={<LoadingIndicatior/>} />;
  }

  // ❌ Error state
  if (error) {
    return (
      <StatsCard
        icon={<Trophy size={28} />}
        value="—"
        label="Total Contests"
        border="border-red-500/40"
        gradient="from-red-600/40 via-red-500/20 to-transparent"
      />
    );
  }

  // ✅ Success
  return (
    <StatsCard
      icon={<Trophy size={28} />}
      iconColor="text-purple-500"
      value={count}
      label="Total Contests"
      gradient="from-purple-600/40 via-purple-500/20 to-transparent"
      border="border-purple-500/40"
    />
  );
};

export default TotalContests;
