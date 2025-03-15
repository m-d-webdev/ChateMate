"use client";
import { _onClickOutElem } from '@/utilityfunctions';
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useOwliaContext } from './Provider';
import Link from 'next/link';
import { useFriends } from '../user/profile/FriendProvider';
// import ANimateData from "@/public/lotties/Empty1.json"
import Lottie from 'react-lottie';
import ANimateData from "@/public/lotties/Empty2.json"
const ListHistoryChats = () => {
    const [isMenuOpened, setMenuOpened] = useState(false)
    const [isLoadedOldChats, setLoadedOlds] = useState(false)
    const menuRef = useRef();
    const { thisUser } = useFriends()
    const { OwliaChats, setOwliaChats, AddAnewMessage } = useOwliaContext()

    useEffect(() => {
        if (menuRef.current) {
            _onClickOutElem(menuRef.current, () => setMenuOpened(false))
        }
    }, [isMenuOpened]);
    
    return (
        <div className="c-s-s relative  h-full ">
            <AnimatePresence>

                {
                    isMenuOpened &&
                    <motion.div
                        ref={menuRef}

                        initial={{
                            width: 10,
                            opacity: 0
                        }}

                        exit={{
                            width: 10,
                            opacity: 0
                        }}
                        animate={{
                            width: "300px",
                            opacity: 1,
                            transition: {
                                type: "spring"
                            }
                        }}

                        className="h-full p-3 c-s-s p10 rounded-xl bg-white max-h-screen overflow-hidden  absolute right-0 z-10" style={{
                            filter: "drop-shadow(-5px 0px 6px var(--filter-color))"
                        }}
                    >

                        <div className="w-full mb-8 r-b-c">

                            <h1 className="opacity-80  r-s-c">
                                <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 8l0 4l2 2"></path> <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path> </svg>
                                Chat history
                            </h1>
                            <button onClick={() => setMenuOpened(false)} className='opacity-60'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M15 4v16"></path> <path d="M9 10l2 2l-2 2"></path> </svg>
                            </button>
                        </div>
                        <Link href={`/Owlia/chats/${thisUser?.userName}${Date.now()}/1`} className='text-blue-500 border-blue-400 border-2  w-full p-1 font-semibold  rounded-2xl border  r-s-c pl-8 mb-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M19 8h-14"></path> <path d="M5 12h9"></path> <path d="M11 16h-6"></path> <path d="M15 16h6"></path> <path d="M18 13v6"></path> </svg>

                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 5l0 14"></path> <path d="M5 12l14 0"></path> </svg> */}

                            New
                            <p className="text-xs opacity-70 ml-3 mt-2">{thisUser?.userName}{Date.now()}  </p>

                        </Link>


                        <div className="c-s-s h-[90%] mt-8 overflow-auto scrl_none w-full">

                            {
                                Object.keys(OwliaChats).length == 0 &&
                                <div className='w-full c-c-c  font-semibold text-center text-gray-400'>
                                    <Lottie
                                        options={{
                                            animationData: ANimateData,
                                            loop: true,
                                            autoplay: true
                                        }}
                                        height={200}
                                    />
                                    <div className="mt-4"></div>
                                    No messages yet! Start the conversation by sending a message
                                </div>
                            }

                            {
                                Object.keys(OwliaChats).reverse().map(c => {
                                    let firstChat = OwliaChats[c][0]
                                    return <Link key={c} href={`/Owlia/chats/${c}/0`} className='w-full opacity-80 hover:opacity-100 hover:bg-gray-50 p-2 mb-4 rounded-xl r-b-c'>
                                        <div className="r-s-c w-10/12">

                                            <svg className='mr-2 w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M13 12v.01"></path> <path d="M3 21h18"></path> <path d="M5 21v-16a2 2 0 0 1 2 -2h6m4 10.5v7.5"></path> <path d="M21 7h-7m3 -3l-3 3l3 3"></path> </svg>
                                            <p className='truncate w-full font-semibold '>
                                                {
                                                    firstChat.content
                                                }
                                            </p>
                                        </div>
                                        <p className='w-2/12 truncate r-c-c '>{OwliaChats[c].length} <svg className='w-4 ml-1 opacity-80 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12.004 19.98a9.869 9.869 0 0 1 -4.304 -.98l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c1.994 1.701 2.932 4.045 2.746 6.349"></path> <path d="M19 22v-6"></path> <path d="M22 19l-3 -3l-3 3"></path> </svg> </p>
                                    </Link>
                                })
                            }
                        </div>

                        {
                            !isLoadedOldChats &&
                            <button className='w-full border r-c-c p-1 border-gray-400 rounded-xl font-semibold'>
                                <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4"></path> <path d="M12 13l0 9"></path> <path d="M9 19l3 3l3 -3"></path> </svg>
                                Load old chats
                            </button>
                        }


                    </motion.div>

                }
            </AnimatePresence>
            <button onClick={() => setMenuOpened(!isMenuOpened)} className='absolute bg-white p-2 rounded-xl top-3   right-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 6h16"></path> <path d="M7 12h13"></path> <path d="M10 18h10"></path> </svg>
            </button>
        </div>
    )
}

export default ListHistoryChats
