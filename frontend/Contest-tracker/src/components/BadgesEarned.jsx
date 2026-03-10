import { Award } from "lucide-react";
import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import axios from "axios";
import LoadingIndicatior from "./LoadingIndicatior";
import { useDemo } from "../context/DemoContext";
import { demoRatingProgress, demoStats } from "../Demo/tempData";

const BadgesEarned = ({ user }) => {
  const { isDemo } = useDemo();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (isDemo) {
      setCount(demoStats.badges.total);
      setLoading(false);
      return;
    }

    if (!user?.connectedAccounts) return;

    const fetchBadges = async () => {
      try {
        const res = await axios.get("/users/badges-earned", {
          params: {
            leetcodeUsername:
              user.connectedAccounts.leetcode?.username,
            codeforcesUsername:
              user.connectedAccounts.codeforces?.username,
          },
        });

        setCount(res.data.totalBadges || 0);
      } catch (err) {
        console.error("Badges fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [isDemo,user]);

  if (loading) {
    return <StatsCard label="Badges Earned" loading loader={<LoadingIndicatior/>} />;
  }

  return (
    <StatsCard
      icon={<Award size={28} />}
      iconColor="text-orange-400"
      value={count}
      label="Badges Earned"
      gradient="from-orange-600/40 via-orange-500/20 to-transparent"
      border="border-orange-500/40"
    />
  );
};

export default BadgesEarned;
