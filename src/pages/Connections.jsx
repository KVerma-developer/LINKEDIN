import React ,{useEffect, useState}from "react";//react have hooks for specific function and component
import ConnectionComponent from "../components/ConnectionsComponent";
import { onAuthStateChanged } from "firebase/auth"; //onAuthStateChanged is method in authnification library from firebase package
import { auth } from "../firebaseConfig";
import {useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';



export default function Connections({currentUser}) {
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
  return loading ? <Loader/>:<ConnectionComponent currentUser={currentUser}/>;
    ///this is react fragment <></> for not use any tag
    
  
}
