import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RatingProgressChart = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const codeforces = user.connectedAccounts?.codeforces?.username;
    const leetcode = user.connectedAccounts?.leetcode?.username;

    if (!codeforces && !leetcode) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get("/users/rating-progress", {
          params: { codeforces, leetcode },
          withCredentials: true,
        });

        const fullData = res.data?.data || [];

        // TAKE ONLY LAST 6 POINTS
        const lastSix = fullData.slice(-10);

        setData(lastSix);
      } catch (err) {
        console.error("Rating progress fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="h-[350px] flex items-center justify-center text-white/60">
        Loading rating progress...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-[350px] flex items-center justify-center text-white/60">
        No rating data available
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1224] p-6">
      <h3 className="text-lg font-medium text-white mb-4">
        Rating Progress (Last 10 Months)
      </h3>

      {/* 🔥 FIXED HEIGHT (NO MORE width(-1) error) */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="label" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatingProgressChart;
