import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Poem from './Poem';

import toast, { Toaster } from 'react-hot-toast';

const DisplayPoems = () => {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["lastword", "lyrics", "totalLastCharacter"]);

    const [searchParamRhy] = useState(["totalLastCharacter"]);

    const [filterParam, setFilterParam] = useState(["All"]);

    const [filterPara, setFilterPara] = useState(["All"]);

    // const [searchSort] = useState("totalLine");




    useEffect(() => {
        fetch(
            "https://guarded-refuge-53405.herokuapp.com/poems"
        )
            .then((res) => res.json())
            .then(
                (result) => {

                    setItems(result);
                },
                (error) => {


                }
            );
    }, []);

    const data = Object.values(items);


    function search(data) {

        if (filterPara == 'All') {

            items.sort()
        }
        if (filterPara == 'totalLine') {

            items.sort((a, b) => {
                return a.totalLine - b.totalLine;
            })
        }
        if (filterPara == 'date') {

            items.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            })
        }
        if (filterPara == 'dateUpdated') {

            items.sort((a, b) => {
                return new Date(b.dateUpdated) - new Date(a.dateUpdated);
            })
        }

        return data.filter((item) => {

            if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }

            if (filterParam == "totalLastCharacter") {
                return searchParamRhy.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }




        });
    }






    // items.forEach((e) => {
    //     console.log(`${e.totalLine}`);
    // });


    // DELETE AN USER
    const handleDeletePoem = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `https://guarded-refuge-53405.herokuapp.com/poems/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Successfully deleted!')
                        const remainingUsers = items.filter(poem => poem._id !== id);
                        setItems(remainingUsers);
                    }
                });
        }
    }

    //loading 
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])



    // function handleClick() {
    //     items.sort((a, b) => {
    //         return a.totalLine - b.totalLine;
    //     })
    // }



    return (

        <div className="bg-white dark:bg-gray-800 h-[100vh]">
            <div className="mx-auto container">
                <Toaster></Toaster>
                <div className="flex p-4 lg:p-8 flex-col items-center justify-center">
                    <div className="w-full  flex items-center justify-center">

                        {/* search bar */}
                        <div className=" flex flex-row">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="border-none rounded-l-md lg:px-10 md:px-6 px-2 py-[8px]"
                                placeholder="Search"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <span className="sr-only">Search</span>

                            <select
                                onChange={(e) => {
                                    setFilterParam(e.target.value);
                                }}
                                className="custom-select border-l py-[8px] rounded-r-md"
                                aria-label=""
                            >
                                <option value="All">All</option>

                                <option value="totalLastCharacter">End Rhymes</option>
                            </select>
                            <span className="focus"></span>

                        </div>


                    </div>

                    <div className='py-3'>
                        <select
                            onClick={(e) => {
                                setFilterPara(e.target.value);
                            }}
                            className="custom-select bg-gray-300 rounded"
                        >
                            <option value="All">Sort</option>
                            <option value="date">Date Created</option>
                            <option value="dateUpdated">Date Modified</option>
                            <option value="totalLine">Number of line</option>

                        </select>

                    </div>


                </div>




                {
                    loading ? <div class="flex items-center justify-center space-x-2 animate-pulse mt-20">
                        <div class="w-5 h-5 bg-gray-700 rounded-full"></div>
                        <div class="w-5 h-5 bg-gray-600 rounded-full"></div>
                        <div class="w-5 h-5 bg-gray-500 rounded-full"></div>

                    </div>
                        : <div className="w-full overflow-x-scroll xl:overflow-x-hidden ">
                            <h1 className="text-gray-600 dark:text-gray-400 font-normal pr-2 text-md text-left py-2 tracking-normal leading-4 ">Total Poems found {items.length}</h1>
                            <table className="min-w-full bg-white dark:bg-gray-800 border text-center">
                                <thead>
                                    <tr className=" h-16 border-gray-300 dark:border-gray-200 border py-8 text-center">
                                        <th className=" text-gray-600 dark:text-gray-400 font-normal text-sm border tracking-normal leading-4 border">ID</th>

                                        <th className="text-gray-600 dark:text-gray-400 font-normal pr-2 text-sm border tracking-normal leading-4">Poems</th>
                                        <th className="text-gray-600 dark:text-gray-400 font-normal px-2 text-sm border tracking-normal leading-4">T.End Character</th>
                                        {/* <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-sm border tracking-normal leading-4">Rhymes</th> */}
                                        <th className="text-gray-600 dark:text-gray-400 font-normal px-2 text-sm border tracking-normal leading-4">Syllable</th>
                                        <th className="text-gray-600 dark:text-gray-400 font-normal px-2 text-sm border tracking-normal leading-4">Word</th>
                                        <th className="text-gray-600 dark:text-gray-400 font-normal px-2 text-sm border tracking-normal leading-4">Date Inserted</th>
                                        <th className="text-gray-600 dark:text-gray-400 font-normal px-2 text-sm border tracking-normal leading-4">Date Modified</th>
                                        <td className="text-gray-600  dark:text-gray-400 font-normal px-2 text-sm border tracking-normal leading-4">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {search(items)?.map((item, index) => (

                                        <Poem
                                            handleDeletePoem={handleDeletePoem}
                                            poems={item}
                                            index={index}
                                            key={index}
                                            {...item}
                                        />
                                    ))
                                    }


                                </tbody>

                            </table>
                        </div>
                }


            </div>
        </div>

    )



};

export default DisplayPoems;