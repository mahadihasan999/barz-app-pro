import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
const UpdatePoem = () => {
    const [poems, setPoems] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const url = `https://guarded-refuge-53405.herokuapp.com/poems/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setPoems(data));
    }, []);

    // Update User
    const handleNameChange = e => {
        const updatedPoem = e.target.value;
        const updatePoem = { lyrics: updatedPoem };
        setPoems(updatePoem);

    }



    const handleUpdatePoem = e => {
        const url = `https://guarded-refuge-53405.herokuapp.com/poems/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(poems)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Update Successful');
                    setPoems({});
                    navigate('/catalog');
                    e.target.reset();
                }
            })
        e.preventDefault();
    }

    return (
        <div className='mx-4 lg:mx-96 md:mx-36 '>
            <Toaster></Toaster>
            <h1 className='pt-5 text-gray-700 font-semibold text-md'>Update data</h1>
            <form onSubmit={handleUpdatePoem} className="py-7">
                <div className="border-gray-300 pr-2 ">
                    <div className="border border-gray-300 rounded overflow-y-auto lg:h-72 sm:h-36 md:h-64 ...">
                        <div className="flex ">
                            <textarea
                                className="resize-none w-full h-[170px] text-base outline-none text-slate-600 mx-2 my-2 "
                                placeholder="Update word or Sentence"
                                type="text"
                                required
                                onChange={handleNameChange}
                                // value={itemNumber}
                                defaultValue={
                                    poems?.lyrics
                                }
                            />
                        </div>

                    </div>

                    <div className="flex float-right gap-4">
                        <button type="reset"
                            defaultValue="Reset"
                            className="bg-gray-600 text-base font-medium w-24 lg:w-32 px-3 py-2 text-white mt-2 lg:mt-5 md:mt-5 hover:bg-red-500 transition duration-300 ease-in-out ">
                            Clear
                        </button>
                        <button
                            type="submit" className="bg-cyan-600 text-base font-medium w-24 lg:w-32 px-3 py-2 text-white mt-2 lg:mt-5 md:mt-5 hover:bg-cyan-500 transition duration-300 ease-in-out ">
                            Update
                        </button>
                    </div>
                </div>

                {/* <hr className="h-[1px] bg-gray-100 my-5" /> */}
                <div className="flex md:flex-row lg:flex-row  flex-col items-center justify-center w-full px-7 lg:flex-row justify-between ">

                </div>
            </form>

        </div>
    );
};

export default UpdatePoem;