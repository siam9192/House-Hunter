import React from 'react';
import LayoutContainer from '../Reuse/Container/LayoutContainer';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div  className=' font-pop'>
            <LayoutContainer>
                <div className='flex justify-between items-center py-8 '>
                    <div>
                        <img src="https://templates.g5plus.net/homeid/images/logo.png" alt="" />
                    </div>
                <div className='flex text-black space-x-4'>
                    <Link>Home</Link>
                    <Link to='/dashboard/my-properties'>Dashboard</Link>
                </div>
                <div className='flex text-black space-x-4'>
                    <Link to='/sign-up'>Sign up</Link>
                    <Link to='/login'>Login</Link>
                </div>
                </div>
            </LayoutContainer>
        </div>
    );
}

export default Navbar;
