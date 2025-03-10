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
        if (allChats[e.chat_id]) {
            setChats(pv => ({ ...pv, [e.chat_id]: [...pv[e.chat_id], e] }))
        } else {

            setChats(pv => ({ ...pv, [e.chat_id]: [e] }))
        }
    }

    UpdateMessToSeen = e => {
        if (allChats[e.chat_id]) {
            if (e.reader == "me") {
                setChats(pv => ({ ...pv, [e.chat_id]: pv[e.chat_id].map(c => ({ ...c, readBy: [...c.readBy, thisUser._id] })) }))
            } else {
                setChats(pv => ({ ...pv, [e.chat_id]: pv[e.chat_id].map(c => ({ ...c, readBy: [...c.readBy, e.reader] })) }))
            }
        }
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
