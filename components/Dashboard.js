"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { fetchuser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({});

    useEffect(() => {
        if (status === "loading") {
            // Show loading state while the session is loading
            return;
        }
        if (!session) {
            router.push('/login');
        } else {
            getData();
        }
    }, [session, status, router]);

    const getData = async () => {
        if (session) {
            try {
                const userData = await fetchuser(session.user.name);
                setForm(userData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            await updateProfile(form, session.user.name);
            // alert("Profile Updated Successfully");
            toast('Profile Updated', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("Failed to update profile");
            
        }
    };

    if (status === "loading") {
        return <p>Loading...</p>; // Display loading while session is loading
    }

    if (!session) {
        return <p>Redirecting to login...</p>; // Handle the case where user is not logged in
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
                transition="Bounce"/>
            {/* Same as */}
            <ToastContainer />
            <div className='container mx-auto py-5 px-6'>
                <h1 className="text-center text-2xl font-bold">Welcome to your Dashboard</h1>
                <form onSubmit={handleSubmit} className='max-w-2xl mx-auto'>
                    {/* Input Fields */}
                    {/* Input for name */}
                    <div className='my-2'>
                        <label htmlFor="name" className="my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input
                            value={form.name || ""}
                            onChange={handleChange}
                            type="text"
                            name='name'
                            id="name"
                            className="my-3 block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Input for email */}
                    <div className='my-2'>
                        <label htmlFor="email" className="my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            value={form.email || ""}
                            onChange={handleChange}
                            type="email"
                            name='email'
                            id="email"
                            className="my-3 block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Input for Username */}
                    <div className='my-2'>
                        <label htmlFor="username" className="my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input
                            value={form.username || ""}
                            onChange={handleChange}
                            type="text"
                            name='username'
                            id="username"
                            className="my-3 block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Input for profile picture of input type text */}
                    <div className='my-2'>
                        <label htmlFor="profilepic" className="my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <input
                            value={form.profilepic || ""}
                            onChange={handleChange}
                            type="text"
                            name='profilepic'
                            id="profilepic"
                            className="my-3 block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Input for cover pic */}
                    <div className='my-2'>
                        <label htmlFor="coverpic" className="my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                        <input
                            value={form.coverpic || ""}
                            onChange={handleChange}
                            type="text"
                            name='coverpic'
                            id="coverpic"
                            className="my-3 block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Input for Razorpay credentials */}
                    {/* Input For Razorpay ID */}
                    <div className='my-2'>
                        <label htmlFor="razorpayid" className="my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay ID</label>
                        <input
                            value={form.razorpayid || ""}
                            onChange={handleChange}
                            type="text"
                            name='razorpayid'
                            id="razorpayid"
                            className="my-3 block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Input for razorpay secret*/}
                    <div className='my-2'>
                        <label htmlFor="razorpaysecret" className="my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                        <input
                            value={form.razorpaysecret || ""}
                            onChange={handleChange}
                            type="text"
                            name='razorpaysecret'
                            id="razorpaysecret"
                            className="my-3 block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className='my-6'>
                        <button type="submit" className="my-3 block w-full p-2 text-white border rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm">Save</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Dashboard;
