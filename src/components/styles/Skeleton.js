import React from 'react'
import './Spinner.css'
const Skeleton = () => {
    return (
        <div className="animate-pulse bg-white transition transform duration-700  hover:scale-105 p-4 rounded-lg relative grid place-items-center h-screen " >
            <div class="">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default Skeleton