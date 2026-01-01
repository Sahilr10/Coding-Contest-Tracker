// PlatformPreferences.jsx
import { useState } from "react";

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 rounded-full transition relative ${
      enabled ? "bg-purple-600" : "bg-white/20"
    }`}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
        enabled ? "right-0.5" : "left-0.5"
      }`}
    />
  </button>
);

const PlatformPreferences = () => {
  const [platforms, setPlatforms] = useState({
    codeforces: true,
    leetcode: true,
    codechef: false,
  });

  const toggle = (key) =>
    setPlatforms({ ...platforms, [key]: !platforms[key] });

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1224] p-6">
      <h3 className="text-lg font-medium text-white mb-4">
        Platform Preferences
      </h3>

      <p className="text-white/60 mb-4">
        Get notified only for selected platforms
      </p>

      {Object.entries(platforms).map(([key, value]) => (
        <div
          key={key}
          className="flex justify-between items-center mb-3"
        >
          <span className="capitalize text-white/80">{key}</span>
          <Toggle enabled={value} onChange={() => toggle(key)} />
        </div>
      ))}
    </div>
  );
};

export default PlatformPreferences;
