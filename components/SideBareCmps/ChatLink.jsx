"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link';

import {UseAllChats } from '@/app/Chats/MessagesProvider';

const ChatLink = () => {
    const { ActiveMates, mates } = UseAllChats();

    const [countMsgsUnread, setcountMsgsUnread] = useState(0);


    useEffect(() => {

        setcountMsgsUnread(mates.reduce((c, m) => c + m.CountUnreadMessages, 0))

    }, [mates]);
    return (
        <Link className='c-c-c opacity-80 hover:opacity-100   relative' href={'/Chats'}>
            {
                countMsgsUnread > 0 &&
                <p className='absolute -top-3 -left-2 w-5 h-5 text-sm c-c-c rounded-full text-white bg-green-500'>
                    {countMsgsUnread}
                </p>
            }
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M6.5 3h11c1.325 0 2.5 1 2.5 2.5c0 2 -1.705 3.264 -2 3.5l-4.5 4l2 -5h-9a2.5 2.5 0 0 1 0 -5z"></path> <path d="M17.5 21h-11c-1.325 0 -2.5 -1 -2.5 -2.5c0 -2 1.705 -3.264 2 -3.5l4.5 -4l-2 5h9a2.5 2.5 0 1 1 0 5z"></path> </svg>
            Chats
        </Link>
    )
}

export default ChatLink
