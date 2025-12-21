import React from 'react'
import avatar from './../assets/avatar.svg'
import { Pencil, SquarePen, Mail, Calendar,MapPin } from 'lucide-react'

const UserDetails = (props) => {
  console.log(props)
  return (
    <div className="w-full min-h-[180px]
    bg-gradient-to-r from-[#090f1d] via-[#0b1224] to-[#090f1d]
    border border-white/10 rounded-2xl px-8">

  <div className="flex gap-6 items-center min-h-[180px]">
    
    {/* Avatar */}
    <img
      src={avatar}
      alt="User Avatar"
      className="w-20 h-20 rounded-full border border-white/20"
    />

    {/* User Info */}
    <div className="flex flex-col gap-2">
      
      {/* Name + Edit */}
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-medium text-white">
          {props.user.username}
        </h2>

        <button className="flex items-center gap-2 text-sm
          px-3 py-1 rounded-xl
          border border-white/20
          text-white/80 hover:text-white
          hover:bg-white/20 transition">
          <SquarePen size={20}/> Edit Profile
        </button>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap gap-4 text-white/60 text-sm">
        <span className='flex gap-2 items-center'><Mail size={15} /> 
        {props.user.email} </span>
        <span className='flex gap-2 items-center'><MapPin size={15}/> India (UTC +5:30)</span>
        <span className='flex gap-2 items-center'><Calendar size={15}/> {`Member since ${new Date(props.user.createdAt).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          })}`} </span>
      </div>

    </div>
  </div>
</div>

  )
}

export default UserDetails
