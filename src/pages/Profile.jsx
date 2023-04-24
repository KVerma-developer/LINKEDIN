import React, {useEffect, useState } from 'react';
import ProfileComponent from '../components/ProfileComponent'
import { onAuthStateChanged } from "firebase/auth"; //onAuthStateChanged is method in authnification library from firebase package
import { auth } from "../firebaseConfig";
import {useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

export default function Profile({currentUser}) {
  const[loading,setLoading]= useState(true); //true
    let navigate=useNavigate();


  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
        if(!res?.accessToken){  //for switch to home page whenever you render login page switched to home automatically
            navigate("/");

        }
        else{
          setLoading(false);
        }
    });

},[]);
  return (
    loading ? <Loader/>:<ProfileComponent currentUser={currentUser}/>
  );
  
};
