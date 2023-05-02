import React, { useState } from 'react';
import { Button,  Modal,Progress } from 'antd';
import './index.scss';
import {ImFilePicture} from 'react-icons/im';
import ReactQuill from 'react-quill';

const ModalComponent= ({sendStatus ,modalOpen,setModalOpen,status,setStatus,isEdit,updateStatus,uploadPostImage,setPostImage,postImage,currentPost,setCurrentPost}) => {
console.log(currentPost?.postImage);
  const [progress,setProgress]=useState(0);
  const [value, setValue] = useState('');
  
  

  return (
    <>
      
      
      <Modal
        title="Express Your World !"
        centered
        open={modalOpen}
        onOk={() => {setStatus("");
        setModalOpen(false);
        setPostImage('');
        setCurrentPost({});}}
        
        onCancel={() => {setStatus("");setModalOpen(false);
        setPostImage('');
      setCurrentPost({});
    }}
        footer={[
            
            <Button
              key="submit"
              type="primary"
              disabled={status.length > 0 ? false : true}
              onClick={isEdit?updateStatus:sendStatus}
              
              
            >
              {isEdit?"Update":"Post"}
            </Button>,
          ]}
      >
        <div className='posts-body'>
       {/* <textarea rows={3} cols={3} className='modal-input' placeholder="I'm curious to hear your opinion on it . . ."
       onChange={(event)=>setStatus(event.target.value)}
       value={status}/> */}
       <ReactQuill placeholder='Share your World . . . ' className='modal-input' theme="snow" value={status} onChange={setStatus} />
       
       {progress===0 || progress === 100 ?(<></>) : ( <div className='progress-bar'>
    <Progress type="circle" percent={progress} />
    </div>)}

       {postImage?.length > 0 || currentPost?.postImage?.length ? (<img className='preview-image' src={postImage || currentPost?.postImage} alt='postImage'/>):(<></>)}
       </div>
       {/* ///=============================================== */}
       
     


       <label for='pic-upload' ><ImFilePicture size={25} className='picture-icon'/></label>
       <input type={'file'} id='pic-upload' hidden onChange={(event)=>uploadPostImage(event.target.files[0],setPostImage,setProgress)}/>
       
      </Modal>
    </>
  );
};

export default ModalComponent;