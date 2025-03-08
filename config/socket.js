import { io } from 'socket.io-client'
import { AddMessgeFromSocket, UpdateMessToSeen } from '@/app/Chats/MessagesProvider'
let socket;
export const StartSocket = (clientId) => {
    console.log('socket staeted');

    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
        query: {
            clientId: clientId
        }
    })

    socket.on("messageRecieved", (newMessage, callback) => {
        AddMessgeFromSocket(newMessage)

        let currentPath = window.location.pathname;
        currentPath = currentPath.substring(currentPath.lastIndexOf("/") + 1) || null
        if (currentPath == newMessage.chat_id) {
            callback("test")
            // SetMessagesSeen(newMessage.chat_id, newMessage.senderId)
        }

    });

    socket.on("myMessagesSeen", (m, cl) => {
        UpdateMessToSeen(m)
    })

}

export const SetMessagesSeen = (chat_id, SocketTO) => {
    if (socket) {
        socket.emit("messagesSeen", { chat_id, SocketTO })
    }
}

export const GetSocket = () => socket