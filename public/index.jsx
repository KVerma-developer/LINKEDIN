import React, { useState } from 'react';
import { editProfile } from '../../../API/FirestoreAPI';
import './index.scss';
import {RxCross2} from 'react-icons/rx';

export default function ProfileEdit ({onEdit,currentUser}) {
    const [editInputs,setEditInputs]=useState(currentUser)
    
    const getInput=(event)=>{
        let {name,value} =event.target;
          let input ={[name]:value};
          setEditInputs({...editInputs,...input});

    };

    const updateProfileData=async()=>{

      await editProfile(currentUser?.id,editInputs);
      await onEdit();


    }

    // console.log(editInputs);



///there i uses profile card scss prop. in cancel btn for change we have to change in profile card

  return (

    <div  className='profile-card'>
     
      <div className='edit-btn'>
        
        
        <RxCross2 className='edit-icon' onClick={onEdit} size={25}/> 
        
       
      </div>
      


      <div className='profile-edit-inputs'>
        <label>Name</label>
      <input onChange={getInput} className='edit-input' placeholder='Name' name='name' 
      value={editInputs.name}/>
      <label>Headline</label>
      <input onChange={getInput} className='edit-input' placeholder='Headline' name='headline'value={editInputs.headline}/>
      <label>Country</label>
      <input onChange={getInput} className='edit-input' placeholder='Country' name='country' value={editInputs.country}/>

      <label>City</label>
      <input onChange={getInput} className='edit-input' placeholder='City' name='city' value={editInputs.city}/>
      
      <label>Company</label>
      <input onChange={getInput} className='edit-input' placeholder='Company' name='company'value={editInputs.company}/>
      <label>Industry</label>
      <input onChange={getInput} className='edit-input' placeholder='Industry' name='industry' value={editInputs.industry}/>
      <label>College</label>
      <input onChange={getInput} className='edit-input' placeholder='College' name='college' value={editInputs.college}/>
      <label>Website</label>
      <input type='website' onChange={getInput} className='edit-input' placeholder='Website' name='website' value={editInputs.website}/>
      <label>About</label>
      <textarea  placeholder='About Me' onChange={getInput} rows={8}  name='aboutme'value={editInputs.aboutme}/>

      <label>Skills</label>
      <input onChange={getInput} className='edit-input' placeholder='Skills' name='skills' value={editInputs.skills}/>

      
      </div>  

      <div className='save-container'>
      <button className='save-btn' onClick={updateProfileData}>Save</button>
      </div>


</div>
  );
}
