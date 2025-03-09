import { io } from 'socket.io-client'
import { AddMessgeFromSocket, UpdateMessToSeen } from '@/app/Chats/MessagesProvider'
import { AddFriendsTyping, UnsetFriendTyping } from '@/components/ListChatsCLient';
import { AddFocusedFriendTyping, UnsetFocusedFriendTyping } from '@/app/Chats/[id]/layout';
import { NoticeFriendOnLine } from '@/app/user/profile/FriendProvider';
let socket;
export const StartSocket = (clientId, friendsIds) => {
    console.log('  ---------------- WEBSOCKET CONNECTION STARED (SOCKET.IO ⚡) ----------------');

    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
        query: {
            clientId: clientId,
            friendsIds:JSON.stringify(friendsIds)
        }
    })

    socket.on("messageRecieved", (newMessage) => {
        AddMessgeFromSocket({ ...newMessage, isFromMe: false });

        let currentPath = window.location.pathname;
        currentPath = currentPath.substring(currentPath.lastIndexOf("/") + 1) || null
        if (currentPath == newMessage.chat_id) {
            setTimeout(() => {
                SetMessagesSeen(newMessage.chat_id, newMessage.senderId)
            }, 40)
        }

    });

    socket.on("friendsTyping", friendId => {
        if (AddFocusedFriendTyping) {
            AddFocusedFriendTyping(friendId)
        }
        if (AddFriendsTyping) {
            AddFriendsTyping(friendId)
        }
    })

    socket.on("friendsStopedTyping", friendId => {
        if (UnsetFocusedFriendTyping) {
            UnsetFocusedFriendTyping(friendId)
        }

        if (UnsetFriendTyping) {
            UnsetFriendTyping(friendId)
        }
    })

    socket.on("friendConnected", friendId => {
        NoticeFriendOnLine && NoticeFriendOnLine({ friendId, isConnected: true })
    });
    
    socket.on("friendDisconnected", friendId => {
        NoticeFriendOnLine && NoticeFriendOnLine({ friendId, isConnected: false })
    });

    socket.on("myMessagesSeen", (m, cl) => {
        UpdateMessToSeen(m)
    })

}



export const SetMessagesSeen = async (chat_id, SocketTO) => {
    if (socket) {
        socket.emit("messagesSeen", { chat_id, SocketTO })

        UpdateMessToSeen({ chat_id, reader: "me" })
    }
}


export const GetSocket = () => socket