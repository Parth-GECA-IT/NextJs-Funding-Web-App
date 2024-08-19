"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
// import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { useSearchParams } from 'next/navigation'
// import { sanitizeFilter } from 'mongoose'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"

const PaymentPage = ({ username }) => {

    // const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({name:"",message:"",amount:""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Payment has been made', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            toast('Payment Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)
    }, [])


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
        // console.log(u,dbpayments);
    }

    const pay = async (amount) => {
        // Get the Oreder ID
        // console.log(session.user.name);
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            // "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get ME A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce" />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            {/* <Script>
                {`var options = {
                    "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
                "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Acme Corp", //your business name
                "deScription": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the "id" obtained in the response of Step 1
                "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
    },
                "notes": {
                    "address": "Razorpay Corporate Office"
    },
                "theme": {
                    "color": "#3399cc"
    }
};
                var rzp1 = new Razorpay(options);
                document.getElementById('rzp-button1').onclick = function(e){
                    rzp1.open();
                e.preventDefault();
}`}
            </Script> */}

            <div className="cover w-full relative ">
                {/* <img src="https://lh4.googleusercontent.com/7IG_PhTY8HtpQyNLJgp5HXFQTWRubmf7DKDYVdg4P_iwG6zmwToeJK1fwxah0qHFn8dkDPXTZl0VAfKBYmpklgRSQ-K_wLJ6oZZGQCWT6nGpLL6-YeWXduhAhtexoe3-_SIH-1co" className='object-cover w-full h-[400px]' alt="" /> */}
                <img src={currentUser.coverpic} className='object-cover w-full h-48 md:h-[400px]' alt="Cover Pic" />
                <div className="absolute -bottom-[4rem] md:right-[45%] right-[40vw] ">
                    {/* <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/04fd096e-205c-4c04-bdde-7ce9bc718319/da1hl4k-a8f1dfa4-930a-415c-bbca-183ee52e578c.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA0ZmQwOTZlLTIwNWMtNGMwNC1iZGRlLTdjZTliYzcxODMxOVwvZGExaGw0ay1hOGYxZGZhNC05MzBhLTQxNWMtYmJjYS0xODNlZTUyZTU3OGMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.0s2XZNpLJRQRtB0VTPwbxxVEFeUQmJ-Q0rm2fBF_7o8" alt="" width={150} className='rounded-full' /> */}
                    <img src={currentUser.profilepic} alt="Profile Pic" width={150} className='md:h-[9.25rem] h-[6rem] w-[6rem] md:w-[150px] rounded-full' />
                </div>
            </div>
            <div className="info flex justify-center items-center mt-[4.3rem] flex-col gap-2">
                <span className='text-lg  font-black'  >@{username}</span>
                <div className='text-slate-400'>
                    {/* Creating Animated art for VTT's */}
                    Let's help {username} get a Chai
                </div>
                <div className='text-slate-400'>
                    {/* 12,065 members • 64 posts • $12,400/release */}
                    {payments.length} Payments • ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>
                <div className="payment flex gap-3 w-[85%] md:flex-row flex-col">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg to-white md:p-12 ">

                        {/* Show list of all the supporters  as a leaderboard */}
                        <h2 className='text-2xl font-bold mb-5 p-4'>Top 10 Supporters</h2>
                        <ul className='mx-6 md:text-lg text-xs' >
                            {payments.length == 0 && <li>No payments Yet</li>}
                            <li className='my-2 flex items-center text-justify'>
                                <img src="avatar.gif" className='mr-2' width={30} alt="" />
                                <span>
                                    Atharva donated <span className='font-bold'>$40</span> with a message "I support you bro. Lots of Love ❤️"</span>
                            </li>
                            <li className='my-2 flex items-center text-justify'>
                                <img src="avatar.gif" className='mr-2' width={30} alt="" />
                                <span >
                                    Mustafa donated <span className='font-bold'>$20</span> with a message "Keep it Up my brother 🤩"</span>
                            </li>
                            <li className='my-2 flex items-center text-justify'>
                                <img src="avatar.gif" className='mr-2' width={30} alt="" />
                                <span>
                                    Manish donated <span className='font-bold'>$50</span> with a message "Keep Going Bro. Don't come back 😂"</span>
                            </li>
                            <li className='my-2 flex items-center text-justify'>
                                <img src="avatar.gif" className='mr-2' width={30} alt="" />
                                <span>
                                    Chetan donated <span className='font-bold'>$10</span> with a message "This is hidden talent. Keep it hidden  🤣"</span>
                            </li>


                            {payments.map((p, i) => {
                                return <li className='my-2 flex items-center text-justify'>
                                    <img src="avatar.gif" className='mr-2' width={30} alt="" />
                                    <span>
                                        {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"</span>
                                </li>
                            })}


                        </ul>

                    </div>
                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-8">
                        <h2 className='text-xl font-bold my-4'>Make a Payment</h2>
                        <div className="flex gap-3 flex-col ">
                            <input name='name' onChange={handleChange} value={paymentform.name} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            <input name='message' onChange={handleChange} value={paymentform.message} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message ' />
                            <div className="flex self-end w-1/2 items-center"><span className='text-3xl mx-2'>₹</span>
                                <input name='amount' onChange={handleChange} value={paymentform.amount} type="text" className='w-full self-end p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            </div>

                            <button type="button" className="text-white bg-gradient-to-br from-violet-900 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mt-5 mb-2 w-[5rem] disabled:bg-slate-900 disabled:from-slate-500" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<1} onClick={() => { pay(Number.parseInt(paymentform.amount) * 100) }}>Pay</button>

                        </div>
                        {/* Or choose from these Amounts */}
                        <div className="flex gap-2 mt-5 md:flex-row flex-col">
                            <button className='bg-slate-800 p-3 rounded-lg max-w-24 mx-auto md:mx-2' onClick={() => { pay(1000) }}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg max-w-24 mx-auto md:mx-2' onClick={() => { pay(2000) }}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg max-w-24 mx-auto md:mx-2' onClick={() => { pay(3000) }}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage







