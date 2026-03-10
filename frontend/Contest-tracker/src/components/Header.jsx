import { Trophy } from 'lucide-react'
import avatar from './../assets/avatar.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useDemo } from '../context/DemoContext.jsx'

const Header = () => {
  const { isDemo, setIsDemo } = useDemo();
  const navigate = useNavigate();

  const handleDemoToggle = () => {
    if (isDemo) {
      // Exit demo
      setIsDemo(false);
      navigate("/login");
    } else {
      // Enter demo
      setIsDemo(true);
      navigate("/profile");
    }
  };

  return (
    <nav className='w-full h-16 bg-gradient-to-r from-[#090f1d] via-[#0b1224] to-[#090f1d] border-b border-white/10'>
      <div className='max-w-7xl mx-auto h-full px-6 flex items-center justify-between'>
        
        {/* LEFT LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white">
            <Trophy />
          </div>
          <div className="text-white font-semibold text-xl">
            <Link to="/">Contestly</Link>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {/* DEMO MODE BUTTON */}
          <button
            onClick={handleDemoToggle}
            className={`
              px-4 py-1.5 rounded-lg text-sm font-medium transition
              ${isDemo 
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-purple-600/20 text-purple-400 hover:bg-purple-600/30"
              }
            `}
          >
            {isDemo ? "Exit Demo" : "Try Demo"}
          </button>

          {/* PROFILE AVATAR */}
          <Link to="/profile">
            <div 
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 transition-all duration-300 ease-in-out hover:border-purple-500 cursor-pointer"
            >
              <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Header;
