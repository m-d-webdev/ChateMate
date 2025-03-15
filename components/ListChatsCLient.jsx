"use client";
import React, { useEffect, useState } from 'react'
import FriendComp from './friendComp';
import { UseAllChats } from '@/app/Chats/MessagesProvider';
import { getGlobalForcuedMate } from '@/app/Chats/[id]/layout';
import SliderListFriend from './SliderListFriend';
import Cookies from 'js-cookie';

export let AddFriendsTyping, UnsetFriendTyping;

const ListChatsCLient = () => {
    const [friendsTyping, setFriendsTyping] = useState([])
    const [OpenAll, setOpenAll] = useState(Cookies.get('s-op') ? Cookies.get('s-op') == "open" : true)
    AddFriendsTyping = friendId => {
        setFriendsTyping([...friendsTyping, friendId])
    }

    UnsetFriendTyping = friendId => {
        setFriendsTyping(friendsTyping.filter(e => e != friendId))
    };

    const { mates } = UseAllChats();
    
    const [RealListFriends, setRealListFriends] = useState(mates)
    const [GlobalFocusedMate, setGlobalFocusedMate] = useState(mates)
    const [CurrentIndex, setCurrentIndex] = useState(mates);

    useEffect(() => {
        setRealListFriends(mates.sort((a, b) => new Date(b.LastMessage?.sendAt) - new Date(a.LastMessage?.sendAt)))
    }, [mates]);
    useEffect(() => {
        if (getGlobalForcuedMate) {
            setGlobalFocusedMate(getGlobalForcuedMate())
        }

    }, [window.location.pathname]);
    useEffect(() => {
        if (GlobalFocusedMate) {
            let Preindex = mates.findIndex(e => e.mate._id === GlobalFocusedMate?._id);
            setCurrentIndex(Preindex)
        }
    }, [GlobalFocusedMate])


    const handelCloseSideBare = () => {
        if (Cookies.get('s-op') == "open") {
            Cookies.set("s-op", "closed")
            setOpenAll(false)
        } else {
            Cookies.set("s-op", "open")
            setOpenAll(true)

        }
    }
    return (
        <>
            {
                OpenAll ?
                    <>
                        <div className="c-s-c w-1/5   bg-white drop-shadow-md rounded-2xl h-full  p-4">

                            <div className="w-full  r-b-c">
                                <span className="r-s-e">
                                    <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M6.5 3h11c1.325 0 2.5 1 2.5 2.5c0 2 -1.705 3.264 -2 3.5l-4.5 4l2 -5h-9a2.5 2.5 0 0 1 0 -5z"></path> <path d="M17.5 21h-11c-1.325 0 -2.5 -1 -2.5 -2.5c0 -2 1.705 -3.264 2 -3.5l4.5 -4l-2 5h9a2.5 2.5 0 1 1 0 5z"></path> </svg>
                                    <h1 className='font-bold text-xl ml-3'>Chats</h1>
                                </span>
                                <button onClick={handelCloseSideBare}>
                                    <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M9 4v16"></path> <path d="M15 10l-2 2l2 2"></path> </svg>
                                </button>
                            </div>

                            <div className="w-full mt-8 rounded-3xl border r-s-c p-2">
                                <svg className='opacity-70  w-6 h-6 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg>
                                <input type="text" placeholder='Search' className='ml-4 border-none outline-none w-full' />
                            </div>

                            <div className="h-full w-full c-s-c mt-2 pl-2 overflow-auto scrl_none relative">
                                <SliderListFriend OpenAll={OpenAll} CurrentIndex={CurrentIndex} />
                                {
                                    RealListFriends.map((u, i) => {
                                        return <FriendComp OpenAll={OpenAll} data={u} key={i} friendsTyping={friendsTyping} />
                                    })
                                }
                            </div>

                        </div>
                    </>

                    :
                    <>
                        <div className="c-s-c  bg-white drop-shadow-md rounded-3xl h-full  p-4">
                            <button onClick={handelCloseSideBare} className='p-1 w-full r-s-c border border-gray-400 rounded-xl  opacity-70'>
                                <svg className='stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M9 4v16"></path> <path d="M14 10l2 2l-2 2"></path> </svg>
                            </button>

                            <div className="h-full w-full c-s-c mt-2 pl-2 overflow-auto scrl_none relative">
                                <SliderListFriend OpenAll={OpenAll} CurrentIndex={CurrentIndex} />
                                {
                                    RealListFriends.map((u, i) => {
                                        return <FriendComp OpenAll={OpenAll} data={u} key={i} friendsTyping={friendsTyping} />
                                    })
                                }
                            </div>

                        </div>
                    </>
            }


        </>
    )
}

export default ListChatsCLient
