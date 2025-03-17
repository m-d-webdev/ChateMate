"use server";
import SuggessedFriends from '@/components/suggessedFriends';
import ListRequests from './cmps/ListRequests';

const layout = ({ children }) => {
    return (
        <div className='w-full r-b-c p-4 h-screen'>
            <div className="c-s-s w-2/12 max-w-sm h-full p-3">
                <div className="r-s-e">
                    <svg className="mr-2 w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> <path d="M16 19h6"></path> <path d="M19 16v6"></path> </svg>
                    <h1 className='font-bold text-xl'>Owlia</h1>
                </div>
                <ListRequests />
            </div>
            {children}
            <SuggessedFriends />
        </div>
    )
}

export default layout
