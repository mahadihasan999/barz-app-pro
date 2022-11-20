import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios, * as others from 'axios';
const Item = ({ item }) => {

    const [data, setData] = useState()
    const [reletive, setReletive] = useState()
    const [open, setOpen] = useState(false)
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [activeStatus, setActiveStatus] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        axios.get(`https://rhymebrain.com/talk?function=getRhymes&word=${item}`)

            .then(res => {
                setData(res.data)
            }).catch(err => console.log(err))

    }, [])

    //find reletive word
    useEffect(() => {
        axios.get(`https://api.datamuse.com/words?rel_syn=${item}`)

            .then(res => {
                setReletive(res.data)
            }).catch(err => console.log(err))

    }, [])



    const getData = data?.map(function (element) {

        return element.word;

    })


    const getAllword = getData?.toString();

    //push rhyems word by syllables
    const numSyllables_1 = []
    const numSyllables_2 = []
    const numSyllables_3 = []
    const numSyllables_4 = []

    const getNumSyllables_1 = data?.map(function (element) {

        if (element.syllables == '1') {
            numSyllables_1.push(element.word);
        }
        if (element.syllables == '2') {
            numSyllables_2.push(element.word);
        }
        if (element.syllables == '3') {
            numSyllables_3.push(element.word);
        }
        if (element.syllables == '4') {
            numSyllables_4.push(element.word);
        }


    })

    //loading 
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 100)
    }, [])


    return (
        <div>


            {

                getAllword ?
                    <div className='flex items-center jusitfy-center text-left gap-2'>
                        <h1 className='text-gray-700 bg-orange-300 text-sm rounded-r px-[5px] my-[2px]'>{item?.charAt(0).toUpperCase() + item?.slice(1)}</h1>
                        {
                            loading ?
                                <div class="flex items-center justify-center space-x-2 animate-pulse">
                                    <div class="w-5 h-5 bg-cyan-400 rounded-full"></div>
                                    <div class="w-5 h-5 bg-cyan-500 rounded-full"></div>
                                    <div class="w-5 h-5 bg-cyan-600 rounded-full"></div>
                                </div>

                                :
                                <>
                                    <div className='overflow-x-scroll '>
                                        <h1 className='w-[180px] lg:w-[450px] md:w-[410px]   text-gray-100 text-sm tracking-tight'> {
                                            getAllword?.charAt(0).toUpperCase() + getAllword?.slice(1)
                                        }</h1>
                                    </div>
                                    <button onClick={onOpenModal} className=' text-sm text-orange-400 px-[4px] rounded  hover:text-cyan-600 hover:text-gray-100  underline text-sm'>See more</button>
                                </>
                        }

                    </div>

                    :
                    <div class="flex items-center justify-center space-x-2 animate-pulse">
                        <div class="w-5 h-5 bg-cyan-400 rounded-full"></div>
                        <div class="w-5 h-5 bg-cyan-500 rounded-full"></div>
                        <div class="w-5 h-5 bg-cyan-600 rounded-full"></div>
                    </div>

            }



            <Modal
                open={open}
                onClose={onCloseModal}
                center

            >
                <div className='w-full'>
                    <div className="justify-between flex-wrap  bg-white rounded shadow">
                        <div className="xl:w-full xl:mx-0 pl-5 pr-5 h-12">
                            <ul className="flex">
                                <li onClick={() => setActiveStatus(1)} className={activeStatus == 1 ? "text-sm text-cyan-700 flex flex-col justify-between border-cyan-700 pt-3 rounded-t mr-10 font-normal" : "text-sm text-gray-600 py-3 mr-10 font-normal cursor-pointer hover:text-gray-800"}>
                                    <span className="mb-3 cursor-pointer">{activeStatus === 1 ? "RHYMES" : "RHYMES"}</span>
                                    {activeStatus === 1 && <div className="w-full h-1 bg-cyan-700 rounded-t-md" />}
                                </li>
                                <li onClick={() => setActiveStatus(2)} className={activeStatus === 2 ? "text-sm text-cyan-700 flex flex-col justify-between border-cyan-700 pt-3 rounded-t mr-10 font-normal" : "text-sm text-gray-600 py-3 mr-10 font-normal cursor-pointer hover:text-gray-800"}>
                                    <span className="mb-3 cursor-pointer">{activeStatus === 2 ? "RELATED WORDS" : "RELATED WORDS"}</span>
                                    {activeStatus === 2 && <div className="w-full h-1 bg-cyan-700 rounded-t-md" />}
                                </li>

                                {/* <li onClick={() => setActiveStatus(4)} className={activeStatus == 4 ? "text-sm text-cyan-700 flex flex-col justify-between border-cyan-700 pt-3 rounded-t mr-10 font-normal" : "text-sm text-gray-600 py-3 mr-10 font-normal cursor-pointer hover:text-gray-800"}>
                                    <span className="mb-3 cursor-pointer">{activeStatus == 4 ? "Active" : "Inactive"}</span>
                                    {activeStatus == 4 && <div className="w-full h-1 bg-cyan-700 rounded-t-md" />}
                                </li> */}
                            </ul>
                        </div>
                    </div>

                    <div className=" flex flex-col min-w-0 break-words  w-full rounded " >
                        <div className="py-5 flex-auto bg-sec">
                            <div className="tab-content tab-space">
                                <div className={activeStatus === 1 ? "block" : "hidden"} id="books">
                                    <div>
                                        <div className=''>
                                            <div>
                                                <h1 className='font-md text-xl bg-gray-500 text-center text-gray-100 px-2'>1 syllable</h1>
                                            </div>
                                            <div >

                                                {
                                                    numSyllables_1?.length ?

                                                        <div className='grid grid-cols-4 shadow p-2'>   {
                                                            numSyllables_1.map(element =>
                                                                <h1 className=''>
                                                                    {element?.charAt(0).toUpperCase() + element?.slice(1)}
                                                                </h1>
                                                            )}

                                                        </div>
                                                        :
                                                        <div className='text-red-500 font-semibold text-center py-2'> Not Found 1 Syllable of "{item}" </div>
                                                }

                                            </div>
                                        </div>
                                        <div className='py-4'>
                                            <div>
                                                <h1 className='font-md text-xl bg-gray-500 text-center text-gray-100 px-2'>2 syllable</h1>
                                            </div>
                                            <div >

                                                {
                                                    numSyllables_2?.length ?

                                                        <div className='grid grid-cols-4 shadow p-2'>   {
                                                            numSyllables_2.map(element =>
                                                                <h1 className=''>
                                                                    {element?.charAt(0).toUpperCase() + element?.slice(1)}
                                                                </h1>
                                                            )}

                                                        </div>
                                                        :
                                                        <div className='text-red-500 font-semibold text-center py-2'> Not Found 2 Syllable of "{item}" </div>
                                                }

                                            </div>
                                        </div>
                                        <div className='py-4'>
                                            <div>
                                                <h1 className='font-md text-xl bg-gray-500 text-center text-gray-100 px-2'>3 syllable</h1>
                                            </div>
                                            <div >

                                                {
                                                    numSyllables_3?.length ?

                                                        <div className='grid grid-cols-4 shadow p-2'>   {
                                                            numSyllables_3.map(element =>
                                                                <h1 className=''>
                                                                    {element?.charAt(0).toUpperCase() + element?.slice(1)}
                                                                </h1>
                                                            )}

                                                        </div>
                                                        :
                                                        <div className='text-red-500 font-semibold text-center py-2'> Not Found 3 Syllable of "{item}" </div>
                                                }

                                            </div>
                                        </div>
                                        <div className='py-4'>
                                            <div>
                                                <h1 className='font-md text-xl bg-gray-500 text-center text-gray-100 px-2'>4 syllable</h1>
                                            </div>
                                            <div >

                                                {
                                                    numSyllables_4?.length ?

                                                        <div className='grid grid-cols-4 shadow p-2'>   {
                                                            numSyllables_4.map(element =>
                                                                <h1 className=''>
                                                                    {element?.charAt(0).toUpperCase() + element?.slice(1)}
                                                                </h1>
                                                            )}

                                                        </div>
                                                        :
                                                        <div className='text-red-500 font-semibold text-center py-2'> Not Found 4 Syllable of "{item}" </div>
                                                }

                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className={activeStatus === 2 ? "block" : "hidden"} id="blogs">
                                    <div className=''>
                                        <div>
                                            <h1 className='font-md text-md bg-gray-500 text-center text-gray-100 px-2'>Showing words that reletive with <span >"{item}"</span></h1>
                                        </div>
                                        <div >

                                            {
                                                reletive?.length ?

                                                    <div className='grid grid-cols-4 shadow gap-3 p-2'>   {
                                                        reletive?.map(element =>
                                                            <h1 className=''>
                                                                {element.word}
                                                            </h1>
                                                        )}

                                                    </div>
                                                    :
                                                    <div className='text-red-500 font-semibold text-center py-2'> Not Found Releted word" </div>
                                            }

                                        </div>
                                    </div>

                                </div>
                                <div className={activeStatus === 3 ? "block" : "hidden"} id="blogs">
                                    <p>three</p>
                                </div>
                                {/* <div className={activeStatus === 4 ? "block" : "hidden"} id="certifications">
                                    <p>four</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default Item;