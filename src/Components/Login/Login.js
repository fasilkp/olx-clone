import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import {Link} from 'react-router-dom';

function Login() {
  const history=useHistory()
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const {firebase}= useContext(FirebaseContext)
  const handleLogin =(e)=>{ 
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
      history.push("/")
    }).catch((err)=>{
      alert(err.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <div className="logo"><img width="50px" height="50px" src={Logo}></img></div>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='eg: name@gmail.com'
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='enter password'
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup' className='linkBtn'><a>Signup</a></Link>
      </div>
    </div>
  );
}

export default Login;
