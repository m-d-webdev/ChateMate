import Link from 'next/link'
import React from 'react'

const Btn_Back = ({ onClick }) => {

    return (
        <button onClick={onClick}  className='absolute top-2 right-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M18 6l-12 12"></path> <path d="M6 6l12 12"></path> </svg>
        </button>

    )
}

export default Btn_Back
