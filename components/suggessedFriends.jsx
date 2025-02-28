"use client";
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { _onClickOutElem } from '@/utilityfunctions';
import UserAvatar from '@/components/UserAvatar';

const SuggessedFriends = () => {
    const [isMenuOpened, setMenuOpened] = useState(false)
    const menuRef = useRef()
    const [suggesions, setsuggesions] = useState([
        {
            id: 1,
            fullName: "Ahmed Bennani",
            userName: "ahmed_b",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Hey, how are you?",
            sentAt: "2025-02-25T14:30:00Z"
        },
        {
            id: 2,
            fullName: "Sarah El Amrani",
            userName: "sarah.amr",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "I'll call you later!",
            sentAt: "2025-02-25T13:45:00Z"
        },
        {
            id: 3,
            fullName: "Omar Khalil",
            userName: "omar_kh",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Did you check that link?",
            sentAt: "2025-02-25T12:20:00Z"
        },
        {
            id: 4,
            fullName: "Layla Hamzaoui",
            userName: "layla_hz",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "See you tomorrow!",
            sentAt: "2025-02-25T11:10:00Z"
        },
        {
            id: 5,
            fullName: "Hassan Taoufik",
            userName: "hassan_tk",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Let's meet up later.",
            sentAt: "2025-02-25T10:05:00Z"
        },
        {
            id: 6,
            fullName: "Yasmine Rachid",
            userName: "yasmine_r",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Just finished work!",
            sentAt: "2025-02-25T09:30:00Z"
        },
        {
            id: 7,
            fullName: "Khalid Mansour",
            userName: "khalid_m",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "I'll send you the details soon.",
            sentAt: "2025-02-25T08:45:00Z"
        },
        {
            id: 8,
            fullName: "Nour Belkacem",
            userName: "nour_bk",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Thank you!",
            sentAt: "2025-02-25T07:55:00Z"
        },
        {
            id: 9,
            fullName: "Rachid El Idrissi",
            userName: "rachid_ei",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Did you get my email?",
            sentAt: "2025-02-25T06:20:00Z"
        },
        {
            id: 10,
            fullName: "Salma Jebli",
            userName: "salma_j",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Good morning!",
            sentAt: "2025-02-25T05:10:00Z"
        },
        {
            id: 11,
            fullName: "Hamza Ziani",
            userName: "hamza_z",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Can we talk now?",
            sentAt: "2025-02-24T22:50:00Z"
        },
        {
            id: 12,
            fullName: "Fatima Ould",
            userName: "fatima_ou",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "I'm almost there!",
            sentAt: "2025-02-24T21:15:00Z"
        },
        {
            id: 13,
            fullName: "Ali Bouras",
            userName: "ali_b",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Let's catch up soon.",
            sentAt: "2025-02-24T20:40:00Z"
        },
        {
            id: 14,
            fullName: "Meriem Cherkaoui",
            userName: "meriem_ch",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Have a great day!",
            sentAt: "2025-02-24T19:30:00Z"
        },
        {
            id: 15,
            fullName: "Yassine Bouziane",
            userName: "yassine_bz",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "I'll be late tonight.",
            sentAt: "2025-02-24T18:05:00Z"
        },
        {
            id: 16,
            fullName: "Imane Loukili",
            userName: "imane_lk",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Sounds good!",
            sentAt: "2025-02-24T17:25:00Z"
        },
        {
            id: 17,
            fullName: "Tariq Jabbari",
            userName: "tariq_jb",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Where are you now?",
            sentAt: "2025-02-24T16:45:00Z"
        },
        {
            id: 18,
            fullName: "Aya Benhadi",
            userName: "aya_bh",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "I'll let you know soon.",
            sentAt: "2025-02-24T15:20:00Z"
        },
        {
            id: 19,
            fullName: "Mohamed Fassi",
            userName: "mohamed_f",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "See you at the meeting!",
            sentAt: "2025-02-24T14:10:00Z"
        },
        {
            id: 20,
            fullName: "Nada Tazi",
            userName: "nada_tz",
            pic: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "It was great talking to you!",
            sentAt: "2025-02-24T13:00:00Z"
        }
    ]);
    const [isLoading, setLoading] = useState(true)
    const getSuggesstionFriends = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false)
    };

    useEffect(() => {
        if (menuRef.current) {
            _onClickOutElem(menuRef.current, () => setMenuOpened(false))
        }
        getSuggesstionFriends()
    }, [isMenuOpened])
    return (
        <div className="c-s-s relative  h-3/4 ">
            <AnimatePresence>
                {
                    isMenuOpened &&
                    <motion.div
                        ref={menuRef}
                        initial={{
                            width: 0,
                            transition: {
                                type: "spring"
                            }
                        }}
                        exit={{
                            width: 0,
                        }}
                        animate={{
                            width: "300px",
                            transition: {
                                type: "spring"
                            }
                        }}
                        className="h-full absolute top-0 right-0  p-3 c-s-s p10 rounded-xl bg-white  overflow-hidden  z-10" style={{
                            filter: "drop-shadow(-5px 0px 6px var(--filter-color))"
                        }}>
                        <div className="w-full r-s-c opacity-80 ">
                            <button onClick={() => setMenuOpened(false)} className='mr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M9 4v16"></path> <path d="M14 10l2 2l-2 2"></path> </svg>
                            </button>
                            <h1 className='truncate w-full  text-sm'>
                                suggestions you might like
                            </h1>
                        </div>

                        <div className="h-full pt-5 max-h-full scrl_none overflow-auto">
                            {
                                isLoading ?
                                    <p>Loading ...</p>
                                    :
                                    <>
                                        {
                                            suggesions.map(s => <UserAvatar user={s} key={s.id} />)
                                        }

                                    </>
                            }
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            <button onClick={() => setMenuOpened(!isMenuOpened)} className='absolute bg-white p-2 rounded-xl top-3 opacity-70  r-s-c  right-2'>
                <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M9 4v16"></path> <path d="M15 10l-2 2l2 2"></path> </svg>
                suggestions

            </button>
        </div>

    )
}

export default SuggessedFriends
