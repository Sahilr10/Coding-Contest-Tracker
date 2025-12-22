const LoadingIndicatior = () => {
  return (
    <div className="w-[60px] h-[3px] bg-[#0f0f0f] rounded-full overflow-hidden">
      <div className="mini-loader" />

      <style jsx>{`
        .mini-loader {
          height: 3px;
          background-color: rgb(107, 27, 255);
          border-radius: 9999px;
          animation: slide 0.9s infinite ease-in-out;
        }

        @keyframes slide {
          0% {
            width: 18px;
            transform: translateX(-25px);
          }
          50% {
            width: 30px;
            transform: translateX(15px);
          }
          100% {
            width: 18px;
            transform: translateX(70px);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingIndicatior;
