"use client";
import React, { useMemo } from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import { useFriends } from '../user/profile/FriendProvider';
import SocketSetup from '@/components/SocketSetup';
import { api } from '@/utilityfunctions';
import Cookies from 'js-cookie';
const messagesContext = createContext();
export let AddMessgeFromSocket, UpdateMessToSeen, AddNewMateFromSocket;
export let NoticeFriendOnLine;

const MessagesProvider = ({ children }) => {

    const [mates, setMates] = useState([]);
    const [isGettingmates, setGettingMates] = useState(true);
    const [ActiveMates, setActiveMates] = useState([]);
    const [allChats, setChats] = useState({});
    const { thisUser } = useFriends();

    // --------- Line soud be in the owlia section but ...
    const [CurrentUrlToOwliaChats, setCurrentUrlToOwliaChats] = useState("/Owlia")
    // -----------

    NoticeFriendOnLine = data => {
        if (data.isConnected == true) {
            setActiveMates(pv => [...pv, data.friendId])
        }
        else if (data.isConnected == false) {
            setActiveMates(ActiveMates.filter(m => m != data.friendId))
        }
    }

    const { setMatesReqs } = useFriends()
    const getChatList = async () => {
        try {
            if (Cookies.get("token"))
                await api.get("/user/getChatList").then(res => {
                    setMates(res.data.chats);
                    setGettingMates(false)
                })

        } catch (error) { }

    }

    useEffect(() => {
        getChatList()
    }, [])

    useEffect(() => {
        setMates(mates.map(m => {
            if (allChats[m.chat_id]) {

                let unreadMessageForThisUser = allChats[m.chat_id].filter((e) => e.isFromMe == false && !e.readBy?.includes(thisUser._id)).length
                m.CountUnreadMessages = unreadMessageForThisUser
                return m

            } else {
                return m
            }

        }))
    }, [allChats])

    // ------------------


    const UpdateMessageToSent = (e) => {
        if (allChats[e.chat_id]) {
            setChats(pv => ({ ...pv, [e.chat_id]: pv[e.chat_id].map(mes => mes._id == e._id ? { ...mes, isSent: true } : mes) }))
        }
    }


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

    AddNewMateFromSocket = d => {
        setMates(pv => [...pv, d]);
        setMatesReqs(pv => pv.filter(e => e.to != d.mate?._id))

    }

    return (
        <messagesContext.Provider value={{ setMates, allChats, setChats, UpdateMessageToSent, mates, ActiveMates, CurrentUrlToOwliaChats, setCurrentUrlToOwliaChats }}>
            {
                thisUser != null && !isGettingmates &&
                <SocketSetup clientId={thisUser._id} friendsIds={mates.map(m => m.mate._id)} />
            }
            {children}
        </messagesContext.Provider >
    )
}

export default MessagesProvider

export const UseAllChats = () => {
    return useContext(messagesContext)
}
