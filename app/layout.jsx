"use server";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./Sub.css";
import SiadeBare from "@/components/SideBareCmps/SiadeBare";
import { api } from "@/utilityfunctions";
import { cookies } from "next/headers";
import FriendProvider from "./user/profile/FriendProvider";
import MessagesProvider from "./Chats/MessagesProvider";
import Note from "@/components/Note";
import StoreProider from "./StoreProider";
const poppins = Poppins({ subsets: ['latin'], weight: ['500'] })

export default async function RootLayout({ children, modal }) {
  const co = await cookies();
  const token = co.get("token") || null;
  let user = null;
  if (token) {
    try {
      let res = await api.post("/authenticateUser", { token: token.value });
      if (res.data) {
        user = res.data
      }
    } catch (error) { }

  }

  return (
    <html lang="en">
      <body
        className={`${poppins.className}  r-s-s`}
      >
        <StoreProider />
        <FriendProvider>
          <MessagesProvider>
            <SiadeBare user={user} />
            {children}
            {modal}
            <Note />
          </MessagesProvider>
        </FriendProvider>
        <>
        </>
      </body>



    </html >
  );
}

