
///--------------------------this code from video good not comment out this

// import React from 'react';
// import './index.scss';
// import linkedinLogo from '../../../assets/linkedinLogo.png';
// import { AiOutlineHome} from "react-icons/ai";
// import {FiUsers} from "react-icons/fi";
// import {BiBriefcaseAlt2,BiSearchAlt2,BiMessageAltDetail,BiBell,BiUserCircle} from 'react-icons/bi'; 
// import linkedInUser from '../../../assets/linkedinuser.png';
// import { useNavigate } from 'react-router-dom';
// import ProfilePopup from '../ProfilePopup';

// export default function Topbar() {
//   let navigate=useNavigate();
//   const goToRoute=(route)=>{
//     navigate(route);
//   }; 
//   return (
//     <div className='topbar-main'>

//      <img className='linkedinLogo ' src={linkedinLogo} alt='logo'/>
//      <div className='react-icons'>
//      <BiSearchAlt2 size={30} className='react-icon'/>
//       <AiOutlineHome size={30} className='react-icon' 
//       onClick={()=>goToRoute('/Home')}/>
//       <FiUsers size={30} className='react-icon'
//       onClick={()=>goToRoute('/Profile')}/>
//       <BiBriefcaseAlt2 size={30} className='react-icon'/>
//       <BiMessageAltDetail size={30} className='react-icon'/>
//       <BiBell size={30} className='react-icon'/>
      
//       </div>
//       <img src={linkedInUser} alt='linkeduser' className='user-logo'/>
     
//     </div>
//   )
// };
import React, { useEffect, useState } from 'react';
import SearchUsers from '../SearchUsers';
import './index.scss';
import linkedinLogo from '../../../assets/linkedinLogo.png';
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BiBriefcaseAlt2, BiSearchAlt2, BiMessageAltDetail, BiBell, BiUserCircle } from 'react-icons/bi';
import linkedInUser from '../../../assets/linkedinuser.png';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from '../ProfilePopup';
import { signOut, getAuth } from 'firebase/auth';
import { getAllUsers, getCurrentUser } from '../../../API/FirestoreAPI';
 


export default function Topbar({currentUser}) {
  let navigate = useNavigate();
  const auth = getAuth();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isSearch,setIsSearch]=useState(false);
  const [searchInput,setSerachInput]=useState('');
  const [users,setUsers]=useState([]);
  const [filteredUsers ,setFilteredUsers]=useState([]);



  const onLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  const openUser=(user)=>{
    navigate('/Profile',{state:{id:user.id,email: user.email,
    },
  });

  };
  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  useEffect(()=>{
    getAllUsers(setUsers)
  })

  const goToRoute = (route) => {
    navigate(route);
  };
  const handleSearch=()=>{
    if (searchInput !== ''){

    let searched=users.filter((user)=>{
      return Object.values(user).join('').toLowerCase().includes(searchInput.toLowerCase());

    })
    setFilteredUsers(searched);
  }
  else{
    setFilteredUsers(users);

  }
  };

  useEffect(()=>{
    let debounced=setTimeout(()=>{
      handleSearch();

      },1000);
    return()=>clearTimeout(debounced)


  },[searchInput]);



  const logoutUser = () => {
    onLogout();
  };

  return (
    <div className='topbar-main'>  
    {/* {popupVisible ? (<div className='popup-position'>
      <ProfilePopup/>
      </div>):(<></>)} */}
       <img className='linkedinLogo' src={linkedinLogo} alt='LinkedIn-logo' />
      {isSearch ? <SearchUsers setIsSearch={setIsSearch} setSearchInput={setSerachInput}/>: (<div className='react-icons'>
      
     
      
        <BiSearchAlt2 size={30} className='react-icon' onClick={()=>setIsSearch(true)} />
        <AiOutlineHome size={30} className='react-icon' onClick={() => goToRoute('/Home')} />
        <FiUsers size={30} className='react-icon' onClick={() => goToRoute('/Connections')} />
        <BiBriefcaseAlt2 size={30} className='react-icon' />
        <BiMessageAltDetail size={30} className='react-icon' />
        <BiBell size={30} className='react-icon' />
        
      </div>)}


      
     

      <img src={currentUser.imageLink} alt='linkeduser' className='user-logo' onClick={toggleProfilePopup} />

      {showProfilePopup && <ProfilePopup onLogout={onLogout} />}

      {searchInput.length===0 ?
      (<></>):(
      <div className='search-results' >
                                      
      {filteredUsers.length===0 ?(<div  className='search-inner' >Related Data not found!</div>): 
      (filteredUsers.map((user)=>(
               <div   className='search-inner' onClick={()=>openUser(user)} >
                   <img   src={user.imageLink} />
                   <p className='name' >{user.name}</p>
               </div>
  

  ))
  )}

    </div>
      ) }

      
    </div>
  )
};


//-----------------------------------form chat gpt

// import React, { useState } from 'react';
// import './index.scss';
// import linkedinLogo from '../../../assets/linkedinLogo.png';
// import { AiOutlineHome} from "react-icons/ai";
// import { FiUsers} from "react-icons/fi";
// import { BiBriefcaseAlt2,BiSearchAlt2,BiMessageAltDetail,BiBell,BiUserCircle} from 'react-icons/bi'; 
// import linkedInUser from '../../../assets/linkedinuser.png';
// import { useNavigate } from 'react-router-dom';
// import ProfilePopup from '../ProfilePopup';
// import { signOut, getAuth } from 'firebase/auth';

// export default function Topbar() {
//   let navigate = useNavigate();
//   const auth = getAuth();
//   const [showProfilePopup, setShowProfilePopup] = useState(false);

//   const onLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate('/login');
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const toggleProfilePopup = () => {
//     setShowProfilePopup(!showProfilePopup);
//   };

//   const goToRoute = (route) => {
//     navigate(route);
//   }; 

//   return (
//     <div className='topbar-main'>
//       <img className='linkedinLogo ' src={linkedinLogo} alt='logo'/>
//       <div className='react-icons'>
//         <BiSearchAlt2 size={30} className='react-icon'/>
//         <AiOutlineHome size={30} className='react-icon' onClick={()=>goToRoute('/Home')}/>
//         <FiUsers size={30} className='react-icon' onClick={()=>goToRoute('/Profile')}/>
//         <BiBriefcaseAlt2 size={30} className='react-icon'/>
//         <BiMessageAltDetail size={30} className='react-icon'/>
//         <BiBell size={30} className='react-icon'/>
//         <BiUserCircle size={30} className='react-icon' />
//       </div>
//       <img src={linkedInUser} alt='linkeduser' className='user-logo' onClick={toggleProfilePopup}/>

//       {showProfilePopup && <ProfilePopup onLogout={onLogout} />}
//     </div>
//   )
// };



