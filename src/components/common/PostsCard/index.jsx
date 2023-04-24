import React,{useMemo,useState,useEffect} from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../API/FirestoreAPI';
import LikeButton from '../LikeButtion';


export default function PostsCard({posts ,id}) {
  let navigate=useNavigate();
  const [currentUser,setCurrentUser]=useState({})

  useMemo(()=>{
    getCurrentUser(setCurrentUser)
  },[])

  console.log(posts.id);
  
  











  return ( ///there is posted data will apeared 

    <div className='posts-card' key={id}>

      <p className='name' onClick={()=>navigate('/Profile',{
        state:{id:posts?.Id,email:posts.userEmail},
      })}>
        {posts.userName}
        </p>
      <p className='timestamp'>  {posts.timeStamp}</p>   
      <p className='status'>{posts.status}</p>
      <LikeButton userId={currentUser?.id}  />  {/* --this file in LikeButton .jsx-- */}
      
      
    </div>
  );
}
