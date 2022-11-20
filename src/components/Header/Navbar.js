import React, { useState } from "react";
import logo from '../../assets/barz_app_logo.png'

export default function Navbar() {
    const [show, setShow] = useState(null);


    return (
        <>
            <div className="h-full w-full">
                {/* Code block starts */}
                <nav className="">
                    <div className="mx-auto container px-6 md:py-2 lg:py-2 xl:py-0">
                        <div className="flex items-center justify-center">
                            <div className=" xl:flex md:mr-6  flex text-center items-center flex-row ">
                                <div className="pr-2">
                                    <img src={logo} alt="" height={30} width={30} />
                                </div>
                                <h1 className="text-2xl font-semibold leading-9 text-gray-800 py-3">Barz App</h1>
                            </div>

                        </div>
                    </div>
                </nav>

                {/* Code block ends */}
            </div>
        </>
    );
}
