import React from "react";
import styles from "./DarkMode.module.css";
import classNames from "classnames";

let prefersDark = false

const DarkMode = () => {
  const [theme, setTheme] = React.useState('light')
  const [isMobile, setIsMobile] = React.useState(false)

  const setDark = () => {
    localStorage.setItem("theme","dark")
    document.documentElement.setAttribute("data-theme", "dark")
  }
  
  const setLight = () => {
    localStorage.setItem("theme","light")
    document.documentElement.setAttribute("data-theme", "light")
  }

  if (typeof window !== 'undefined') {
    prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  const defaultDark =
    theme === "dark" || (theme === null && prefersDark)

  if (defaultDark) {
    setDark();
  }

  const toggleTheme = (event) => {
    if (event.currentTarget.dataset.theme === 'light') {
      setDark();
    } else {
      setLight();
    }
  }
  const conditionalTranslationOnWindowResize = () => {
    let mql = window.matchMedia("(max-width: 960px)");
    setIsMobile(mql.matches);
  }

  React.useEffect(() => {
    conditionalTranslationOnWindowResize();
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', conditionalTranslationOnWindowResize)
  })
  React.useEffect(()=>{
    const theme = localStorage.getItem("theme");
    if(theme){
      if(theme=="dark") setDark();
      else setLight();
    }
  },[])

  return (
    <div
      className={classNames({
        [styles.darkMode]: true,
      })}
      data-theme={theme}
      onClick={(event) => {
        setTheme(currentTheme => ((currentTheme === 'light') ? 'dark' : 'light'))
        toggleTheme(event)
      }}
    >
      {theme === 'light' ?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      }

    </div>
  )
};

export default DarkMode;
