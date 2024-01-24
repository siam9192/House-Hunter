import React, { useEffect, useState } from 'react';
import UserAuth from '../../../Authentication/userAuth/userAuth';
import AxiosBase from '../../../Axios/AxiosBase';
import { useLocation } from 'react-router-dom';

const Dashbar = () => { 
    const ownerRoutes = [{
        display:'My Properties',
        path:'/dashboard/my-properties'
    },
   

]
const renterRoutes = [{
    display:'My Bookings',
    path:'/dashboard/my-bookings'
},


]
const {pathname} = useLocation();

const {user} = UserAuth();


    return (
       <div>
        <div className='py-4 hidden'>
            <div className=''></div>
            <h1></h1>
        </div>
         <div className='p-4 space-y-3 font-pop'>
          { 
    
          user?.role === 'house owner' ?
           ownerRoutes.map ((route,index)=>{
            return  <div className={`p-2 text-black  text-xl ${pathname === route.path ? 'bg-[#3c52f9] text-white' : ''}`} >{route.display}</div>
              })
              :  renterRoutes.map((route,index)=>{
                return  <div className={`p-2 text-black  text-xl ${pathname===route.path ? 'bg-[#3c52f9] text-white' : ''}`} >{route.display}</div>
                  })
            
        }
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

       </div>
    );
}

export default Dashbar;
