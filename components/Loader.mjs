import React from 'react'

const DashboardLoader = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <svg className='loadersvg' viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    )
}

export default DashboardLoader