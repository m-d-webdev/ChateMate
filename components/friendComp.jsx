"use client";
import { UseAllChats } from '@/app/Chats/MessagesProvider'
import { CorrectTime } from '@/utilityfunctions'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const FriendComp = ({ data }) => {
    const { allChats } = UseAllChats()
    const [LastMessage, setLastMessage] = useState(allChats[data.chat_id]?.filter((a, i) => i == allChats[data.chat_id]?.length - 1)[0] || null);
    useEffect(() => {
        setLastMessage(allChats[data.chat_id]?.filter((a, i) => i == allChats[data.chat_id]?.length - 1)[0])
    }, [allChats[data.chat_id]])

    return (
        <Link href={'/Chats/' + data.chat_id} className='w-full cursor-pointer hover:bg-gray-50 mb-4 p-3 rounded-xl bg-white drop-shadow-sm r-b-s border'>

            <div className="r-s-s w-full">
                <img
                    src={data.mate.pic}
                    alt='userimage'
                    className='rounded-full img w-10 h-10 min-w-10'
                />
                <div className="c-s-s ml-2 w-8/12">

                    <h1 className="opacity-70 text-sm   text-ellipsis  truncate w-full" style={{ display: "inline-block", textWrap: "nowrap" }}>
                        {data.mate.fullName}
                    </h1>

                    <p className="truncate w-full text-sm mt-1">{LastMessage?.content}</p>
                </div>
            </div>
            <div className="">

                {

                    LastMessage &&

                    <h2 className='truncate font-semibold text-xs opacity-60'>{CorrectTime(LastMessage?.sendAt)}</h2>
                    
                }

            </div>
        </Link>
    )
}

export default FriendComp
