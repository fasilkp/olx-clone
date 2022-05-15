import React, {useContext} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import {Link, useHistory} from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/Context';

function Header() {
  const {user}= useContext(AuthContext)
  const {firebase}= useContext(FirebaseContext)
  const history=useHistory();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to='/'><div><OlxLogo></OlxLogo></div></Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder='Choose your location'/>
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        <span>{user ? user.displayName : <Link to='/login' className='linkBtn'>Login</Link>}</span>
          <hr />
        </div>
        {user ? <div><span className='logoutBtn' onClick={()=>{
          firebase.auth().signOut()
          history.push('/login')
        }}>Logout</span></div> : ""}
        <Link to='/create' className='linkBtn'>
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