// {/* "use client"
// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { useSession, signIn, signOut } from "next-auth/react"
// import { fetchuser, updateProfile } from '@/actions/useractions'

// const Dashboard = () => {
//     const { data: session, update } = useSession()
//     const router = useRouter()
//     const [form, setform] = useState({})

//     useEffect(() => {
//         getData()
//         if (!session) {
//             router.push('/login')
//         }
//     }, [router, session])

//     const getData = async () => {
//         let u = await fetchuser(session.user.name)
//         setform(u)
//     }


//     const handleChange = (e) => {
//         setform({ ...form, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = async (e) => {
//         console.log(e);
//         let a = await updateProfile(e, session.user.name)
//         alert("Profile Updated")
//     }


//     return (
//         <div className='container mx-auto py-5'>
//             <h1 className="text-center text-2xl font-bold">Welcome to your Dashboard</h1>
//             <form action={handleSubmit} className='max-w-2xl mx-auto' >

//                 <div className='my-2'>
//                     <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//                     <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                 </div>
//                 {/* Input for email */}
//                 <div className='my-2'>
//                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//                     <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                 </div>
//                 {/* Input for Usernamme */}
//                 <div className='my-2'>
//                     <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
//                     <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                 </div>
//                 {/* Input for profile picture of input type text */}
//                 <div className='my-2'>
//                     <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
//                     <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500                 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                 </div>
//                 {/* Input for cover pic */}
//                 <div className='my-2'>
//                     <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
//                     <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                 </div>
//                 {/* Input for Razorpay credentials */}
//                 {/* Input For Razorpay ID */}
//                 <div className='my-2'>
//                     <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay ID</label>
//                     <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                 </div>
//                 {/* Input for razorpay secret*/}
//                 <div className='my-2'>
//                     <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
//                     <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                 </div>
//                 <div className='my-6'>
//                     <button type="submit" name='submit' id="submit" className="block w-full p-2 text-white border rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm " >Save</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Dashboard */ }
