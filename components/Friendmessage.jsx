'use client';

import { CorrectTime } from '@/utilityfunctions';
import React from 'react'

const FriendMessage = ({ m }) => {

    return (
        <div className={`f-full  mb-8 ${m.isFromMe ? "r-e-c" : "r-s-c"}`}>
            {m.isFromMe ?
                <div className='r-e-s '>
                    <div className="c-s-e bg-white p-1 px-4 rounded-2xl rounded-tr-none  max-w-4xl ">
                        <p className="bg-white  text-sm font-medium    ">{m.content}</p>
                        <div className="w-full r-e-c mt-1">
                            <span className='text-xs opacity-40 font-semibold '>
                                {CorrectTime(m.sendAt)}
                            </span>

                            {
                                m.recievedBy?.length > 0 && m.readBy?.length == 0 &&
                                <p className='text-xs text-gray-700 font-normal opacity-70 ml-2'>received</p>
                            }

                            {m.recievedBy?.length == 0 && m.readBy?.length == 0 &&
                                <p className='text-xs font-normal opacity-60 ml-2'>sent</p>
                            }

                            {m.readBy?.length > 0 &&
                                <p className='text-xs font-normal text-blue-500 opacity-80 ml-2'>Checked </p>
                            }

                        </div>
                    </div>
                </div> :
                <div className='r-s-s '>
                    <div className="c-s-s bg-sky-200  p-2 px-4 pl-4 rounded-2xl rounded-tl-none  max-w-4xl ">
                        <p className=" text- font-medium text-sm mb-1 ">{m.content}</p>
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
