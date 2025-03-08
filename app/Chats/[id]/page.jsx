"use client";

import Image from 'next/image';
import { Aoboshi_One } from 'next/font/google'
import Message from '@/components/message';
import React, { useEffect, useRef, useState } from 'react';
import InputMessage2 from '@/components/InputMessage2';
import ChatHead from '@/components/chatHead';
import { api } from '@/utilityfunctions';
import Spinner from '@/components/loaders/Spinner';
import { UseAllChats } from '../MessagesProvider';
import FriendMessage from '@/components/Friendmessage';
import { useFriends } from '@/app/user/profile/FriendProvider';
const aoboshi_One = Aoboshi_One({
    subsets: ['latin'],
    weight: ['400']
})
const page = ({ params }) => {
    const { id } = React.use(params);
    const { allChats, setChats } = UseAllChats();
    const { thisUser, mates } = useFriends();
    const [IsLoading, setIsLoading] = useState(false);
    const [focusedMate, setFocusedMate] = useState(mates.find(r => r.chat_id == id)?.mate);

    useEffect(() => {
        if (!allChats[id]) {
            GetChatMessages()
        }
    }, []);

    useEffect(() => {
        setFocusedMate(mates.find(r => r.chat_id == id)?.mate)
    }, [mates, id])

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

    const handelAddMessage = e => {
        console.log('get an to add right now ');
        
        setChats(pv => (
            {
                ...pv,
                [id]: [...pv[id], e]
            }
        ));
    }

    useEffect(() => {
        listMessagesRef.current?.scrollTo({
            top: listMessagesRef.current?.scrollHeight,
        })
    }, [allChats[id]])
    return (
        <div className="h-full  w-full c-b-c max-w-6xl px-4 ">
            {
                focusedMate ?
                    <ChatHead data={focusedMate} />
                    :
                    <div className="w-full ">
                        <Spinner height={20} width={20} borderWidth={3} />
                    </div>
            }
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
                                            return <FriendMessage m={m} key={m._id} />
                                        })
                                    }
                                </div>
                        }
                    </>
            }

            {
                focusedMate ?
                    <InputMessage2 chat_id={id} focusedMate={focusedMate} onMessageSent={handelAddMessage} />
                    :
                    <div className="w-full ">
                        <Spinner height={17} width={17} borderWidth={3} />
                    </div>
            }

        </div>

    )
}

export default page
