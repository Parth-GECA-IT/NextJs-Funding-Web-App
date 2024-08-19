import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDB from '@/db/connectDb'

export const authoptions = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == 'github') {
                await connectDB()                
                // Check if User already exists in Database
                // const currentUser = await client.db("users").collection("users").findOne({email:email})
                const currentUser = await User.findOne({ email: email })
                if (!currentUser) {
                    // Create a new User
                    const newUser = await User.create({
                        email: user.email,
                        username: user.email.split("@")[0],
                    })
                }
                return true
            }
        },
        
        async session({session,user,token}){
            const dbUser = await User.findOne({email:session.user.email})
            // console.log(dbUser)
            session.user.name = dbUser.username
            return session
        },
    }
})

export { authoptions as GET, authoptions as POST }