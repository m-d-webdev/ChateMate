"use server";

import ListChatsCLient from '@/components/ListChatsCLient';
import React from 'react'




const Layout = ({ children }) => {
    
    return (
        <div className='w-full r-s-s p-2 h-screen '>
            <ListChatsCLient  />
            <div className="h-full w-full c-p-c">
                {children}
            </div>
        </div>
    )
}

export default Layout
