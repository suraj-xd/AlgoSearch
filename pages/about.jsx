import DarkMode from "@/components/DarkMode";
import CustomHead from "@/components/customHead";
import { Bars2Icon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState } from "react";
export default function index() {
    const [isNavOpen, setIsNavOpen] = React.useState(true);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    return (
        <>
            <CustomHead title="About AlgoSearch"/>
            <main className="w-screen min-h-screen">
                <div className="flex justify-between items-center w-[95vw] mx-auto mt-4" >
                    <div className="flex justify-start items-center gap-2 ">
                        <Link href={"/"}>
                            <h1 className="monu text-sm md:text-2xl tracking-wider caret-transparent cursor-pointer"><span className='text-blue-600'>Algo</span>Search</h1></Link>
                        <p className="text-blue-600 border-[1px] border-blue-600 rounded-md md:px-2 md:py-[2px] p-1 text-xs md:text-sm font-extrabold comfort">Beta</p>
                    </div>
                    <div className="flex justify-start items-center gap-3">
                        <DarkMode />
                        <IconButton
                            size="sm"
                            color="blue-gray"
                            variant="text"
                            onClick={toggleIsNavOpen}
                        >
                            <Bars2Icon className="h-6 w-6 cursor-pointer" />
                        </IconButton>
                    </div>
                    {/* Slider */}
                    <div className={`w-48 text-gray-900 bg-white border border-gray-500 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white absolute top-[4rem] right-0  transition-transform ease-in-out ${isNavOpen ? "translate-x-full" : "translate-x-0 z-50"} `}>
                        <Link href={"/about"}>
                            <button type="button" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                <svg aria-hidden="true" class="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                                About
                            </button>
                        </Link>
                        <Link href={"/howtw"}>
                            <button type="button" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                <svg aria-hidden="true" class="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>
                                How it Works
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-[90vw] h-full bg-[#eaeaeaec] dark:bg-[#232327]  mx-auto rounded-md my-10 p-4 flex justify-start items-center flex-col gap-5 comfort">
                    <p>
                        Welcome to <span className="monu">AlgoSearch</span>, the ultimate algorithmic problems search engine. Developed for the prestigious Algozenith Web Dev Hackathon, AlgoSearch is your go-to platform for finding the perfect DSA (Data Structures and Algorithms) or CP (Competitive Programming) problem.
                    </p>
                    <p>
                        Our mission is to make your coding journey more efficient and enjoyable. Whether you're a beginner looking to sharpen your skills or a seasoned programmer in need of a challenge, AlgoSearch is here to help.
                    </p>
                    <p>

                        With a simple keyword search, you can easily explore a vast collection of problems curated by industry experts. AlgoSearch leverages powerful algorithms and intelligent indexing techniques to deliver accurate and relevant results for your specific needs. We understand that time is precious, and our aim is to save you valuable hours spent on searching for the right problem.
                    </p>
                    <p>

                        AlgoSearch owes its success to the invaluable guidance of mentors  <span className="text-blue-600 cursor-pointer"><a href="https://www.linkedin.com/in/acraider/" target="_blank">Vivek Gupta</a></span> and <span href="https://www.linkedin.com/in/prabaljainn/" target="_blank" className="text-blue-600 cursor-pointer"><a>Prabal Jain</a></span> . With their extensive knowledge and expertise, they have shaped AlgoSearch into an indispensable tool for every aspiring coder.
                    </p>
                    <p>

                        Join the AlgoSearch community today and unlock a world of challenging and engaging algorithmic problems. Whether you're preparing for coding interviews, participating in programming competitions, or simply honing your problem-solving skills, AlgoSearch has got you covered.
                    </p>
                    <p>
                        Embrace the power of algorithms and embark on an exciting problem-solving adventure with <span className="monu">AlgoSearch!</span>
                    </p>
                    <p>
                        Developer  <span className="text-blue-600 cursor-pointer"><a href="https://www.linkedin.com/in/gaudsuraj/" target="_blank">Suraj Gaud</a></span>
                    </p>
                </div>
                <div className="my-10 w-[90vw] mx-auto">
                    <h1 className="monu text-3xl text-blue-600 my-10">Features</h1>

                    <div>
                        <h1 class="mb-4 py-0 flex flex-col text-xl monu font-bold border-l-[8px] pl-3 border-blue-600">Theme Switch: Dark and Light Mode, Auto Fetch Theme</h1>
                        <p class="mb-4 py-0 flex flex-col comfort">Seamlessly switch between dark and light modes with automatic theme detection.</p>

                        <h1 class="mb-4 py-0 flex flex-col text-xl monu font-bold border-l-[8px] pl-3 border-blue-600">Platform Tag for a Particular Problem</h1>
                        <p class="mb-4 py-0 flex flex-col comfort">Categorizing and organizing problems based on the platform they belong to.</p>
                        <h1 class="mb-4 py-0 flex flex-col text-xl monu font-bold border-l-[8px] pl-3 border-blue-600">Difficulty Criteria of the Problem</h1>
                        <p class="mb-4 py-0 flex flex-col comfort">Classifying problems based on their level of difficulty to aid user selection.</p>
                        <h1 class="mb-4 py-0 flex flex-col text-xl monu font-bold border-l-[8px] pl-3 border-blue-600">Server Side Rendering for Query Predictions</h1>
                        <p class="mb-4 py-0 flex flex-col comfort">Enhancing query predictions with efficient rendering techniques.</p>

                        <h1 class="mb-4 py-0 flex flex-col text-xl monu font-bold border-l-[8px] pl-3 border-blue-600">Top 20 Results from the Algorithmic Predictions</h1>
                        <p class="mb-4 py-0 flex flex-col comfort">Providing the most relevant and accurate results based on advanced algorithms.</p>

                        <h1 class="mb-4 py-0 flex flex-col text-xl monu font-bold border-l-[8px] pl-3 border-blue-600">Simple and User-Friendly UI</h1>
                        <p class="mb-4 py-0 flex flex-col comfort">Streamlined interface designed for easy navigation and optimal user experience.</p>



                        <h1 class="mb-4 py-0 flex flex-col text-xl monu font-bold border-l-[8px] pl-3 border-blue-600">One Click Solution / Editorial of the Problem</h1>
                        <p class="mb-4 py-0 flex flex-col comfort">Instant access to problem solutions and detailed editorials with a single click.</p>

                        <h1 class="mb-4 py-0 flex flex-col text-xl monu font-bold border-l-[8px] pl-3 border-blue-600">More New Features with Upcoming Updates</h1>
                        <p class="mb-4 py-0 flex flex-col comfort">Exciting new features and enhancements coming soon to further improve the platform.</p>

                    </div>
                </div>
            </main>
        </>
    )
}
function Card() {
    return (
        <>

        </>
    )
}