'use client';
import React, { useState } from 'react'
import { useContext, createContext, } from 'react';
import { Store_chat_all, Store_chats_add } from '../StoreProider';
const owliaChatsContext = createContext();
const OwliaChatsProvider = ({ children }) => {
    const [OwliaChats, setOwliaChats] = useState(Store_chat_all() || {});

    const AddAnewMessage = d => {
        setOwliaChats(pv => ({
            ...pv,
            [d.chatId]: [...(pv[d.chatId] || []), d.message]
        }));

        Store_chats_add(d.chatId, d.message)
    }
    return (
        <owliaChatsContext.Provider value={{ OwliaChats, setOwliaChats, AddAnewMessage }}>
            {children}
        </owliaChatsContext.Provider>
    )
}

export const useOwliaContext = () => {

    return useContext(owliaChatsContext);

}


export default OwliaChatsProvider
