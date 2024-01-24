import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';

const UserAuth = () => {
    const {user,logout,loading} = useContext(authContext)
    console.log('user auth',user)
    return {user,logout,loading}
}

export default UserAuth;
