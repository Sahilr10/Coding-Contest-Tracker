const StatsCard = ({
  icon,
  iconColor,
  value,
  label,
  gradient,
  border,
  loading = false,
  loader = null
}) => {
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
      {/* Icon */}
      <div className={iconColor}>{icon}</div>

      {/* Value / Loader */}
      <div>
        <div className="text-4xl font-medium text-white min-h-[40px] flex items-center">
          {loading ? loader : value}
        </div>

        <div className="text-white/70 mt-2">
          {label}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
