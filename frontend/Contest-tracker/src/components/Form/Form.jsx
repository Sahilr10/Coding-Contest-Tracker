import React from 'react';

const Form = ({ isRegister, formData, handleChange, handleSubmit, onToggleMode, onForgotPassword, error, loading }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="bg-white dark:bg-gray-800 p-8 m-4 rounded-[25px] max-w-md w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-center m-8 text-gray-900 dark:text-white text-lg" id="heading">
            {isRegister ? 'Sign Up' : 'Login'}
          </p>
          <div className="flex items-center justify-center gap-2 rounded-[25px] p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            {isRegister ? (
              <svg className="h-7 w-7 fill-gray-900 dark:fill-white" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
              </svg>
            ) : (
              <svg className="h-7 w-7 fill-gray-900 dark:fill-white" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
              </svg>
            )}
            <input
              autoComplete="off"
              placeholder={isRegister ? "Username" : "Email"}
              className="bg-[#171717] rounded-[25px] border-none outline-none w-full px-4 py-2 text-white placeholder-gray-400"
              type={isRegister ? "text" : "email"}
              name={isRegister ? "username" : "email"}
              value={formData[isRegister ? "username" : "email"]}
              onChange={handleChange}
              required
            />
          </div>
          {!isRegister && (
            <div className="flex items-center justify-center gap-2 rounded-[25px] p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              <svg className="h-7 w-7 fill-gray-900 dark:fill-white" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <input
                placeholder="Password"
                className="bg-[#171717] rounded-[25px] border-none outline-none w-full px-4 py-2 text-white placeholder-gray-400"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {isRegister && (
            <>
              <div className="flex items-center justify-center gap-2 rounded-[25px] p-3 border border-gray-300 dark:border-gray-600 ">
                <svg className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                </svg>
                <input
                  placeholder="Email"
                  className="bg-[#171717] rounded-[25px] border-none outline-none w-full px-4 py-2 text-white placeholder-gray-400"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center justify-center gap-2 rounded-[25px] p-3 border border-gray-300 dark:border-gray-600 ">
                <svg className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                <input
                  placeholder="Password"
                  className="bg-[#171717] rounded-[25px] border-none outline-none w-full px-4 py-2 text-white placeholder-gray-400"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          <div className="flex justify-center flex-row mt-10">
            <button
              className="p-2 px-6 rounded-md border-none outline-none bg-[#171717] text-white mr-2 hover:bg-black transition-colors duration-300"
              type="submit"
              disabled={loading}
            >
              {loading ? (isRegister ? 'Creating...' : 'Signing in...') : (isRegister ? 'Sign Up' : 'Login')}
            </button>
            <button
              className="p-2 px-6 rounded-md border-none outline-none bg-[#171717] text-white hover:bg-black transition-colors duration-300"
              type="button"
              onClick={onToggleMode}
            >
              {isRegister ? 'Login' : 'Sign Up'}
            </button>
          </div>
          <button
            className="mt-6 p-2 rounded-md border-none outline-none bg-[#171717] text-white hover:bg-red-600 transition-colors duration-300"
            type="button"
            onClick={onForgotPassword}
          >
            Forgot Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
