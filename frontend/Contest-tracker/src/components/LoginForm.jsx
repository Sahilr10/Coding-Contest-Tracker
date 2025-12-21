import { User, Lock } from "lucide-react";

const LoginForm = ({
  formData,
  handleChange,
  handleSubmit,
  onSignup,
  onForgotPassword,
  loading,
  error,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <form
        onSubmit={handleSubmit}
        className="
          w-[340px]
          bg-[#0b1224]
          rounded-3xl
          px-8 pt-8 pb-6
          flex flex-col gap-4
          shadow-xl
          transition-transform duration-300
          hover:scale-105
          border border-white/10
        "
      >
        {/* Heading */}
        <h2 className="text-center text-xl font-semibold text-white mb-4">
          Login
        </h2>

        {/* Email */}
        <div className="
          flex items-center gap-3
          bg-[#050814]
          px-4 py-3
          rounded-full
          shadow-inner
        ">
          <User size={18} className="text-white/70" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="
              bg-transparent w-full
              outline-none
              text-white placeholder:text-white/50
            "
            required
          />
        </div>

        {/* Password */}
        <div className="
          flex items-center gap-3
          bg-[#050814]
          px-4 py-3
          rounded-full
          shadow-inner
        ">
          <Lock size={18} className="text-white/70" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
              bg-transparent w-full
              outline-none
              text-white placeholder:text-white/50
            "
            required
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="
              px-6 py-2 rounded-lg
              bg-purple-600
              hover:bg-purple-700
              text-white font-medium
              transition disabled:opacity-50
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={onSignup}
            className="
              px-6 py-2 rounded-lg
              bg-white/10
              hover:bg-white/20
              text-white
              transition
            "
          >
            Sign Up
          </button>
        </div>

        {/* Forgot password */}
        <button
          type="button"
          onClick={onForgotPassword}
          className="
            mt-6 text-sm
            bg-white/10
            hover:bg-red-600
            transition
            text-white py-2 rounded-lg
          "
        >
          Forgot Password
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
