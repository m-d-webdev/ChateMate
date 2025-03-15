"use client";
import React from 'react'

import Image from 'next/image';
import Link from 'next/link';
const LinkToMain = () => {
    return (
        <div className='c-c-s w-40'>
            <Link href={"/Owlia"} className="r-s-c">
                <Image
                    src={'/icones/owliaLogo.svg'}
                    width={30}
                    height={30}
                    alt='owliaLogo'
                    className='mr-3'
                />
                <h1 className='font-bold text-xl'>Owlia</h1>
            </Link>
            <button className=' w-full border text-sm5 border-gray-300 rounded-2xl p-1 mt-4 r-c-c'>
                <svg className='mr-1 w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path> <path d="M9 15l3 -3l3 3"></path> <path d="M12 12l0 9"></path> </svg>
                Save chats
            </button>
        </div>
    )
}

export default LinkToMain
