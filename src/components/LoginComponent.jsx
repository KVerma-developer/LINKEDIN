import React,{useState} from 'react';
import { LoginAPI,googleSignInAPI} from '../API/authAPI';
import { useNavigate } from 'react-router-dom';
import "../Sass/LoginComponent.scss";
import linkedinLogo from '../assets/linkedinLogo.png';
import GoogleButton from 'react-google-button';
import { toast } from 'react-toastify';






// const login=()=>{
//     let res=  LoginAPI();
//     console.log(res) };
export default function LoginComponent(){
    let navigate=useNavigate();
    
    const [credentails, setCredentials] = useState({});
    const login= async()=>{
        try{
            let res= await LoginAPI(credentails.email,credentails.password);
            toast.success('Signed In to LinkedIn! ')
            localStorage.setItem('userEmail',res.user.email);
            navigate('/home');
    
        }
        catch(err){
            console.log(err);
            toast.error('Check Your Login Credentials! ');
           
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

            <h1 className='heading'>Sign In</h1>
            <p className='sub-heading'>Stay updated on your professional world</p>
            
            
            
            
            <div className='auth-inputs'>
            <input onChange={(event)=>setCredentials({...credentails,email:event.target.value})} 
            type='email' className='common-input'  placeholder='Email or Phone'/>
            

            <input onChange={(event)=>setCredentials({...credentails,password:event.target.value})} 
           type='password' className='common-input'  placeholder='Password'/>
           
            </div> 
            

            <button onClick={login} className='login-btn'>
                Sign In
            </button>
           


            

            </div>
            <hr className='hr-text' data-content='or'/>
            <div className='google-btn-container'>
            <GoogleButton className='google-btn'
       onClick={googleSignIn}/>
    
       <p className='go-to-signup'>New to LinkedIn <span className='join-now' onClick={()=>navigate('/register')}>Join now</span></p>
       
       
            
            
        </div>
        </div>
    )
}
