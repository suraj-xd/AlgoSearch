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
            <CustomHead title="How AlgoSearch Works"/>
            <main className="w-screen min-h-screen">
                <div className="flex justify-between items-center w-[95vw] mx-auto mt-4" >
                    <div className="flex justify-start items-center gap-2 ">
                        <Link href={"/"}>
                        <h1 className="monu text-sm md:text-2xl tracking-wider caret-transparent cursor-pointer"><span className='text-blue-600'>Algo</span>Search</h1>
                        </Link>
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
                    <div>
                        <h1 className="monu text-xl text-blue-600">
                            Scrapping
                        </h1>
                        <p>
                            In order to provide a comprehensive search experience for algorithmic problems, we understand the importance of having a diverse and extensive dataset. To accomplish this, we employ web scraping techniques to gather relevant data from various online sources. By collecting and organizing this data, we ensure that AlgoSearch has a rich repository of algorithms to search and process with machine learning algorithms.
                        </p>
                    </div>
                    <div>
                        <h1 className="monu text-xl text-blue-600">Implementing TF-IDF</h1>
                        <p>
                            Once the data is obtained through web scraping, we leverage the power of machine learning to enhance the search capabilities of AlgoSearch. One of the key algorithms we implement is TF-IDF (Term Frequency-Inverse Document Frequency). TF-IDF allows us to analyze the importance of each keyword within the context of the entire dataset. By implementing TF-IDF on the scraped data, we ensure that AlgoSearch delivers accurate and relevant results based on the user's search query.
                        </p>
                    </div>
                    <div>
                        <h1 className="monu text-xl text-blue-600">Setting up Backend</h1>
                        <p>
                            ehind the scenes, AlgoSearch relies on a robust backend infrastructure to process user requests and deliver the predicted results. We have developed a RESTful API that efficiently handles incoming queries and communicates with the machine learning algorithms running in the background. This setup ensures seamless interaction between the frontend and backend components of AlgoSearch, enabling fast and reliable performance.
                        </p>
                    </div>
                    <div>
                        <h1 className="monu text-xl text-blue-600">Frontend</h1>
                        <p>

                            The frontend of AlgoSearch is designed to provide a user-friendly and intuitive interface for users to interact with the system. To achieve this, we utilize Next.js for server-side rendering, which enhances the loading speed and overall performance of the application. Additionally, we have developed a custom API that connects the frontend to the backend, allowing users to retrieve detailed information about their search results. The frontend of AlgoSearch combines functionality with a visually appealing design, ensuring an enjoyable user experience.
                        </p>
                    </div>
                </div>

            </main>
        </>
    )
}
