"use client"
import React, { useState } from 'react'
import CustomInput from './CustomInput'

const SearchForFriendsInpu = () => {
    const [value, setValue] = useState('');
    const handelPast = async () => {
        const stuff = await navigator.clipboard.readText();
        setValue(stuff)

    }
    return (
        <div className="r-s-c p-3 bg-white  rounded-3xl w-full mt-14 border">
            <svg className={"opacity-70"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg>
            <input value={value} onChange={e => setValue(e.target.value)} type="text" className='border-none ml-2 placeholder:text-md outline-none w-full ' placeholder='Find users by full name or username' />
            <button onClick={handelPast} className='opacity-80 '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path> <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path> </svg>
            </button>
        </div>
    )
}

export default SearchForFriendsInpu
