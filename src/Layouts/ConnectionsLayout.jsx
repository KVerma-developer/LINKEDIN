import React,{useMemo, useState} from 'react';
import Connections from '../pages/Connections';
import Topbar from '../components/common/Topbar';
import { getCurrentUser } from '../API/FirestoreAPI';

export default function ConnectionsLayout() {
  const [currentUser,setCurrentUser]=useState({});
  useMemo(()=>{
    getCurrentUser(setCurrentUser);

  },[])
  return (
    <div>
    <Topbar currentUser={currentUser} />
      <Connections currentUser={currentUser}/>
    </div>
  )
}

