import React,{useMemo,useState,useEffect} from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser,getAllUsers ,deletePost,getConnection} from '../../../API/FirestoreAPI';
import LikeButton from '../LikeButtion';
import {GoPencil} from 'react-icons/go';
import {FiTrash2} from 'react-icons/fi';
import { Button,Modal } from 'antd';


export default function PostsCard({posts ,id,getEditData}) {
  let navigate=useNavigate();
  const [currentUser,setCurrentUser]=useState({});
  const [allUsers,setAllUsers]=useState([]);
  const [isConnected,setIsConnected]=useState(false);
  const [imageModal,setImageModal]=useState('');

  useMemo(()=>{
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  },[]);
  useEffect(()=>{
    getConnection(currentUser.id,posts.userID,setIsConnected)
  },[currentUser.id,posts.userID]);



  



 
  
  // console.log(allUsers.filter((item)=>item.id===posts.userID).map((item)=>item.imageLink)[0]);

  

  return (//there is posted data will apeared 
  isConnected || currentUser.id === posts.userID ? ( 

    <div className='posts-card' key={id}>
      
      <div className='post-image-wrapper'>
       {currentUser.id=== posts.userID ?(<div className='action-container'>
          <GoPencil size={20} className='action-icon' onClick={()=>getEditData(posts)}/> 
          <FiTrash2 size={20} className='action-icon' onClick={()=>deletePost(posts.id)}/>

        </div>):<></>}

      <img className='profile-image'  src={allUsers.filter((item)=>item.id===posts.userID).map((item)=>item.imageLink)[0]} alt='profile-image'  />
      
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
        {posts.postImage ?(<img className='post-image' onClick={()=>setImageModal(true)} src={posts.postImage} alt='post-image'/>):(<></>)}
        

        
      <p className='status' dangerouslySetInnerHTML={{__html:posts.status}}>

      </p>

      <LikeButton id={currentUser?.id} postId={posts.id} currentUser={currentUser}/>
        {/* --this file in LikeButton .jsx-- */}
        <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img className='post-image modal' onClick={()=>setImageModal(true)} src={posts.postImage} alt='post-image'/>
        
      </Modal>
      
      
    </div>):(<></>)
  );
}
