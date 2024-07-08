import React from 'react'
import Template from '../Component/Auth/Template'
import loginImg from "../Component/Assets/authPhoto/login.png"

const Login = ({setIsLoggedIn})=> {
  return (
    <Template 
      title="Welcome Back"
      desc1="Chandigarh most trusted partner delivery"
      desc2="Buy Your medicine at best price"
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />

    )
}

export default Login