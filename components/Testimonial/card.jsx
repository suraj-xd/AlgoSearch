import React from 'react'

const Card = ({name, img, details, description}) => {
  return (
    <section className="bg-[#f1f5f9] dark:bg-gray-900 w-[95vw] grid place-items-center md:w-[75vw] rounded-2xl py-8 shadow-xl">
      <div className="w-[37.5rem] mobile:w-[17.5rem] sm:w-[30rem] md:mx-auto text-center">
        <p className="mobile:text-md sm:text-xl md:text-xl font-medium text-gray-900 dark:text-white">{description}</p>
      </div>
    </section>
  )
}

export default Card 