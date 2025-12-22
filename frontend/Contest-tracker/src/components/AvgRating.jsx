import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "./StatsCard";

const AvgRating = ({ user }) => {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user?.connectedAccounts) {
      setLoading(false);
      return;
    }

    const fetchAvgRating = async () => {
      try {
        const res = await axios.get(
          "/users/average-rating",
          {
            params: {
              codeforces: user.connectedAccounts?.codeforces?.username,
              leetcode: user.connectedAccounts?.leetcode?.username,
            },
            withCredentials: true,
          }
        );

        if (res.data?.success) {
          setRating(res.data.averageRating);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Avg rating fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAvgRating();
  }, [user]);

  if (loading) {
    return <StatsCard label="Avg Rating" loading />;
  }

  if (error) {
    return (
      <StatsCard
        icon={<TrendingUp size={28} />}
        value="—"
        label="Avg Rating"
        border="border-red-500/40"
        gradient="from-red-600/40 via-red-500/20 to-transparent"
      />
    );
  }

  return (
    <StatsCard
      icon={<TrendingUp size={28} />}
      iconColor="text-blue-500"
      value={rating}
      label="Avg Rating"
      gradient="from-blue-600/40 via-blue-500/20 to-transparent"
      border="border-blue-500/40"
    />
  );
};

export default AvgRating;
