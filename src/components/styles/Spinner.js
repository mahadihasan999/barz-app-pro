import React from 'react';
import './Spinner.css'
const Spinner = () => {
    return (
        <div className='reletive h-screen'>
            <div class="flex items-center justify-center mt-96">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    );
};

export default Spinner;