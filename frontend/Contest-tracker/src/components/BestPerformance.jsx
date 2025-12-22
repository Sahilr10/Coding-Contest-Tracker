import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "./StatsCard";
import LoadingIndicatior from "./LoadingIndicatior";

const BestPerformance = ({ user }) => {
  const [percentile, setPercentile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBestPerformance = async () => {
      try {
        const codeforces =
          user.connectedAccounts?.codeforces?.username;
        const leetcode =
          user.connectedAccounts?.leetcode?.username;

        const res = await axios.get(
          "/users/best-performance",
          {
            params: {
              codeforces,
              leetcode,
            },
          }
        );

        setPercentile(res.data.bestPerformance);
      } catch (err) {
        console.error(err);
        setPercentile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBestPerformance();
  }, [user]);

  if (loading) {
    return <StatsCard label="Best Performance" loading loader={<LoadingIndicatior/>} />;
  }

  return (
    <StatsCard
      icon={<Target size={26} />}
      iconColor="text-orange-400"
      value={
        percentile !== null
          ? `Top ${percentile}%`
          : "—"
      }
      label="Best Performance"
      gradient="from-orange-600/40 via-orange-500/20 to-transparent"
      border="border-orange-500/40"
      subtitle={
        percentile !== null
          ? "Across all platforms"
          : "No contests yet"
      }
    />
  );
};

export default BestPerformance;
