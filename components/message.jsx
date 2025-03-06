'use client';


import Image from 'next/image';
import React from 'react'
import AiResponseContent from './AiResponse';


const Message = ({ m }) => {
    return (
        <div className={`f-full  mb-10 ${m.isFromMe ? "r-e-c" : "r-s-c"}`}>
            {m.isFromMe ?
                <div className='r-s-s '>
                    <p className=" text-sm  mr-4  max-w-4xl">{m.content}</p>
                    
                    <Image
                        src={m.img}
                        width={20}
                        height={20}
                        alt="opacity-70"
                        className='img w-8 h-8'
                    />
                </div> :
                <div className='r-s-s '>
                    <Image
                        src={m.img}
                        width={20}
                        height={20}
                        alt=""
                        className='img w-7 h-7'
                    />
                    <AiResponseContent className={"max-w-4xl text-sm mr-4"} aiResponse={m.content} />

                    {/* <p className="bg-gray-100 text-sm p-4 ml-4 rounded-lg max-w-4xl">{m.content}</p> */}
                </div>
            }
        </div>
    )
}

export default Message
