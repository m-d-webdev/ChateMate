"use client"
import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth"
import { api } from '@/utilityfunctions'

import Spinner from '../loaders/Spinner';
const FRB_BtnLogin = ({ onEmailReady, onAllDataReady }) => {

    const [isLoading, setLoading] = useState(false)

    const handelRedirectToLogin = async () => {
        setLoading(true)
        let res = await api.get("/GET_FIREBASE_CONFIGS");
        const {

            FIRRBASE_apiKey,
            FIRRBASE_authDomain,
            FIRRBASE_projectId,
            FIRRBASE_storageBucket,
            FIRRBASE_messagingSenderId,
            FIRRBASE_appId,
        } = res.data;

        const firebaseConfig = {
            apiKey: FIRRBASE_apiKey,
            authDomain: FIRRBASE_authDomain,
            projectId: FIRRBASE_projectId,
            storageBucket: FIRRBASE_storageBucket,
            messagingSenderId: FIRRBASE_messagingSenderId,
            appId: FIRRBASE_appId,
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app)
        const g_provider = new GoogleAuthProvider();
        const popupRes = await signInWithPopup(auth, g_provider);
        setLoading(false)

        if (popupRes.user) {
            const { photoURL, email, displayName } = popupRes.user;
            if (onEmailReady) {

                onEmailReady(email)
            }

            if (onAllDataReady) {
                onAllDataReady({ photoURL: photoURL, email: email, displayName: displayName })
            }



        }
    }



    return (
        <>

            <button onClick={handelRedirectToLogin} className='py-3 mr-1 border group rounded-md  w-2/4 r-c-c'>
                {
                    isLoading ?
                        <Spinner />
                        :
                        <>
                            <svg className=' group-hover:stroke-none group-hover:fill-red-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z"></path> </svg>
                            <p className="font-bold group-hover:text-red-500 ml-2 opacity-70">
                                Google
                            </p>
                        </>
                }

            </button>

        </>
    )
}

export default FRB_BtnLogin
