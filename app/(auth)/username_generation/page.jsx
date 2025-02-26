"use client";
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import CustomInput from '@/components/CustomInput'
const page = () => {
    return (
        <div className="w-full  p-10   h-screen c-b-c">
            <div className=""></div>
            <div className="r-p-c rounded-md border w-full h-full  max-w-screen-2xl">
                <div className="c-s-s w-6/12 max-w-xl">
                    <h1 className="text-3xl">Sign Up for ChateMate </h1>
                    <div className="c-s-s mt-5">

                        <p className="op-70 mt-2">Username Generation </p>
                    </div>

                    <CustomInput
                        Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path> <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path> <path d="M4 16v2a2 2 0 0 0 2 2h2"></path> <path d="M16 4h2a2 2 0 0 1 2 2v2"></path> <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path> <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"></path> </svg>}
                        label={"Generat a Username"}
                        onChange={() => { }}
                        placeholder=''
                        id='userName'
                        className='mt-20'
                    />
                    <button className='bg-green-500 text-white px-6 py-2 rounded-md mt-2'>
                        Auto-Generate
                    </button>

                    <div className="w-full  max-w-md mt-8 r-e-c">
                        <button className='bg-black text-white px-10 py-1 rounded-md r-c-c font-bold'>
                            Finish creation
                            <svg className='w-6 h-6 ml-2 stroke-2 stroke-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 5l0 14"></path> <path d="M5 12l14 0"></path> </svg>
                        </button>
                    </div>

                </div>
                <div className="h-full c-e-e w-6/12">
                    <Image src={"/media/logoImg.png"} className="" objectFit='cover' width={'300'} height={'300'} alt="chatemate logo" />
                </div>
            </div>
            <div className="w-full  r-b-c mt-12">
                <div className="r-s-c ml-10">
                    <span className="text-bold opacity-70">
                        We are posting new features here :
                    </span>

                    <a className="r-s-c opacity-60 hover:opacity-100  " href="https://facebook.com" target="_blank">
                        <svg className="w-6 h-6 stroke-2 stroke-blue-500  ml-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path> </svg>
                        <p className="ml-2  text-blue-500">
                            ChateMate.fb
                        </p>
                    </a>

                    <a className="r-s-c ml-5 opacity-60 hover:opacity-100  " href="https://instagramm.com" target="_blank">
                        <svg className="w-6 stroke-2 stroke-blue-500  h-6 ml-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path> <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M16.5 7.5l0 .01"></path> </svg>
                        <p className="ml-2  text-blue-500">
                            ChateMate.insta
                        </p>
                    </a>

                    <a className="r-s-c  ml-5 opacity-60 hover:opacity-100 " href="https://www.linkedin.com" target="_blank">
                        <svg className="w-6 stroke-2 stroke-blue-500 h-6 ml-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M8 11l0 5"></path> <path d="M8 8l0 .01"></path> <path d="M12 16l0 -5"></path> <path d="M16 16v-3a2 2 0 0 0 -4 0"></path> </svg>
                        <p className="ml-2 text-blue-500">
                            ChateMate.lin
                        </p>
                    </a>

                </div>
                <Link href={"/l"} className="opacity-70  r-s-c mr-10">
                    Mind Behind ChatMate
                    <svg className="w-6 h-6 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>
                </Link>
            </div>
        </div>
    )
}

export default page
