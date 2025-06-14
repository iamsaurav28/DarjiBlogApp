import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [Input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:9000/api/v1/user/login", Input);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.name);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={Input.email}
              onChange={(e) => setInput({ ...Input, [e.target.name]: e.target.value })}
              className='form-control'
              placeholder='Enter Email'
              required
            />
          </div>


          <label>Password</label>
          <div className="input-group">
  <input
    type={showPassword ? 'text' : 'password'}
    name='password'
    value={Input.password}
    onChange={(e) => setInput({ ...Input, [e.target.name]: e.target.value })}
    className="form-control"
    placeholder="Enter Password"
    required
  />
  <span
    className="input-group-text bg-white"
    onClick={() => setShowPassword(!showPassword)}
    style={{
      cursor: 'pointer',
      padding: '0 12px',
      fontSize: '1.1rem',
      height: '38px',
      display: 'flex',
      alignItems: 'center',
      borderLeft: 'none',
    }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>


          <div className='mb-3 d-grid'>
            <button type='submit' className='btn btn-primary'>
              {loading ? <div className="spinner-border spinner-border-sm" role="status"></div> : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
