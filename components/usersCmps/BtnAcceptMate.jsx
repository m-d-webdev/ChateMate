"use client";
import { api } from '@/utilityfunctions';
import React, { useState } from 'react'
import Spinner from '../loaders/Spinner';
import { useFriends } from '@/app/user/profile/FriendProvider';
import { UseAllChats } from '@/app/Chats/MessagesProvider';
import { GetSocket } from '@/config/socket';

const BtnAcceptMate = ({ userId, mate }) => {
  const [isLoading, setLoading] = useState(false);
  const { setMatesReqs, matesReqs, thisUser } = useFriends();
  const { setMates } = UseAllChats()

  const sendAcceptMate = async () => {
    setLoading(true);
    let res = await api.post('/meetMates/accept', { mateId: userId })
    const socket = GetSocket()
    if (res.status == 200) {
      setMatesReqs(matesReqs.filter(e => e.senderId != userId))

      setMates(pv => [...pv, { chat_id: res.data.chat_id, mate, lastMessages: {} }])
      if (socket) {
        socket.emit("friendAcceptReq", { data: { chat_id: res.data.chat_id, mate: thisUser, lastMessages: {} }, SocketTO: userId })
      }
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
              Accept
              <svg className='ml-2 stroke-black stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M20.925 13.163a8.998 8.998 0 0 0 -8.925 -10.163a9 9 0 0 0 0 18"></path> <path d="M9 10h.01"></path> <path d="M15 10h.01"></path> <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1"></path> <path d="M15 19l2 2l4 -4"></path> </svg>

            </>
        }
      </button>
    </>
  )
}

export default BtnAcceptMate
