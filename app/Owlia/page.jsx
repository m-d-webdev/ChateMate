"use client";
import WriteMessage from '@/components/WriteMessage';
import Image from 'next/image';
import { Aoboshi_One } from 'next/font/google'
import React, { useEffect, useRef, useState } from 'react'
import Message from '@/components/message';
import { AnimatePresence, motion } from 'framer-motion';
import { _onClickOutElem, api } from '@/utilityfunctions';
import Loader from '@/components/loaders/Loader';
import Cookies from 'js-cookie';
const aoboshi_One = Aoboshi_One({
    subsets: ['latin'],
    weight: ['400']
})
const page = () => {
    const [user, setUser] = useState(null);
    const getCurrentUser = async () => {
        if (Cookies.get("token")) {
            const res = await api.get("/user/get")
            setUser(res.data.user)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    const [isMenuOpened, setMenuOpened] = useState(false)
    const [MyMessages, setMyMessages] = useState([]);
    const [FaileToResponse, setFaileToResponse] = useState(false);
    const [messages, setMessages] = useState([]);

    const [NewMessage, setNewMessage] = useState("")
    const menuRef = useRef();

    const [isWaitingForResponse, setWaitingForResponse] = useState(false)
    const messageContainerRef = useRef()


    const SendMessage = async () => {
        setWaitingForResponse(true);

        let chatHistroy = messages.map(m => ({ role: m.isFromMe ? "user" : "assistant", content: m.content })).slice(-5);

        chatHistroy.push(
            {
                role: "user",
                content: NewMessage
            }
        )


        setMessages(pv => ([
            ...pv,
            {
                content: NewMessage,
                isFromMe: true,
                img: user ? user.pic : "https://i.pinimg.com/236x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
            }
        ]))
        setNewMessage("");

        let res = await api.post("/owlia/ask", { chatHistroy })


        if (res.status == 200) {
            setMessages(pv => ([
                ...pv,
                {
                    content: res.data.answer.reply,
                    isFromMe: false,
                    img: "/icones/owliaLogo.svg",
                }
            ]))
            messageContainerRef.current.scrollTo({
                top: messageContainerRef.current?.scrollHeight - 300,
                behavior: "smooth"
            })

        } else {
            setFaileToResponse(true)
        }

        setWaitingForResponse(false);
    }



    useEffect(() => {
        if (menuRef.current) {
            _onClickOutElem(menuRef.current, () => setMenuOpened(false))
        }
    }, [isMenuOpened])

    return (
        <div className='w-full r-b-s p-4 h-screen'>
            <div className="r-s-c">
                <Image

                    src={'/icones/owliaLogo.svg'}
                    width={30}
                    height={30}
                    alt='owliaLogo'
                    className='mr-3'
                />
                <h1 className='font-bold text-xl'>Owlia</h1>
            </div>

            <div className="h-full w-full  max-w-6xl c-c-c">
                {
                    messages.length == 0 ?
                        <div className='c-c-c mb-20'>
                            <Image
                                src={'/icones/owliaLogo.svg'}
                                width={80}
                                height={80}
                                alt='owliaLogo'
                            />
                            <h1 className={`text-3xl tracking-[.1px] mt-4 ${aoboshi_One.className}`}>
                                What's up ? Let’s chat and have a good time!
                            </h1>
                        </div>
                        :
                        <div style={{ paddingBottom: `${messageContainerRef.current?.offsetHeight - 100}px` }} ref={messageContainerRef} className='h-full scrl_none pt-10 mb-2 w-full max-h-full overflow-auto ' >
                            {
                                messages.map((m, i) => <Message m={m} key={i} />)
                            }

                            {
                                isWaitingForResponse &&
                                <div className="w-full r-s-c">
                                    <Loader height={70} />
                                </div>
                            }
                            {
                                FaileToResponse &&
                                <p className="text-red-500 ">
                                    Owlia encountered an error and could not respond
                                </p>
                            }
                        </div>

                }
                <WriteMessage
                    onChange={e => setNewMessage(e)}
                    className={''}
                    onSend={SendMessage}
                    value={NewMessage}
                    isWaitinForRespose={isWaitingForResponse}
                    placeholder={"Ask Owlia anything .. "}
                />
            </div>
            <div className="c-s-s relative  h-full ">
                <AnimatePresence>
                    {
                        isMenuOpened &&
                        <motion.div
                            ref={menuRef}
                            initial={{
                                width: 10,
                            }}
                            exit={{
                                width: 10,
                            }}
                            animate={{
                                width: "300px",
                                transition: {
                                    type: "keyframes"
                                }
                            }}
                            className="h-full p-3 c-s-s p10 rounded-xl bg-white max-h-screen overflow-hidden  z-10" style={{
                                filter: "drop-shadow(-5px 0px 6px var(--filter-color))"
                            }}>
                        </motion.div>

                    }
                </AnimatePresence>
                <button onClick={() => setMenuOpened(!isMenuOpened)} className='absolute bg-white p-2 rounded-xl top-3   right-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 6h16"></path> <path d="M7 12h13"></path> <path d="M10 18h10"></path> </svg>
                </button>
            </div>


        </div>
    )
}

export default page
