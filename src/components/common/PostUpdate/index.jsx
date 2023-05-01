import React ,{useState,useMemo}from 'react';
import './index.scss';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import PostsCard from '../PostsCard';
import ModalComponent from '../Modal';

import { getStatus, postStatus,updatePost} from '../../../API/FirestoreAPI';
import { getItem } from 'localforage';
import { getUniqueID } from '../../../helpers/getUniqueId';



export default function PostStatus({currentUser}) {

    

    // let userEmail= localStorage.getItem('userEmail');///this is not in use maybe
   const [modalOpen, setModalOpen] = useState(false);
    const [status ,setStatus] =useState("");
    const [currentPost,setCurrentPost]=useState({});
    
    const [allStatuses,setAllStatus]=useState([]);
    const [isEdit,setIsEdit]=useState(false);
    
    
    const sendStatus=async()=>{
      let object ={
        status:status,
        timeStamp:getCurrentTimeStamp('LLL'),
        
        userName:currentUser.name,
        userEmail:currentUser.email,
        postID:getUniqueID(),

        userID:currentUser.id,
        
        
        
        
      };
       await postStatus(object);
       await setModalOpen(false);
       setIsEdit(false);
       await setStatus("");
    };

  // console.log(getCurrentTimeStamp("LLL"))  ;


  useMemo(()=>{
    getStatus(setAllStatus);
    

  },[])  ;

  
 
const getEditData=(posts)=>{
  setModalOpen(true);
  setStatus(posts?.status);
  setIsEdit(true);
  setCurrentPost(posts);


};


const updateStatus=()=>{

 
  updatePost(currentPost.id,status);
  setModalOpen(false);


};


  return (
    <div className='post-status-main'>
      <div className='user-details'>
      <img  src={currentUser.imageLink} alt='imageLink'/>
        <p className='name'>{currentUser.name}</p>
        <p className='headline'>{currentUser.headline}</p>
        

      </div>
      <div className='post-status'>
      <img className='post-image'  src={currentUser.imageLink} alt='imageLink'/>
        <button className='open-post-modal'onClick={() =>{ setModalOpen(true),setIsEdit(false)}}>
            Start a post
            </button>
           
      </div>
      <ModalComponent 
      sendStatus={sendStatus}
       status={status} 
       setStatus={setStatus} 
       modalOpen={modalOpen} 
       setModalOpen={setModalOpen}
       isEdit={isEdit}
       updateStatus={updateStatus}
       />






       <div>
       {allStatuses.map((posts)=>{
        return(
          <div key={posts.id}>
           <PostsCard posts={posts} getEditData={getEditData}/>
           </div>
        );
        
        
       })}
       </div>

       
      
    </div>
  );
}





