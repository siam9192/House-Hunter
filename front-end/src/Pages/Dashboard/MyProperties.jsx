import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {MdDelete} from 'react-icons/md'
import { LuBath, LuBedDouble } from 'react-icons/lu';
import { BiArea } from 'react-icons/bi';
import AxiosBase from '../../Axios/AxiosBase';
import { HiPlus } from "react-icons/hi";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import UserAuth from '../../Authentication/userAuth/userAuth';
const MyProperties = () => {
    // var properties = [
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
      const {user} = UserAuth()
      const rooms = [1,2,3,4,5,6,7,8,9,10]
      const [properties,setProperties] = useState([]);
      const [editedProperty,setEditedProperty] = useState(null) 
      const locations = ["New York", "Tokyo", "London", "Paris", "Dubai", "Sydney"];
      const [editedImage,setEditedImage] = useState([]) 
    // https://preview.themeforest.net/item/homeid-real-estate-html-template/full_screen_preview/29786028?_ga=2.213357716.1012993198.1705939851-2137286590.1698674286&_gac=1.190498393.1705577502.CjwKCAiAkp6tBhB5EiwANTCx1J1qFaO62VCotUKRMAuNRUgP5oNNdqWcmULo4LBmlFMG6qLjKYr8xhoCHd8QAvD_BwE
      

useEffect(()=>{
  if(!user){
    return
  }
AxiosBase().get(`/my-properties/${user.email}`)
.then(res=>{
  setProperties(res.data)
})
},[user])




const handleSubmit = async(e)=>{
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = user.email;
  const phone = form.phone.value;
  const address = form.address.value;
  const city= form.city.value;
  const availableDate = form.date.value;
  const bedrooms = form.bedrooms.value;
  const bathrooms = form.bathrooms.value;
  const picture = form.picture.files[0];
  const roomSize = form.room_size.value;
  const rent = form.rent_month.value;
  const description = form.description.value;
  const property = {
    email,name,phone,address,city,availableDate,bedrooms,bathrooms,picture,roomSize,rent,description
  }
  
  const response = await axios.post('https://api.imgbb.com/1/upload?key=c9c302a9d5cee64c8eb4dde4d9803027',{image:picture},{
    headers: {
    'content-type': 'multipart/form-data'
  },
}

);
const imageUrl = response.data.data.display_url;
if(!imageUrl){
  toast.error('Something went wrong try again')
  return;
}
property.picture = imageUrl;
AxiosBase().post('/property/post',property)
.then(res =>{
  if(res.data.insertedId){
   setProperties([...properties,property])
    form.reset();
        toast.success('Added successfully')
        document.getElementById('add-property').close()
  }
})
}
const handleEditForm = (index)=>{

  setEditedProperty(properties[index])
  console.log(properties[index])
  document.getElementById('update-property').showModal()
}
const handleEdit = async(e)=>{
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = user.email;
  const phone = form.phone.value;
  const address = form.address.value;
  const city= form.city.value;
  const availableDate = form.date.value;
  const bedrooms = form.bedrooms.value;
  const bathrooms = form.bathrooms.value;
  const picture = form.picture.files[0];
  const roomSize = form.room_size.value;
  const rent = form.rent_month.value;
  const description = form.description.value;
  const property = {
    email,name,phone,address,city,availableDate,bedrooms,bathrooms,picture,roomSize,rent,description
  }
  if(editedImage[0]){
    const response = await axios.post('https://api.imgbb.com/1/upload?key=c9c302a9d5cee64c8eb4dde4d9803027',{image:picture},{
      headers: {
      'content-type': 'multipart/form-data'
    },
  }
  
  );
  const imageUrl = response.data.data.display_url;
  if(!imageUrl){
    toast.error('Something went wrong try again')
    return;
  }
  property.picture = imageUrl;
  }
  else{
    property.picture = editedProperty.picture
  }
  console.log(editedProperty)
  AxiosBase().put('/property/update',{
    property,id:editedProperty._id
  })
  
  .then(res =>{
    if(res.data.modifiedCount>0){
    
      document.getElementById('update-property').close()
  toast.success('Update successfully')
  const index =properties.indexOf(editedProperty);
  const array = properties
  array[index] = property;
  setProperties([...array])
  
    }
    else{
    toast.error('something went wrong')
    }
  })

}
const changeImage = (e)=>{
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  setEditedImage([file,url]) 
}
const handleDelete = (id)=>{
AxiosBase().delete(`/property/delete?id=${id}`)
.then(res=>{
  if(res.data.deletedCount>0){
   const filter = properties.filter(item => item._id !== id)
   setProperties(filter)
  }
})
}
    return (
        <div>
        
    <div className=' bg-white shadow-x  p-5 font-pop'>
     
       <div className=''>
       <div className="overflow-x-auto ">
<table className="table   ">
{/* head */}
<thead className='text-gray-700 text-xl font-normal  bg-[#f5f7fb] p-2'>
 <tr className=''>
   <th className='text-black font-normal '>My Properties</th>
   {/* <th className='font-normal text-[1rem]'>Date Added</th>
   <th  className='font-normal text-[1rem]'>Views</th> */}
   <th  className='font-normal text-[1rem]'>Status</th>
   <th  className='font-normal text-[1rem]'>Edit</th>
   <th  className='font-normal text-[1rem]'>Delete</th>
   
 </tr>
</thead>
<tbody className='max-h-[450px] overflow-y-auto'>
 {
properties.map((property,index)=>{
       return   <tr key={index} className='w-fit'>
       <td >
           <div className='flex items-center  gap-2'>
               <img src={property.picture} alt="" className='w-40 h-32 rounded-lg'/>
               <div className='space-y-2 text-black'>
                   <h2 className='text-2xl'>{property.name}</h2>
                   <p className=''>{property.address}</p>
                   <div className='flex items-center gap-2'>
                  
                   <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1'>
                <LuBedDouble className='text-[#3949f7] text-xl'></LuBedDouble>
                <p>{property.bedrooms}</p>
             </div>
             <div className='flex items-center gap-1'>
                <LuBath className='text-[#3949f7] text-xl'></LuBath>
                <p>{property.bathrooms}</p>
             </div>
             <div className='flex items-center gap-1'>
                <BiArea className='text-[#3949f7] text-xl'></BiArea>
                <p>{property.roomSize} sqft</p>
             </div>
            </div>
                   </div>
               </div>
           </div>
       </td>
       {/* <td className='w-fit'>{property?.date.day < 10 && 0}{property.date.day}.{property?.date.month+1 < 10 && 0}{property.date.month + 1}.{property.date.year}</td>
       <td className='w-fit'>125</td> */}
       <td className='w-fit'>{'running'}</td>
       <td> <button className='text-green-600 hover:text-[#ff385c]' onClick={()=>handleEditForm(index)}>Edit</button></td>
       <td className='w-fit'>
           <div className='flex justify-between items-center'>
      
       <MdDelete className='hover:text-[#ff385c] text-xl hover:cursor-pointer'onClick={()=>handleDelete(property._id)}></MdDelete>
       </div>
       </td>
     </tr>
   })

}

</tbody>
</table>

</div>
       </div>
       </div>
       <div className='py-3 text-end fixed bottom-5 right-4 '>
        <button className='px-5 py-3 bg-[#3c52f9] text-white rounded-md flex items-center gap-5' onClick={()=>document.getElementById('add-property').showModal()}><p>Add Property</p><HiPlus></HiPlus></button>
      </div>
{/* post */}
<dialog id="add-property" className="modal">
<div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-black text-center text-2xl">Add Property!</h3>
    <p className="py-4"></p>
   <form action="" onSubmit={handleSubmit}>
   <div className='space-y-3'>
      <div className='lg:flex items-center gap-3'>
      <div className='flex-1'>
        <h2 className='text-black  font-semibold'>Name</h2>
        <input type="text" name='name'  className='w-full bg-gray-200 p-2' placeholder='Enter name' required/>
      </div>
      <div className='flex-1'>
      <h2 className='text-black  font-semibold'>Your Phone</h2>
        <input type="text" name='phone'  className='w-full bg-gray-200 p-2' placeholder='Enter your number' required/>
      </div>
      </div>
   
      <div className='lg:flex items-center gap-3'>
      <div className='flex-1'>
        <h2 className='text-black  font-semibold'>Address</h2>
        <input type="text" name='address' className='w-full bg-gray-200 p-2' placeholder='Enter address' required/>
      </div>
      <div className='flex-1'>
      <h2 className='text-black  font-semibold'>City</h2>
      <select name='city' className='w-full bg-gray-200 p-2' placeholder='' >
        {
        locations.map((location,index)=>{
         return <option value={location} key={index}>{location}</option>
        })
      }
        </select>
      </div>
      </div>
      <div className='lg:flex items-center gap-3'>
      <div className='flex-1'>
        <h2 className='text-black  font-semibold'>Bedrooms</h2>
        <select name='bedrooms' className='w-full bg-gray-200 p-2' placeholder=''>
        {
        rooms.map((room,index)=>{
         return <option value={room} key={index}>{room}</option>
        })
      }
        </select>
      </div>
      <div className='flex-1'>
      <h2 className='text-black  font-semibold'>Bathrooms</h2>
      <select name='bathrooms' className='w-full bg-gray-200 p-2' placeholder='' >
      {
        rooms.map((room,index)=>{
      return  <option value={room} key={index}>{room}</option>
        })
      }
      </select>
      </div>
      </div>
      <div className='lg:flex items-center gap-3'>
      <div className='flex-1'>
   <h2 className='text-black  font-semibold'>Picture</h2>
    <input type="file" name='picture' className='w-full p-2' />
   </div>
      <div className='flex-1'>
      <h2 className='text-black  font-semibold'>Room size</h2>
      <input name='room_size' className='w-full bg-gray-200 p-2' placeholder='' required/>
      </div>
      </div>
      <div className='lg:flex items-center gap-3'>
      <div className='flex-1'>
        <h2 className='text-black  font-semibold'>Rent per month</h2>
        <input type="text"  name='rent_month' className='w-full bg-gray-200 p-2' placeholder='Rent'/>
      </div>
      <div className='flex-1'>
        <h2 className='text-black  font-semibold'>Available Date</h2>
        <input type="date" name='date' className='w-full' />
      </div>
      </div>
      <div className='lg:flex items-center gap-3'>
     <textarea name="description" id="" placeholder='Description' className='h-52 border border-black w-full p-2 outline-none'>
     
     </textarea>
      </div>
   
   <div className='text-end'>
    <button className='px-6 py-2 bg-[#3c52f9] text-white'>Add Property</button>
   </div>
   
    </div>
   </form>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
{/* edit */}
<dialog id="update-property" className="modal">
<div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-black text-center text-2xl">Add Property!</h3>
    <p className="py-4"></p>
   <form action="" onSubmit={handleEdit}>
   <div className='space-y-3' >
      <div className='lg:flex items-center gap-3'>
      <div className='flex-1'>
        <h2 className='text-black  font-semibold'>Your name</h2>
        <input type="text" name='name' defaultValue={editedProperty?.name} className='w-full bg-gray-200 p-2' placeholder='Enter your name' required/>
      </div>
      <div className='flex-1'>
      <h2 className='text-black  font-semibold'>Your Phone</h2>
        <input type="text" name='phone' defaultValue={editedProperty?.phone}  className='w-full bg-gray-200 p-2' placeholder='Enter your number' required/>
      </div>
      </div>
   
      <div className='lg:flex items-center gap-3'>
      <div className='flex-1'>
        <h2 className='text-black  font-semibold'>Address</h2>
        <input type="text" defaultValue={editedProperty?.address} name='address' className='w-full bg-gray-200 p-2' placeholder='Enter your address' required/>
      </div>
      <div className='flex-1'>
      <h2 className='text-black  font-semibold'>Your city</h2>
      <select name='city' defaultValue={editedProperty?.city} className='w-full bg-gray-200 p-2' placeholder=''>
        {
        locations.map((location,index)=>{
         return <option value={location} key={index}>{location}</option>
        })
      }
        </select>
      </div>
      </div>
      <div className='lg:flex items-center gap-3'>
      <div className='flex-1'>
        <h2 className='text-black  font-semibold'>Bedrooms</h2>
        <select name='bedrooms' defaultValue={editedProperty?.bedrooms} className='w-full bg-gray-200 p-2' placeholder=''>
        {
        rooms.map((room,index)=>{
         return <option value={room} key={index}>{room}</option>
        })
      }
        </select>
      </div>
      <div className='flex-1'>
      <h2 className='text-black  font-semibold'>Bathrooms</h2>
      <select name='bathrooms'  defaultValue={editedProperty?.bathrooms} className='w-full bg-gray-200 p-2' placeholder='' required>
      {
        rooms.map((room,index)=>{
      return  <option value={room} key={index}>{room}</option>
        })
      }
      </select>
      </div>
      </div>
      <div className='flex-1'>
   <h2 className='text-black  font-semibold'>Picture</h2>
      <img src={editedImage[1]||editedProperty?.picture} className='w-52 '></img>
    <input type="file"  name='picture' className='w-full p-2'onChange={changeImage}/>
   </div>
      <div className='lg:flex items-center gap-3'>
    
      <div className='flex-1'>
      <h2 className='text-black  font-semibold'>Room size</h2>
      <input name='room_size' defaultValue={editedProperty?.roomSize} className='w-full bg-gray-200 p-2' placeholder='' required/>
      </div>
      </div>
      <div className='lg:flex items-center gap-3'>
      <div className='flex-1'>
        <h2 className='text-black  font-semibold'>Rent per month</h2>
        <input type="text" defaultValue={editedProperty?.rent} name='rent_month' className='w-full bg-gray-200 p-2' placeholder='Rent per month' required/>
      </div>
      <div className='flex-1'>
        <h2 defaultValue = {editedProperty?.availableDate} className='text-black  font-semibold'>Available Date</h2>
        <input type="date" name='date' className='w-full p-2 outline-none bg-gray-200' required/>
      </div>
      </div>
      <div className='lg:flex items-center gap-3'>
     <textarea name="description" id="" defaultValue={editedProperty?.description} placeholder='Description' className='h-52 border border-black w-full p-2 outline-none'>
     
     </textarea>
      </div>
   
   <div className='text-end'>
    <button className='px-6 py-2 bg-[#3c52f9] text-white' >Update</button>
   </div>
   
    </div>
   </form>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
f
   </div>
    );
}

export default MyProperties;
