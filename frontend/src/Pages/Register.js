import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Register = () => {
  const navigate = useNavigate();
  const [Input, setInput] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false); // State for loader
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    try {
      const res = await axios.post("https://mern-blog-app-lhql.onrender.com/api/v1/user/register", Input);
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div>
      <div className="container shadow">
        <h2 className='text-center my-3'>Sign Up Here</h2>
        <div className='col-md-12 my-3 d-flex items-center justify-content-center'>
          <div className='row'>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='formGroupExampleInput' className='form-label'>
                  Name
                </label>
                <input
                  type='text'
                  name='username'
                  value={Input.username}
                  onChange={(e) => setInput({ ...Input, [e.target.name]: e.target.value })}
                  className='form-control'
                  id='formGroupExampleInput'
                  placeholder='Enter name'
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='formGroupExampleInput' className='form-label'>
                  Email
                </label>
                <input
                  type='text'
                  name='email'
                  value={Input.email}
                  onChange={(e) => setInput({ ...Input, [e.target.name]: e.target.value })}
                  className='form-control'
                  id='formGroupExampleInput'
                  placeholder='Enter Email'
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='formGroupExampleInput' className='form-label'>
                  Password
                </label>
                <div className='input-group'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={Input.password}
                    onChange={(e) => setInput({ ...Input, [e.target.name]: e.target.value })}
                    className='form-control'
                    id='formGroupExampleInput'
                    placeholder='Enter Password'
                  />
                  <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className='mb-3'>
                <button type='submit' className='btn btn-primary'>
                  {loading ? <div className="spinner-border spinner-border-sm" role="status"></div> : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
