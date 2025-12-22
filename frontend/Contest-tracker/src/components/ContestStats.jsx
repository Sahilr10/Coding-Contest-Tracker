import React from 'react'
import TotalContests from './TotalContest'
import WinRate from './WinRate'
import AvgRankChange from './AvgRankChange'
import BestPerformance from './BestPerformance'
import PlatformWiseParticipation from './PlatformWiseParticipation'

const ContestStats = ({user}) => {
  return (
    <div>
    <div className='grid grid-cols-4 gap-6 my-8'>
      <TotalContests user={user}/>
      <WinRate user={user}/>
      <AvgRankChange user={user} />
      <BestPerformance user={user} />
    </div>

    <div>
        <PlatformWiseParticipation user={user}/>
    </div>
    </div>
  )
}

export default ContestStats
