import React, { Fragment, useState , useContext} from 'react';
import { useHistory } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const history=useHistory();
  const date=new Date
  const handleSubmit=(e)=>{
    firebase.storage().ref(`/image/${date.toDateString()+date.getTime()}`).put(image).then(({ref})=>{
        ref.getDownloadURL().then((url)=>{
          console.log(url);
          firebase.firestore().collection('product').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createAt: date.toDateString()
          }).then(()=>{
            console.log("product added");
            history.push('/')
          })
        })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              placeholder='Enter product name'
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              placeholder='Enter product category'
              onChange={(e)=>{setCategory(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" placeholder='Enter price' name="Price" onChange={(e)=>{setPrice(e.target.value)}} />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image && URL.createObjectURL(image)}></img>
            <br />
            <input type="file" onChange={(e)=>{
              setImage(e.target.files[0])
              }} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
