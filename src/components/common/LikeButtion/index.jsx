import React,{useMemo,useState} from 'react';
import './index.scss';

import {AiOutlineLike,AiTwotoneLike,AiOutlineComment} from 'react-icons/ai'
import { getLikesByUser, likePost, postComment } from '../../../API/FirestoreAPI';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';

export default function LikeButton({userId,postId}) {
  const [likesCount,setLikesCount]=useState(0);
  const [liked,setLiked]=useState(false);
  const [showCommentBox,setShowCommentBox]=useState(false);
  const [comment,setComment]=useState("");

  const getComment=(event)=>{

    setComment(event.target.value)
  }

  const handleLike=()=>{
    likePost(userId,postId,liked);
  };


  const addComment=()=>{
    postComment(postId,comment,getCurrentTimeStamp('LLL'));
    setComment("");
    // .then(()=>{
    //   setComment('')
    // });


  };




  

  useMemo(()=>{
    getLikesByUser(userId,postId,setLiked,setLikesCount);

  },[userId,postId])




  return (
    <div className='like-container'>
      <p>{likesCount} People Like this Post</p>
      <hr className='hr-line'/>
      <div className='like-comment'>
      <div className='likes-comment-inner' onClick={handleLike}>
      {liked ?<AiTwotoneLike size={25} color='#014488'/> :<AiOutlineLike size={25}/>}
      {/* <p>{liked?'Liked':'Like'}</p> ternaryoperator used */}
      <p className={liked ? 'blue':'black'} >Like</p>
      </div>



      <div className='likes-comment-inner' onClick={()=>{setShowCommentBox(true)}}>

       {<AiOutlineComment size={25} color={showCommentBox?'#0a66c2':'#212121'}/> }
      
      <p className={showCommentBox ? 'blue':'black' }  >Comment
      </p>
      </div>
      </div>

      {/* ternaryoperator */}
      {showCommentBox ?(
      <>
      <input 
      onChange={getComment}

        placeholder='Add a comment' className='comment-input'
        name='comment'
        value={comment}/>

      <button className='add-comment-btn' onClick={addComment}>Add Comment</button>
      </> ):(<></>)}


    </div>
  );
};
