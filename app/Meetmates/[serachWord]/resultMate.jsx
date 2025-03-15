import Link from 'next/link'
import React from 'react'

const ResultMate = ({ mate }) => {
    return (
        <div className='w-full mb-12  border-b p-21 px-2 rounded-xl  r-b-s '>
            <div className="r-s-s">
                <img src={mate.pic} alt="" className='w-16 h-16 img ' />
                <div className="c-s-s ml-2">
                    <h1 className='text-xl '>{mate.fullName}</h1>
                    <h2 className='opacity-70 font-medium'>{mate.userName}</h2>
                </div>
            </div>
            <Link className='r-s-c  text-blue-500 border border-blue-500 rounded-3xl p-1 px-4' href={"/mates/" + mate.userName} >
                Open profile
                <svg xmlns="http://www.w3.org/2000/svg" className='ml-2' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h1.5"></path> <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M20.2 20.2l1.8 1.8"></path> </svg>
            </Link>
        </div>
    )
}

export default ResultMate
