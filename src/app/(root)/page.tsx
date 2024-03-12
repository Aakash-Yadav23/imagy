import UserButton from '@/components/Wrapper/UserButton'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const Home = () => {
    return (
        <div>
            <Toaster />
            <p>Home</p>
            <UserButton />
        </div>
    )
}

export default Home