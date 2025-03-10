import React, { useState } from 'react'
import DialogAddFile from './DialogAddFile'
import { AnimatePresence } from 'framer-motion'
import Spinner from './loaders/Spinner'
import { UseAllChats } from '@/app/Chats/MessagesProvider'
import { useFriends } from '@/app/user/profile/FriendProvider'
import { EncodMessage } from '@/utilityfunctions'

const BtnUploadFiles = ({ chat_id }) => {
    const [isDialogAddFileVSBL, setDialogAddFileVSBL] = useState(false)
    const [isSendingFiles, setSendingFiles] = useState(false);
    const { setChats } = UseAllChats()
    const { thisUser } = useFriends();
    const onFilesReady = async (files) => {
        setSendingFiles(true)
        setDialogAddFileVSBL(false)
        let GroupMessages = [];

        await Promise.all(
            files.map(async (f) => {
                let ms = await handelSendMessageFile(f);
                GroupMessages.push({ ...ms, recievedBy: [], readBy: [], senderId: thisUser._id })
            })
        )

        setChats((prevChats) => {
            return {
                ...prevChats,
                [chat_id]: prevChats[chat_id] ?
                    [...prevChats[chat_id], ...GroupMessages]
                    : [...GroupMessages]
            };
        });

        setSendingFiles(false)
    }

    const handelSendMessageFile = async (file) => {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const reader = new FileReader();
                    reader.onload = async () => {
                        let messageId = `${Date.now()}-${thisUser._id}${Math.random() * 684}`;
                        let now = new Date();
                        let HollMessage = { content: reader.result, isSent: false, type: file.type, chat_id, _id: messageId, sendAt: now };
                        HollMessage = EncodMessage(HollMessage);
                        resolve(HollMessage)
                    }

                    reader.readAsArrayBuffer(file);

                } catch (error) {
                    console.log(error);

                    reject(error)
                }
            })

    }
    return (
        <div className='relative mr-3'>
            {
                isSendingFiles ?
                    <Spinner height={20} width={20} borderWidth={3} />
                    :
                    <button onClick={() => setDialogAddFileVSBL(true)} className='p-1 bg-white border img border-gray-400'>
                        <svg className='w-5 h-5  stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}> <path d="M15 3v4a1 1 0 0 0 1 1h4"></path> <path d="M15 3v4a1 1 0 0 0 1 1h4"></path> <path d="M6 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7"></path> <path d="M3 15l3 -3l3 3"></path> </svg>
                    </button>
            }
            <AnimatePresence>

                {
                    isDialogAddFileVSBL &&
                    <DialogAddFile onClose={() => setDialogAddFileVSBL(false)} onFilesReady={onFilesReady} />
                }
            </AnimatePresence>
        </div>
    )
}

export default BtnUploadFiles
