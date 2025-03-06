"use client";
import { api } from '@/utilityfunctions';
import React, { useState } from 'react'
import Spinner from './loaders/Spinner';
import { useFriends } from '@/app/user/profile/FriendProvider';

const BtnAcceptMate = ({ userId }) => {
  const [isLoading, setLoading] = useState(false);
  const {  setMates, matesReqs, setMatesReqs } = useFriends()

  const sendAcceptMate = async () => {
    setLoading(true);
    let res = await api.post('/meetMates/accept', { mateId: userId })
    if (res.status == 200) {
      setMatesReqs(matesReqs.filter(e => e.senderId == userId))
      setMates(pv => [...pv, res.data])
    }

    setLoading(false);
  };

  return (
    <>

      <button onClick={sendAcceptMate} className=' border rounded-3xl border-gray-600 opacity-80 hover:opacity-100  p-1 px-4 font-bold r-c-c'>
        {
          isLoading ?
            <Spinner />
            :
            <>
              Accept request
              <svg className='ml-2 stroke-black stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M20.925 13.163a8.998 8.998 0 0 0 -8.925 -10.163a9 9 0 0 0 0 18"></path> <path d="M9 10h.01"></path> <path d="M15 10h.01"></path> <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1"></path> <path d="M15 19l2 2l4 -4"></path> </svg>

            </>
        }
      </button>
    </>
  )
}

export default BtnAcceptMate
