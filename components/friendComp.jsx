"use client";
import { motion } from 'framer-motion'
import { UseAllChats } from '@/app/Chats/MessagesProvider'
import { useFriends } from '@/app/user/profile/FriendProvider';
import { CorrectTime } from '@/utilityfunctions'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



const FriendComp = ({ data, friendsTyping, OpenAll }) => {
    const { thisUser, ActiveMates } = useFriends()
    const { allChats } = UseAllChats()
    const [LastMessage, setLastMessage] = useState(data.LastMessage);

    useEffect(() => {
        setLastMessage(allChats[data.chat_id]?.filter((a, i) => i == allChats[data.chat_id]?.length - 1)[0] || data.LastMessage)
    }, [allChats[data.chat_id]]);

    return (
        <>
            {
                OpenAll ?
                    <Link href={'/Chats/' + data.chat_id} className={`w-full cursor-pointer hover:bg-gray-50 mb-4 p-3 rounded-xl bg-white drop-shadow-sm r-b-s border ${ActiveMates?.includes(data.mate._id) ? "friendActive" : ""}`}>
                        <div className="r-s-s w-10/12">
                            <div className="c-c-c relative">

                                {
                                    data.CountUnreadMessages > 0 &&
                                    <motion.p initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: .1 } }} className="absolute -top-2 c-c-c text-center -left-2  w-5 h-5 img text-white  bg-green-500 text-xs">{data.CountUnreadMessages}</motion.p>
                                }

                                <img
                                    src={data.mate.pic}
                                    alt='userimage'
                                    className='rounded-full img w-10 h-10 min-w-10'
                                />

                            </div>
                            <div className="c-b-s h-full ml-2 w-10/12   overflow-hidden">

                                <h1 className="opacity-70 text-sm   text-ellipsis  truncate w-full" style={{ display: "inline-block", textWrap: "nowrap" }}>
                                    {data.mate.fullName}
                                </h1>
                                {
                                    friendsTyping?.includes(data.mate._id) ?
                                        <div className="truncate r-s-c w-full  mt-1 text-sm  opacity-80 text-blue-500">typing <div className="dots ml-1"></div> </div>
                                        :
                                        <>
                                            {
                                                LastMessage ?

                                                    <>
                                                        <p className="truncate overflow-hidden w-full max-w-full text-sm mt-1">
                                                            {
                                                                LastMessage?.senderId == thisUser?._id &&
                                                                <span className="opacity-70 text-xs">You : </span>
                                                            }

                                                            {
                                                                LastMessage?.type == "text" ?
                                                                    LastMessage?.content
                                                                    :
                                                                    LastMessage?.type
                                                            }
                                                        </p>
                                                    </>
                                                    :
                                                    <>
                                                        <p className="opacity-70 text-blue-500 truncate overflow-hidden w-full max-w-full text-sm mt-1">Start chatting with {data.mate.fullName} now</p>
                                                    </>
                                            }
                                        </>

                                }
                            </div>
                        </div>
                        <div className="w-2/12">

                            {

                                LastMessage &&

                                <h2 className='truncate font-semibold text-xs opacity-60'>{CorrectTime(LastMessage?.sendAt)}</h2>

                            }

                        </div>
                    </Link>
                    :
                    <Link href={'/Chats/' + data.chat_id} className={`w-full cursor-pointer  hover:bg-gray-50 mb-4 p-2 rounded-full bg-white  c-c-c border ${ActiveMates?.includes(data.mate._id) ? "friendActive" : ""}`}>
                        <div className="c-c-c relative">
                            {   
                                data.CountUnreadMessages > 0 &&
                                <motion.p initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: .1 } }} className="absolute -top-2 c-c-c text-center -left-2  w-5 h-5 img text-white  bg-green-500 text-xs">{data.CountUnreadMessages}</motion.p>
                            }

                            <img
                                src={data.mate.pic}
                                alt='userimage'
                                className='rounded-full img w-12 h-12 min-w-12'
                            />

                        </div>

                    </Link>

            }

        </>

    )
}

export default FriendComp
