"use client"
import React from 'react'
import Image from "next/image";
import Link from 'next/link';

const ChateMateLogo = () => {
    return (
        <Link href={'/'} className='c-c-c '>

            <Image
                src={'/media/logoImg.png'}
                width={"30"}
                height={"30"}
                className="mr-2"
                alt="logo"
            />
            <h1 className="mt-2 font-bold ">
                ChatMate
            </h1>
        </Link>
    )
}

export default ChateMateLogo
