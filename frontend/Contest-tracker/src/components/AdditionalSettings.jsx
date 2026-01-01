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

const AdditionalSettings = () => {
  const [settings, setSettings] = useState({
    dailyPractice: true,
    newContest: false,
    ratingChange: true,
  });

  const toggle = (key) =>
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1224] p-6">
      <h3 className="text-lg font-medium text-white mb-6">
        Additional Settings
      </h3>

      <div className="flex justify-between items-center mb-5">
        <span className="text-white/80">
          Daily practice reminder
        </span>
        <Toggle
          enabled={settings.dailyPractice}
          onChange={() => toggle("dailyPractice")}
        />
      </div>

      <div className="flex justify-between items-center mb-5">
        <span className="text-white/80">
          Notify when new contest is posted
        </span>
        <Toggle
          enabled={settings.newContest}
          onChange={() => toggle("newContest")}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-white/80">
          Notify on rating change
        </span>
        <Toggle
          enabled={settings.ratingChange}
          onChange={() => toggle("ratingChange")}
        />
      </div>
    </div>
  );
};

export default AdditionalSettings;
