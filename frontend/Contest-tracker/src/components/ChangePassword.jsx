import { useState } from "react";
import { Key } from "lucide-react";
import axios from "axios";

const ChangePassword = () => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!current || !newPass || !confirm) {
      setError("All fields are required");
      return;
    }

    if (newPass !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await axios.patch(
        "/users/change-password",
        {
          oldPassword: current,
          newPassword: newPass,
          confirmNewPassword: confirm,
        },
        { withCredentials: true }
      );

      setSuccess("Password changed successfully");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1224] p-6">
      <div className="flex items-center gap-2 mb-6">
        <Key className="text-purple-400" />
        <h3 className="text-lg font-semibold text-white">
          Change Password
        </h3>
      </div>

      <div className="space-y-4 max-w-lg">
        <Input
          label="Current Password"
          type="password"
          value={current}
          onChange={setCurrent}
        />
        <Input
          label="New Password"
          type="password"
          value={newPass}
          onChange={setNewPass}
        />
        <Input
          label="Confirm New Password"
          type="password"
          value={confirm}
          onChange={setConfirm}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && (
          <p className="text-green-400 text-sm">{success}</p>
        )}

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-4 px-6 py-2 text-white rounded-lg bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, type, value, onChange }) => (
  <div>
    <label className="block text-sm text-white/70 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-lg bg-[#1f2937] border border-white/10 focus:outline-none focus:border-white/30 text-white"
    />
  </div>
);

export default ChangePassword;
