"use client";
import { useFriends } from '@/app/user/profile/FriendProvider';
import { GetSocket } from '@/config/socket';
import { api } from '@/utilityfunctions';
import React, { useMemo, useState } from 'react'
import BtnRecordAudio from './BTNRecordAudio';
import { UseAllChats } from '@/app/Chats/MessagesProvider';
import BtnUploadFiles from './BtnUploadFiles';

const InputMessage2 = ({ chat_id, focusedMate }) => {
    const { thisUser } = useFriends();
    const { setChats } = UseAllChats();
    const [messageContent, setMessage] = useState('');
    const socket = GetSocket();

    const handelSendMessage = async (e) => {
        if (messageContent != "") {
            e?.preventDefault();
            let messageId = `${Date.now()}-${thisUser._id}`;
            let now = new Date();

            const HollMessage = { content: messageContent, type: "text", chat_id, _id: messageId, sendAt: now };
            setMessage("");
            StopmessageTyping()
            await socket.emit("messageSent", { ...HollMessage, SocketTO: focusedMate._id, readBy: [], senderId: thisUser._id }, (cl) => {
                if (cl.recieved) {

                    setChats((prevChats) => {
                        return {
                            ...prevChats,
                            [chat_id]: prevChats[chat_id] ?
                                [...prevChats[chat_id], { ...HollMessage, recievedBy: cl.recievedBy, readBy: [], senderId: thisUser._id }]
                                : [{ ...HollMessage, recievedBy: cl.recievedBy, readBy: [], senderId: thisUser._id }]
                        };
                    });

                    api.post("/chat/addMessage", { ...HollMessage, recievedBy: cl.recievedBy, readBy: [] })
                } else {

                    setChats((prevChats) => {
                        return {
                            ...prevChats,
                            [chat_id]: prevChats[chat_id] ?
                                [...prevChats[chat_id], { ...HollMessage, recievedBy: [], readBy: [], senderId: thisUser._id }]
                                : [{ ...HollMessage, recievedBy: [], readBy: [], senderId: thisUser._id }]
                        };
                    });

                    api.post("/chat/addMessage", { ...HollMessage, recievedBy: [], readBy: [] })
                }
            })
        }

    }
    const handelSendMessageViaMic = async (words) => {
        if (words != "") {
            let messageId = `${Date.now()}-${thisUser._id}`;
            let now = new Date();
            const HollMessage = { content: words, type: "text", chat_id, _id: messageId, sendAt: now };
            setMessage("");
            StopmessageTyping();

            await socket.emit("messageSent", { ...HollMessage, SocketTO: focusedMate._id, readBy: [], senderId: thisUser._id }, (cl) => {
                if (cl.recieved) {

                    setChats((prevChats) => {
                        return {
                            ...prevChats,
                            [chat_id]: prevChats[chat_id] ?
                                [...prevChats[chat_id], { ...HollMessage, recievedBy: cl.recievedBy, readBy: [], senderId: thisUser._id }]
                                : [{ ...HollMessage, recievedBy: cl.recievedBy, readBy: [], senderId: thisUser._id }]
                        };
                    });
                    api.post("/chat/addMessage", { ...HollMessage, recievedBy: cl.recievedBy, readBy: [] })

                } else {


                    setChats((prevChats) => {
                        return {
                            ...prevChats,
                            [chat_id]: prevChats[chat_id] ?
                                [...prevChats[chat_id], { ...HollMessage, recievedBy: [], readBy: [], senderId: thisUser._id }]
                                : [{ ...HollMessage, recievedBy: [], readBy: [], senderId: thisUser._id }]
                        };
                    });


                    api.post("/chat/addMessage", { ...HollMessage, recievedBy: [], readBy: [] })
                }
            })
        }
    }


    const [typingEventSent, settypingEventSent] = useState(false)
    const handelSendImTyping = (is) => {

        if (socket && is && !typingEventSent) {
            settypingEventSent(true);
            socket.emit("messageTyping", { from: thisUser._id, SocketTO: focusedMate._id })
        }

        if (is == false) {
            StopmessageTyping()
        }
    }

    const StopmessageTyping = (is) => {
        if (socket) {
            settypingEventSent(false)
            socket.emit("StopmessageTyping", { from: thisUser._id, SocketTO: focusedMate._id })

        }
    }

    return (
        <div className='w-full p-2 bg-white drop-shadow rounded-2xl r-b-c'>
            <BtnUploadFiles chat_id={chat_id} focusedMate={focusedMate} />
            <input onKeyUp={e => e.key == "Enter" && handelSendMessage(e)} onChange={e => { handelSendImTyping(e.target.value != ""); setMessage(e.target.value); }} value={messageContent} type="text" placeholder={`Message ${focusedMate.fullName}...`} className='font-md border-none placeholder:text-sm   text-md outline-none bg-transparent w-full  ' />
            <div className=" r-e-c ">
                <BtnRecordAudio onWordsReayd={words => { handelSendMessageViaMic(words) }} />
                <button onClick={handelSendMessage} className='bg-black p-2 rounded-full opacity-70 hover:opacity-100 '>
                    <svg className='stroke-white w-5 h-5 stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path> </svg>
                </button>
            </div>
        </div>
    )
}

export default InputMessage2
