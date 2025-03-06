import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='c-c-c max-w-screen-md'>
            <Image
                src={"/media/DALL_E_2025-03-04_02.41.32_-_A_cute_AI-powered_owl_sitting_on_a_public_bench_in_front_of_a_park__holding_a_smartphone_as_if_texting_someone._The_owl_has_big_expressive_eyes__a_smo-removebg-preview.png"}
                alt='owlia logo'
                height={350}
                width={300}
            />

            <h1 className='text-xl'>
                Welcome to ChateMate!
            </h1>
            <p className='text-center'>
                You're all set to start chatting! Select a conversation or start a new one to connect with your friends instantly.
            </p>
            <p className="text-center">
                Please note: Messages are not encrypted, so we recommend avoiding sharing sensitive information.
            </p>
        </div>
    )
}

export default page
