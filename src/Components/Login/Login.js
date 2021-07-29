import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPass as CreateUser, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeFramework, signInWithEmailAndPassword } from './LoginManager';

initializeFramework();

function Login() {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', photo: '', isSignedIn: false, password: '', error: '', msg: '', newUser: false });
  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  const GoogleSignIn = () => handleGoogleSignIn().then(res=>handleResponse(res, true))

  const FbSignIn = () => handleFbSignIn().then(res=>handleResponse(res, true))
  const SignOut = () => handleSignOut().then(res=>handleResponse(res, false))


  const handleSubmit = (e) => {
    if (newUser && userInfo.email && userInfo.password) {
      CreateUser(userInfo.name, userInfo.email, userInfo.password).then(res=>handleResponse(res, true))
    }

    if (!newUser && userInfo.email && userInfo.password) {
      signInWithEmailAndPassword(userInfo.email, userInfo.password).then(res=>handleResponse(res, true))
    }

    e.preventDefault();
  }



  const handleResponse = (res, redirect) =>{
    setUserInfo(res);
    setLoggedInUser(res);
    if(redirect)history.replace(from);    
  }

  const handleChange = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      isFieldValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value);
    }
    if (isFieldValid) {
      const newUserInfo = { ...userInfo };
      newUserInfo[event.target.name] = event.target.value;
      setUserInfo(newUserInfo);
    }
    else {
      const newUserInfo = { ...userInfo };
      newUserInfo[event.target.name] = null;
      setUserInfo(newUserInfo);
    }
  }





  const { name, email, photo, password, isSignedIn } = userInfo;

  return (
    <div className="App">

      {
        !isSignedIn ? <button onClick={GoogleSignIn}>Sign in</button> : <button onClick={SignOut}>Sign out</button>
      }

      <button onClick={FbSignIn}>Sign in using facebook</button>

      {isSignedIn && <div>
        {/* <h1>Welcome: {name}</h1> */}
        <h2>Email: {email}</h2>
        <img src={photo} alt="" />
      </div>}

      <h1>Our own authentication system</h1>
      {/* <h2>Name: {name}</h2> */}
      <h3>Email: {email}</h3>
      <p>Password: {password}</p>

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">User Registration</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" id="" onBlur={handleChange} placeholder='Name' required />}<br />
        <input type="text" name="email" id="" onBlur={handleChange} placeholder='Email address' required /><br />
        <input type="password" name="password" id="" placeholder='Password' onBlur={handleChange} required /><br />
        <input type="submit" value="Submit" />

      </form>
      <p style={{ color: 'red' }}>{userInfo.error}</p>
      <p style={{ color: 'blue' }}>{userInfo.msg}</p>
    </div>
  );
}

export default Login;
