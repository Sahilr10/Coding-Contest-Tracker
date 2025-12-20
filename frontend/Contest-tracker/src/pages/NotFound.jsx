import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-gradient-to-br from-[#000428] via-[#004e92] to-[#000428]
        bg-[length:600%_600%]
        animate-gradient
      "
    >
      <div className="w-full max-w-xl text-center text-white border-2 border-white rounded-lg p-6">
        <h1 className="text-[150px] font-extrabold leading-none">404</h1>

        <h2 className="text-2xl font-semibold mt-2">
          Oops, Page not found!
        </h2>

        <p className="mt-4 text-white/90">
          The page you’re looking for was not found (it may have been moved,
          deleted, or doesn’t exist). Sorry for the inconvenience.
        </p>

        <p className="mt-2 text-white/80">
          If you think this is an error or something is broken, click report.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="
              px-5 py-2 rounded-lg border-2 border-white
              text-white font-medium
              hover:bg-white hover:text-[#000428]
              transition
            "
          >
            Go Back
          </button>

          <button
            onClick={() => alert("Report submitted")}
            className="
              px-5 py-2 rounded-lg border-2 border-white
              bg-white text-[#000428] font-medium
              hover:bg-gray-300 hover:border-gray-300
              transition
            "
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
