import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "./StatsCard";

const ProblemsSolved = ({ user }) => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const leetcodeUsername =
      user?.connectedAccounts?.leetcode?.username;

    if (!leetcodeUsername) {
      setLoading(false);
      return;
    }

    const fetchSolved = async () => {
      try {
        const res = await axios.get(
          "/users/problems-solved",
          {
            params: { leetcode: leetcodeUsername },
            withCredentials: true,
          }
        );

        setCount(res.data.totalSolved);
      } catch (err) {
        console.error("Error fetching problems solved", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolved();
  }, [user]);

  if (loading) {
    return <StatsCard label="Problems Solved" loading />;
  }

  return (
    <StatsCard
      icon={<Target size={28} />}
      iconColor="text-green-400"
      value={count ?? 0}
      label="Problems Solved"
      gradient="from-green-500/40 via-green-500/20 to-transparent"
      border="border-green-500/40"
    />
  );
};

export default ProblemsSolved;
