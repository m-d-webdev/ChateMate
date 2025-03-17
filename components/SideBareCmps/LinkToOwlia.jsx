"use client";
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { UseAllChats } from '@/app/Chats/MessagesProvider';

const LinkToOwlia = () => {
  const {CurrentUrlToOwliaChats} = UseAllChats()

    return (
        <Link className=' opacity-80 hover:opacity-100  c-c-c mt-8' href={CurrentUrlToOwliaChats}>
            <Image
                src={"/icones/owliaLogo.svg"}
                width={20}
                height={20}
                alt='Owlia logo '
            />
            Owlia
        </Link>
    )
}

export default LinkToOwlia
