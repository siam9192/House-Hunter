import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Dashbar from '../DashBar/Dashbar';
import DashNav from '../DashNav/DashNav';
import AxiosBase from '../../../Axios/AxiosBase';

const DashboardOutlet = () => {
    const id = localStorage.getItem('id');
    const [user,setUser] = useState(null);
   
    useEffect(()=>{
        if(id){
            AxiosBase().post('/user/re-login',{id})
            .then(res =>{
                
                if(res.data.user){
                    setUser(user)
                    console.log(res.data.user)

                }
                else{
                    setUser(null)
                }
            })
        }
    },[id])
  
    return (
        <div>
            <DashNav></DashNav>
            <div className='flex'>
            <div className='w-[20%]'>
                <Dashbar></Dashbar>
            </div>
            <div className='w-[80%] bg-[#eae9e9]'><Outlet></Outlet></div>
        </div>
        </div>
    );
}

export default DashboardOutlet;
