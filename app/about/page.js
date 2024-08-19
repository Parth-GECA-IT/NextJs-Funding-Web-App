import React from 'react'

const About = () => {
    return (
        <div className=' screenheight'>
            <span className='text-green-700 mx-4 py-4'>About page on Get me a Chai using Tailwind CSS and Next.js</span>
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
                <div className='w-[60%] self-center'>
                    <h1 className='text-xl text-center my-4'>About</h1>
                    <p>GetMeAChai.com is a relatively new website, created less than six months ago, which raises some cautionary flags. It is a commercial site claiming to help users fund their projects. However, it lacks a strong online reputation and has no visible social media presence, which is often considered a red flag for online businesses.

                        Web analysis tools have pointed out several concerns. The site shares design elements with previously identified suspicious websites and has been associated with high-risk activities like cryptocurrency, investments, and online casinos. These sectors are often targeted by scammers, who use similar websites to defraud users.

                        While there are no specific complaints about GetMeAChai.com yet, its low traffic and recent establishment suggest that users should exercise caution. It's always important to verify the legitimacy of such sites, especially when they involve financial transactions.

                        For more detailed analysis and user reactions, you can refer to sources like Web Paranoi Web Paranoid Web Paranoid. </p>
                </div>
            </div>
        </div>
    )
}

export default About



export const metadata = {
    title: "About - Get me a Chai"
}