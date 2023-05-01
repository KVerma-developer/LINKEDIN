import React ,{useEffect,useState}from 'react';
import {getAllUsers,addConnection} from '../API/FirestoreAPI';
import '../Sass/ConnectionsComponent.scss';
import ConnectedUsers from '../components/common/ConnectedUsers';


export default function ConnectionsComponent({currentUser}) {
  const [users,setUsers]=useState([]);
  
  const getCurrentUser=(id)=>{
    // console.log(id);
    addConnection(currentUser.id,id)

  };
  useEffect(()=>{
    getAllUsers(setUsers);
   
  },[]);


  ///this is shifted in postupdated

  // useEffect(()=>{
  //   getConnection(currentUser.id,id,setIsConnected)
  // },[currentUser.id,id]);

  // console.log(isConnected);

///imp. ternary operator
  return (
    <div className='connections-main'>
      {users.map((users)=>{
        
        return users.id===currentUser.id ?<></>:
        (<ConnectedUsers users={users} currentUser={currentUser} getCurrentUser={getCurrentUser}/>)
      })}
    </div>
  );
}
