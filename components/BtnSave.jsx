import React from 'react'
import Spinner from './loaders/Spinner'

const BtnSave = ({ IsLoading, onClick = () => { } }) => {
    return (
        <div className="w-full mt-10 border-t border-t-gray-300 r-e-c pt-2">
            <button type='submit' className='r-c-c bg-blue-500 p-1 px-8 text-white rounded-md' onClick={onClick}>
                {
                    IsLoading ?
                        <Spinner isWhite={true} />
                        :
                        <>
                            save
                            <svg className='stroke-white ml-2 stroke-2 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path> <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M14 4l0 4l-6 0l0 -4"></path> </svg>
                        </>
                }
            </button>
        </div>
    )
}

export default BtnSave
