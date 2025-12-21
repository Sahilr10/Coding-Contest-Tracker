import React from 'react'
import TotalContests from './TotalContest'

const Overview = ({user}) => {
  return (
    <div className='grid grid-cols-4 gap-6 my-8 '>
      <TotalContests user={user} />
      <TotalContests />
      <TotalContests />
      <TotalContests />
    </div>
  )
}

export default Overview
