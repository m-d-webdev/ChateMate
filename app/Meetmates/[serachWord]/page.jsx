"use server";
import { api } from '@/utilityfunctions';
import ResultMate from './resultMate';
import SearchForFriendsInpu from '@/components/SearchForFriendsInpu';
import EmptyLottie from '@/components/lotties/empty';
export async function page({ params }) {
    try {
        const { serachWord } = await params;

        const res = await api.get("/meetMates/search", {
            params: { serachWord: decodeURIComponent(serachWord) }
        }); 
        const result = res.data;

        return (

            <div className='w-8/12 max-w-screen-md c-s-c h-screen'>
                <SearchForFriendsInpu  deffvalue={decodeURIComponent(serachWord)} />

                <div className='overflow-auto mt-8 w-full scrl_none c-s-c max-h-full'>
                    {
                        result.length == 0 &&
                        <div className="">
                            <EmptyLottie text={"Sorry, we couldn't find any matches for the username or fullname you searched for"} />
                        </div>
                    }

                    {
                        result.map(r => <ResultMate key={r._id} mate={r} />)
                    }
                </div>
            </div>


        )
    } catch (error) {

        return <div className='w-full h-screen c-c-c'>
            error

        </div>
    }
}

export default page
