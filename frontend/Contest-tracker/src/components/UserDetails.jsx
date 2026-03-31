import React, { useEffect, useState } from 'react'
import axios from 'axios'
import avatar from './../assets/avatar.svg'
import { Pencil, SquarePen, Mail, Calendar, MapPin } from 'lucide-react'
import { demoUser } from '../Demo/tempData'

const UserDetails = (props) => {
  const [user, setUser] = useState(props.user || demoUser)

  useEffect(() => {
    if (props.user) {
      setUser(props.user)
      return
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get('/users/me', {
          withCredentials: true,
        })
        if (res.data?.data) {
          setUser(res.data.data)
          return
        }
      } catch (err) {
        console.warn('Could not load API user, falling back to demo data', err)
      }

      setUser(demoUser)
    }

    fetchUser()
  }, [props.user])

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
          {user?.username || demoUser.username}
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
        {user?.email || demoUser.email} </span>
        <span className='flex gap-2 items-center'><MapPin size={15}/> India (UTC +5:30)</span>
        <span className='flex gap-2 items-center'><Calendar size={15}/> {`Member since ${new Date(user?.createdAt || demoUser.createdAt).toLocaleString("en-US", {
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
