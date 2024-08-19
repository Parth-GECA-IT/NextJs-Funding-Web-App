import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="flex justify-center text-white h-[44vh] px-5 md:px-0 text-xs md:text-base flex-col items-center gap-3 ">
                <div className="font-bold  text-xl md:text-4xl flex justify-center items-center ">Get me a chai <span><img src="/tea1.gif" width="90px" alt="TeaLogo" className="ml-2"/></span>

                </div>
                <p className="text-center md:text-left mx-3">A crowdfunding platform  for creators. get funded by your fans and folowers. Start Now!</p>
                <p className="text-center md:text-left mx-3">A place where your fans can buy you a chai. Unleash the power of your fans and get your Projects funded</p>
                <div>
                    <Link href="/login">
                    <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button></Link>

                    <Link href={"/about"}>
                    <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
                    </Link>
                </div>
            </div>

            <div className="bg-white h-1 opacity-10"></div>

            <div className="text-white container mx-auto py-16 px-7">
                <h2 className="text-2xl font-bold text-center mb-14">You Fans can buy you a Chai</h2>
                <div className="flex justify-around gap-3 w-auto">
                    <div className="item flex flex-col items-center justify-center space-y-3">
                        <img className="bg-teal-200 hover:bg-teal-400 rounded-full p-2" src="/man.gif" width="88" alt="" />
                        <p className="font-bold text-center">Fans want to help</p>
                        <p className="text-center">Your fans are available for you to help you</p>
                    </div>
                    <div className="item flex flex-col items-center justify-center space-y-3">
                        <img className="bg-teal-200 hover:bg-teal-400 rounded-full" src="/coin2.gif" width="88" alt="" />
                        <p className="font-bold text-center">Fans want to help</p>
                        <p className="text-center">Your fans are available for you to help you</p>
                    </div>
                    <div className="item flex flex-col items-center justify-center space-y-3">
                        <img className="bg-teal-200 hover:bg-teal-400 rounded-full p-2" src="/group.svg" width="88" alt="" />
                        <p className="font-bold text-center">Fans want to help</p>
                        <p className="text-center">Your fans are available for you to help you</p>
                    </div>
                </div>
            </div>

            <div className="bg-white h-1 opacity-10"></div>

            <div className="text-white container mx-auto py-10 px-7" >
                <h2 className="text-2xl font-bold text-center mb-14">Leran more about us</h2>
                <div className="flex justify-around gap-3 w-auto">
                    <div className="item flex flex-col items-center justify-center space-y-3">
                        <img className="bg-teal-200 hover:bg-teal-400 rounded-full p-2" src="/group.gif" width="88" alt="" />
                        <p className="font-bold text-center">Fans want to help</p>
                        <p className="text-center">Your fans are available for you to help you</p>
                    </div>
                    <div className="item flex flex-col items-center justify-center space-y-3">
                        <img className="bg-teal-200 hover:bg-teal-400 rounded-full p-2" src="/man2.gif" width="88" alt="" />
                        <p className="font-bold text-center">Fans want to help</p>
                        <p className="text-center">Your fans are available for you to help you</p>
                    </div>
                    <div className="item flex flex-col items-center justify-center space-y-3">
                        <img className="bg-teal-200 hover:bg-teal-400 rounded-full h-[5.6rem]" src="/coin5.gif" width="88" alt="" />
                        <p className="font-bold text-center">Fans want to help</p>
                        <p className="text-center">Your fans are available for you to help you</p>
                    </div>
                </div>
            </div>

            <div className="bg-white h-1 opacity-10"></div>
           
            <div className="text-white container mx-auto py-10 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center mb-14">Learn more about us</h2>
                <iframe className="px-3 flex flex-grow-0 w-[20rem] md:w-[46rem] md:h-[55dvh]" src="https://www.youtube.com/embed/_fuimO6ErKI?si=YVEVxh8z4pXP5wyq" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
        </>
    );
}
