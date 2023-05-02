import React ,{useState}from 'react';
import { Button,Modal,Progress  } from 'antd';
import './index.scss'

export default function FileUploadModal({modalOpen,setModalOpen,getImage,uploadImage,currentImage,progress, }) {
  return (
    <div>
      <Modal
        title="Add file here..."
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" onClick={uploadImage}
          disabled={currentImage.name ? false:true}>
            Upload Profile Picture
          </Button>
        ]}
        >
             <div className='image-upload-main'>
              <p>{currentImage.name}</p>
              <label className='upload-btn' for='image-upload' >Add an Image</label>
             
              {progress === 0 ? (<></>):(<div className='progress-bar'>
    <Progress type="circle" percent={progress} />
    </div>)
    }


     {/* <Progress type="circle" percent={progress} /> */}
  
             <input hidden type={'file'} id='image-upload' onChange={getImage} />
             
             </div>
                  
      </Modal>
    </div>
  );
}
