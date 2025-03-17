"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import CustomInput from '@/components/CustomInput'
import { api } from '@/utilityfunctions';
import Spinner from '@/components/loaders/Spinner';
import Cookies from 'js-cookie';
const page = () => {

    const [isLoading, setLoading] = useState(false)
    const [emailOrName, setEmail] = useState('')
    const [password, setPassword] = useState("111111")
    const [isError, setError] = useState(false)

    const handelLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        await api.post('/login', { emailOrName, password }).then((res) => {
            if (res.data.token) {
                console.log(res.data.token);
                
                Cookies.set('token', res.data.token)
                window.location.href = "/"
            }
        })
            .catch(err => {
                setLoading(false)
                setError(true)
            })


    }

    return (
        <div className="w-full  p-10   h-screen c-b-c">
            <div className=""></div>
            <div className="r-p-c rounded-md border w-full h-full  max-w-screen-2xl">
                <div className="c-s-s w-6/12 max-w-xl">
                    <div className="c-s-s w-full">

                        <h1 className="text-2xl">Login to ChateMate </h1>
                        <div className="r-s-e mt-2">
                            <h2 className=" text-xl">
                                Welcome back!
                            </h2>
                            <p className="op-70 ml-3">Log in to your account</p>
                        </div>
                    </div>

                    <div className="c-s-s w-full">
                        {
                            isError &&
                            <p className="text-red-500">
                                Sorry, login failed. Please check your credentials and try again
                            </p>
                        }
                        <CustomInput
                            Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path> <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"></path> </svg>}
                            label={"Email"}
                            onChange={e => setEmail(e)}
                            value={emailOrName}
                            placeholder=''
                            id='email'

                            className='mt-20'
                        />

                        <CustomInput
                            Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path> <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path> <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path> </svg>}
                            label={"Password"}
                            onChange={(e) => setPassword(e)}
                            placeholder=''
                            value={password}
                            className='mt-5'
                            id='password'
                            type="password"
                        />

                        <Link
                            className='mt-4 opacity-70'
                            href={'/restorPassword'}
                        >
                            Forgot Password?
                        </Link>
                        <div className="w-full  max-w-md mt-5 r-e-c">
                            <button onClick={handelLogin} disabled={emailOrName == "" || password == ""} className='bg-black disabled:opacity-70 text-white px-10 py-1 rounded-md r-c-c font-bold'>
                                {
                                    isLoading ?
                                        <Spinner isWhite={true} />
                                        :
                                        <>
                                            Login
                                            <svg className='fill-white ml-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" /></svg>
                                        </>
                                }
                            </button>
                        </div>

                    </div>

                    <div className="c-s-s w-full">
                        <div className="w-full  max-w-md mt-20 r-p-c">
                            <button className='py-3 mr-1 border group rounded-md  w-2/4 r-c-c'>
                                <svg className=' group-hover:stroke-none group-hover:fill-red-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z"></path> </svg>
                                <p className="font-bold group-hover:text-red-500 ml-2 opacity-70">
                                    Google
                                </p>
                            </button>
                            <button className='py-3 border group rounded-md  w-2/4 r-c-c'>
                                <svg className=' group-hover:stroke-none group-hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path> </svg>
                                <p className="font-bold ml-2  group-hover:text-blue-500 opacity-70">
                                    Facebook
                                </p>
                            </button>
                        </div>
                        <div className="w-full  max-w-md mt-8 r-p-c">
                            <Link href={'/register'} className='py-3 border rounded-md  w-full  r-c-c'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 5l0 14"></path> <path d="M5 12l14 0"></path> </svg>
                                <p className="font-bold ml-2 opacity-70">
                                    Create new account
                                </p>
                            </Link>
                        </div>
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
