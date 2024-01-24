import React, { useState } from 'react';
import LayoutContainer from '../../../Components/Reuse/Container/LayoutContainer';
import { FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { FiUserCheck } from "react-icons/fi";
import AxiosBase from '../../../Axios/AxiosBase';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const [error,setError] = useState('')
const handleSubmit = (e)=>{
e.preventDefault();
setError('')
const form = e.target;
const name = form.name.value;
const phone = form.phone.value;
const role = form.role.value;
const email = form.email.value;
const password = form.password.value;
const user = {
    name,phone,role,email,password
}
AxiosBase().post('/users/new/registration',user)
.then(res =>{
    if(res.data.insertedId){
        form.reset();
        toast.success('Registration successfully')
    }
    else if (res.data.founded){
        setError('You already have an account')
    }
    else{
        toast.error('Something went wrong')
    }
})
}
    return (
        <div>
            <LayoutContainer>
                <div className='flex justify-center items-center font-pop py-10 lg:px-0 px-2'>
                    <form action="" className='lg:w-1/3 md:w-1/2 w-full' onSubmit={handleSubmit}>
                        <h1 className='text-3xl text-center text-black font-semibold'>Create Your Account</h1>
                        <div className='py-5 space-y-6'>
                        <div className='flex items-center gap-2 bg-gray-200 px-2'>
                    <FaRegUser></FaRegUser> <input type="text" name='name' className='w-full py-3 px-2 bg-gray-200 outline-none text-black' placeholder='Full Name'/>
                    </div>
                    <div className='flex items-center gap-2 bg-gray-200 px-2'>
                   <MdOutlineLocalPhone></MdOutlineLocalPhone> <input type="text" name='phone' className='w-full py-3 px-2 bg-gray-200 outline-none text-black' placeholder='Phone'/>
                    </div>
                    <div className='flex items-center gap-2 bg-gray-200 px-2'>
                  <FiUserCheck></FiUserCheck> <select type="text" name='role' className='w-full py-3 px-2 bg-gray-200 outline-none text-black'>
                    <option value="chose your role">Chose your role (not selected)</option>
                        <option value="house owner">House Owner</option>
                        <option value="house renter">House Renter</option>
                    </select>
                    </div>
                    <div className='flex items-center gap-2 bg-gray-200 px-2'>
                    <FaRegUser></FaRegUser> <input type="text" name='email' className='w-full py-3 px-2 bg-gray-200 outline-none text-black' placeholder='Gmail'/>
                    </div>
                    <div className='flex items-center gap-2 bg-gray-200 px-2'>
                  <CiLock></CiLock> <input type="text" name='password' className='w-full py-3 px-2 bg-gray-200 outline-none text-black' placeholder='Password'/>
                    </div>
                   
                    <button className='w-full text-center bg-[#3c52f9] text-white py-3'>Sign up</button>
                    {error && <p className='text-red-600'>{error}</p>}
                    <div className='text-end'>
                        <p className='text-black'>Already have your account? <Link to={'/login'}>Login</Link></p>
                    </div>

                        </div>
                    </form>
                </div>
                <Toaster
  position="top-center"
  reverseOrder={false}
/>
            </LayoutContainer>
        </div>
    );
}

export default SignUp;
