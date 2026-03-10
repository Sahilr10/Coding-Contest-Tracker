import React from 'react'
import ConnectedAccountPlatform from './ConnectedAccountPlatform.jsx'
import { useDemo } from "../context/DemoContext.jsx";
import { demoRatingProgress } from "../Demo/demoData.js";

const ConnectedAccounts = ({user, fetchUser}) => {
  const { isDemo } = useDemo();

  const isConnected = isDemo
  ? true
  : !!user.connectedAccounts?.codeforces;

  return (
    <div className='grid grid-cols-1  gap-6 mt-6'>
      <ConnectedAccountPlatform platform="Codeforces"
    isConnected={!!user.connectedAccounts?.codeforces}
    refetchUser={fetchUser}/>
      <ConnectedAccountPlatform platform="LeetCode"
    isConnected={!!user.connectedAccounts?.leetcode}
    refetchUser={fetchUser}/>
    </div>
  )
}

export default ConnectedAccounts;
