import React,{useState} from "react";

import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { editProfile } from "./FirestoreAPI";


export const uploadImage =(file,id,setModalOpen,setProgress,setCurrentImage)=>{
    const profilePicsRef=ref(storage,`profileImages/${file.name}`) //for adding forlder in fireimage storage forseperate

    const uploadTask =uploadBytesResumable(profilePicsRef,file)

    uploadTask.on('state_changed',(snapshot)=>{
        const progress=Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes)*100);

            

            setProgress(progress);
            
    },(error)=>{
        console.log(error)
    },()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((response)=>{
            editProfile(id,{imageLink:response}); //id-id
            setModalOpen(false);
            setProgress(0);
            setCurrentImage({});
        });
    }
    );

}


// import React, { useState } from "react";
// import { storage } from "../firebaseConfig";
// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

// export const uploadImage = (file) => {
//   if (!file) {
//     console.log('No file selected.');
//     return;
//   }
  
//   const profilePicsRef = ref(storage, `profileImages/${file.name}`);

//   const uploadTask = uploadBytesResumable(profilePicsRef, file);

//   uploadTask.on('state_changed', (snapshot) => {
//     const progress = Math.round(
//       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//     );
//     console.log(progress);
//   }, (error) => {
//     console.log(error);
//   }, () => {
//     getDownloadURL(uploadTask.snapshot.ref)
//       .then((response) => {
//         console.log(response);
//       });
//   });
// };



