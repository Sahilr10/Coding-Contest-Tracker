const StatsCard = ({ icon,iconColor, value, label, gradient, border }) => {
  return (
    <div
      className={`
        rounded-2xl p-6 min-h-[200px]
        bg-[#121826]
        bg-gradient-to-br ${gradient}
        border ${border}
        flex flex-col justify-between
        shadow-xl
      `}
    >
      <div className={`${iconColor}`}>{icon}</div>

      <div>
        <div className="text-4xl font-medium text-white">
          {value}
        </div>
        <div className="text-white/70 mt-2">
          {label}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
