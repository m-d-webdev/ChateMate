"use client";
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'

export let OpenNote;

const Note = () => {
    const [isVisible, setVVisibility] = useState(false);
    const [isSentImg, setisSentImg] = useState(false);

    OpenNote = (ms) => {
        setisSentImg(ms == "done")
        setVVisibility(true)
    }
    return (
        <>
            <AnimatePresence>

                {
                    isVisible &&
                    <div className="modal c-c-c">
                        <motion.div
                            initial={{
                                scale: 1.1,
                                opacity: 0
                            }}
                            exit={{
                                scale: 1.1,
                                opacity: 0
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    duration: .1,
                                    type: "keyframes"
                                }
                            }}
                            className="p-3 c-c-c max-w-screen-sm rounded-3xl bg-white">
                            {
                                isSentImg ?
                                    <>
                                        <img src="/media/imgDone.png" className='w-72' alt="" />
                                        <h1 className="text-xl">Image uploaded successfully! But it may not be stored forever.</h1>
                                        <p className='text-center max-w-[80%] mt-2'>Due to storage limitations, we can't keep all user media indefinitely. Your support can help us improve! Consider <a href="https://buymeacoffee.com/iderkaoui" target='_blank' className='font-semibold text-blue-500 '>buying us a coffee</a> to enhance our service.</p>

                                    </>
                                    :

                                    <>
                                        <img src="/media/maBeenSorry.png" className='w-72' alt="" />
                                        <h1 className='text-xl'>We Apologize, but the File Can't Be Sent</h1>
                                        <p className='text-center max-w-[80%] mt-2'>We can only send this file if your friend is online. Due to storage limitations, we send it directly through the server.</p>
                                        <p className='text-center max-w-[80%] mt-2'>Your support can help us improve! Consider <a href="https://buymeacoffee.com/iderkaoui" target='_blank' className='font-semibold text-blue-500 '>buying us a coffee</a> to help enhance the service.</p>

                                    </>

                            }

                            <button onClick={() => setVVisibility(false)} className='w-52 p-2 bg-blue-500 mt-8 text-white font-semibold rounded-md'>
                                Got it !
                            </button>
                        </motion.div>
                    </div>
                }
            </AnimatePresence>
        </>
    )
}

export default Note
