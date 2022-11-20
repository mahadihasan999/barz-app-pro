import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import { syllable } from "syllable";
import Item from "./Item";
import TextareaAutosize from "react-textarea-autosize";
import { useDebounce } from "use-debounce";

function MainEditor() {
  const [lyricsLine, setLyricsLine] = useState("");
  const [value] = useDebounce(lyricsLine, 800);
  const lyricsRef = useRef();

  // last word of paragraph
  // *************************
  // /[a-zA-Z_]+?(?=\s*?[^\w]*?$)

  // lastWord of each line
  //\s*([\S]+)$

  // lastWord of each line best ditect
  // /\s*([\S]+)+?(?=\s*?[^\w]*?$)/gm

  const f_last_word = value?.match(/\s*([\S]+)+?(?=\s*?[^\w]*?$)/gm);

  // last word of each line
  // *************************

  const regex = /\s*([\S]+)$/gm;
  const found_last_word = lyricsLine?.match(regex);

  // Syllable counter each line
  // *************************

  let p = [lyricsLine];
  const arr = p;
  const CountSyl_eachline = [];
  const totalSyllableCount = [];
  const totalWordCount = [];
  const totalCharacterCount = [];
  const totalEndCharacterCount = [];
  const totalLineCount = [];

  // parseInt(lyricsLine.slice(0, 1))

  function isNumber(str) {
    if (str.trim() === "") {
      return false;
    }

    return !isNaN(str);
  }

  const handleChange = (event) => {
    if (isNumber(event.target.value)) {
      toast.error("Enter a word or sentence!");
    } else {
      setLyricsLine(event.target.value);
    }
  };

  let modifiedArr = arr?.map(function (element) {
    let m = element?.match(/^(?!(\?)|(\[)).+(\n|$)/gm);
    var spp = m?.map((word) => word.replace("\n", ""));

    //total line count

    totalLineCount?.push(spp?.length);
    //total word count
    const word = spp?.toString();

    var wordCount = word?.match(/(\w+)/g)?.length;
    totalWordCount.push(wordCount);

    // only count letters and numbers
    const totalCharacter = word?.match(/[a-zA-Z0-9]/g)?.length;
    totalCharacterCount.push(totalCharacter);

    var single_sentence = spp?.map((word) => word.replace(/[^a-zA-Z ]/g, ""));

    //count character each line of last word
    const ss = single_sentence?.map(function (element) {
      let s = element;
      const r = /.$/s;
      const last_char = s?.match(r);
      const c = last_char[0];

      function countInstances(string, word) {
        return string.split(word)?.length - 1;
      }

      const result = countInstances(s, c);
      var t_character_count = result.toString();
      var last_character = c.toUpperCase().toString();
      var res = t_character_count.concat(last_character);
      totalEndCharacterCount.push(res);
    });

    const x = spp?.map(function (element) {
      const p = element.toString();
      const split = p.split(" ");

      // console.log(split)
      const array = split?.map((word) => syllable(word));
      let sum = 0;
      for (let i = 0; i < array.length; i++) {
        sum += array[i];
      }

      CountSyl_eachline.push(sum);
      return sum;
    });

    let sum = 0;
    for (let i = 0; i < x?.length; i++) {
      sum += x[i];
    }
    totalSyllableCount.push(sum);
  });

  const handleSubmit = (e) => {
    const lyrics = lyricsRef.current.value;
    const date = new Date();
    const lastword = found_last_word;
    const totalLine = totalLineCount.toString();
    const totalLastCharacter = totalEndCharacterCount;
    const eachlineSyl = CountSyl_eachline;
    const totalSyl = totalSyllableCount;
    const totalWord = totalWordCount;
    const totalCharacter = totalCharacterCount;
    const newPoem = {
      lyrics,
      totalLine,
      lastword,
      totalLastCharacter,
      eachlineSyl,
      totalSyl,
      totalWord,
      totalCharacter,
      date,
    };

    fetch("", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPoem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Successfully submited!");
          e.target.reset();
        }
      });
    e.preventDefault();
  };

  return (
    <div className="body_color pb-48">
      <Toaster position="top-center" reverseOrder={true} />

      <div className="px-2 py-2 body_color h-full">
        <div className="flex flex-col items-center ">
          <div className="flex-col lg:flex-row xl:flex-row flex justify-around text-left lg:gap-4 xl:gap-4 mt-2">
            <h1 className="text-[20px]">❍ Find end rhyming words</h1>
            <h1 className="text-[20px]">
              ❍ Calculate the total number of syllables
            </h1>
          </div>
          <div className="py-4 px-2 lg:w-[40rem] xl:w-[40rem] md:w-[38rem] w-full">
            <div>
              <h1 className="text-left bg-cyan-600 text-base font-normal w-[72px] text-gray-100 rounded px-[5px]">
                Rhymes
              </h1>
            </div>
            {
              <>
                <div className="py-2 border border-cyan-500  px-2  flex flex-row rounded bg-gray-600">
                  <ul>
                    <div>
                      {f_last_word?.map((item) => (
                        <div>
                          <Item item={item} key={item} {...item}></Item>
                        </div>
                      ))}
                    </div>
                  </ul>
                </div>
              </>
            }

            <div className="bg-white rounded shadow mt-2   border border-cyan-200 flex flex-col py-2">
              <div className="flex flex-row">
                <div className="flex flex-col w-1/16 mb-2 gap-[2px]">
                  <div className="mx-2">
                    <h1 className="text-left bg-cyan-600 text-base font-normal w-[32px] text-gray-100 rounded-t px-[5px]">
                      Syl
                    </h1>
                  </div>
                  <div className="mx-2 text-start pt-2">
                    <>
                      {CountSyl_eachline?.map((item, index) => (
                        <h1 key={index}>
                          <h4 className="text-cyan-700 px-[5px]  mr-2 text-sm ">
                            {" "}
                            {item}
                          </h4>
                        </h1>
                      ))}
                    </>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="w-5/6 py-7">
                  <div className="border-gray-300 pr-3 ">
                    <div className="">
                      <div className="flex ">
                        {/* <div className="flex flex-col ">
                                            <p className="resize-none w-full  pt-4 text-base outline-none text-slate-300 ">1.</p>
                                           ">3.</p>
                                         ">16.</p>
                                        </div> */}

                        <TextareaAutosize
                          minRows={10}
                          maxRows={40}
                          className="border-gray-200 border w-full p-[4px] bg-gray-200 rounded overflow-x-auto text-sm whitespace-nowrap"
                          placeholder="Enter a word or sentence"
                          required
                          onChange={handleChange}
                          ref={lyricsRef}
                        />

                        {/* <textarea
                                                    className="resize-none w-full h-[170px] text-base outline-none text-slate-600 mx-2 my-2 "
                                                    placeholder="Enter a word or sentence"
                                                    type="text"
                                                    required
                                                    // value={itemNumber}
                                                    onChange={e => setLyricsLine(e.target.value)}
                                                    ref={lyricsRef}
                                                /> */}
                      </div>
                    </div>

                    <div className="flex float-right gap-4">
                      <button
                        type="reset"
                        defaultValue="Reset"
                        className="bg-gray-600 text-base font-medium w-24 lg:w-32 px-3 py-2 text-white mt-2 lg:mt-5 md:mt-5 hover:bg-red-500 transition duration-300 ease-in-out "
                      >
                        Clear
                      </button>
                      {/* <button

                                                type="submit" className="bg-cyan-600 text-base font-medium w-24 lg:w-32 px-3 py-2 text-white mt-2 lg:mt-5 md:mt-5 hover:bg-cyan-500 transition duration-300 ease-in-out ">
                                                Save
                                            </button> */}
                    </div>
                  </div>

                  {/* <hr className="h-[1px] bg-gray-100 my-5" /> */}
                  <div className="flex md:flex-row lg:flex-row  flex-col items-center justify-center w-full px-7 lg:flex-row justify-between "></div>
                </form>
              </div>
            </div>

            <div className="flex flex-col py-4 text-left border border-cyan-600 mt-5 rounded bg-gray-200">
              <div className="mx-2">
                <h1 className="">
                  Total Syllable:
                  {totalSyllableCount == 0 ? (
                    <span className="px-2 ml-2 font-semibold bg-cyan-600 rounded text-gray-100"></span>
                  ) : (
                    <span className="px-2 ml-2 font-semibold bg-cyan-600 rounded text-gray-100">
                      {totalSyllableCount}
                    </span>
                  )}
                </h1>

                <h1>
                  Total Word:
                  <span className="px-2 ml-2 font-semibold bg-cyan-600 rounded text-gray-100">
                    {totalWordCount}
                  </span>
                </h1>
                <h1>
                  Total Character:
                  <span className="px-2 ml-2 font-semibold bg-cyan-600 rounded text-gray-100">
                    {totalCharacterCount}
                  </span>
                </h1>
              </div>
            </div>
          </div>
          {/* <div className="mt-10" >
                    <Calendar onChange={onChange} value={value} />
                </div> */}
        </div>
      </div>
    </div>
  );
}

export default MainEditor;
