import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Login = () => {

  const navigate = useNavigate();

  const [Input, setInput] = useState({
    email:"",
    password:"",
  })


  const handleLogin= async (e)=>{
    e.preventDefault();

    try{
     const res = await axios.post("http://localhost:9000/api/v1/user/login", Input);
     alert(res.data.message);
     localStorage.setItem("token", res.data.token);
     localStorage.setItem("username", res.data.name);
     navigate("/");

    }catch(error){
      alert(error.response.data.message)
    }
  }



  return (
    <div>

<div className="container shadow">
        <h2 className='text-center my-3'> Sign Up Here </h2>
        <div className='col-md-12 my-3 d-flex items-center justify-content-center'>
          <div className='row'>
            <form onClick={handleLogin}>

              <div className='mb-3'>
              <label htmlFor='formGroupExampleInput' className='form-label'>
                  Email
                </label>
                <input 
                type='text'
                name='email'
                value={Input.email}
                onChange={(e)=> setInput({...Input, [e.target.name]:e.target.value})}
                className='form-control'
                id='formGroupExampleInput'
                placeholder='Enter Email'
                /> 
              </div>

              <div className='mb-3'>
              <label htmlFor='formGroupExampleInput' className='form-label'>
                  Password
                </label>
                <input 
                type='password'
                name='password'
                value={Input.password}
                onChange={(e)=> setInput({...Input, [e.target.name]:e.target.value})}
                className='form-control'
                id='formGroupExampleInput'
                placeholder='Enter Password'
                /> 
              </div>

              <div className='mb-3'>
                <button type='submit' className='btn btn-primary'>Login</button>
              </div>

            </form>

          </div>
        </div>

      </div>




    </div>
  )
}

export default Login;