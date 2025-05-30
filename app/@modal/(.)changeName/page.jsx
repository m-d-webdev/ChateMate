import GetUser from '@/app/user/profile/GetUser'
import ChangeName from '@/components/ChangeName';
import CustomDialog from '@/components/CustomDialog'
import React from 'react'

export default async function page() {
  const user = await GetUser();

  

  return (
    <CustomDialog
      className={'w-6/12 max-w-xl c-s-s'}
    >
     <ChangeName user={user} />
    </CustomDialog>
  )
}
