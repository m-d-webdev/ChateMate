"use client"
import React from 'react'
import Link from 'next/link'
import { useFriends } from '@/app/user/profile/FriendProvider'
const MeetMateLink = () => {
    const { matesReqs, thisUser } = useFriends();
    return (

        <Link href={"/Meetmates"} className="opacity-80 relative  mt-8 hover:opacity-100 c-c-c ">
            {
                matesReqs.filter(e => e.senderId != thisUser?._id).length > 0 &&
                <span className="w-5 h-5 text-xs  img c -c-c bg-red-500 text-white c-c-c left-0 -top-2 absolute ">
                    {matesReqs.filter(e => e.senderId != thisUser?._id).length}
                </span>

            }
            <svg className="mr-2 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> <path d="M16 19h6"></path> <path d="M19 16v6"></path> </svg>
            MeetMates
        </Link>
    )
}

export default MeetMateLink
