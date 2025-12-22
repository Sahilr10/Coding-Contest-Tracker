import { useEffect, useState } from "react";
import axios from "axios";

const PlatformWiseParticipation = ({ user }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.connectedAccounts) return;

    const fetchTable = async () => {
      try {
        const codeforces =
          user.connectedAccounts?.codeforces?.username;
        const leetcode =
          user.connectedAccounts?.leetcode?.username;

        const res = await axios.get(
          "/users/platform-wise-table",
          {
            params: { codeforces, leetcode },
            withCredentials: true,
          }
        );

        setRows(res.data.data || []);
      } catch (err) {
        console.error("Platform table fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTable();
  }, [user]);

  return (
    <div
      className="
        w-full mt-8
        rounded-2xl
        bg-gradient-to-b from-[#0b1224] to-[#070b16]
        border border-white/10
        p-6
        shadow-xl
      "
    >
      {/* Title */}
      <h2 className="text-white text-lg font-semibold mb-4">
        Platform-wise Participation
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-white/80">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="py-3 font-medium">Platform</th>
              <th className="py-3 font-medium">Contests</th>
              <th className="py-3 font-medium">Avg. Rank</th>
              <th className="py-3 font-medium">Best Rank</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-white/50"
                >
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-white/50"
                >
                  No data available
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.platform}
                  className="
                    border-b border-white/5
                    hover:bg-white/5 transition
                  "
                >
                  {/* Platform */}
                  <td className="py-4 font-medium text-white">
                    {row.platform}
                  </td>

                  {/* Contests */}
                  <td className="py-4">
                    {row.contests}
                  </td>

                  {/* Avg Rank */}
                  <td className="py-4">
                    {row.avgRank
                      ? row.avgRank.toLocaleString()
                      : "—"}
                  </td>

                  {/* Best Rank */}
                  <td className="py-4 text-green-400 font-medium">
                    {row.bestRank
                      ? row.bestRank.toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlatformWiseParticipation;
