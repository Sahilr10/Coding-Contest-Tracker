// ContestReminders.jsx
import { Bell } from "lucide-react";
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

const ContestReminders = () => {
  const [oneHour, setOneHour] = useState(true);
  const [oneDay, setOneDay] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1224] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-purple-400" />
        <h3 className="text-lg font-medium text-white">
          Contest Reminders
        </h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-white/80">
          Send reminder 1 hour before contest
        </span>
        <Toggle
          enabled={oneHour}
          onChange={() => setOneHour(!oneHour)}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-white/80">
          Send reminder 24 hours before contest
        </span>
        <Toggle
          enabled={oneDay}
          onChange={() => setOneDay(!oneDay)}
        />
      </div>
    </div>
  );
};

export default ContestReminders;
