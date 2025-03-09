"use client";
import { useFriends } from '@/app/user/profile/FriendProvider';
import React, { useState } from 'react'
import FriendComp from './friendComp';

export let AddFriendsTyping, UnsetFriendTyping;

const ListChatsCLient = () => {
    const [friendsTyping, setFriendsTyping] = useState([])
    
    AddFriendsTyping = friendId => {
        setFriendsTyping([...friendsTyping, friendId])
    }

    UnsetFriendTyping = friendId => {
        setFriendsTyping(friendsTyping.filter(e => e != friendId))
    }
    
    const { mates } = useFriends();

    return (
        <>
            <div className="c-s-c w-3/12  bg-white drop-shadow-md rounded-2xl h-full max-w-xl p-4">
                <div className="w-full  r-b-c">
                    <span className="r-s-e">
                        <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M6.5 3h11c1.325 0 2.5 1 2.5 2.5c0 2 -1.705 3.264 -2 3.5l-4.5 4l2 -5h-9a2.5 2.5 0 0 1 0 -5z"></path> <path d="M17.5 21h-11c-1.325 0 -2.5 -1 -2.5 -2.5c0 -2 1.705 -3.264 2 -3.5l4.5 -4l-2 5h9a2.5 2.5 0 1 1 0 5z"></path> </svg>
                        <h1 className='font-bold text-xl ml-3'>Chats</h1>
                    </span>
                    <button>
                        <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M9 4v16"></path> <path d="M15 10l-2 2l2 2"></path> </svg>
                    </button>
                </div>
                <div className="w-full mt-8 rounded-3xl border r-s-c p-2">
                    <svg className='opacity-70  w-6 h-6 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg>
                    <input type="text" placeholder='Search' className='ml-4 border-none outline-none w-full' />
                </div>
                <div className="h-full w-full c-s-c mt-2 overflow-auto scrl_none">
                    {
                        mates.sort((a, b) => new Date(b.LastMessage?.sendAt) - new Date(a.LastMessage?.sendAt)).map((u, i) => <FriendComp data={u} key={i} friendsTyping={friendsTyping} />)
                    }
                </div>

            </div>

        </>
    )
}

export default ListChatsCLient
