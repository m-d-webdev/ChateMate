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
import FRB_BtnLogin from '@/components/firebase/FRB_BtnLogin';

const page = () => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [isEmailAlreadyEx, setEmailIsAlreadyEx] = useState(false);
    const [isUserNameAlreadyEx, setUserNameIsAlreadyEx] = useState(false);
    const [isChekingEmail, setCheckingEmail] = useState(false)
    const [isCheckinguserName, setCheckinguserName] = useState(false)
    const [passToConfirme, setPassToConfirme] = useState()
    const [passConfirmed, setPassConfirmed] = useState(false)
    const [InvalideUserName, setInvalideUserName] = useState(false)

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

        setNewUser(c => ({ ...c, userName: e.trim() }));
        if (e.length < 3) {
            return
        }

    }

    const checkUserNameExsits = async () => {
        if (!/^[a-zA-Z][a-zA-Z0-9-_]{2,19}$/.test(newUser.userName)) return
        setCheckinguserName(true);
        let res = await api.get("/checkUserNameExsits", { params: { userName: newUser.userName } })
        if (res.data.isExist == true) {
            setUserNameIsAlreadyEx(true)
        } else {
            setUserNameIsAlreadyEx(false)
        }
        setCheckinguserName(false)
    }


    useEffect(() => {
        if (!/^[a-zA-Z][a-zA-Z0-9-_]{2,19}$/.test(newUser.userName) && newUser.userName != "") {
            setInvalideUserName(true)
        } else {
            setInvalideUserName(false)
        }

        checkUserNameExsits();
    }, [newUser.userName])

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

        let randomChar = "";
        "ABCDEFG-HIJKLMNOP-QRST45nop627UVWXY1UVWX232kl38-Zabcd-efghij-klTUVWXY38-456mnopq2klTU78Zabcd-efghijklmnopqrstuvwxyz7012338-45627819"
            .split("")
            .map((c, i) => {

                if (Math.random() * 5.7885 > 4.4274) {
                    if (randomChar.length < 6) {
                        randomChar = `${randomChar}${c}`
                    }
                }
            })


        let suggesedUserName;
        if (newUser.fullName != "") {
            let letrrs = newUser.fullName.split(' ').map(e => e.substring(0, 3)).join('-').toUpperCase()
            suggesedUserName = `${letrrs}-${randomChar}`
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
            setUserNameIsAlreadyEx(false);
            return suggesedUserName
        }
    }

    useEffect(() => {
        if (newUser.password.length < 6) {
            setPassConfirmed(false);
            return;
        }

        setPassConfirmed(newUser.password == passToConfirme);
    }, [passToConfirme, newUser.password])



    const HandelSubmitDataFromPopup = async (data) => {
        if (!data.email || !data.displayName || !data.photoURL) {
            setError(true);
            return;
        };

        setLoading(true);
        if (newUser.userName != "" && !InvalideUserName && !isCheckinguserName) {
            await api.post('/registerFromPopup', { fullName: data.displayName, email: data.email, pic: data.photoURL, userName: newUser.userName }).then(res => {
                Cookies.set("token", res.data.token);
                window.location.href = "/";
                setLoading(false)
            }).catch(error => {
                if (error.response.data.error_code == "email_already_exists") {
                    setNewUser(pv => ({ ...pv, email: data.email }))
                    setEmailIsAlreadyEx(true);
                }
                setError(true);

                setLoading(false)
            })
        } else {

            const GenUserName2 = async () => {
                let userName = await GenUserName();
                await api.post('/registerFromPopup', { fullName: data.displayName, email: data.email, pic: data.photoURL, userName }).then(res => {
                    Cookies.set("token", res.data.token);
                    window.location.href = "/";
                    setLoading(false);
                }).catch(error => {
                    if (error.response.data.error_code == "email_already_exists") {
                        setNewUser(pv => ({ ...pv, email: data.email }))
                        setEmailIsAlreadyEx(true);
                    }

                    setError(true);
                    setLoading(false)
                });

            }
            GenUserName2()

        }


    }
    return (
        <div className="w-full    h-screen c-b-c">
            <div className=""></div>
            <div className="r-p-c px-10 rounded-md border w-full h-full  max-w-screen-2xl ">
                <div className="c-p-s w-6/12 max-w-xl h-full max-h-[800px]">
                    <div className="c-s-s ">
                        <h1 className="text-2xl">Sign Up for ChateMate </h1>
                        <p className="op-70">Sign up now and start chatting instantly.</p>
                    </div>

                    {
                        isError &&
                        <p className="text-red-500 mt-5">
                            Oops! Something went wrong during registration. Please try again
                        </p>
                    }

                    <div className="c-p-s max-w-md  w-full">

                        <CustomInput
                            Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>}
                            label={"Full name"}
                            onChange={(e) => { setNewUser(c => ({ ...c, fullName: e })) }}
                            placeholder=''
                            value={newUser.fullName}
                            id='name'
                            className='mb-2'
                        />
                        {
                            isEmailAlreadyEx &&
                            <p className="text-red-500 mt-2 text-sm">
                                This email already been taken
                            </p>
                        }
                        <CustomInput
                            Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path> <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"></path> </svg>}
                            label={"Email"}
                            onChange={handelChangeEmail}
                            placeholder=''
                            value={newUser.email}
                            isError={isEmailAlreadyEx}
                            id='email'
                            className='mb-2'
                        />




                        <CustomInput
                            Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path> <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path> <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path> </svg>}
                            label={"Password"}
                            onChange={(e) => { setNewUser(c => ({ ...c, password: e })) }}
                            placeholder=''
                            value={newUser.password}

                            className='mb-2'
                            id='password'
                            type="password"
                        />

                        <CustomInput
                            Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path> <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path> <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path> </svg>}
                            label={"Confirm Password"}
                            onChange={(e) => { setPassToConfirme(e) }}
                            placeholder=''
                            className='mb-2'
                            id='confpassword'
                            value={passToConfirme}

                            disabled={newUser.password.length < 6}
                            type="password"
                        />
                        {
                            passConfirmed &&
                            <div className="w-full r-e-c pr-5">
                                <svg className='fill-green-500 w-5 h-5' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z" /></svg>
                            </div>
                        }


                        {
                            isUserNameAlreadyEx &&
                            <p className="text-red-500 mt-2 text-sm">
                                This username already been taken
                            </p>
                        }
                        {
                            InvalideUserName &&
                            <p className="text-red-500 mt-2 text-sm">
                                Invalid username! It must start with a letter, be 3-20 characters long, and contain only letters, numbers, or underscores.                            </p>
                        }
                        <CustomInput
                            Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path> <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path> <path d="M4 16v2a2 2 0 0 0 2 2h2"></path> <path d="M16 4h2a2 2 0 0 1 2 2v2"></path> <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path> <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"></path> </svg>}
                            label={"Generat a Username"}
                            onChange={handelChangeUserName}
                            placeholder=''
                            id='username'
                            isError={isUserNameAlreadyEx}
                            value={newUser.userName}
                        />


                        <button onClick={GenUserName} className='text-blue-500 text-xs  border border-blue-500 px-6 py-2 rounded-md mt-2'>
                            {
                                isCheckinguserName ?
                                    <Spinner />
                                    :
                                    "Auto-Generate"
                            }
                        </button>

                        <div className="w-full   mt-2 r-e-c">
                            {
                                isLoading ?
                                    <button className='bg-black  text-white disabled:opacity-60  px-10 py-1 rounded-md r-c-c font-bold'>
                                        <Spinner isWhite={true} />
                                    </button>

                                    :
                                    <button disabled={!CanCreate || isChekingEmail || isEmailAlreadyEx || !passConfirmed || newUser.userName.length < 3} onClick={HandelSubmitData} className='bg-black text-white disabled:opacity-60  px-10 py-1 rounded-md r-c-c font-bold'>
                                        create
                                        <svg className='fill-white ml-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" /></svg>
                                    </button>
                            }
                        </div>
                    </div>

                    <div className="c-s-c max-w-md w-full">
                        <div className="w-full  max-w-md  r-p-c">
                            <FRB_BtnLogin onAllDataReady={HandelSubmitDataFromPopup} />
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
                <a href={"https://iderkaoui1.netlify.app"} className="opacity-70  r-s-c mr-10" target="_blank">
                    Mind Behind ChatMate
                    <svg className="w-6 h-6 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>
                </a>
            </div>
        </div>
    )
}

export default page
