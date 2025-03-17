"use client"
import { useFriends } from '@/app/user/profile/FriendProvider'
import { api } from '@/utilityfunctions';
import React, { useState } from 'react'
import Loader from '../loaders/Loader';
import Spinner from '../loaders/Spinner';

const BtnCancelReq = ({ req_id }) => {

    const { setMatesReqs, matesReqs } = useFriends();
    const [isLoadin, setLoging] = useState(false);

    const handeDeletReq = async () => {
        setLoging(true);
        let res = await api.post("/meetMates/deleteReq", { req_id });
       
        if (res.data) {

            setMatesReqs(matesReqs?.filter(e => e._id != req_id))
            
        };

        setLoging(false)
    }
    return (
        <button onClick={handeDeletReq} className='r-c-c  bg-black text-white p-1 px-3 text-sm rounded-xl'>
            {
                isLoadin ?
                    <Spinner isWhite={true} height={20} width={20} borderWidth={3} />
                    :
                    <>
                        Cancel
                        <svg className='ml-2 w-5 h-5 stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M10 14l2 -2m2 -2l7 -7"></path> <path d="M10.718 6.713l10.282 -3.713l-3.715 10.289m-1.063 2.941l-1.722 4.77a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l4.772 -1.723"></path> <path d="M3 3l18 18"></path> </svg>
                    </>
            }
        </button>
    )
}

export default BtnCancelReq
