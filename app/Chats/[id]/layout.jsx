"use client"
import { useFriends } from '@/app/user/profile/FriendProvider';
import ChatHead from '@/components/chatHead';
import InputMessage2 from '@/components/InputMessage2';
import Spinner from '@/components/loaders/Spinner';
import { useParams } from 'next/navigation';
import { createContext, useEffect, useState } from 'react'
// export let setGlobalForcuedMate;
export let AddFocusedFriendTyping, UnsetFocusedFriendTyping;

export const ChatContext = createContext()

const layout = ({ children }) => {
    const { id } = useParams();
    const { thisUser, mates } = useFriends();
    const [GlobalFocusedMate, setGlobalFocusedMate] = useState(mates.find(r => r.chat_id == id)?.mate);
    const [isFocusedUserTyping, setFocuedUserTyping] = useState(false)

    AddFocusedFriendTyping = friendId => {
        if (GlobalFocusedMate._id == friendId) {
            setFocuedUserTyping(true)
        }
    }

    UnsetFocusedFriendTyping = friendId => {
        if (GlobalFocusedMate._id == friendId) {
            setFocuedUserTyping(false)
        }
    }

    useEffect(() => {
        setGlobalFocusedMate(mates.find(r => r.chat_id == id)?.mate)
    }, [mates, id]);



    return (
        <ChatContext.Provider value={{ GlobalFocusedMate, isFocusedUserTyping }}>
            <div className="h-full  w-full c-b-c max-w-6xl px-4 ">

                {
                    GlobalFocusedMate ?
                        <ChatHead data={GlobalFocusedMate} isFocusedUserTyping={isFocusedUserTyping} />
                        :
                        <div className="w-full ">
                            <Spinner height={20} width={20} borderWidth={3} />
                        </div>
                }

                {children}

                {
                    GlobalFocusedMate ?
                        <InputMessage2 chat_id={id} focusedMate={GlobalFocusedMate} />
                        :
                        <div className="w-full ">
                            <Spinner height={17} width={17} borderWidth={3} />
                        </div>
                }
            </div>
        </ChatContext.Provider>

    )
}

export default layout
