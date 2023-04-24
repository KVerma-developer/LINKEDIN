import React from 'react';
import { Space,Spin } from 'antd';
import "./common.scss";

export default function Loader() {
  return (
    <div className='loader'>
      Please Wait . . . 
        
     <Space  size="middle">
     
    <Spin size="large"/>
     </Space>

    </div>
  )
};
