"use client";
import React, { useState } from 'react'
import Btn_Back from './LinkBack'
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion'
const CustomDialog = ({ children, referer, className, dialogClassName }) => {
    const router = useRouter();
    const [isOpen, setOpen] = useState(true)
    const handelCloseDialog = () => {
        setOpen(false)
        setTimeout(
            () => {
                router.back()
            }
            , 200
        )

    }
    return (
        <dialog
            onClose={handelCloseDialog}
            className={`modal c-c-c ${dialogClassName}`}>
            <AnimatePresence>
              
                {
                    isOpen &&
                    <motion.div
                        initial={{
                            y:10,
                            opacity: 0
                        }}
                        exit={{
                            y: 10,
                            opacity: 0
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: .02,
                                type:"spring"
                            }
                        }}
                        className={`p-4 bg-white pt-6 rounded-xl relative ${className}`}>
                        <Btn_Back onClick={handelCloseDialog} />
                        {children}
                    </motion.div>
                }

            </AnimatePresence>

        </dialog>
    )
}

export default CustomDialog
