import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDB from '@/db/connectDb'
import User from '@/models/User'

const Username = async ({ params }) => {
    // If the username is no present in database, show a404 Page
    const checkUser = async () => {
        await connectDB()
        let u = await User.findOne({ username: params.username })

        if (!u) {
            return notFound()
        }
    }
    await checkUser()

    return (
        <div>
            <PaymentPage username={params.username} />
        </div>
    )
}

export default Username

// or Dynamic metadata
export async function generateMetadata({ params }) {
    return {
        title: `Support ${params.username} - Get me a Chai`
    }
}