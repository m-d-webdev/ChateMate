"use client";
import { StartSocket } from '@/config/socket';
import React, { useEffect } from 'react'

const SocketSetup = ({ clientId, friendsIds }) => {

    useEffect(() => {
        StartSocket(clientId, friendsIds)
    }, [])
    return (<></>)
}

export default SocketSetup
