"use client";
import React from 'react'
import Image from 'next/image';
import { UseAllChats } from '@/app/Chats/MessagesProvider';
import Link from 'next/link';

const ChatHead = ({ data, isFocusedUserTyping }) => {
    const { ActiveMates } = UseAllChats()
    return (
        <div className=" bg-white drop-shadow rounded-3xl p-2 r-b-c w-full">
            <Link href={"//mates/"} className="r-s-s">
                <img
                    src={data?.pic}
                    alt='userImage'
                    className='img w-12 h-12'
                />

                <div className="r-s-s ml-4 mt-2">
                    <div className="c-s-s">
                        <h1 className='text-base'>{data?.fullName}</h1>
                        {
                            isFocusedUserTyping &&
                            <div className=" r-s-c w-full  text-xs  opacity-80 text-blue-500">typing <div className="dots ml-1"></div> </div>
                        }
                    </div>
                    {
                        ActiveMates?.includes(data?._id) &&
                        <span className="r-s-s text-green-500 text-sm ml-4">
                            <div className="w-2 h-2 mr-2 rounded-full bg-green-500"></div>
                            On line
                        </span>
                    }
                </div>

            </Link>

            <button className='border p-1  rounded-xl bg-white drop-shadow-sm'>
                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M14 4h6v6h-6z"></path> <path d="M4 14h6v6h-6z"></path> <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> </svg>
            </button>
        </div>
    )
}

export default ChatHead
