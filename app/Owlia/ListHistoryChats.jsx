"use client";
import { _onClickOutElem } from '@/utilityfunctions';
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

const ListHistoryChats = ({ OnnewMessage, chat_id }) => {
    const [FullChats, setFullChats] = useState({})
    OnnewMessage = e => {
        console.log(e);

    }
    const [isMenuOpened, setMenuOpened] = useState(true)
    const [isLoadedOldChats, setLoadedOlds] = useState(false)
    const menuRef = useRef();

    useEffect(() => {
        if (menuRef.current) {
            _onClickOutElem(menuRef.current, () => setMenuOpened(false))
        }
    }, [isMenuOpened]);
    
    return (
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



                        {
                            !isLoadedOldChats &&
                            <button className='w-full border r-c-c p-1 border-gray-400 rounded-xl font-semibold'>
                                <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4"></path> <path d="M12 13l0 9"></path> <path d="M9 19l3 3l3 -3"></path> </svg>
                                Load old chats
                            </button>
                        }


                    </motion.div>

                }
            </AnimatePresence>
            <button onClick={() => setMenuOpened(!isMenuOpened)} className='absolute bg-white p-2 rounded-xl top-3   right-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 6h16"></path> <path d="M7 12h13"></path> <path d="M10 18h10"></path> </svg>
            </button>
        </div>
    )
}

export default ListHistoryChats
