"use client";
import { useFriends } from '@/app/user/profile/FriendProvider';
import React from 'react'
import FriendComp from './friendComp';

const ListChatsCLient = () => {
    const { mates } = useFriends()

    return (
        <>
            <div className="w-full mt-8 rounded-3xl border r-s-c p-2">
                <svg className='opacity-70  w-6 h-6 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg>
                <input type="text" placeholder='Search' className='ml-4 border-none outline-none w-full' />
            </div>
            <div className="h-full w-full c-s-c mt-2 overflow-auto scrl_none">
                {
                    mates.map((u, i) => <FriendComp data={u} key={i} />)
                }
            </div>
        </>
    )
}

export default ListChatsCLient
