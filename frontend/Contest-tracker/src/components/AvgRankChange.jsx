import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "./StatsCard";
import LoadingIndicatior from "./LoadingIndicatior";
import { useDemo } from "../context/DemoContext";
import { demoRatingProgress, demoStats } from "../demo/DemoData";

const AvgRankChange = ({ user }) => {
  const { isDemo } = useDemo();
  const [avgChange, setAvgChange] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (isDemo) {
      setAvgChange(demoStats.averageRating - demoRatingProgress[0].rating);
      setLoading(false);
      return;
    }

    if (!user) return;

    const fetchAvgRankChange = async () => {
      try {
        const codeforces =
          user.connectedAccounts?.codeforces?.username;
        const leetcode =
          user.connectedAccounts?.leetcode?.username;

        const res = await axios.get(
          "/users/avg-rank-change",
          {
            params: {
              codeforces,
              leetcode,
            },
          }
        );

        setAvgChange(res.data.averageRankChange || 0);
      } catch (err) {
        console.error("Avg rank change error:", err);
        setAvgChange(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAvgRankChange();
  }, [isDemo,user]);

  const isPositive = avgChange >= 0;

  if (loading) {
    return <StatsCard label="Avg. Rank Change" loading loader={<LoadingIndicatior/>} />;
  }

  return (
    <StatsCard
      icon={
        isPositive ? (
          <TrendingUp size={26} />
        ) : (
          <TrendingDown size={26} />
        )
      }
      iconColor={isPositive ? "text-blue-400" : "text-red-400"}
      value={`${isPositive ? "+" : ""}${avgChange}`}
      label="Avg. Rank Change"
      gradient="from-blue-600/40 via-blue-500/20 to-transparent"
      border="border-blue-500/40"
      subtitle={
        isPositive ? "Overall improvement" : "Needs consistency"
      }
    />
  );
};

export default AvgRankChange;
