import { createContext, useEffect, useState } from "react";
import AxiosBase from "../../Axios/AxiosBase";

export const authContext = createContext(null)
const AuthProvider =({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true);
    // auth related all functions
    const id = localStorage.getItem('user-id');
   
    const logout = ()=>{
        setLoading(true)
       
    }
    useEffect(()=>{
     
        if(id){
            AxiosBase().post('/user/re-login',{id})
            .then(res =>{
                
                if(res.data.user){
                    setUser(res.data.user)
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
        <authContext.Provider value={{user,logout,loading}}>
        {children}
        </authContext.Provider>
        </div>
    );
}

export default AuthProvider;
