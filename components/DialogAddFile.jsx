"use client";
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Btn_Back from './LinkBack';
import { _onClickOutElem } from '@/utilityfunctions';
const DialogAddFile = ({ onClose, onFilesReady }) => {
    const ContainerRef = useRef()
    useEffect(() => {
        ContainerRef.current && _onClickOutElem(ContainerRef.current, () => onClose())
    }, [])

    const [choosedFiles, setFiles] = useState([])

    const handelUploadFiles = e => {
        if (e.target.files.length > 0) {
            for (let i = 0; i < e.target.files.length; i++) {
                let file = e.target.files[i];
                if (!choosedFiles.some(f => f.name == file.name)) {
                    setFiles(pv => [...pv, file]);
                }
            }


        }

    }
    const handeDelFile = e => {
        setFiles(choosedFiles.filter((f, i) => i != e));
    }

    const handelSendFiles = () => {
        onFilesReady(choosedFiles)
    }

    return ReactDOM.createPortal(
        <div className='modal c-c-c'>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 100
                }}

                exit={{
                    opacity: 0,
                    y: 100,
                    transition: {
                        duration: .2,
                        type: "tween"
                    }
                }}

                animate={{
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: .1,
                        type: "tween"
                    }
                }}
                ref={ContainerRef}
                className="w-full bg-white max-w-screen-sm p-4 rounded-2xl relative pt-10">
                <Btn_Back onClick={onClose} />
                <div className="r-s-c">
                    <svg className='w-6 h-6 mr-2  stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}> <path d="M15 3v4a1 1 0 0 0 1 1h4"></path> <path d="M15 3v4a1 1 0 0 0 1 1h4"></path> <path d="M6 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7"></path> <path d="M3 15l3 -3l3 3"></path> </svg>
                    <h1>Share files with a friend</h1>
                </div>

                <div className="r-p-c w-full mt-8">
                    <input onChange={handelUploadFiles} className='hidden' type="file" accept='image/*' name="" multiple id="inpImage" />
                    <label className='opacity-80  hover:opacity-100 cursor-pointer border border-gray-300 rounded-2xl p-4 c-c-c h-40 mr-5 w-4/12' htmlFor='inpImage'>
                        <svg className=' w-11 h-11 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M15 8h.01"></path> <path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644"></path> <path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644"></path> <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path> <path d="M4 16v2a2 2 0 0 0 2 2h2"></path> <path d="M16 4h2a2 2 0 0 1 2 2v2"></path> <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path> </svg>
                        <h2 className='mt-2 font-semibold'> image</h2>
                    </label>
                    <input onChange={handelUploadFiles} className='hidden' type="file" accept="video/*" multiple name="" id="impVideo" />
                    <label className='opacity-80  hover:opacity-100 cursor-pointer border border-gray-300 rounded-2xl p-4 c-c-c h-40 mr-5 w-4/12' htmlFor="impVideo">
                        <svg className=' w-11 h-11 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"></path> <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path> </svg>
                        <h2 className='mt-2 font-semibold'>Video</h2>
                    </label>
                    <input onChange={handelUploadFiles} className='hidden' type="file" accept=".pdf,.docx,.txt,.csv,.xls,.pptx" multiple name="" id="inpFIle" />
                    <label className='opacity-80  hover:opacity-100 cursor-pointer border border-gray-300 rounded-2xl p-4 c-c-c h-40  w-4/12' htmlFor='inpFIle'>
                        <svg className=' w-11 h-11 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M14 3v4a1 1 0 0 0 1 1h4"></path> <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path> <path d="M9 9l1 0"></path> <path d="M9 13l6 0"></path> <path d="M9 17l6 0"></path> </svg>
                        <h2 className='mt-2 font-semibold'>File</h2>
                    </label>
                </div>

                {
                    choosedFiles.length > 0 &&
                    <div className="w-full r-s-c h-64 mt-4  overflow-auto">
                        {
                            choosedFiles.map((f, i) => {
                                let type = f.type.substring(0, f.type.indexOf("/"))
                                const src = URL.createObjectURL(f)
                                if (type == "image") {
                                    return <div key={f.name} className="c-c-c h-full relative"><button onClick={() => handeDelFile(i)} className='absolute top-1 right-3 opacity-50 hover:opacity-100 group bg-white c-c-c img p-1'><svg className='w-5 h-5 group-hover:stroke-red-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}> <path d="M4 7l16 0"></path> <path d="M10 11l0 6"></path> <path d="M14 11l0 6"></path> <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path> </svg> </button><img src={src} alt="" className="rounded-xl w-56 min-w-56 h-full min-h-full mr-2 object-cover" /></div>
                                }
                                if (type == "video") {
                                    return <div key={f.name} className="c-c-c h-full relative"><button onClick={() => handeDelFile(i)} className='absolute z-20 top-1 right-3 opacity-50 hover:opacity-100 group bg-white c-c-c img p-1'><svg className='w-5 h-5 group-hover:stroke-red-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}> <path d="M4 7l16 0"></path> <path d="M10 11l0 6"></path> <path d="M14 11l0 6"></path> <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path> </svg> </button><video onMouseOver={e => e.target?.play()} onMouseLeave={e => e.target?.pause()} src={src} alt="" className="rounded-xl w-56 min-w-56 h-full min-h-full mr-2 object-cover" /></div>
                                }
                                else {
                                    return <div key={f.name} className="c-c-c h-full relative"><button onClick={() => handeDelFile(i)} className='absolute top-1 right-3 opacity-50 hover:opacity-100 group bg-white c-c-c img p-1'><svg className='w-5 h-5 group-hover:stroke-red-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}> <path d="M4 7l16 0"></path> <path d="M10 11l0 6"></path> <path d="M14 11l0 6"></path> <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path> </svg> </button><embed src={src} type={f.type} alt="" className="rounded-xl w-56 min-w-56 h-full min-h-full mr-2 object-cover" /></div>
                                }
                            })
                        }
                    </div>
                }
                <div className="w-full r-e-c mt-8">
                    <button onClick={onClose} className='border-gray-500 border  opacity-80 hover:opacity-100  r-c-c text-gray-500 mr-4 p-1 px-4 rounded-md w-32'>
                        <svg className='stroke-2 mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path> <path d="M9 9l6 6m0 -6l-6 6"></path> </svg>
                        Cancel

                    </button>
                    {
                        choosedFiles.length > 0 &&
                        <button onClick={handelSendFiles} className='border-blue-500 border-2  r-c-c text-blue-500 p-1 px-4 rounded-md w-32'>
                            Send
                            <svg className='stroke-2 ml-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path> </svg>
                        </button>
                    }
                </div>
            </motion.div>
        </div>,
        document.body
    )
}

export default DialogAddFile
