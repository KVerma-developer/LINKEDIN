import React,{useState} from "react";

import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';


export const uploadImage =(file)=>{
    const profilePicsRef=ref(storage,`profileImages/${file.name}`) //for adding forlder in fireimage storage forseperate

    const uploadTask =uploadBytesResumable(profilePicsRef,file)

    uploadTask.on('state_changed',(snapshot)=>{
        const progress=Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes)*100);
            console.log(progress);
        
    },(error)=>{
        console.log(error)
    },()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((response)=>{
            console.log(response);
        });
    }
    );

}


