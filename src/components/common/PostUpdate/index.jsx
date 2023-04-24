import React ,{useState,useMemo}from 'react';
import './index.scss';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import PostsCard from '../PostsCard';
import ModalComponent from '../Modal';

import { getStatus, postStatus } from '../../../API/FirestoreAPI';
import { getItem } from 'localforage';
import { getUniqueID } from '../../../helpers/getUniqueId';



export default function PostStatus({currentUser,userID}) {

    

    let userEmail= localStorage.getItem('userEmail');///this is not in use maybe
   const [modalOpen, setModalOpen] = useState(false);
    const [status ,setStatus] =useState("");
    const [allStatuses,setAllStatus]=useState([]);
    
    const sendStatus=async()=>{
      let object ={
        status:status,
        timeStamp:getCurrentTimeStamp('LLL'),
        
        userName:currentUser.name,
        userEmail:currentUser.email,
        postID:getUniqueID(),
        userID:currentUser.userID,
        
        
        
        
      };
       await postStatus(object);
       await setModalOpen(false);
       await setStatus("");
    };

  // console.log(getCurrentTimeStamp("LLL"))  ;


  useMemo(()=>{
    getStatus(setAllStatus);

  },[])  ;
 



  return (
    <div className='post-status-main'>
      <div className='post-status'>
        <button className='open-post-modal'onClick={() => setModalOpen(true)}>
            Start a post
            </button>
           
      </div>
      <ModalComponent 
      sendStatus={sendStatus}
       status={status} 
       setStatus={setStatus} 
       modalOpen={modalOpen} 
       setModalOpen={setModalOpen}/>






       <div>
       {allStatuses.map((posts)=>{
        return(
          <div key={posts.id}>
           <PostsCard posts={posts}/>
           </div>
        );
        
        
       })}
       </div>

       
      
    </div>
  );
}





