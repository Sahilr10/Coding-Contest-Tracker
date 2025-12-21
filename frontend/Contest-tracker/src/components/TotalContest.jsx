import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import axios from "axios";

const TotalContests = ({user}) => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (!user?.codeforcesHandle) return;
    const fetchTotalContests = async () => {
      try {
        const res = await axios(`https://codeforces.com/api/user.rating?handle=${user.codeforcesHandle}`);
        setCount(res.result.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalContests();
  }, []);

  if (loading) {
    return <StatsCard label="Total Contests" loading />;
  }

  return (
    <StatsCard
      icon={<Trophy size={28} />}
      iconColor="text-purple-600"
      value={count}
      label="Total Contests"
      gradient="from-purple-600/40 via-purple-500/20 to-transparent"
      border="border-purple-500/40"
    />
  );
};

export default TotalContests;
