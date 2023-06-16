import React from "react"
import Link from 'next/link'

export default function Footer() {

    return (
        <footer className="mobile:w-screen anti-mobile:w-[90vw] p-4 max-sm:py-4 mobile:py-4 max-sm:px-0 mobile:px-0 bg-transparent md:px-6 md:py-8 dark:text-[#fafafa]">
            <div className="flex items-center justify-between flex-wrap max-sm:justify-around mobile:justify-around max-sm:w-screen mobile:w-screen">
                <div className={"flex flex-row-reverse justify-start items-center gap-2"}>
                    <h1 className="comfort text-2xl">nucast</h1>
                    <div className="flex flex-col gap-1">
                        <div className="w-5 h-[3px] bg-blue-700"></div>
                        <div className="w-2 h-[2px] bg-blue-700"></div>
                        <div className="w-4 h-[3px] bg-blue-700"></div>
                    </div>
                </div>
                <ul className="flex flex-wrap justify-center items-center gap-4 mb-6 max-sm:mb-0 mobile:mb-0 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <Link href="#">
                            <span className="hover:underline hover:cursor-pointer">
                                About
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <span className="hover:underline hover:cursor-pointer">
                                Privacy Policy
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <span className="hover:underline hover:cursor-pointer">
                                Discord
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4 max-sm:w-screen mobile:w-screen" />
            <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
                ©&nbsp;
                <a href="/" className="hover:underline">nucast.io.</a>
                &nbsp;All Rights Reserved.
            </span>

        </footer>
    )
}