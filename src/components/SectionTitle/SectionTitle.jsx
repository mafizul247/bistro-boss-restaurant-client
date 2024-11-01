import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='mb-6 text-center w-3/4 md:w-1/4 mx-auto'>
            <p className='text-yellow-500 py-2'>---{subHeading}---</p>
            <h2 className='text-xl md:3xl uppercase font-semibold border-y-4 py-2'>{heading}</h2>
        </div>
    );
};

export default SectionTitle;