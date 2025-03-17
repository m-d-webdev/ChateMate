'use client';
import { useFriends } from '@/app/user/profile/FriendProvider';
import BtnAcceptMate from '@/components/usersCmps/BtnAcceptMate';
import BtnCancelReq from '@/components/usersCmps/BtnCancelReq';
import { api } from '@/utilityfunctions';
import Link from 'next/link';
import React, { useState } from 'react'


const OneReqMate = ({ mate }) => {
    const data = mate.mate;

    return (
        <div className='w-full r-b-c p-1 mb-4'>

            <Link href={`/mates/${data.userName}`} className="r-s-s">
                <img src={data.pic} alt="" className="w-8 h-8 img" />
                <div className="c-s-s ml-2">
                    <p className='truncate text-sm'>{data.fullName}</p>
                    <p className='truncate text-xs opacity-80'>{data.userName}</p>
                </div>
            </Link>

            {
                mate.isFromeMe ?
                    <BtnCancelReq req_id={mate._id} />
                    :

                    <BtnAcceptMate mate={data} userId={data._id} />
            }
        </div>
    )
}

const ListRequests = () => {
    const { thisUser, matesReqs } = useFriends();

    const [isWantSent, setisWantSent] = useState(false)


    return (

        <div className='h-full  c-s-s w-full mt-8'>
            <h1 className='mb-4 opacity-80'>Chat requests </h1>
            <div className="w-full r-p-c">
                <button className='opacity-70 hover:opacity-100 r-c-c  px-1 text-sm  border border-gray-400 w-5/12 rounded-2xl font-medium' onClick={() => setisWantSent(false)}>
                    Received
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 5l0 14"></path> <path d="M16 15l-4 4"></path> <path d="M8 15l4 4"></path> </svg>
                </button>
                <button className='opacity-70 hover:opacity-100 r-c-c  px-1 text-sm  border border-gray-400 w-5/12 rounded-2xl font-medium' onClick={() => setisWantSent(true)}>
                    Sent
                    <svg className='rotate-180' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 5l0 14"></path> <path d="M16 15l-4 4"></path> <path d="M8 15l4 4"></path> </svg>
                </button>
            </div>
            <div className="max-h-full mt-8 w-full overflow-auto scrl_none">
                {

                    matesReqs.filter(f => isWantSent ? f.senderId == thisUser._id : f.senderId != thisUser._id).length == 0 &&
                    
                    <>
                        <h1 className="opacity-80 text-center w-full">
                            You have no chat request yet 
                        </h1>
                    </>

                }
                {
                    matesReqs.filter(f => isWantSent ? f.senderId == thisUser._id : f.senderId != thisUser._id).map(f => {
                        f.isFromeMe = f.senderId == thisUser._id;
                        return <OneReqMate mate={f} key={f._id} />
                    })
                }
            </div>
        </div>
    )
}

export default ListRequests
