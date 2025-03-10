import { ChatContext } from '@/app/Chats/[id]/layout';
import { useFriends } from '@/app/user/profile/FriendProvider';
import { GetSocket } from '@/config/socket';
import { api, CorrectTime, DecodMessage, EncodMessage } from '@/utilityfunctions';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

const BtnSendFile = ({ isSent, isSending, onClick }) => {
    return (
        <>
            {
                isSent ?
                    <p className='text-xs font-normal opacity-60 ml-2'>sent</p>

                    :
                    <>
                        {
                            isSending ?
                                <span className='ml-4 text-blue-500 font-semibold'>
                                    sending..
                                </span>
                                :
                                <button onClick={onClick} className='p-1 px-2 border border-gray-400  rounded-2xl text-sm font-semibold opacity-70 r-s-c  ml-4 '>
                                    Send
                                    <svg className='w-5 h-5 ml-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M9 12h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v6h-6v-6z"></path> <path d="M9 21h6"></path> </svg>
                                </button>
                        }
                    </>
            }
        </>
    )
}

const ElemPx = ({ i }) => {
    const [elemheight, setElemHeight] = useState(Math.random() * 100);
    let Inter1;
    useEffect(() => {
        Inter1 = setInterval(() => {
            setElemHeight(Math.random() * 100)
        }, 100)
        return () => {
            clearInterval(Inter1)
        }
    })
    return <span key={i} style={{
        transition: ".2s",
        height: `${elemheight}% `,
        width: 34 + '%'
    }} className='rounded-tl-3xl rounded-tr-3xl bg-blue-500 '>

    </span>
}

