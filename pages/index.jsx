import CustomHead from '../components/customHead'
import { Comfortaa } from 'next/font/google'
import DarkMode from '@/components/DarkMode'
import {
  IconButton,
} from "@material-tailwind/react";
import {
  Bars2Icon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import axios from 'axios'
import DashboardLoader from '@/components/Loader.mjs'
import Link from 'next/link'

const comfort = Comfortaa({ subsets: ['latin'] })


export default function Home() {
  return (
    <div className={`bg-transparent h-fit w-screen flex flex-col items-center justify-center ${comfort.className}`}>
      <CustomHead />
      {/* <Navbar /> */}
      {/* <Testimonial /> */}
      {/* <FAQ /> */}
      <NewComp />
      {/* <Footer /> */}

    </div>
  )

}
function NewComp() {
  const [query, setQuery] = useState("");
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isLoading, setLoading] = React.useState(null);
  const [data, setData] = React.useState([]);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setData([]);
    let myQuery = query.split(" ");
    console.log(myQuery);
    await axios.get('https://algosearch-backend.onrender.com/search', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        strings: JSON.stringify(myQuery)
      }
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    setQuery("");
    setLoading(false);
  }
  return (
    <>
      <main className="w-screen h-screen">
        <div className="flex justify-between items-center w-[95vw] mx-auto mt-4" >
          <div className="flex justify-start items-center gap-2 ">

            <h1 className="monu text-sm md:text-2xl tracking-wider caret-transparent"><span className='text-blue-600'>Algo</span>Search</h1>
            <p className="text-blue-600 border-[1px] border-blue-600 rounded-md p-1 text-xs font-extrabold comfort">Beta</p>
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

        {/* Search */}

        <div className="w-[90vw] mx-auto">
          <div className="w-full h-[80vh] rounded-xl bg-[#eaeaeaec] dark:bg-[#232327] mt-5 overflow-y-scroll p-2">
            {/* Cards */}
            {isLoading ?
              <DashboardLoader />
              :
              <div class="w-full mx-auto flex justify-center pt-6 ">
                <ul class="grid-list pl-0 mx-auto mb-5 ">
                  {data.map(item => {
                    return <Card title={item.QuestionName} QuestionLink={item.QuestionLink} diff={item.Diff} />
                  }
                  )}

                </ul>
              </div>
            }
            {/* Search Bar */}
            <div class="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2 md:-left-2 "><form onSubmit={handleSubmit} class="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"><div class="relative flex h-full flex-1 items-stretch md:flex-col" role="presentation"><div class="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black bg-white dark:border-gray-50 dark:text-white dark:bg-[#131314] rounded-[30px] shadow-xs dark:shadow-xs"><textarea value={query} onChange={(e) => setQuery(e.target.value)} id="prompt-textarea" tabindex="0" data-id="root" rows="1" placeholder="Search here ..." class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0 outline-none placeholder-gray-900 dark:placeholder-gray-50 text-sm"></textarea>
              <button onClick={handleSubmit} disabled={!query} class="absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 dark:stroke-white stroke-black ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
                {/* Text */}
              </button></div></div></form><div class="px-3 pb-3 pt-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-4 md:pb-6 md:pt-3"><span>AlgoSearch in beta testing may produce inaccurate predictions. <a href="https://www.linkedin.com/in/gaudsuraj/" target="_blank" rel="noreferrer" class="underline">Developer AlgoSearch</a></span></div></div>
          </div>
        </div>
      </main>
    </>
  )
}


function Card({ title = "Link", platformLink = "https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo.png", QuestionLink="/  ", diff="" }) {

  return (
    <>

      <li class="bg-gray-50 dark:bg-gray-800 text-black shadow-lg max-w-sm bg-gray6 p-4 md:p-5 rounded-xl relative">
        <span class="absolute -top-4 right-2 font-display leading-6 text-center text-3xl w-8 h-8 md:w-10 md:h-10 rounded-full p-2 bg-gray-100 dark:bg-[#525256] shadow-lg">
          <img width="24" height="24" src={platformLink} alt="external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo" />
        </span>
        {/* Title */}
        <a href={QuestionLink} target='_blank'>
          <h5 className='monu text-[#1d1d1d] dark:text-[#e0e0e0] text-sm  md:text-lg'>{title}</h5>
        </a>

        {/* Difficulty Level */}
        {diff == "Easy" &&
          <div class="bg-green-400 dark:bg-dark-green-400 text-green-600 dark:text-dark-green-400 inline-block rounded-md bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize dark:bg-opacity-[.15] comfort">Easy</div>
        }
        {diff == "Medium" &&
          <div class="bg-yellow-600 dark:bg-dark-yellow-500 text-yellow-700 dark:text-dark-yellow-700 inline-block rounded-md bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize dark:bg-opacity-[.15] comfort">Medium</div>
        }
        {diff == "Hard" &&
          <div class="bg-pink-400 dark:bg-dark-pink-400 text-pink-500 dark:text-dark-pink-400 inline-block rounded-md bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize dark:bg-opacity-[.15] comfort">Hard</div>
        }
        {/* Solution Link */}
        <div className="inline-block justify-start items-center gap-1 pt-2 mx-1">
          <a href={QuestionLink + "solution"} target="_blank">
            <div class="bg-blue-500 dark:bg-dark-blue-500 text-blue-500 dark:text-dark-blue-500 rounded-md bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize dark:bg-opacity-[.15] comfort flex justify-start items-center gap-1">Solution
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="" class="w-5 h-5 rotate-45 stroke-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </a>
        </div>
      </li>
    </>
  )
}
