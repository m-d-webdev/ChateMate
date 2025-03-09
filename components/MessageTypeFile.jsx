import { CorrectTime } from '@/utilityfunctions';
import React from 'react'

const MessageTypeFile = ({ message }) => {
    let type = message.content.type;
    type = type.substring(0, type.indexOf("/"))
    let blob = new Blob([message.content.data], { type: message.content.type })

    const src = URL.createObjectURL(blob)

    return (
        <div className={`f-full  mb-8 ${message.isFromMe ? "r-e-c" : "r-s-c"}`}>
            {message.isFromMe ?
                <div className='r-e-s '>
                    <div className="c-s-e bg-white p-1 px-4 rounded-2xl rounded-tr-none  max-w-4xl ">
                        <div className="c-e-s">

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
                        <div className="w-full r-b-c mt-2">
                            <div className="r-s-c">
                                <a className='p-2 border border-gray-400  rounded-2xl text-sm font-semibold opacity-70 r-s-c ' href={src} download={message.content.name}>
                                    <svg className='w-5 h-5 mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path> <path d="M7 11l5 5l5 -5"></path> <path d="M12 4l0 12"></path> </svg>
                                    download
                                </a>
                                <a className='p-2 border border-gray-400  rounded-2xl text-sm font-semibold opacity-70 r-s-c  ml-4' href={src} target='_blank'>
                                    <svg className='w-5 h-5 mr-2'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path> <path d="M11 13l9 -9"></path> <path d="M15 4h5v5"></path> </svg>
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
                                    <p className='text-xs font-normal opacity-60 ml-2'>sent</p>
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
                    <div className="c-s-s bg-sky-200  p-2 px-4 pl-4 rounded-2xl rounded-tl-none  max-w-4xl ">
                        <div className="c-e-s">

                            {type == "image" &&
                                <div className="c-c-c h-full relative"><img src={src} alt="" className="rounded-xl w-56 min-w-56 h-full min-h-full mr-2 object-cover" /></div>
                            }
                            {type == "video" &&
                                <div className="c-c-c h-full relative"><video onMouseOver={e => e.target?.play()} onMouseLeave={e => e.target?.pause()} src={src} alt="" className="rounded-xl w-56 min-w-56 h-full min-h-full mr-2 object-cover" /></div>
                            }
                            {
                                type != "image" && type == "video" &&
                                <div className="c-c-c h-full relative"><embed src={src} type={message.type} alt="" className="rounded-xl w-56 min-w-56 h-full min-h-full mr-2 object-cover" /></div>
                            }
                        </div>
                        <div className="w-full r-e-c">
                            <span className='text-xs   opacity-70   ml-5 '>
                                {CorrectTime(message.sendAt)}
                            </span>
                        </div>
                    </div>
                </div>
            }

        </div >
    )
}

export default MessageTypeFile
