"use client";

import Image from 'next/image';
import { Aoboshi_One } from 'next/font/google'
import Message from '@/components/message';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import InputMessage2 from '@/components/InputMessage2';
import ChatHead from '@/components/chatHead';
import { api, DecodMessage } from '@/utilityfunctions';
import Spinner from '@/components/loaders/Spinner';
import { UseAllChats } from '../MessagesProvider';
import FriendMessage from '@/components/Friendmessage';
import { useFriends } from '@/app/user/profile/FriendProvider';
import { SetMessagesSeen } from '@/config/socket';
import { ChatContext } from './layout';
import MessageTypeFile from '@/components/MessageTypeFile';

export let DeclareCurrentFriendTyping;

const page = ({ params }) => {

    const { id } = React.use(params);

    const { allChats, mates, setChats } = UseAllChats();
    const { thisUser } = useFriends();
    const [IsLoading, setIsLoading] = useState(false);
    const { GlobalFocusedMate, isFocusedUserTyping } = useContext(ChatContext)

    useEffect(() => {
        if (!allChats[id]) {
            GetChatMessages()
        }
        SetMessagesSeen(id, GlobalFocusedMate?._id);
    }, []);

    const listMessagesRef = useRef();
    const GetChatMessages = async () => {
        setIsLoading(true);
        let res = await api.post("/chat/GetChatMessages", { chat_id: id })

        if (res.status == 200) {
            setChats(pv => (
                {
                    ...pv, [id]: res.data.Chatmessages
                }
            ));
        }

        setIsLoading(false);
    }


    useEffect(() => {
        listMessagesRef.current?.scrollTo({
            top: listMessagesRef.current?.scrollHeight,
            behavior: "smooth"
        })
    }, [allChats[id]]);
    
    return (
        <>

            {
                IsLoading ?
                    <div className='h-full w-full c-c-c ' >
                        <Spinner />
                    </div>
                    :
                    <>
                        {
                            (!allChats[id] || allChats[id]?.length == 0) ?
                                <div className='c-c-c mb-20'>
                                    <h1>
                                        Looks like you haven't chatted yet. Send a message to get started
                                    </h1>
                                </div>
                                :
                                <div ref={listMessagesRef} className='h-full scrl_none pt-10 mb-2 w-full max-h-full overflow-auto ' >
                                    {
                                        allChats[id]?.map(m => {
                                            m.isFromMe = m.senderId == thisUser?._id;
                                            if (m.type == "text") {

                                                return <FriendMessage m={m} key={m._id} />

                                            } else {
                                                return <MessageTypeFile message={m} key={m._id} />
                                            }

                                        })


                                    }
                                    {
                                        isFocusedUserTyping &&
                                        <div className="r-s-c  mb-8">
                                            <div className="bg-white p-2 px-4 rounded-3xl">
                                                <div className='dots  '></div>
                                            </div>
                                        </div>
                                    }
                                </div>
                        }
                    </>
            }



        </>

    )
}

export default page
