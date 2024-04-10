import React from 'react'
import './CSS/LoginSignup.css'
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {
  const [signup, setSignup] = React.useState(true)
  const navigate = useNavigate();
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        {signup === true ? <h1>Sign Up</h1> : <h1>Login</h1>}
        <div className="loginsignup-fields">
        {signup && <input type="text" placeholder='Your Name' />}
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>
        {signup === true ?<button onClick={()=> setSignup(!signup)} >Continue</button>:<button onClick={()=> navigate('/')} >Login</button>}
        {signup === true ? <p className="loginsignup-login">Already have an account? <span style={{cursor:'pointer'}} onClick={()=> setSignup(!signup)}>Login here</span></p>
        : <p className="loginsignup-login">Don't have an account? <span style={{cursor:'pointer'}} onClick={()=> setSignup(!signup)}>Create here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
