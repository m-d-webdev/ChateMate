'use client';


import Image from 'next/image';
import React from 'react'

const Message = ({ m }) => {
    return (
        <div className={`f-full  mb-10 ${m.isFromMe ? "r-e-c" : "r-s-c"}`}>
            {m.isFromMe ?
                <div className='r-s-s  '>
                    <p className="max-w-4xl text-sm mr-4">{m.content}</p>
                    <Image
                        src={m.img}
                        width={20}
                        height={20}
                        alt="opacity-70"
                    />
                </div> :
                <div className='r-s-s '>
                    <Image
                        src={m.img}
                        width={20}
                        height={20}
                        alt=""
                        className='opacity-70'
                    />
                    <p className="bg-gray-100 text-sm p-4 ml-4 rounded-lg max-w-4xl">{m.content}</p>
                </div>
            }
        </div>
    )
}

export default Message
