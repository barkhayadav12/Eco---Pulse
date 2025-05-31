import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from '../utils/auth';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      setToken(res.data.token);
      toast.success('Logged in successfully!', {
        onClose: () => navigate('/')
      });
    } catch (err) {
      const msg = err.response?.data?.msg || 'Login failed!';
      toast.error(msg);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#e6f2f0',
        fontFamily: 'Poppins, sans-serif',
      }}
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <ToastContainer />
      <div className="card shadow p-4 border-0" style={{ width: '100%', maxWidth: '420px', borderRadius: '16px' }}>
        <h3 className="text-center mb-4 fw-semibold">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control rounded-3"
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              className="form-control rounded-3"
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="btn w-100 text-white"
            type="submit"
            style={{ backgroundColor: '#38b6ff', borderRadius: '10px' }}
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#38b6ff', fontWeight: 500 }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
