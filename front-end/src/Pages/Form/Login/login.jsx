import React, { useState } from 'react';
import LayoutContainer from '../../../Components/Reuse/Container/LayoutContainer';
import { FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import AxiosBase from '../../../Axios/AxiosBase';
const Login = () => {
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const login = (e)=>{
        e.preventDefault();
setError('')
setLoading(true)
const form = e.target;

const email = form.email.value;
const password = form.password.value;
const user = {email,password};
AxiosBase().post('/user/login',user)
.then(res=>{
if(res.data.user){
localStorage.setItem('user-id',res.data.user._id)
setLoading(false)
if(res.data.user.role === 'house owner'){
navigate('/dashboard/my-properties')
}
else{
navigate('/')
}

}
else if(!res.data.status){
setError('Please enter correct id password')
setLoading(false)
}
else{
    setError('something went wrong')
    setLoading(false)
}
})
    }
    return (
        <div>
            <LayoutContainer>
                <div className='flex justify-center items-center font-pop py-10 lg:px-0 px-2'>
                    <form action="" className='lg:w-1/3 md:w-1/2 w-full' onSubmit={login}>
                        <h1 className='text-3xl text-center text-black font-semibold'>Login</h1>
                        <div className='py-5 space-y-6'>
                    <div className='flex items-center gap-2 bg-gray-200 px-2'>
                    <FaRegUser></FaRegUser> <input type="text" name='email' className='w-full py-3 px-2 bg-gray-200 outline-none text-black' placeholder='Gmail'/>
                    </div>
                    <div className='flex items-center gap-2 bg-gray-200 px-2'>
                  <CiLock></CiLock> <input type="text" name='password' className='w-full py-3 px-2 bg-gray-200 outline-none text-black' placeholder='Password'/>
                    </div>
                   
                    <button className='w-full text-center bg-[#3c52f9] text-white py-3'>{loading ? <>Please wait <span className="loading loading-spinner loading-md"></span> </> : 'Log in'}</button>
                    <div className='text-end'>
                        <p>Don't have a account? <Link>Sign up</Link></p>
                    </div>
                     {error && <p className='text-red-600'>{error}</p>}
                        </div>
                    </form>
                </div>
            </LayoutContainer>
        </div>
    );
}

export default Login;
