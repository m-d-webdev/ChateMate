"use client";

import React, { useState } from 'react'
export let Store_chats_add, Store_chat_get, Store_chat_all;


const StoreProider = () => {

    const [data, setData] = useState({})
    const [Chatdata, setChatData] = useState({})

    Store_chats_add = (key = "", value = "") => {
        setChatData(pv => ({
            ...pv,
            [key]: [...(pv[key] || []), value]
        }))
        console.log('we get => ', key, value);

    }
    Store_chat_all = () => {
        return Chatdata
    }

    return (<div></div>)
}

export default StoreProider
