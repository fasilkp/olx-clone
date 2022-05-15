import React, {useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useState } from 'react';
import './View.css';
import { useEffect } from 'react/cjs/react.development';
function View() {
  const {postDetails}=useContext(PostContext)
  const {firebase}=useContext(FirebaseContext)
  const location=useLocation()
  const [userDetails, setUserDetails]=useState('')
  const {userId} = postDetails
  useEffect(()=>{
    firebase.firestore().collection('users').where('id', '==', userId).get().then((res)=>{
      res.forEach(doc=>[
        setUserDetails(doc.data())
      ])
    })
  })
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="postDetails">
          <p>&#x20B9; 250000 </p>
          <span>{postDetails.name}</span>
          <h6>{postDetails.category}</h6>
          <span>{postDetails.createAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <h6>{userDetails.username}</h6>
          <h6>{userDetails.phone}</h6>
        </div>}
      </div>
    </div>
  );
}
export default View;
