'use server';
import { api } from '@/utilityfunctions'
import Link from 'next/link'

const User = async () => {

    const res = await api.get('/authenticateUser')
    console.log(res);
    
    return (
        <div className='c-c-c '>
            <Link href={'/login'} className='c-c-c w-full  border rounded-lg p-2'>
                <svg className='w-6 h-6 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path> <path d="M3 12h13l-3 -3"></path> <path d="M13 15l3 -3"></path> </svg>
                Login
            </Link>
            <Link href={'/register'} className='c-c-c mt-6 border rounded-lg p-2 w-full'>
                <svg className='w-6 h-6 mb' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 5l0 14"></path> <path d="M5 12l14 0"></path> </svg>
                Register
            </Link>
        </div>
    )

}

export default User
