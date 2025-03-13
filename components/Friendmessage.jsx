'use client';

import { ChatContext } from '@/app/Chats/[id]/layout';
import { CorrectTime } from '@/utilityfunctions';
import React, { useContext } from 'react'
import { Poppins } from 'next/font/google'
const poppins = Poppins({
    subsets: ["latin"],
    weight: ['500']
})
const FriendMessage = ({ m }) => {
    const { GlobalFocusedMate } = useContext(ChatContext);
    
    return (
        <div className={`f-full  mb-8 ${m.isFromMe ? "r-e-c" : "r-s-c"}`}>
            {m.isFromMe ?
                <div className='r-e-s '>
                    <div className="c-s-e bg-white p-1 px-4 rounded-2xl rounded-tr-none  max-w-4xl ">
                        <pre className={`  max-w-sm  font-medium text-sm mb-1 ${poppins.className } `}>{m.content}</pre>
                        <div className="w-full r-e-c mt-1">
                            <span className='text-xs opacity-40 font-semibold '>
                                {CorrectTime(m.sendAt)}
                            </span>

                            {m.readBy.includes(GlobalFocusedMate?._id) ?
                                <svg className='stroke-blue-500 w-5 h-5 ml-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path> <path d="M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032"></path> <path d="M15 19l2 2l4 -4"></path> </svg>
                                :
                                <>
                                    {m.recievedBy?.includes(GlobalFocusedMate?._id) ?
                                        <svg className='w-5 h-5 ml-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" /></svg>
                                        :
                                        <>
                                            <p className='text-xs font-normal opacity-60 ml-2'>sent</p>
                                        </>

                                    }
                                </>
                            }
                        </div>
                    </div>
                </div> :
                <div className='r-s-s '>
                    <div className="c-s-s bg-sky-200  p-2 px-4 pl-4 rounded-2xl rounded-tl-none  max-w-4xl ">
                        <pre className={` max-w-full font-medium text-sm mb-1 ${poppins.className } `}>{m.content}</pre>
                        <div className="w-full r-e-c">
                            <span className='text-xs   opacity-70   ml-5 '>
                                {CorrectTime(m.sendAt)}
                            </span>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default FriendMessage
