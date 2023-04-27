import React,{useMemo,useState,useEffect} from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser,getAllUsers ,deletePost} from '../../../API/FirestoreAPI';
import LikeButton from '../LikeButtion';
import {GoPencil} from 'react-icons/go';
import {FiTrash2} from 'react-icons/fi';


export default function PostsCard({posts ,id,getEditData}) {
  let navigate=useNavigate();
  const [currentUser,setCurrentUser]=useState({});
  const [allUsers,setAllUsers]=useState([]);

  useMemo(()=>{
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  },[]);

  


  console.log(allUsers);

 
  
  // console.log(allUsers.filter((item)=>item.id===posts.userID).map((item)=>item.imageLink)[0]);

  

  return ( ///there is posted data will apeared 

    <div className='posts-card' key={id}>
      
      <div className='post-image-wrapper'>
       {currentUser.id=== posts.userID ?(<div className='action-container'>
          <GoPencil size={20} className='action-icon' onClick={()=>getEditData(posts)}/> 
          <FiTrash2 size={20} className='action-icon' onClick={()=>deletePost(posts.id)}/>

        </div>):<></>}

      <img className='profile-image'  src={allUsers.filter((item)=>item.id===posts.userID).map((item)=>item.imageLink)[0]} alt='profile-image' />
      
      <div>
      <p className='name' onClick={()=>navigate('/Profile',{
        state:{id:posts?.userID,email:posts.userEmail},
      })}>
        {(allUsers.filter((user)=>user.id===posts.userID)[0]?.name)}
        
        </p>
        <p className='headline'>  {(allUsers.filter((user)=>user.id===posts.userID)[0]?.headline)}</p> 
        <p className='timestamp'>  {posts.timeStamp}</p> 
        </div>
        </div>
        

        
      <p className='status'>{posts.status}</p>
      <LikeButton id={currentUser?.id} postId={posts.id} currentUser={currentUser}/>  {/* --this file in LikeButton .jsx-- */}
      
      
    </div>
  );
}
