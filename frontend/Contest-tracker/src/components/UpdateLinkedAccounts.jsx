import { useState } from "react";
import axios from "axios";

const UpdateLinkedAccounts = ({ refetchUser }) => {
  const [leetcode, setLeetcode] = useState("");
  const [codeforces, setCodeforces] = useState("");
  const [codechef, setCodechef] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const connectPlatform = async (platform, username) => {
    return axios.post(
      "/users/connected-account",
      { platform, username },
      { withCredentials: true }
    );
  };

  const handleUpdate = async () => {
    setError("");
    setSuccess("");

    if (!leetcode && !codeforces && !codechef) {
      setError("Please enter at least one username");
      return;
    }

    try {
      setLoading(true);

      const requests = [];

      if (leetcode) {
        requests.push(connectPlatform("leetcode", leetcode));
      }

      if (codeforces) {
        requests.push(connectPlatform("codeforces", codeforces));
      }

      //  CodeChef (UI only – no backend yet)
      if (codechef) {
        console.warn("CodeChef connected (UI only)");
      }

      await Promise.all(requests);

      setSuccess("Accounts updated successfully");

      // refresh user data in parent
      if (refetchUser) refetchUser();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update one or more accounts"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1224] p-6">
      <h3 className="text-lg font-semibold text-white mb-6">
        Update Linked Accounts
      </h3>

      <div className="space-y-4 max-w-lg">
        <Input
          label="LeetCode Username"
          value={leetcode}
          onChange={setLeetcode}
        />
        <Input
          label="Codeforces Username"
          value={codeforces}
          onChange={setCodeforces}
        />
        <Input
          label="CodeChef Username (UI only)"
          value={codechef}
          onChange={setCodechef}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-4 px-6 py-2 text-white rounded-lg bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Accounts"}
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm text-white/70 mb-1">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-lg bg-[#1f2937] border border-white/10 focus:outline-none focus:border-white/30 text-white"
    />
  </div>
);

export default UpdateLinkedAccounts;
