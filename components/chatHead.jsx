"use client";
import React from 'react'
import Image from 'next/image';

const ChatHead = ({ data }) => {
    return (
        <div className=" bg-white drop-shadow rounded-3xl p-2 r-b-c w-full">
            <div className="r-s-s">
                <Image
                    src={'https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg'}
                    width={40}
                    height={40}
                    objectFit='cover'
                    objectPosition='top'
                    alt='userImage'
                />

                <div className="r-s-c ml-4 mt-2">
                    <h1 className='text-base'>Mustapha iderkaoui</h1>
                    <span className="r-s-s text-green-500 ml-4">
                        <div className="w-2 h-2 mr-2 rounded-full bg-green-500"></div>
                        On line
                    </span>
                </div>

            </div>

            <button className='border p-2  rounded-xl bg-white drop-shadow-sm'>
                <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M14 4h6v6h-6z"></path> <path d="M4 14h6v6h-6z"></path> <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> </svg>
            </button>
        </div>
    )
}

export default ChatHead
