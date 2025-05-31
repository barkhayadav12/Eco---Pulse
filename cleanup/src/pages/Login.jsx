import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [teamId, setTeamId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/team-login', { teamId });
      navigate(`/team-dashboard/${res.data.teamId}`);
    } catch (err) {
      setError('Team ID not found');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f0f7f4' }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: '360px',
          borderRadius: '15px',
          backgroundColor: '#ffffff',
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-3">
            <label htmlFor="teamId" className="form-label fw-medium">
              Team ID
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="teamId"
              placeholder="Enter Team ID"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{backgroundColor:'#a3e4d7'}} className="btn w-100 fw-semibold">
            Login
          </button>
        </form>
        {error && (
          <div className="alert alert-danger mt-3 text-center py-2" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
