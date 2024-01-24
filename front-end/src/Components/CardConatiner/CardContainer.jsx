import React, { useEffect, useState } from 'react';
import LayoutContainer from '../Reuse/Container/LayoutContainer';
import GridCard from '../Reuse/Cards/GridCard';
import AxiosBase from '../../Axios/AxiosBase';

const CardContainer = () => {
  const [properties,setProperties] = useState([])
    // var houses = [
    //     {

    //       title: "Modern City Apartment",
    //       image:'https://i.ibb.co/N1qtjJ7/398973ba99d81b7ea40e960d600904ec2b5e0679.webp',
    //       location: "New York",
    //       address:'1421 San Pedro St, Los Angeles',
    //       rooms: {
    //         bedrooms: 2,
    //         bathrooms: 1
    //       },
    //       area: 1200, // in square feet
    //       price: 500000 // in dollars
    //     },
    //     {
    //       title: "Cozy Suburban House",
    //       location: "Los Angeles",
    //       image:'https://i.ibb.co/N1qtjJ7/398973ba99d81b7ea40e960d600904ec2b5e0679.webp',
    //       rooms: {
    //         bedrooms: 3,
    //         bathrooms: 2
    //       },
    //       area: 1800,
    //       price: 700000
    //     },
    //     {
    //       title: "Luxury Penthouse",
    //       image:'https://i.ibb.co/N1qtjJ7/398973ba99d81b7ea40e960d600904ec2b5e0679.webp',
    //       location: "Paris",
    //       rooms: {
    //         bedrooms: 4,
    //         bathrooms: 3
    //       },
    //       area: 2500,
    //       price: 1200000
    //     },
    //     {
    //       title: "Spacious Family Home",
    //       image:'https://i.ibb.co/N1qtjJ7/398973ba99d81b7ea40e960d600904ec2b5e0679.webp',
    //       location: "London",
    //       rooms: {
    //         bedrooms: 5,
    //         bathrooms: 4
    //       },
    //       area: 3200,
    //       price: 1500000
    //     },
    //     {
    //       title: "Waterfront Villa",
    //       image:'https://i.ibb.co/N1qtjJ7/398973ba99d81b7ea40e960d600904ec2b5e0679.webp',
    //       location: "Miami",
    //       rooms: {
    //         bedrooms: 4,
    //         bathrooms: 3
    //       },
    //       area: 2800,
    //       price: 900000
    //     },
    //     {
    //       title: "Mountain Retreat",
    //       image:'https://i.ibb.co/N1qtjJ7/398973ba99d81b7ea40e960d600904ec2b5e0679.webp',
    //       location: "Denver",
    //       rooms: {
    //         bedrooms: 3,
    //         bathrooms: 2
    //       },
    //       area: 2000,
    //       price: 600000
    //     }
    //   ];
      const pages = [1,2,3,4,5,,6]
      useEffect(()=>{
        AxiosBase().get('/property/all')
       .then(res =>{
        setProperties(res.data);
       })
      },[])
    return (
        <div className='bg-[#e5e4e4] py-6'>
        <LayoutContainer>
           <div className='lg:px-0 px-2'>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    properties.map((house,index)=>{
                        return <GridCard house={house} key={index}></GridCard>
                    })
                }

            </div>
            <div className='flex justify-center items-center py-5'>
            <div className='flex items-center gap-2'>
            <div className='text-black'>{'<<'}</div>
                {
                    pages.map((page,index)=>{
                        return <div className='px-4 py-2  bg-[#3c52f9] text-white rounded-full'>
                            {page}
                        </div>
                    })

                }
                <div className='text-black'>{'>>'}</div>
            </div>
            </div>
           </div>
        </LayoutContainer>
            
        </div>
    );
}

export default CardContainer;
