import React,{useState} from 'react';
import { RegisterAPI,googleSignInAPI} from '../API/authAPI';
import { useNavigate } from 'react-router-dom';
import "../Sass/LoginComponent.scss";
import linkedinLogo from '../assets/linkedinLogo.png';
import GoogleButton from 'react-google-button';
import {  toast } from 'react-toastify';
import { postUserData } from '../API/FirestoreAPI';
import { getUniqueID } from '../helpers/getUniqueId';






// const login=()=>{
//     let res=  LoginAPI();
//     console.log(res) };
export default function RegisterComponent(){
    let navigate=useNavigate();
    
    const [credentails, setCredentials] = useState({});
    const register= async()=>{
        try{
            let res= await RegisterAPI(credentails.email,credentails.password);
            toast.success('Congratulations ! You Created Account Successfully. ');
            postUserData ({userID:getUniqueID(),
                name:credentails.name,
                email:credentails.email});
            navigate('/home');
            localStorage.setItem('userEmail',res.user.email);
    
        }
        catch (err) {
            console.log(err);
            toast.error("Oops! Account isn't created yet. ");
           
        }
    


    };

    const  googleSignIn=()=>{
        let response =googleSignInAPI();
        navigate('/home');
    };
    
      
   
    return (
        <div className='login-wrapper'>
            <img src={linkedinLogo} className='linkedinLogo'/>
            <div className='login-wrapper-inner'>

            <h1 className='heading'>Make the most of your professional life</h1>
            
            
            
            
            
            <div className='auth-inputs'>
            <input onChange={(event)=>setCredentials({...credentails,name:event.target.value})} 
            type='text' className='common-input'  placeholder='Your Name'/>

            <input onChange={(event)=>setCredentials({...credentails,email:event.target.value})} 
            type='email' className='common-input'  placeholder='Email or Phone'/>
            

            <input onChange={(event)=>setCredentials({...credentails,password:event.target.value})} 
           type='password' className='common-input'  placeholder='Password (6 or more characters)'/>
           
            </div> 
            

            <button onClick={register} className='login-btn'>
                Agree & Join
            </button>
           


            

            </div>
            <hr className='hr-text' data-content='or'/>
            <div className='google-btn-container'>
            <GoogleButton className='google-btn'
       onClick={googleSignIn}/>
    
       <p className='go-to-signup'>Already on LinkedIn? <span className='join-now' onClick={()=>navigate('/')}>Sign In</span></p>
       
       
            
            
        </div>
        </div>
    )
}





