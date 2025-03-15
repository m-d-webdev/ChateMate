
import SearchForFriendsInpu from '@/components/SearchForFriendsInpu';
const page = () => {
    return (

        <div className="h-full w-full max-w-6xl c-c-c">
            <div className="c-c-c">
                <h1 className={`text-2xl max-w-3xl text-center `}>
                    Welcome in Meetmates! Connect with new mates and enjoy great conversations!
                </h1>
                <SearchForFriendsInpu  />
            </div>
        </div>
    )
}

export default page
