import React, { useState } from 'react';
import LayoutContainer from '../Reuse/Container/LayoutContainer';

const SearchBox = () => {
    const [openedSelect,setOpenedIndex] = useState(null);
    const handleSelectBox = (index)=>{
        if(index === openedSelect){
            setOpenedIndex(null);
            return;
        }
     setOpenedIndex(index)
    }
    const selectBox = [
        {
            name:'Location',
            options: ["New York", "Tokyo", "London", "Paris", "Dubai", "Sydney"]
        },
        {
            name:'Rooms',
            options: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            name:'Bathrooms',
            options: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            name:'Area',
            options: ["500-800","800-1000","1000-1500","1500-5000"]
        }
    ]
    return (
    <LayoutContainer>
            <div className='py-8 lg:px-0 px-2'>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-5 '>
                {
                    selectBox.map((item,index)=>{
                        return <div className='bg-white border-2 border-black py-3 px-2 rounded-full relative' onClick={()=> handleSelectBox(index)}>
                            <h1>{item.name}</h1>
                            <div className={`py-3 bg-white absolute w-full shadow-md ${openedSelect === index ? 'block' : 'hidden'}`}>
                                {
                                    item.options.map((option,index)=>{
                                  return  <div className='py-2 hover:bg-[#3eb3fc] text-black w-full px-2'>{option}</div>
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </LayoutContainer>
    );
}

export default SearchBox;
