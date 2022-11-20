import React, { useEffect, useState } from 'react';


const Data = () => {
    const [searchText, setSearchText] = useState('');
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const url = `https://api.datamuse.com/words?rel_rhy=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => console.log(data));
    }, [searchText])

    const searchFood = e => {
        setSearchText(e.target.value);
    }
    return (
        <div>
            <h2>Find the food you want</h2>
            <input onChange={searchFood} type="text" name="" id="" />
            <br />
            <h3>Result found: {meals.length}</h3>
            <div className='meals-container'>

                {
                    meals.map(word =>
                        console.log(word)
                    )
                }
            </div>
        </div>
    );
};

export default Data;