import React from 'react'
import ChangePassword from './ChangePassword'
import ThemeSettings from './ThemeSettings'
import UpdateLinkedAccounts from './UpdateLinkedAccounts'

const Settings = () => {
  return (
    <div className='my-8 space-y-6'>
      <ChangePassword />
      <ThemeSettings />
      <UpdateLinkedAccounts />
    </div>
  )
}

export default Settings
