'use client';
import SocketSetup from '@/components/SocketSetup';
import { api } from '@/utilityfunctions';
import Cookies from 'js-cookie';
import React from 'react'

import { createContext, useContext, useEffect, useState } from 'react'



const FriendsContext = createContext();


const FriendProvider = ({ children }) => {
    const [matesReqs, setMatesReqs] = useState([]);
    const [thisUser, setThisUser] = useState(null);

    

    const getMateReq = async () => {
        return new Promise(
            async (resolve, reject) => {
                try {
                    api.get("/meetMates/fetchReq").then(res => {
                        setMatesReqs(res.data.matesReq);
                        resolve()
                    });
                } catch (error) {
                    reject(error)
                }
            })


    }

    const getThisUser = async () => {
        return new Promise(
            async (resolve, reject) => {
                try {
                    api.get("/user/get").then(res => {
                        setThisUser(res.data.user);
                        resolve()
                    })
                } catch (error) {
                    reject(error)
                }
            })

    }

    const GetDependencies = async (params) => {
        await getThisUser();
        await getMateReq();
    }

    useEffect(() => {
        if (Cookies.get("token")) {
            GetDependencies()
        }
    }, []);

    return (
        <FriendsContext.Provider value={{  matesReqs, thisUser, setMatesReqs }} >
           
            {children}
        </FriendsContext.Provider>
    )
}

export default FriendProvider


export const useFriends = () => {
    return useContext(FriendsContext)
}