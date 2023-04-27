import React from 'react';
import { Button,  Modal } from 'antd';
import './index.scss';

const ModalComponent= ({sendStatus ,modalOpen,setModalOpen,status,setStatus,isEdit,updateStatus}) => {
  
  

  return (
    <>
      
      
      <Modal
        title="Express Your World !"
        centered
        open={modalOpen}
        onOk={() => {setStatus(""),setModalOpen(false)}}
        onCancel={() => {setStatus(""),setModalOpen(false)}}
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
       <input className='modal-input' placeholder="I'm curious to hear your opinion on it . . ."
       onChange={(event)=>setStatus(event.target.value)}
       value={status}/>
      </Modal>
    </>
  );
};

export default ModalComponent;