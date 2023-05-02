import React,{useMemo, useState} from 'react';
import Profile from '../pages/Profile';
import Topbar from '../components/common/Topbar';
import { getCurrentUser } from '../API/FirestoreAPI';

export default function ProfileLayout() {
  const [currentUser,setCurrentUser]=useState({});



  useMemo(()=>{
    getCurrentUser(setCurrentUser);

  },[]);
  return (
    <div>
    <Topbar currentUser={currentUser}/>
      <Profile currentUser={currentUser}/>
    </div>
   ) ;
}

///------------------from chatgpt


// import React, { useMemo, useState, useEffect } from 'react';
// import Profile from '../pages/Profile';
// import Topbar from '../components/common/Topbar';
// import { getCurrentUser } from '../API/FirestoreAPI';

// export default function ProfileLayout() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getCurrentUser()
//       .then((getCurrentUser) => {
//         setCurrentUser(getCurrentUser);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       <Topbar />
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <Profile currentUser={currentUser} />
//       )}
//     </div>
//   );
// }

