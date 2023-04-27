import React ,{useState,useMemo, useEffect}from 'react';
import { getSingleStatus,getSingleUser, getStatus,editProfile } from '../../../API/FirestoreAPI';
import { FaBeer } from 'react-icons/fa';
import { HiPencilAlt } from 'react-icons/hi';
import FileUploadModal from '../FileUploadModal';
import { uploadImage as uploadImageAPI } from '../../../API/imageUpload';




import './index.scss';
import PostsCard from '../PostsCard';

import { useLocation } from 'react-router-dom';


export default function ProfileCard({onEdit,currentUser}) {
  let location =useLocation();
  const [allStatuses,setAllStatus]=useState([]);
  const [currentProfile,setCurrentProfile]=useState({});
  const [comments,setComments]=useState([]);
  const [currentImage,setCurrentImage]=useState({});
  const [imageLink,setImageLink]=useState('');
  const [modalOpen,setModalOpen]=useState(false);
  const [progress,setProgress]=useState(0);

  const getImage=(event)=>{
    setCurrentImage(event.target.files[0]);
    

  };
   ///this is not API we impoet api as check and dont be confuse
   const uploadImage=()=>{
    uploadImageAPI(currentImage,currentUser.id,setModalOpen,setProgress,setCurrentImage);

   };
  //  console.log(currentUser?.id)
  
  useMemo(()=>{
    getStatus(setAllStatus); //add for get post in profile
  },[])

  useMemo(()=>{
    if (location?.state?.id){
      getSingleStatus(setAllStatus,location?.state?.id);
    }
    // getStatus(setAllStatus);
    if(location?.state?.email){
      getSingleUser(setCurrentProfile,location?.state?.email);
    }

  },[]);

  // useEffect(()=>{
  //   editProfile(currentUser?.id,imageLink);

  // },[imageLink]);
  


  return (
    <>
    <FileUploadModal
     modalOpen={modalOpen} 
    setModalOpen={setModalOpen}
     getImage={getImage}
      uploadImage={uploadImage}
      currentImage={currentImage}
      progress={progress}/>
    
    <div className='profile-card'>
  
      <div className='edit-btn'>
      <HiPencilAlt className='edit-icon' onClick={onEdit} size={25}/>
        
      </div>
      <div className='profile-info'>
      
      <div>
      <img className='profile-image'
        onClick={()=>setModalOpen(true)}
         src={currentUser?.imageLink} alt='profile-image'/>

       <h3 className='userName'>{Object.values(currentProfile).length===0
        ? currentUser.name
        : currentProfile?.name}
        </h3> 
       <p className='userEmail'>{Object.values(currentProfile).length===0
        ? currentUser.email
        : currentProfile?.email}</p>

       <p className='heading'>{Object.values(currentProfile).length===0
        ? currentUser.headline
        : currentProfile?.headline}</p>

        
       <p className='country'>{Object.values(currentProfile).length===0
        ? `${currentUser.city}, ${currentUser.country}  `
        : currentProfile?.country}</p>
       
       
       <a href={Object.values(currentProfile).length===0
        ? currentUser.website
        : currentProfile?.website} target='__blank' className='website'>{Object.values(currentProfile).length===0
        ? currentUser.website
        : currentProfile?.website}</a>
        
        


       </div>

       <div className='right-info'>
       <p className='college'>{Object.values(currentProfile).length===0
        ? currentUser.college
        : currentProfile?.college}</p>
       <p className='company'>{Object.values(currentProfile).length===0
        ? currentUser.company
        : currentProfile?.company}</p>


       </div>
       </div>
       <p className='about-me'>{Object.values(currentProfile).length===0
        ? currentUser.aboutme
        : currentProfile?.aboutme}</p>
        
        <p className='skills'>
          <span className='skill-label'>Skills </span>:&nbsp;
          {Object.values(currentProfile).length===0
        ? currentUser.skills
        : currentProfile?.skills}</p>
       </div>
    
    
    <div className='post-status-main'>
       {allStatuses.filter((item)=>{
        return item.userEmail === localStorage.getItem("userEmail")
       })?.map((posts)=>{
        return(
          <div key={posts.id}>
           <PostsCard posts={posts}/>
           </div>
        );
        
        
       })}
       </div>
    </>
  );
}
