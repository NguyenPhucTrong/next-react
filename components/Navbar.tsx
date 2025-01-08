"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CustomButton from './CustomButton'
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/signin')
    }
    return (
        <header className='w-full absolute z-10'>
            <nav className='max-w-[1440px] mx-auto flex justify-between items-center xm:px-16 px-6 py-4'>
                <Link href="/" className='flex justify-center items-center'>
                    <Image src='/logo.svg' alt='Car Hub Logo' width={118} height={118} className='object-contain' />
                </Link>

                <CustomButton title='Sign In' btnType="button" containerStyles='text-primary-blue bg-white rounded-full min-w-[130px] hover:bg-primary-blue hover:text-white transition duration-300'
                    handleClick={handleSignIn}
                />
            </nav>
        </header>
    )
}
