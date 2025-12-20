

import React from 'react'
import NextContestSection from '../components/NextContestSection.jsx'
import ContestCard from '../components/ContestCard.jsx'
import ContestContext from '../context/ContestContext.js'
import Calendar from '../components/Calendar.jsx'
import { useContext } from 'react'
import Loader from '../components/Loader.jsx'
import WeeklySchedule from '../components/WeeklySchedule.jsx'

const Home = () => {

  const { contests, loading, error } = useContext(ContestContext);

  if (loading) return <div className="flex items-center justify-center translate-x-0 translate-y-0 min-h-screen w-full"><Loader className="scale-150" /></div>;
  if (error) return <p className="text-red-400">{error}</p>;


  return (
    <div className='max-w-[80vw] mx-auto min-h-full no-scrollbar'>
      <div className="text-2xl mx-auto text-white mb-5 pt-8">
        Next Contest
      </div>

      <div className="flex justify-center mb-5">
          <NextContestSection contests={contests}/>
      </div>
      
      <div className="text-2xl mx-auto text-white mb-5">
        Upcoming Contest
      </div>

      <div className='grid grid-cols-3 gap-6'>
         {contests.slice(1, 7).map((contest) => (
          <ContestCard key={contest.url} contest={contest} />
        ))}
      </div>

      <div className="text-2xl mx-auto text-white my-5">
        Contest Calendar
      </div>
      
      <div className='flex justify-center'>
        <Calendar contests={contests}/>
      </div>

      <div className="text-2xl mx-auto text-white my-5">
        Weekly Contest Schedule
      </div>

      <div className='my-5'>
        <WeeklySchedule contests={contests}/>
      </div>

    </div>
  )
}

export default Home
