const Loader = ({ className = "" }) => {
  return (
    <div className={`relative w-20 h-20 ${className}`}>
      <span className="absolute top-[33px] left-2 w-3 h-3 rounded-full bg-[#c517f0] animate-flip1" />
      <span className="absolute top-[33px] left-2 w-3 h-3 rounded-full bg-[#c517f0] animate-flip2" />
      <span className="absolute top-[33px] left-8 w-3 h-3 rounded-full bg-[#c517f0] animate-flip2" />
      <span className="absolute top-[33px] left-14 w-3 h-3 rounded-full bg-[#c517f0] animate-flip3" />
    </div>
  );
};

export default Loader;
