"use client";
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { _onClickOutElem, api } from '@/utilityfunctions';
import UserAvatar from '@/components/UserAvatar';
import Spinner from './loaders/Spinner';

const SuggessedFriends = () => {


    const [isMenuOpened, setMenuOpened] = useState(false)
    const menuRef = useRef()
    const [suggesions, setsuggesions] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const getSuggesstionFriends = async () => {
        setLoading(true)
        let res = await api.get("/meetMates/suggestions");
        setsuggesions(res.data.suggestions);
        setLoading(false)
    };

    useEffect(() => {
        getSuggesstionFriends()
    }, [])

    useEffect(() => {
        if (menuRef.current) {
            _onClickOutElem(menuRef.current, () => setMenuOpened(false))
        }

    }, [isMenuOpened])
    return (
        <div className="c-s-s relative  w-2/12 h-3/4 ">
            <AnimatePresence>
                {
                    isMenuOpened &&
                    <motion.div
                        ref={menuRef}
                        initial={{
                            width: 0,
                            opacity: 0,
                            transition: {
                                type: "spring"
                            }
                        }}
                        exit={{
                            width: 0,
                            opacity: 0,
                        }}
                        animate={{
                            width: "300px",
                            opacity: 1,
                            transition: {
                                type: "keyframes"
                            }
                        }}
                        className="h-full absolute top-0 right-0  p-3 c-s-s p10 rounded-xl bg-white  overflow-hidden  z-10" style={{
                            filter: "drop-shadow(-5px 0px 6px var(--filter-color))"
                        }}>
                        <div className="w-full r-s-c opacity-80 ">

                            <h1 className='truncate w-full  text-sm'>
                                suggestions you might like
                            </h1>
                            <button onClick={() => setMenuOpened(false)} className='mr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M9 4v16"></path> <path d="M14 10l2 2l-2 2"></path> </svg>
                            </button>
                        </div>
                        

                        <div className="h-full pt-5 max-h-full scrl_none w-full overflow-auto">
                            {
                                isLoading ?
                                    <div className="w-full c-c-c h-20">
                                        <Spinner />
                                    </div>
                                    :
                                    <>
                                        {
                                            suggesions.map(s => <UserAvatar user={s} key={s._id} />)
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
