import { Award } from "lucide-react";
import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import axios from "axios";
import LoadingIndicator from "./LoadingIndicatior";

const WinRate = ({ user }) => {
  const [winRate, setWinRate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.connectedAccounts) return;

    const fetchWinRate = async () => {
      try {
        const res = await axios.get(
          "/users/win-rate",
          {
            params: {
              codeforces: user.connectedAccounts?.codeforces?.username,
              leetcode: user.connectedAccounts?.leetcode?.username,
            },
            withCredentials: true,
          }
        );

        setWinRate(res.data.winRate);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWinRate();
  }, [user]);

  return (
    <StatsCard
      icon={<Award size={28} />}
      iconColor="text-green-400"
      value={loading ? <LoadingIndicator/>: `${winRate}%`}
      label="Win Rate"
      gradient="from-emerald-600/40 via-emerald-500/20 to-transparent"
      border="border-emerald-500/40"
    />
  );
};

export default WinRate;
