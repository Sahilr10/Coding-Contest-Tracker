import React, { useState } from "react";
import axios from "axios";
import { ExternalLink, Plus, X } from "lucide-react";
import {
  getPlatformGradient,
  getPlatformBorderClass,
} from "../utils/contestHelpers.js";

const ConnectedAccountPlatform = ({
  platform,
  isConnected = false,
  refetchUser
}) => {
  const gradientClass = getPlatformGradient(platform);
  const borderClass = getPlatformBorderClass(platform);

  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 VERY IMPORTANT (JWT cookie)
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "/api/v1";

  const handleConnect = async () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post("/users/connected-account", {
        platform,
        username,
      });

      setShowModal(false);
      setUsername("");
      // 👉 optionally refetch user data here
      refetchUser();

    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to connect account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <div
        className={`
          min-h-[120px] rounded-2xl p-6
          border ${borderClass}
          bg-gradient-to-br ${gradientClass}
          shadow-xl
          flex items-center justify-between
        `}
      >
        {/* LEFT */}
        <div className="flex flex-col gap-2 text-white">
          <div className="text-xl font-medium">{platform}</div>
          {!isConnected && (
            <span className="text-white/60 text-sm">
              Not connected
            </span>
          )}
        </div>

        {/* RIGHT */}
        {!isConnected ? (
          <button
            onClick={() => setShowModal(true)}
            className="
              flex items-center gap-2
              px-4 py-2 rounded-lg
              bg-white/10 hover:bg-white hover:text-black
              text-white text-sm transition
            "
          >
            <Plus size={16} />
            Connect Account
          </button>
        ) : (
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 text-white">
            <ExternalLink size={16} />
            View Profile
          </button>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-2xl bg-[#0b1224] border border-white/10 p-6 text-white shadow-xl">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Connect {platform}
              </h3>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            {/* Input */}
            <label className="text-sm text-white/60">
              {platform} Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`Enter ${platform} username`}
              className="
                w-full mt-2 px-4 py-2 rounded-lg
                bg-[#121826] border border-white/10
                focus:outline-none focus:border-white/30
              "
            />

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm mt-2">
                {error}
              </p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                disabled={loading}
                className="
                  px-4 py-2 rounded-lg
                  bg-purple-600 hover:bg-purple-700
                  transition
                  disabled:opacity-50
                "
              >
                {loading ? "Connecting..." : "Connect"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ConnectedAccountPlatform;
