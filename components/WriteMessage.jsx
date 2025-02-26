'use client';
import React, { useEffect, useRef, useState } from 'react'

const WriteMessage = ({ className, onChange, placeholder }) => {
    const inpTextRef = useRef();
    const [message, setMessage] = useState('')
    useEffect(() => {
        inpTextRef.current.style.height = "auto";
        inpTextRef.current.style.height = `${inpTextRef.current.scrollHeight}px`;
    }, [message])

    const handelWriteMessage = e => {
        setMessage(e.target.value);
    }

    return (
        <label className='w-full p-4 bg-slate-50 drop-shadow rounded-2xl c-s-s'>
            <textarea onChange={handelWriteMessage} ref={inpTextRef} type="text" placeholder={placeholder} className='font-bold border-none placeholder:text-sm max-h-80  text-lg outline-none bg-transparent w-full resize-none ' ></textarea>
            <div className="w-full r-e-c mt-6">
                <button className='bg-black p-2 rounded-full opacity-70 hover:opacity-100 mr-4'>
                    <svg className='stroke-white w-6 h-6 stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"></path> <path d="M5 10a7 7 0 0 0 14 0"></path> <path d="M8 21l8 0"></path> <path d="M12 17l0 4"></path> </svg>
                </button>
                <button className='bg-black p-2 rounded-full opacity-70 hover:opacity-100 '>
                    <svg className='stroke-white w-6 h-6 stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path> </svg>
                </button>
            </div>
        </label>
    )
}

export default WriteMessage
