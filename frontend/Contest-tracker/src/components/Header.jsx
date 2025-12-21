import { Trophy } from 'lucide-react'
import avatar from './../assets/avatar.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='w-full h-16 bg-gradient-to-r from-[#090f1d] via-[#0b1224] to-[#090f1d] border-b border-white/10'>
    <div className='max-w-7xl mx-auto h-full px-6 flex items-center justify-between'>
      <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white">
            <Trophy />
          </div>
          <div className="text-white font-semibold text-xl">
            Contestly
          </div>
        </div>

        {/* right profile */}
        <Link to="/profile" >
       <div 
       className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 transition-all duration-300 ease-in-out hover:border-purple-500 border-transition cursor-pointer ">
          <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
        </div>
        </Link>
    </div>
    </nav>
  )
}

export default Header
