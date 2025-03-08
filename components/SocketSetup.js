"use client";
import { StartSocket } from '@/config/socket';
import React, { useEffect } from 'react'

const SocketSetup = ({ clientId }) => {

    useEffect(() => {
        StartSocket(clientId)
    }, [])
    return (<></>)
}

export default SocketSetup
