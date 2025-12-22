import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const PlatformContestParticipation = ({ user }) => {
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

    const fetchTable = async () => {
      try {
        const res = await axios.get(
          "/users/platform-wise-table",
          {
            params: { codeforces, leetcode },
            withCredentials: true,
          }
        );

        // 🔑MAP ONLY REQUIRED FIELDS
        const formatted = (res.data?.data || []).map((row) => ({
          platform: row.platform,
          contests: row.contests,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Platform chart error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTable();
  }, [user]);

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center text-white/60">
        Loading participation...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="h-[300px] flex items-center justify-center text-white/60">
        No participation data
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1224] p-6">
      <h3 className="text-lg font-medium text-white mb-4">
        Platform Contest Participation
      </h3>

      {/* IMPORTANT: fixed height */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f2937"
            />
            <XAxis
              dataKey="platform"
              stroke="#9ca3af"
            />
            <YAxis
              stroke="#9ca3af"
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.08)" }}
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [`${value}`, "contests"]}
            />
            <Bar
              dataKey="contests"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlatformContestParticipation;
