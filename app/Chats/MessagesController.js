import socket from "@/config/socket"

socket.on("test", m => {
    console.log(m);
})