'use client';
import React, { useEffect, useRef, useState } from 'react'
import Spinner from './loaders/Spinner';
import BtnRecordAudio from './BTNRecordAudio';

const WriteMessage = React.forwardRef(({ className, value, onChange, placeholder, onSend = () => { }, isWaitinForRespose = false }, ref) => {
    const inpTextRef = ref ? ref : useRef();
    const [message, setMessage] = useState('')

    useEffect(() => {
        inpTextRef.current.style.height = "auto";
        inpTextRef.current.style.height = `${inpTextRef.current.scrollHeight}px`;
    }, [message])

    useEffect(()=>{
        inpTextRef.current?.focus()
    },[])
    const handelWriteMessage = e => {
        setMessage(e.target.value);
        onChange(e.target.value)
    }

    return (
        <label className='w-full p-4 bg-slate-50 drop-shadow rounded-2xl c-s-s'>
            <textarea onKeyDown={e => {
                if (e.key == "Enter") {
                    e.preventDefault()
                    onSend()
                }
            }} value={value} onChange={handelWriteMessage} ref={inpTextRef} type="text" placeholder={placeholder} className='font-semibold border-none placeholder:text-sm max-h-80  text-lg outline-none bg-transparent w-full resize-none ' ></textarea>
            <div className="w-full r-e-c mt-6">
                {
                    isWaitinForRespose ?
                        <Spinner borderWidth={3} width={20} height={20} />
                        :
                        <>
                            <BtnRecordAudio onWordsReayd={words => { setMessage(words); onChange(words) }} />

                            {
                                message.trim().length > 0 &&
                                <button onClick={onSend} className='bg-black p-2 rounded-full opacity-70 hover:opacity-100 '>
                                    <svg className='stroke-white w-6 h-6 stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path> </svg>
                                </button>
                            }
                        </>
                }

            </div>
        </label>
    )
})

export default WriteMessage
