'use client';
import { useFriends } from '@/app/user/profile/FriendProvider';
import React from 'react'

const ListRequests = () => {
    const { matesReqs } = useFriends()
    console.log(matesReqs);
    
    return (
        <div>
            {
                matesReqs.map(f =>
                    <div className='w-full r-b-c mb-12 '>

                    </div>
                )
            }
            this is list of request
        </div>
    )
}

export default ListRequests
