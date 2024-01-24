import React from 'react';
import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import UserAuth from '../../../Authentication/userAuth/userAuth';
import AxiosBase from '../../../Axios/AxiosBase';
import toast, { Toaster } from 'react-hot-toast';

const GridCard = ({house}) => {
    const {user} = UserAuth();
    const handleBook = (e)=>{
        e.preventDefault();
        const name = user.name;
        const email = user.email;
        const phone = e.target.phone.value;
        const houseId = house._id;
        const houseName = house.name;
        const address = house.address;
        const city = house.city;
        const bedrooms = house.bedrooms;
        const bathrooms = house.bathrooms;
        const rent = house.rent;
  const booking = {
    name,email,phone,houseId,houseName,address,city,bedrooms,bathrooms,rent
  }
  
        AxiosBase().post('/user/booking/new',booking)
        .then(res =>{
            if(res.data.insertedId){
              toast.success('booking successful')
               document.getElementById('booking-form').close()
            }
            else if(res.status){
                document.getElementById('booking-form').close()
                toast.error('You already 2 booking')

            }
            else{
                document.getElementById('booking-form').close()
                toast.error('Something wrong')
            }
        })
    }
    return (
        <>
        <div className='bg-white font-pop rounded-lg'>
    <img src={house.picture} alt="" className='rounded-t-md w-full h-52' />
            <div className='p-3 space-y-3'>
            <div className='flex justify-between items-center'>
                <h1 className='text-black text-2xl font-semibold'>${house.rent}/month</h1>
                <h1 className='px-4 py-2 bg-[#5a36ff text-white rounded-md'>For Rent</h1>
            </div>
           <div className='py-3 border-t border-b space-y-1'>
           <h1 className='text-xl text-black font-semibold'>{house.name}</h1>
           <h1 className=' text-gray-600'>{house.address}</h1>
           </div>
           <div className='py-3 space-y-1 flex justify-between items-center'>
            <div className='flex items-center gap-6'>
            <div className='flex items-center gap-1'>
                <LuBedDouble className='text-[#3949f7] text-xl'></LuBedDouble>
                <p>{house.bedrooms}</p>
             </div>
             <div className='flex items-center gap-1'>
                <LuBath className='text-[#3949f7] text-xl'></LuBath>
                <p>{house.bathrooms}</p>
             </div>
             <div className='flex items-center gap-1'>
                <BiArea className='text-[#3949f7] text-xl'></BiArea>
                <p>{house.roomSize} sqft</p>
             </div>
            </div>
            <div>
            <button className='bg-[#3949f7] text-white px-6 py-2 rounded-md ' onClick={()=> document.getElementById('booking-form').showModal()}>Book</button>
            </div>
           </div>
            </div>
        </div>
        <dialog id="booking-form" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-black text-center text-2xl">Booking Form</h3>
            <p className="py-4"></p>
           <form action=""  onSubmit={handleBook}>
       
              <div className='lg:flex items-center gap-3'>
              <div className='flex-1 space-y-2'>
                <h2 className='text-black  font-semibold'>Your name</h2>
                <input type="text" name='name' value={user?.name} readOnly  className='w-full bg-gray-200 p-2' placeholder='Enter your name' required/>
                
              </div>
              <div className='flex-1'>
                <h2 className='text-black  font-semibold'>Email</h2>
                <input type="text" name='email' value={user?.email}  readOnly  className='w-full bg-gray-200 p-2' placeholder='Enter your name' required/>
                
              
              </div>
            
        
           
           
            </div>
            <div className='lg:flex items-center gap-3'>
              <div className='flex-1 space-y-2'>
                <h2 className='text-black  font-semibold'>Phone Number</h2>
                <input type="text" name='phone'  className='w-full bg-gray-200 p-2' placeholder='Enter your Phone Number' required/>
                
              </div>
              <div className='flex-1'>

                
              
              </div>
            
        
           
           
            </div>
            <div className='text-end py-2'>
            <button className='px-6 py-2 bg-[#3c52f9] text-white' >Book</button>
           </div>
           
           </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </>
    );
}

export default GridCard;
