"use client";
import { api } from '@/utilityfunctions';
import React, { useState } from 'react'
import Spinner from './loaders/Spinner';
import { useFriends } from '@/app/user/profile/FriendProvider';
import BtnOpenChat from './BtnOpenChat';
import BtnAcceptMate from './BtnAcceptMate';

const SayHiBTN = ({ mate }) => {

  const [isLoading, setLoading] = useState(false);
  const { mates, setMates, matesReqs, setMatesReqs, thisUser } = useFriends()
  console.log(mates);

  const sendSayHeight = async () => {
    setLoading(true);
    let res = await api.post('/meetMates/new', { mateId: mate._id })
    console.log(res);
    setMatesReqs(pv => [...pv, res.data]);
    setLoading(false);
  };



  return (
    <>


      {
        mates.some(m => m.mate?._id == mate._id) &&
        <span className='opacity-80 r-c-c'>
          In your contact
          <svg className='ml-2' xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={32} height={32}  strokeWidth={1}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path> <path d="M15 19l2 2l4 -4"></path> </svg> 
        </span>
      }
      {
        matesReqs.some(m => m.to == mate._id && m.type == "direct") &&
        <div className='w-full r-e-c'>
          <p className='mr-2 opacity-80'>Request sent </p>
          <BtnOpenChat userName={mate.userName} />
        </div>
      }
      {
        matesReqs.some(m => m.to == thisUser._id && m.senderId == mate._id) &&
        <div className='w-full  c-e-e'>
          <p className='mb-2 opacity-80'>You received a chat request from this person</p>
          <BtnAcceptMate userId={mate._id} mate={mate} />
        </div>
      }
      {
        !matesReqs.some(m => m.to == thisUser._id && m.senderId == mate._id) &&
        !matesReqs.some(m => m.to == mate._id && m.type == "direct") &&
        !mates.some(m => m.mate._id == mate._id) &&

        <button onClick={sendSayHeight} className=' border rounded-3xl border-gray-600 opacity-80 hover:opacity-100  p-1 px-4 font-bold r-c-c'>
          {
            isLoading ?
              <Spinner />
              :
              <>
                say hello
                <svg className='ml-2 fill-black stroke-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m430-500 283-283q12-12 28-12t28 12q12 12 12 28t-12 28L487-444l-57-56Zm99 99 254-255q12-12 28.5-12t28.5 12q12 12 12 28.5T840-599L586-345l-57-56ZM211-211q-91-91-91-219t91-219l120-120 59 59q7 7 12 14.5t10 15.5l148-149q12-12 28.5-12t28.5 12q12 12 12 28.5T617-772L444-599l-85 84 19 19q46 46 44 110t-49 111l-57-56q23-23 25.5-54.5T321-440l-47-46q-12-12-12-28.5t12-28.5l57-56q12-12 12-28.5T331-656l-64 64q-68 68-68 162.5T267-267q68 68 163 68t163-68l239-240q12-12 28.5-12t28.5 12q12 12 12 28.5T889-450L649-211q-91 91-219 91t-219-91Zm219-219ZM680-39v-81q66 0 113-47t47-113h81q0 100-70.5 170.5T680-39ZM39-680q0-100 70.5-170.5T280-921v81q-66 0-113 47t-47 113H39Z" /></svg>
              </>
          }
        </button>
      }
    </>
  )
}

export default SayHiBTN
