import { api } from "@/utilityfunctions";
import { Aoboshi_One } from 'next/font/google'


const aoboshi_One = Aoboshi_One({
    subsets: ['latin'],
    weight: ['400']
})


export default async function UserPage({ params }) {
    const { userName } = await params;
    
    try {
        const res = await api.get('/user', { params: { userName } })
        const userData = res.data;

        return (
            <dialog className="modal c-c-c">
                <h1 className="mr-10 w-1/6  opacity-70 p-8">{userData.fullName} Profile</h1>
                <div className="h-full w-3/6 c-p-s">
                    <div className="r-s-s">
                        <div className="c-c-c">
                            <div className="p-8 rounded-full border border-gray-200">
                                <div className="p-2 rounded-full bg-white drop-shadow-xl ">
                                    <img src={userData.pic ? userData.pic : "https://i.pinimg.com/474x/ca/95/db/ca95db6f42ece668dc3b6cbc0ff7b838.jpg"}
                                        className="w-60 h-60  rounded-full object-cover object-top "
                                        alt={userData.fullName}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="c-s-s  mt-8 h-full c-b-c pb-4">
                            <h1 className={`border-b-2 border-b  border-b-gray-200  text-4xl font-bold   `}>{userData.fullName}</h1>
                            <div className="c-c-c">
                                <h1 className="border-b-2  border-b   border-b-gray-200   ml-16 mb-10 ">{userData.email}</h1>
                                <h2 className="border-b-2 border-b  border-b-gray-200  text-md opacity-80 -ml-60">{userData.userName}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="r-s-c">
                        {
                            userData.status ?
                                <div className="r-s-c">
                                    Status :
                                    <p>{userData.status}</p>
                                </div>
                                :
                                <>
                                    <p>You haven’t added a status yet! 🚀 Share what’s on your mind and let others know what you’re up to</p>
                                </>
                        }
                    </div>
                </div>
            </dialog>
        );
    } catch (error) {
        return (
            <div className="mr-auto">
                User not found
            </div>
        )
    }

}
