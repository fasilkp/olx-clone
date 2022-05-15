import React, {useEffect, useContext} from 'react';
import './App.css';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ViewPost from './Pages/ViewPost';
import { AuthContext, FirebaseContext } from './store/Context';
import Home from './Pages/Home';
import Create from './Components/Create/Create'
import Post from './store/PostContext';

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return (
    <div>
      <Post>

      <Router>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/signup'>
          <Signup/>
        </Route>
        <Route exact path='/login'>
          <Login/>
        </Route>
        <Route exact path='/create'>
          <Create/>
        </Route>
        <Route exact path='/viewpost'>
          <ViewPost/>
        </Route>
      </Router>
      
      </Post>
    </div>
  );
}

export default App;
