import React from 'react'
import RatingProgressChart from './RatingProgressChart'
import ProblemsSolvedDistribution from './ProblemSolvedDistribution.jsx'
import PlatformContestParticipation from './PlatformContestParticipation.jsx'

const Analytics = ({user}) => {
  return (
    <div>
        <div className='my-8'>
            <RatingProgressChart user={user}/>
        </div>

        <div className='grid grid-cols-2 gap-6 mb-8'>
            <ProblemsSolvedDistribution user={user}/>
            <PlatformContestParticipation user={user}/>
        </div>
    </div>
  )
}

export default Analytics
