"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import CustomInput from '@/components/CustomInput'
import { api } from '@/utilityfunctions';
import { useRouter } from 'next/compat/router'
import Cookies from 'js-cookie';
import Chance from 'chance';
import Spinner from '@/components/loaders/Spinner';
const chance = new Chance()

const page = () => {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter()
    const [isError, setError] = useState(false);
    const [isEmailAlreadyEx, setEmailIsAlreadyEx] = useState(false);
    const [isUserNameAlreadyEx, setUserNameIsAlreadyEx] = useState(false);
    const [isChekingEmail, setCheckingEmail] = useState(false)
    const [isCheckinguserName, setCheckinguserName] = useState(false)
    const [passToConfirme, setPassToConfirme] = useState(false)
    const [passConfirmed, setPassConfirmed] = useState(false)

    const [newUser, setNewUser] = useState({
        fullName: "",
        email: "",
        password: "",
        userName: ""
    })

    const HandelSubmitData = async (e) => {
        e.preventDefault()
        setLoading(true);
        await api.post('/register', newUser).then(res => {
            Cookies.set("token", res.data.token)
            window.location.href = "/"
            setLoading(false)
        }).catch(error => {
            setError(true);
            setLoading(false)
        })

    }

    const handelChangeEmail = async e => {
        setNewUser(c => ({ ...c, email: e }));
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)) {
            setCheckingEmail(true)
            let res = await api.get("/checkEmailExsits", { params: { email: e } })
            if (res.data.isExist == true) {
                setEmailIsAlreadyEx(true)
            } else {
                setEmailIsAlreadyEx(false)
            }
            setCheckingEmail(false)
        }

    }

    const handelChangeUserName = async e => {
        setNewUser(c => ({ ...c, userName: e }));
        if (e == "") return
        setCheckinguserName(true)
        let res = await api.get("/checkUserNameExsits", { params: { userName: e } })
        if (res.data.isExist == true) {
            setUserNameIsAlreadyEx(true)
        } else {
            setUserNameIsAlreadyEx(false)
        }
        setCheckinguserName(false)
    }

    const [CanCreate, setCanCreate] = useState(false);


    useEffect(() => {
        if (Object.values(newUser).some(v => v == "") || ! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newUser.email)) {
            setCanCreate(false)
        } else {
            setCanCreate(true)
        }
        return;
    }, [newUser])


    const GenUserName = async () => {
        const randomChar =
            "ABCDEFG-HIJKLMNOPQRSTUVWXYZabcd-efghijklmnopqrstuvwxyz0123-456789"
                .split("")
                .filter((c, i) => Math.random() * 9.85 > 7.74).join('');

        let suggesedUserName;
        if (newUser.fullName != "") {
            let letrrs = newUser.fullName.split(' ').map(e => e.substring(0, 3)).join('-').toUpperCase()
            suggesedUserName = `${letrrs}.${randomChar}`
        }
        else {
            suggesedUserName = randomChar
        }

        setCheckinguserName(true)
        let res = await api.get("/checkUserNameExsits", { params: { userName: suggesedUserName } })
        if (res.data.isExist == true) {
            GenUserName()
            setUserNameIsAlreadyEx(true)
        } else {
            setNewUser(c => ({ ...c, userName: suggesedUserName }))
            setCheckinguserName(false)
            setUserNameIsAlreadyEx(false)
        }
    }

    useEffect(() => {
        if (newUser.password.length < 6) {
            setPassConfirmed(false);
            return;
        }


        setPassConfirmed(newUser.password == passToConfirme);
    }, [passToConfirme, newUser.password])


    return (
        <div className="w-full  p-10   h-screen c-b-c">
            <div className=""></div>
            <div className="r-p-c rounded-md border w-full h-full  max-w-screen-2xl">
                <div className="c-s-s w-6/12 max-w-xl">
                    <h1 className="text-3xl">Sign Up for ChateMate </h1>
                    <div className="c-s-s mt-5">
                        <p className="op-70 mt-2">Sign up now and start chatting instantly.</p>
                    </div>

                    {
                        isError &&
                        <p className="text-red-500 mt-5">
                            Oops! Something went wrong during registration. Please try again
                        </p>
                    }
                    <CustomInput
                        Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>}
                        label={"Full name"}
                        onChange={(e) => { setNewUser(c => ({ ...c, fullName: e })) }}
                        placeholder=''
                        id='full-name'
                        className='mt-20'
                    />

                    <CustomInput
                        Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path> <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"></path> </svg>}
                        label={"Email"}
                        onChange={handelChangeEmail}
                        placeholder=''
                        id='email'
                        className='mt-5'
                    />

                    {
                        isEmailAlreadyEx &&
                        <p className="text-red-500 mt-2 text-sm">
                            This email already been taken
                        </p>
                    }


                    <CustomInput
                        Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path> <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path> <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path> </svg>}
                        label={"Password"}
                        onChange={(e) => { setNewUser(c => ({ ...c, password: e })) }}
                        placeholder=''
                        className='mt-5'
                        id='password'
                        type="password"
                    />

                    <CustomInput
                        Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path> <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path> <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path> </svg>}
                        label={"Confirm Password"}
                        onChange={(e) => { setPassToConfirme(e) }}
                        placeholder=''
                        className='mt-5'
                        id='confpassword'
                        disabled={newUser.password.length < 6}
                        type="password"
                    />
                    {
                        passConfirmed &&
                        <div className="w-full r-e-c mt-2 pr-5">
                            <svg className='fill-green-500 w-5 h-5' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z" /></svg>
                        </div>
                    }
                    <h2 className="mt-10 opacity-70" >
                        Generate a userName
                    </h2>

                    {
                        isUserNameAlreadyEx &&
                        <p className="text-red-500 mt-2 text-sm">
                            This username already been taken
                        </p>
                    }
                    <CustomInput
                        Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path> <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path> <path d="M4 16v2a2 2 0 0 0 2 2h2"></path> <path d="M16 4h2a2 2 0 0 1 2 2v2"></path> <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path> <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"></path> </svg>}
                        label={"Generat a Username"}
                        onChange={handelChangeUserName}
                        placeholder=''
                        id='userName'
                        value={newUser.userName}
                        className='mt-5'
                    />


                    <button onClick={GenUserName} className='text-green-500  border border-green-500 px-6 py-2 rounded-md mt-2'>
                        {
                            isCheckinguserName ?
                                <Spinner d='border-green-500 w-6 h-6 border-4' />
                                :
                                " Auto-Generate"
                        }
                    </button>

                    <div className="w-full  max-w-md mt-5 r-e-c">
                        {
                            isLoading ?
                                <button className='bg-black text-white disabled:opacity-60  px-10 py-1 rounded-md r-c-c font-bold'>
                                    <Spinner d={'border-white border-4 w-6 h-6'} />
                                </button>

                                :
                                <button disabled={!CanCreate || isChekingEmail || isEmailAlreadyEx || !passConfirmed} onClick={HandelSubmitData} className='bg-black text-white disabled:opacity-60  px-10 py-1 rounded-md r-c-c font-bold'>
                                    create
                                    <svg className='fill-white ml-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" /></svg>
                                </button>
                        }
                    </div>

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
                        <Link href={'/login'} className='py-3 border rounded-md  w-full  r-c-c'>
                            <svg className='w-6 h-6 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path> <path d="M3 12h13l-3 -3"></path> <path d="M13 15l3 -3"></path> </svg>
                            <p className="font-bold ml-2 opacity-70">
                                Login
                            </p>
                        </Link>
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
