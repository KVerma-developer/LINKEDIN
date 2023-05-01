import React, { useMemo, useState } from 'react';
import "./index.scss";
import { onLogout } from '../../../API/authAPI';
import { useNavigate } from 'react-router-dom';
import {getCurrentUser} from '../../../API/FirestoreAPI';
import Button from '../Button';

export default function ProfilePopup() {
  let navigate =useNavigate();
  const [currentUser,setCurrentUser]=useState({});

  useMemo(()=>{
    getCurrentUser(setCurrentUser);
  },[]);
  
  // const goToRoute = (route) => {
  //   navigate(route);
  // };

  return (
    <div className='popup-card'>
      <p className='name'>{currentUser?.name}</p>
      
      <p className='headline'>{currentUser?.headline}</p>
     
      
      <Button title='View Porfile'
      onClick={()=>
        navigate("/profile", /// i changed navigate to geToRoute
        {state:{
          id:currentUser?.id
        },
        }
        )
        }/>
        <Button title='Log-Out' onClick={onLogout}/>
        
      
    </div>
  );
}
