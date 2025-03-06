import Link from 'next/link'
import React from 'react'

const BtnOpenChat = ({ userName }) => {
    return (
        <Link href={'/Chats/' + userName}>
            Open chat
        </Link>
    )
}

export default BtnOpenChat
