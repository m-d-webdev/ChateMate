'use client';
import SocketSetup from '@/components/SocketSetup';
import { api } from '@/utilityfunctions';
import Cookies from 'js-cookie';
import React from 'react'

import { createContext, useContext, useEffect, useState } from 'react'

export let NoticeFriendOnLine;


const FriendsContext = createContext();


const FriendProvider = ({ children }) => {
    const [mates, setMates] = useState([]);
    const [ActiveMates, setActiveMates] = useState([]);
    const [matesReqs, setMatesReqs] = useState([]);
    const [thisUser, setThisUser] = useState(null);
    const [isReady, setReady] = useState(false);
    
    NoticeFriendOnLine = data => {
        if (data.isConnected == true) {
            setActiveMates(pv => [...pv, data.friendId])
        }
        else if (data.isConnected == false) {
            setActiveMates(ActiveMates.filter(m => m != data.friendId))
        }
    }

    const getChatList = async () => {
        return new Promise(
            async (resolve, reject) => {
                try {
                    await api.get("/user/getChatList").then(res => {
                        setMates(res.data.chats);
                        resolve()
                    })

                } catch (error) {
                    reject(error)
                }

            })

    }
    
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
        await getChatList();
        await getMateReq();
        setReady(true)
    }

    useEffect(() => {
        if (Cookies.get("token")) {
            GetDependencies()
        }
    }, []);

    return (
        <FriendsContext.Provider value={{ mates, setMates, matesReqs, thisUser, setMatesReqs, ActiveMates }} >
            {
                isReady &&
                <SocketSetup clientId={thisUser._id} friendsIds={mates.map(m => m.mate._id)} />
            }
            {children}
        </FriendsContext.Provider>
    )
}

export default FriendProvider


export const useFriends = () => {
    return useContext(FriendsContext)
}