import { useState } from "react";
import { Palette } from "lucide-react";

const ThemeSettings = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1224] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="text-blue-400" />
        <h3 className="text-lg font-semibold text-white">
          Theme Settings
        </h3>
      </div>

      <Toggle
        label="Dark Mode"
        checked={darkMode}
        onChange={setDarkMode}
      />
    </div>
  );
};

const Toggle = ({ label, checked, onChange }) => (
  <div className="flex justify-between items-center">
    <span className="text-white/80">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition relative ${
        checked ? "bg-purple-600" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
          checked ? "right-1" : "left-1"
        }`}
      />
    </button>
  </div>
);

export default ThemeSettings;
