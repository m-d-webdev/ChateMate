import { CorrectTime } from '@/utilityfunctions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FriendComp = ({ data }) => {
    return (
        <Link href={'/Chats/' + data.id} className='w-full mb-4 p-3 rounded-xl bg-white drop-shadow-sm r-b-s border'>
            <div className="r-s-s w-full">
                <Image
                    src={data.img}
                    width={35}
                    height={30}
                    alt='userimage'
                    objectFit='cover'
                    objectPosition='top'
                    className='rounded-full'
                />
                <div className="c-s-s ml-2 w-8/12">
                    <h1 className="opacity-70 text-sm   text-ellipsis  truncate w-full" style={{ display: "inline-block", textWrap: "nowrap" }}>
                        {data.fullName}
                    </h1>
                    <p className="truncate w-full text-sm mt-1">{data.lastMessage}</p>
                </div>
            </div>
            <div className="">
                <h2 className='truncate font-semibold text-xs opacity-60'>{CorrectTime(data.sentAt)}</h2>
            </div>
        </Link>
    )
}

export default FriendComp
