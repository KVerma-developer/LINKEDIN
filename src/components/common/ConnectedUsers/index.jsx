import React ,{useEffect, useState}from 'react';
import { getConnection } from '../../../API/FirestoreAPI';
// import {BsPersonAdd} from 'react-icons/bs';
import {BsPersonAdd} from 'react-icons/bs';

export default function ConnectedUsers({users,getCurrentUser,currentUser}) {
  const[isConnected,setIsConnected]=useState(false);
  useEffect(()=>{
    getConnection(currentUser.id,users.id,setIsConnected)
  },[currentUser.id,users.id]);
  return (
    isConnected? <></>:(
    <div className='grid-child' >
      <img src={users.imageLink} />
      <p className='name'>{users.name}</p>
      <p className='headline'>{users.headline}</p>

      <button onClick={()=>getCurrentUser(users.id)}><BsPersonAdd size={25}/>Connect</button>
      
    </div>)
  );
}
