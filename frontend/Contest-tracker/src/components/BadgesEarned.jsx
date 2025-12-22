import { Award } from "lucide-react";
import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import axios from "axios";
import LoadingIndicatior from "./LoadingIndicatior";

const BadgesEarned = ({ user }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [user]);

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
