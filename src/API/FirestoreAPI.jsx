import {firestore} from '../firebaseConfig';
import {addDoc,collection,onSnapshot,doc,updateDoc,query,where,setDoc, deleteDoc} from 'firebase/firestore';
import { useRef } from 'react';

import {toast} from "react-toastify";




//we have declare 2 postStatus 1st on is started with small p and other is started with Capital letter be carefully do this

///this is for fire store
let dbRef=collection(firestore,"posts"); //i changed postsRef to dbRef nothing is it ther is not problem
let userRef=collection(firestore,"users");
let likeRef =collection(firestore,"likes");
let commentRef=collection(firestore,'comments')


export const postStatus=(object)=>{ 
    
    
    addDoc(dbRef,object)
    .then(() => { 
         toast.success('Congratulations ! Document has been posted successfully');
    })
    .catch((err)=>{
        console.log(err);
    })

};

//this is for get data from the firebase returned which you provide to database firestore
export const getStatus=(setAllStatus)=>{
    onSnapshot(dbRef,(response)=>{
        setAllStatus(response.docs.map((docs)=>{
            return{...docs.data(),id:docs.id};
        })
        );
    });

};
//for user name box
export const postUserData=(object)=>{
    addDoc(userRef,object)
    .then(()=>{})
    .catch((err)=>{
        console.log(err);
    });

};

// export const getCurrentUser=(setCurrentUser)=>{
//     let currentEmail=localStorage.getItem("userEmail");
//     onSnapshot(userRef,(response)=>{
//         setCurrentUser(response.docs.map((docs)=>{
//             return {...docs.data(),userId : docs.id};
//         })
//         .filter((item)=>{
//             return item.email === currentEmail;
//         })[0]
//         );
//     });
// };
export const getCurrentUser=(setCurrentUser)=>{
    let currentEmail=localStorage.getItem("userEmail");
    onSnapshot(userRef,(response)=>{
        setCurrentUser(response.docs.map((docs,index)=>{
            return {...docs.data(),userId : docs.id,key:index}; //there i passed both 
        })
        .filter((item)=>{
            return item.email === currentEmail
        })[0]
        );
    });
};


export const editProfile=(userId,payload)=>{

    let userToEdit=doc(userRef,userId)

    updateDoc(userToEdit,payload)
    .then(()=>{
        toast.success('Profile Updated Successfully!');
    })
    .catch((err)=>{
        console.log(err);
    });
};
export const getSingleStatus =(setAllStatus,id)=>{
    const singlePostQuery=query(dbRef,where("userId","==",id));
    onSnapshot(singlePostQuery,(response)=>{
        setAllStatus(
            response.docs.map((docs)=>{
            return{...docs.data(),id:docs.id};
        })
        );
    });
};

export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
      setCurrentUser(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })[0]
      )
    });
  };


  export const likePost=(userId,postId,liked)=>{
  try{ 
    let docToLike=doc(likeRef,`${userId}_${postId}`);
   if(liked){
    deleteDoc(docToLike);

   }
   else{
    setDoc(docToLike,{userId,postId});
   }
   
}
catch(err){
    console.log(err);
}
    

  };

  export const getLikesByUser=(userId,postId,setLiked,setLikesCount)=>{
    try{ 
        let likeQuery=query(likeRef,where('postId','==',postId))
       
        onSnapshot(likeQuery,(response)=>{
            let likes= response.docs.map((doc)=> doc.data());
            let likesCount=likes.length;
            const isLiked=likes.some((Like)=> Like.userId=== userId)

            setLikesCount(likesCount);
            setLiked(isLiked)
        });
     }
     catch(err){
         console.log(err);
     }

  };

  export const postComment =(postId,comment,timeStamp,name)=>{
    try{
        addDoc(commentRef,{
            postId
            ,comment
            ,timeStamp,
        name});

    }
    catch(err){
        console.log(err)
    }

  };


  export const getComments =(postId,setComments)=>{
    try{
        let singlePostQuery=query(commentRef,where('postId','==',postId))
        onSnapshot(singlePostQuery,(response)=>{
            const comments=response.docs.map((doc)=>{
                return{
                    id:doc.id,
                    ...doc.data(),
                    
                };
            });
            setComments (comments);
        });

        

        
 

    }catch(err){
        console.log(err);
    }
  }

// export const getSingleUser=(setCurrentUser,email)=>{
//     const singleUserQuery=query(userRef,where("email","==",email));
// }



