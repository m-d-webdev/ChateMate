import GetUser from '@/app/user/profile/GetUser'
import ChangeProfilePicture from '@/components/ChangeProfilePicture';
import CustomDialog from '@/components/CustomDialog'
import React from 'react'

export default async function page() {
  const user = await GetUser();

  

  return (
    <CustomDialog
      className={'w-6/12 max-w-xl c-c-c'}
    >

     <ChangeProfilePicture user={user} />
    </CustomDialog>
  )
}
