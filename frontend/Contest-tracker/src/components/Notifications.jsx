import React from 'react'
import ContestReminders from './ContestReminder'
import NotificationChannels from './NotificationChannels'
import PlatformPreferences from './PlatformPreferences'
import AdditionalSettings from './AdditionalSettings'

const Notifications = () => {
  return (
    <div className='my-8 space-y-6'>
      <ContestReminders/>
      <NotificationChannels />
      <PlatformPreferences />
      <AdditionalSettings />
    </div>
  )
}

export default Notifications
