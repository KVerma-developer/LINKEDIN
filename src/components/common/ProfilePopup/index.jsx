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

  return (
    <div className='popup-card'>
      <p>{currentUser.name}</p>
      
      <p>{currentUser.headline}</p>
      
      
      <Button title='View Porfile'
      onClick={()=>
        navigate("/profile",
        {state:{
          id:currentUser?.userID,
        },
        }
        )
        }/>
        <Button title='Log-Out' onClick={onLogout}/>
        
      
    </div>
  );
}
