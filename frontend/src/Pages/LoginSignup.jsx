import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/loginsignup.css'
const LoginSignup = () => {
  const [state, setstate] = useState("Login");

  const login_signup_switch = () => {
    if (state === "Signup") {
      setstate("Login");
    } else {
      setstate("Signup");
    }
  }

  const navigate = useNavigate();
  
  const [User, setUser] = useState({
    name: '',
    userId: '',
    email: '',
    password: ''
  })

  const [term, setterm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const TandC = () => {
    setterm(!term);
  }

  const createUser = async (user) => {
    await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(user)
    }).then(response => response.json())
    .then((data) => {
      console.log(data);
      alert('User created successfully');
      if(data.success){
        localStorage.setItem('token', data.token);
      }
      navigate('/');

    }).catch((error) => {
      console.log("ERROR IN CREATING USER "+error);
    });
  }

  const loginUser = async (user) => {
    const login_user = {};
    login_user.userId = user.userId;
    login_user.password = user.password;
    
    await fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(login_user)
    }).then(response => response.json())
    .then((data) => {
      console.log(data);
      if(data.success){
        localStorage.setItem('token', data.token);
        window.location.replace('/');
      } else {
        alert(data.message);
      }
      
    }).catch((error) => {
      console.log("ERROR IN LOGIN USER "+error);
    });
  }

  const handleSubmit = async (e) => {
    if (state==='Signup'){   
      if (term===false) {
        alert('Please agree to the terms and conditions');
        return;
      }
      createUser(User);
    }

    
    e.preventDefault();
    loginUser(User);
  }



  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-field">
          {state==='Login'?null:<input name='name' onChange={handleChange} value={User.name }  type="text" placeholder="Username" />}
          <input name='userId' onChange={handleChange}  value={User.userId }  type="text" placeholder="UserID" />
          {state==='Login'?null:<input name='email' onChange={handleChange}  value={User.email }  type="email" placeholder="Email" />}     
          <input name="password" onChange={handleChange}  value={User.password }  type="password" placeholder="Password" />
        </div>
        <button onClick={handleSubmit}>{state==='Login'?"Login":"Signup"}</button>
        <p className='loginsignup-login'>Dont have an account? <span onClick={login_signup_switch}>Signup</span></p>
        
        {state==='Login'?null:<div className='loginsignup-agree'>
          <input onClick={TandC} type="checkbox" />
          <p>I agree to the terms and conditions</p>
        </div>}
      </div>
    </div>
  )
}

export default LoginSignup