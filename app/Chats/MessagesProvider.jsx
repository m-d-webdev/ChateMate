"use client";
import React, { useMemo } from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import { useFriends } from '../user/profile/FriendProvider';
const messagesContext = createContext();
export let AddMessgeFromSocket, UpdateMessToSeen;
const MessagesProvider = ({ children }) => {
    const [allChats, setChats] = useState({});
    const { thisUser } = useFriends()
    const value = useMemo(() => {
        return { allChats, setChats }
    }, [allChats])


    AddMessgeFromSocket = e => {
        console.log('still adding messages  ---');
        if (allChats[e.chat_id]) {
            setChats(pv => ({ ...pv, [e.chat_id]: [...pv[e.chat_id], e] }))
        } else {

            setChats(pv => ({ ...pv, [e.chat_id]: [e] }))
        }
    }

    UpdateMessToSeen = e => {
        console.log('update to set seen ---');
        
        if (allChats[e.chat_id]) {
            setChats(pv => ({ ...pv, [e.chat_id]: pv[e.chat_id].map(c => c.senderId == thisUser._id ? { ...c, readBy: [...c.readBy, e.reader] } : c) }))
        }
        //  else {
        //     setChats(pv => ({ ...pv, [e.chat_id]: [e] }))
        // }
    }


    return (
        <messagesContext.Provider value={value}>
            {children}
        </messagesContext.Provider>
    )
}

export default MessagesProvider

export const UseAllChats = () => {
    return useContext(messagesContext)
}