const UploaderElem = ({ height, isSending, isSent }) => {
    const [elemheight, setElemHeight] = useState(height * 0.01)
    let inter1;
    useEffect(() => {
        inter1 = setInterval(() => {
            if (elemheight < height - 50) {
                setElemHeight(pv => pv + Math.random() * 10)
            } else {
                clearInterval(inter1)
            }
        }, 100);
        return () => {
            clearInterval(inter1)
        }
    }, [])

    return (
        <>
            <div style={{
                height: height + "px"
            }}
                className={`mt-1 c-e-c relative pt-4`}
            >
                <svg className={`w-7 h-7 stroke-gray-400  top-0 absolute`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" > <path d="M9 12h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v3h-6v-3z"></path>  </svg>
                <div className="h-full c-e-c w-3 pt-8 mt-1 border border-gray-400 rounded-sm">
                    <div className="w-full r-s-e h-2">
                        {
                            ...new Array(3).fill(0).map((c, i) => useMemo(() => <ElemPx key={i} i={i} />, []))
                        }

                    </div>
                    <div style={{ transition: 2, height: elemheight + "%" }} className="w-full bg-blue-500">

                    </div>
                </div>

            </div>
        </>
    )
}
const MessageTypeFile = ({ message }) => {
    console.log('this is the message at first =>', message);

    message = DecodMessage(message)
    let type = message.type;
    type = type?.substring(0, type.indexOf("/"));

    let blob = new Blob([message.content], { type: message.type });
    const src = URL.createObjectURL(blob);
    const { GlobalFocusedMate } = useContext(ChatContext);

    // ---------------------------
    const [isSending, setSending] = useState(false)
    const containerMediaRef = useRef();
    const { ActiveMates } = useFriends();

    const handelSendFile = async () => {
        setSending(true);
        if (ActiveMates?.includes(GlobalFocusedMate?._id)) {

            const socket = GetSocket()
            if (socket) {
                let EncodedMessa = EncodMessage(message)
                socket.emit("messageSent", { ...EncodedMessa, SocketTO: GlobalFocusedMate?._id }, (res) => {
                    console.log(res);
                    setSending(false);
                })
            }

        } else {

            let EncodedMessa = EncodMessage(message);
            console.log(EncodedMessa);
            
            let res = await api.post("/chat/addMessage", { ...EncodedMessa, isSent: true, recievedBy: [], readBy: [] })
            console.log(res);;
            setSending(false);
        }
    }
    useEffect(() => {
        if (message.isFromMe && !message.isSent) {
            handelSendFile();
        }
    }, [])


    return (
        <div className={`f-full  mb-8 ${message.isFromMe ? "r-e-c" : "r-s-c"}`}>
            {message.isFromMe ?
                <div className='r-e-s h-fit'>
                    {
                        isSending &&
                        <UploaderElem isSending={isSending} isSent={message.isSent} height={containerMediaRef.current?.offsetHeight} />
                    }
                    <div className="c-s-e bg-white p-1 px-4 rounded-2xl rounded-tr-none  max-w-4xl ">
                        <div ref={containerMediaRef} className="c-e-s" >

                            {type == "image" &&
                                <div className="c-c-c h-full relative"><img src={src} alt="" className="rounded-xl w-[400px]  max-h-[600px] min-h-full  object-cover" /></div>
                            }

                            {type == "video" &&
                                <div className="c-c-c h-full relative"><video onMouseOver={e => e.target?.play()} onMouseLeave={e => e.target?.pause()} src={src} alt="" className="rounded-xl w-[400px]  max-h-[600px] min-h-full  object-cover" /></div>
                            }
                            {
                                type != "image" && type != "video" &&
                                <div className="c-c-c h-full relative"><embed src={src} type={message.type} alt="" className="rounded-xl w-[400px]  h-48  min-h-full  overflow-hidden" /></div>
                            }

                        </div>
                        <div className="w-full r-b-c mt-4">
                            <div className="r-s-c">
                                <a className='p-1 px-2 border border-gray-400  rounded-2xl text-sm font-semibold opacity-70 r-s-c ' href={src} download>
                                    <svg className='w-5 h-5 mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path> <path d="M7 11l5 5l5 -5"></path> <path d="M12 4l0 12"></path> </svg>
                                    download
                                </a>
                                <a className='p-1 px-2 border border-gray-400  rounded-2xl text-sm font-semibold opacity-70 r-s-c  ml-4' href={src} target='_blank'>
                                    <svg className='w-5 h-5 mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path> <path d="M11 13l9 -9"></path> <path d="M15 4h5v5"></path> </svg>
                                    open
                                </a>
                            </div>
                            <div className="r-s-c">
                                <span className='text-xs opacity-40 font-semibold '>
                                    {CorrectTime(message.sendAt)}
                                </span>

                                {
                                    message.recievedBy?.length > 0 && message.readBy?.length == 0 &&
                                    <p className='text-xs text-gray-700 font-normal opacity-70 ml-2'>received</p>
                                }

                                {message.recievedBy?.length == 0 && message.readBy?.length == 0 &&
                                    <>
                                        <BtnSendFile onClick={handelSendFile} isSending={isSending} isSent={message.isSent} />

                                    </>
                                }

                                {message.readBy?.length > 0 &&
                                    <p className='text-xs font-normal text-blue-500 opacity-80 ml-2'>Checked </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='r-s-s '>
                    <div className="c-s-s bg-white  p-2 px-4 pl-4 rounded-2xl rounded-tl-none  max-w-4xl ">
                        <div ref={containerMediaRef} className="c-e-s" >
                            {type == "image" &&
                                <div className="c-c-c h-full relative"><img src={src} alt="" className="rounded-xl w-[400px]  max-h-[600px] min-h-full  object-cover" /></div>
                            }

                            {type == "video" &&
                                <div className="c-c-c h-full relative"><video onMouseOver={e => e.target?.play()} onMouseLeave={e => e.target?.pause()} src={src} alt="" className="rounded-xl w-[400px]  max-h-[600px] min-h-full  object-cover" /></div>
                            }
                            {
                                type != "image" && type != "video" &&
                                <div className="c-c-c h-full relative"><embed src={src} type={message.type} alt="" className="rounded-xl w-[400px]  h-48  min-h-full  overflow-hidden" /></div>
                            }

                        </div>
                        <div className="w-full r-b-c mt-4">
                            <div className="r-s-c">
                                <a className='p-1 px-2 border border-gray-400  rounded-2xl text-sm font-semibold opacity-70 r-s-c ' href={src} download>
                                    <svg className='w-5 h-5 mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path> <path d="M7 11l5 5l5 -5"></path> <path d="M12 4l0 12"></path> </svg>
                                    download
                                </a>
                                <a className='p-1 px-2 border border-gray-400  rounded-2xl text-sm font-semibold opacity-70 r-s-c  ml-4' href={src} target='_blank'>
                                    <svg className='w-5 h-5 mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path> <path d="M11 13l9 -9"></path> <path d="M15 4h5v5"></path> </svg>
                                    open
                                </a>
                            </div>
                            <div className="r-e-c">
                                <span className='text-xs opacity-40 font-semibold '>
                                    {CorrectTime(message.sendAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div >
    )
}

export default MessageTypeFile
