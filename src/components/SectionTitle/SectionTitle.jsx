import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='my-4 text-center w-4/12 mx-auto'>
            <p className='italic text-yellow-500 p-2'>---{subHeading}---</p>
            <h2 className='uppercase font-semibold text-xl p-3 border-y-4 border-gray-300'>{heading}</h2>
        </div>
    );
};

export default SectionTitle;