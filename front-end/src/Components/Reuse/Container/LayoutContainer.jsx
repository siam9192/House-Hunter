import React from 'react';

const LayoutContainer = ({children}) => {
    return (
        <div className='max-w-7xl mx-auto'>
            {children}
        </div>
    );
}

export default LayoutContainer;
