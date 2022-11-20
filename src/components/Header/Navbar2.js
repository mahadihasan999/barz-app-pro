import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar2() {
  const [show, setShow] = useState(null);
  const [profile, setProfile] = useState(false);
  const [product, setProduct] = useState(false);
  const [deliverables, setDeliverables] = useState(false);
  return (
    <>
      <div className="bg-cyan-400 h-full  w-full">
        {/* Code block starts */}
        <nav className="bg-cyan-600 shadow">
          <div className="mx-auto container px-6 lg:py-2 xl:py-[7px]">
            <div className="flex items-center justify-center">
              <div className="xl:flex  flex text-center items-center justify-around ">
                <Link
                  className="flex px-5 items-center py-3 text-md leading-5 text-gray-100 hover:text-gray-700 focus:text-gray-700 focus:outline-none transition duration-150 ease-in-out"
                  to="/"
                >
                  Editor
                </Link>
                {/* <Link className="flex px-5 items-center py-3 text-md leading-5 text-gray-100 hover:text-gray-700 focus:text-gray-700
                                focus:outline-none transition duration-150 ease-in-out" to="/catalog">Catalog</Link> */}
                <Link
                  className="flex px-5 items-center py-3 text-md leading-5 text-gray-100 hover:text-gray-700
                                focus:text-gray-700
                                focus:outline-none transition duration-150 ease-in-out"
                  to="/"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
