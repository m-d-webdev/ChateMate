import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const UserAvatar = ({ user = {}, className = "", style = {} }) => {
    return (
        <Link href={"/mates/" + user.userName} style={style} className={"w-full mb-5 p-2 rounded-xl bg-white r-s-c  " + className}>
            <Image
                src={user.pic}
                alt='userAvatare'
                width={40}
                height={40}
                objectFit='cover'
                objectPosition='top'
                className='min-w-10 min-h-10  img '
                style={{  minWidth: "40px", height: "40px" }}
            />
            <h1 className={`ml-2 truncate w-4/5 font-bold opacity-80 `}>
                {user.fullName}
            </h1>
        </Link >
    )
}

export default UserAvatar
