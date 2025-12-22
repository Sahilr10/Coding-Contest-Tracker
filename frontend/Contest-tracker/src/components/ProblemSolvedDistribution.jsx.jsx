import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  easy: "#10b981",   // green
  medium: "#f59e0b", // amber
  hard: "#ef4444",   // red
};

const ProblemsSolvedDistribution = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.connectedAccounts?.leetcode?.username) {
      setLoading(false);
      return;
    }

    const fetchSolved = async () => {
      try {
        const res = await axios.get("/users/problems-solved", {
          params: {
            leetcode: user.connectedAccounts.leetcode.username,
          },
          withCredentials: true,
        });

        const breakdown = res.data.breakdown || {
          easy: 0,
          medium: 0,
          hard: 0,
        };

        setData([
          { name: "Easy", value: breakdown.easy },
          { name: "Medium", value: breakdown.medium },
          { name: "Hard", value: breakdown.hard },
        ]);
      } catch (err) {
        console.error("Problems solved fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolved();
  }, [user]);

  /* =====================
     LOADING STATE
  ===================== */
  if (loading) {
    return (
      <div className="h-[320px] rounded-2xl bg-[#0b1224] border border-white/10 flex items-center justify-center text-white/60">
        Loading...
      </div>
    );
  }

  const totalSolved = data.reduce((sum, d) => sum + d.value, 0);

  /* =====================
     ZERO DATA STATE
  ===================== */
  if (totalSolved === 0) {
    return (
      <div className="h-[320px] rounded-2xl bg-[#0b1224] border border-white/10 flex items-center justify-center text-white/60">
        No problems solved yet
      </div>
    );
  }

  /* =====================
     CUSTOM TOOLTIP
  ===================== */
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const { name, value } = payload[0];

    return (
      <div className="bg-[#020617] border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-white/80">Solved: {value}</p>
      </div>
    );
  };

  /* =====================
     CHART RENDER
  ===================== */
  return (
    <div className="rounded-2xl bg-[#0b1224] border border-white/10 p-6 shadow-xl">
      <h3 className="text-white text-lg font-medium mb-4">
        Problems Solved Distribution
      </h3>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name.toLowerCase()]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="mt-6 flex justify-center gap-6 text-sm">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2"
            style={{ color: COLORS[item.name.toLowerCase()] }}
          >
            <span className="w-2 h-2 rounded-full bg-current" />
            {item.name}: {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemsSolvedDistribution;
