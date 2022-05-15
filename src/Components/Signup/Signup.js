import React, {useState, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { Link } from 'react-router-dom';
import {FirebaseContext} from '../../store/Context';


export default function Signup() {
  const history=useHistory()
  const [userName, setUserName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [passLen, setPassLen]=useState(0);
  const [phone, setPhone]=useState('');
  const {firebase}= useContext(FirebaseContext) 
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(firebase);
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName: userName}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:userName,
          phone: phone
        }).then(()=>{
          alert("Account Created")
          history.push("/login")
        })
      })
    })
    
  }
  const chkPass=()=>{
    if(passLen<7){
      document.getElementsByTagName('p')[0].style.fontSize='16px';
    }
    else{
      document.getElementsByTagName('p')[0].style.fontSize='0px';
    }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <div className="logo"><img width="50px" height="50px" src={Logo}></img></div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            placeholder='name'
          />
          
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='eg: name@gmail.com'
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            placeholder='phone'
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input passinp"
            type="password"
            id="lname"
            name="password"
            placeholder='enter password'
            value={password}
            onBlur={chkPass}
            onChange={(e)=>{
              setPassword(e.target.value)
              setPassLen(password.length)
              // if(passLen>=6){
              //   document.getElementsByTagName('p')[0].style.fontSize='0px';
              // }
            }}
          />
          <p>enter minimum 8 charecter</p>
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <Link to='/login' className='linkBtn'><a>Login</a></Link>
      </div>
    </div>
  );
}
