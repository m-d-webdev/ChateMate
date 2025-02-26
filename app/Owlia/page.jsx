"use client"
import WriteMessage from '@/components/WriteMessage';
import Image from 'next/image';
import { Aoboshi_One } from 'next/font/google'
import React, { useEffect, useRef, useState } from 'react'
import Message from '@/components/message';
import { AnimatePresence, motion } from 'framer-motion';
import { _onClickOutElem } from '@/utilityfunctions';
const aoboshi_One = Aoboshi_One({
    subsets: ['latin'],
    weight: ['400']
})
const page = () => {

    const [isMenuOpened, setMenuOpened] = useState(false)
    const [MyMessages, setMyMessages] = useState([]);
    const [OwliaMessages, setOwliaMessages] = useState([]);
    const messages = [
        {
            id: 1,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Hi there! How are you today?",
            isFromMe: true,
        },
        {
            id: 2,
            img: "/icones/owliaLogo.svg",
            content: "I'm doing well, thank you! How can I assist you?",
            isFromMe: false,
        },
        {
            id: 3,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Can you tell me more about letter spacing in Tailwind CSS?",
            isFromMe: true,
        },
        {
            id: 4,
            img: "/icones/owliaLogo.svg",
            content: "Sure! Letter spacing can be adjusted using the `tracking` utility classes.",
            isFromMe: false,
        },
        {
            id: 5,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "That's great! Can you show me an example?",
            isFromMe: true,
        },
        {
            id: 6,
            img: "/icones/owliaLogo.svg",
            content: "Certainly! You can use classes like `tracking-tight`, `tracking-normal`, and `tracking-wide` Certainly! You can use classes like `tracking-tight`, `tracking-normal`, and `tracking-wide` Certainly! You can use classes like `tracking-tight`, `tracking-normal`, and `tracking-wide`.",
            isFromMe: false,
        },
        {
            id: 7,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "How do I customize letter spacing in my project?",
            isFromMe: true,
        },
        {
            id: 8,
            img: "/icones/owliaLogo.svg",
            content: "You can add custom values in your Tailwind configuration file under the `letterSpacing` section.",
            isFromMe: false,
        },
        {
            id: 9,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Can I use negative letter spacing?",
            isFromMe: true,
        },
        {
            id: 10,
            img: "/icones/owliaLogo.svg",
            content: "Yes, you can use negative values in your configuration for tighter letter spacing.",
            isFromMe: false,
        },
        {
            id: 11,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "What are some common use cases for letter spacing?",
            isFromMe: true,
        },
        {
            id: 12,
            img: "/icones/owliaLogo.svg",
            content: "Common use cases include improving readability, creating emphasis, or achieving a specific aesthetic.",
            isFromMe: false,
        },
        {
            id: 13,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Can I apply letter spacing to headings and paragraphs?",
            isFromMe: true,
        },
        {
            id: 14,
            img: "/icones/owliaLogo.svg",
            content: "Absolutely! You can apply letter spacing to any text element using the appropriate classes.",
            isFromMe: false,
        },
        {
            id: 15,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Thanks for the help! This is really useful.",
            isFromMe: true,
        },
        {
            id: 16,
            img: "/icones/owliaLogo.svg",
            content: "You're welcome! If you have any more questions, feel free to ask.",
            isFromMe: false,
        },
        {
            id: 17,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "What other utilities should I explore in Tailwind CSS?",
            isFromMe: true,
        },
        {
            id: 18,
            img: "/icones/owliaLogo.svg",
            content: "You might want to look into margin, padding, and color utilities for better layout control.",
            isFromMe: false,
        },
        {
            id: 19,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Awesome! I’ll check those out. Thank you!",
            isFromMe: true,
        },
        {
            id: 20,
            img: "/icones/owliaLogo.svg",
            content: "Happy to help! Enjoy your coding!",
            isFromMe: false,
        },
    ];
    const menuRef = useRef()

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
            <div className="h-full w-full max-w-6xl c-c-c">
                {
                    messages.length == 0 ?
                        <div className='c-c-c mb-20'>
                            <Image

                                src={'/icones/owliaLogo.svg'}
                                width={80}
                                height={80}
                                alt='owliaLogo'
                            />
                            <h1 className={`text-3xl tracking-[.5px] mt-4 ${aoboshi_One.className}`}>
                                What's up ? Let’s chat and have a good time!
                            </h1>
                        </div>
                        :
                        <div className='h-full scrl_none pt-10 mb-2 w-full max-h-full overflow-auto ' >
                            {
                                messages.map(m => <Message m={m} key={m.id} />)
                            }
                        </div>

                }
                <WriteMessage
                    className={''}
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
