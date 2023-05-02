import {firestore} from '../firebaseConfig';
import {addDoc,collection,onSnapshot,doc,updateDoc,query,where,setDoc, deleteDoc} from 'firebase/firestore';
import { useRef } from 'react';

import {toast} from "react-toastify";




//we have declare 2 postStatus 1st on is started with small p and other is started with Capital letter be carefully do this

///this is for fire store
let postsRef=collection(firestore,"posts"); //i changed postsRef to postsRef nothing is it ther is not problem
let userRef=collection(firestore,"users");
let likeRef =collection(firestore,"likes");
let commentRef=collection(firestore,'comments')
let connectionRef=collection(firestore,"connections");



export const postStatus=(object)=>{ 
    
    
    addDoc(postsRef,object)
    .then(() => { 
         toast.success('Congratulations ! Document has been posted successfully');
    })
    .catch((err)=>{
        console.log(err);
    })

};

//this is for get data from the firebase returned which you provide to database firestore
export const getStatus=(setAllStatus)=>{
    onSnapshot(postsRef,(response)=>{
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
//             return {...docs.data(),id : docs.id};
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
            return {...docs.data(),id : docs.id,key:index}; //there i passed both 
        })
        .filter((item)=>{
            return item.email === currentEmail
        })[0]
        );
    });
};

 //there i changed userid => userID
export const editProfile=(userID,payload)=>{

    let userToEdit=doc(userRef,userID)

    updateDoc(userToEdit,payload)
    .then(()=>{
        toast.success('Profile Updated Successfully!');
    })
    .catch((err)=>{
        console.log(err);
    });
};
export const getSingleStatus =(setAllStatus,id)=>{
    const singlePostQuery=query(postsRef,where("id","==",id));
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


  export const likePost=(id,postId,liked)=>{
  try{ 
    let docToLike=doc(likeRef,`${id}_${postId}`);
   if(liked){
    deleteDoc(docToLike);

   }
   else{
    setDoc(docToLike,{id,postId});
   }
   
}
catch(err){
    console.log(err);
}
    

  };

  export const getLikesByUser=(id,postId,setLiked,setLikesCount)=>{
    try{ 
        let likeQuery=query(likeRef,where('postId','==',postId))
       
        onSnapshot(likeQuery,(response)=>{
            let likes= response.docs.map((doc)=> doc.data());
            let likesCount=likes.length;
            const isLiked=likes.some((Like)=> Like.id=== id)

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


  export const getAllUsers=(setAllUsers)=>{
    onSnapshot(userRef,(response)=>{
        setAllUsers(response.docs.map((docs)=>{
            return{...docs.data(),id:docs.id};
        })
        );
    });

  }


  export const updatePost=(id,status,postImage)=>{
    let docToUpdate=doc(postsRef,id);

    try{
    updateDoc(docToUpdate,{status,postImage});
    toast.success("Post has been updated successfully")
}
    catch(err){
    console.log(err);

  }};


  export const deletePost=(id)=>{
    let docToDelete=doc(postsRef,id);
    try{
        deleteDoc(docToDelete);
        toast.success("Post has been deleted successfully!");

    }catch(err){
        console.log(err);
    }
  };

///like post api is used there as same syantax as is it
  export const addConnection=(userId,targetId)=>{
    try{ 
      let connectionToAdd=doc(connectionRef,`${userId}_${targetId}`);
      setDoc(connectionToAdd,{userId,targetId});  ///this will be appear in firebase
      toast.success("Connection Added");
  
     }
  catch(err){
      console.log(err);
  }
      
  
    };



    ////getLikesByUser api fucntion is used there for get connection as get likes

    export const getConnection=(userId,targetId,setIsConnected)=>{
        try{ 
            let connectionQuery=query(connectionRef,where('targetId','==',targetId))
           
            onSnapshot(connectionQuery,(response)=>{
                let connections= response.docs.map((doc)=> doc.data());
                
                const isConnected=connections.some((connection)=> connection.userId=== userId)


                setIsConnected(isConnected);
    
                
            });
         }
         catch(err){
             console.log(err);
         }
    
      };

// export const getSingleUser=(setCurrentUser,email)=>{
//     const singleUserQuery=query(userRef,where("email","==",email));
// }



