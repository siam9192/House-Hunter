import React, { useEffect } from 'react';
import SearchBox from '../../Components/SearchBox/SearchBox';
import CardContainer from '../../Components/CardConatiner/CardContainer';
import UserAuth from '../../Authentication/userAuth/userAuth';

const Home = () => {
    const {user} = UserAuth();
  useEffect(()=>{
    console.log(user)
  },[user])
    return (
        <div>
           <div className=''>
           <SearchBox></SearchBox>
            <CardContainer></CardContainer>
           </div>
        </div>
    );
}

export default Home;
