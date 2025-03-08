'use client';
import { api } from '@/utilityfunctions';
import Cookies from 'js-cookie';
import React from 'react'

import { createContext, useContext, useEffect, useState } from 'react'

const FriendsContext = createContext();


const FriendProvider = ({ children }) => {
    const [mates, setMates] = useState([]);
    const [matesReqs, setMatesReqs] = useState([]);
    const [thisUser, setThisUser] = useState(null);
    
    const getChatList = async () => {
        api.get("/user/getChatList").then(res => {  
            setMates(res.data.chats);
        })
    }
    const getMateReq = async () => {

        api.get("/meetMates/fetchReq").then(res => {
            setMatesReqs(res.data.matesReq);
        });

    }
    const getThisUser = async () => {
        api.get("/user/get").then(res => {
            setThisUser(res.data.user);
        })
    }
    useEffect(() => {
        if(Cookies.get("token")){
            getThisUser();
            getChatList();
            getMateReq();
        }
    }, []);
    
    return (
        <FriendsContext.Provider value={{ mates, setMates, matesReqs, thisUser, setMatesReqs }} >
            {children}
        </FriendsContext.Provider>
    )
}

export default FriendProvider


export const useFriends = () => {
    return useContext(FriendsContext)
}