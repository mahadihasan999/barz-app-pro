import React, { useEffect, useState } from 'react';
import {
    Link,
} from 'react-router-dom';

const Poem = ({ lyrics, lastword, eachlineSyl, totalLastCharacter, _id, date, index, handleDeletePoem, lastUpdated, totalLine }) => {


    // const l = lyrics.toString()
    var re = /^(?!(\?)|(\[)).+(\n|$)/gm;
    const Lyrics_line = lyrics?.match(re);

    return (
        <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
            <td className="text-sm px-2 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{index + 1}</td>

            <td className="text-sm px-2  text-gray-800 dark:text-gray-100  leading-4 text-left border-l px-2 relative">
                {Lyrics_line?.map(line =>

                    <p className='whitespace-pre '>
                        {line}
                    </p>
                )}
                <h3 className='text-right text-[10px] absolute inset-x-0 bottom-0'><span className='bg-gray-300 px-[4px] text-gray-700 '>line {totalLine}</span></h3>
            </td>

            {/* end rhyems like 2T, 41 */}
            <td className="text-sm text-left pr-2 whitespace-no-wrap text-gray-800 dark:text-gray-100  leading-4 tracking wider border-l px-2">
                <> <th>
                    {totalLastCharacter?.map(li =>
                        <tr className='border border-cyan-400'>{li}</tr>
                    )}
                </th>
                </>
            </td>
            {/* <td className="text-sm text-left whitespace-no-wrap text-gray-800 dark:text-gray-100  leading-4 border-l px-2   ">

                <div className='overflow-x-auto w-48'>
                    <ul>
                        {rhymesData?.map(li =>
                            <li className=''>{li}</li>
                        )}

                    </ul>
                </div>
            </td> */}

            <td className="text-sm px-2 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-left border-l px-2 ">
                <ul>
                    {
                        eachlineSyl?.map(syl =>
                            <li>
                                <p> {syl}</p>
                            </li>
                        )
                    }
                </ul>

            </td>

            <td className="text-sm px-2 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-left  border-l px-2">
                <ul>
                    {
                        lastword?.map(word =>

                            <li>
                                <p> {word.charAt(0).toUpperCase() + word.slice(1).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<> \n\{\}\[\]\\\/]/gi, '')}</p>
                            </li>
                        )
                    }
                </ul>

            </td>
            <td className="text-sm px-2 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-left border-l px-2">

                <p>{date?.slice(0, 10)}</p>
                <p className='text-gray-300 text-sm'>{date?.slice(10, 16)}</p>


            </td>
            <td key={index} className="text-sm px-2 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-left border-l px-2">
                {
                    lastUpdated?.length ? <div className='flex  flex-col border border-cyan-400 '>
                        <p>{lastUpdated?.slice(0, 10)}</p>
                        <p className='text-gray-300 text-sm'>{lastUpdated?.slice(10, 16)}</p>
                    </div> :
                        <h1>Not modified</h1>

                }

            </td>

            <td className='border-l '>
                <div className="flex flex-col items-center gap-1 mx-2">
                    <Link to={`/poems/update/${_id}`} >
                        <h1 className="text-gray-600 dark:text-gray-400 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" >

                            <svg xmlns="http://www.w3.org/2000/svg" className="icon cursor-pointer icon-tabler icon-tabler-edit" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                <line x1={16} y1={5} x2={19} y2={8} />
                            </svg>
                        </h1>
                    </Link>

                    <h1 onClick={() => handleDeletePoem(_id)} className="text-red-500 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon cursor-pointer icon-tabler icon-tabler-trash" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1={4} y1={7} x2={20} y2={7} />
                            <line x1={10} y1={11} x2={10} y2={17} />
                            <line x1={14} y1={11} x2={14} y2={17} />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </h1>
                </div>
            </td>

            {/* <td className="px-7 2xl:px-0 border-l">
                {
                    show == 7 ? <button onClick={() => setShow(null)} className="focus:outline-none pl-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                            <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button> : <button onClick={() => setShow(7)} className="focus:outline-none pl-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                            <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                }
                {show == 7 && <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 ">

                    <Link to={`/poems/update/${_id}`} > <div className="text-xs w-full hover:bg-cyan-700 py-4 px-4 cursor-pointer hover:text-white">
                        <p >Edit</p>

                    </div>
                    </Link>
                    <div onClick={() => handleDeletePoem(_id)} className="text-xs w-full hover:bg-cyan-700 py-4 px-4 cursor-pointer hover:text-white">
                        <p >Delete</p>
                    </div>
                </div>}
            </td> */}
        </tr >

    );
};

export default Poem;