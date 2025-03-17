"use server";
import CustomDialog from "@/components/CustomDialog";
import { api } from "@/utilityfunctions";
import { Aoboshi_One } from 'next/font/google'
import Link from "next/link";
import ThisUser from "./cmps/ThisUser";
import OtherUser from "./cmps/OtherUser";
import GetUser from "@/app/user/profile/GetUser";


export default async function UserPage({ params }) {
    const { userName } = await params;
    try {
        const res = await api.get('/user', { params: { userName } })
        const mateData = res.data;
        const thisUser = await GetUser();

        return (
            <CustomDialog className={'w-full max-w-xl'}>

                {
                    thisUser._id == mateData._id ?
                        <ThisUser mateData={mateData} />
                        :
                        <OtherUser mateData={mateData} />
                }

            </CustomDialog>
        );
    } catch (error) {
        log
        return (
            <CustomDialog className={'w-full c-c-c max-w-xl'}>
                <h1 className="text-2xl  opacity-70 font-medium">                    User not found</h1>
            </CustomDialog>
        )
    }

}
