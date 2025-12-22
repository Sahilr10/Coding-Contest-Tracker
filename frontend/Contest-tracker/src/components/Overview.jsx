import React from 'react'
import TotalContests from './TotalContest'
import AvgRating from './AvgRating'
import ProblemsSolved from './ProblemsSolved'
import BadgesEarned from './BadgesEarned'

const Overview = ({user}) => {
  return (
    <div className='grid grid-cols-4 gap-6 my-8 '>
      <TotalContests user={user} />
      <AvgRating user={user}/>
      <ProblemsSolved user={user} />
      <BadgesEarned user={user} />
    </div>
  )
}

export default Overview
