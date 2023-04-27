
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
import React, { useState } from 'react';
import './index.scss';
import linkedinLogo from '../../../assets/linkedinLogo.png';
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BiBriefcaseAlt2, BiSearchAlt2, BiMessageAltDetail, BiBell, BiUserCircle } from 'react-icons/bi';
import linkedInUser from '../../../assets/linkedinuser.png';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from '../ProfilePopup';
import { signOut, getAuth } from 'firebase/auth';

export default function Topbar() {
  let navigate = useNavigate();
  const auth = getAuth();
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const onLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const goToRoute = (route) => {
    navigate(route);
  };

  const logoutUser = () => {
    onLogout();
  };

  return (
    <div className='topbar-main'>
      <img className='linkedinLogo' src={linkedinLogo} alt='logo' />
      <div className='react-icons'>
        <BiSearchAlt2 size={30} className='react-icon' />
        <AiOutlineHome size={30} className='react-icon' onClick={() => goToRoute('/Home')} />
        <FiUsers size={30} className='react-icon' onClick={() => goToRoute('/Connections')} />
        <BiBriefcaseAlt2 size={30} className='react-icon' />
        <BiMessageAltDetail size={30} className='react-icon' />
        <BiBell size={30} className='react-icon' />
        
      </div>
      <img src={linkedInUser} alt='linkeduser' className='user-logo' onClick={toggleProfilePopup} />

      {showProfilePopup && <ProfilePopup onLogout={onLogout} />}
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



