import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);

      // ✅ Redirect to the student management page after successful login
      navigate('/students');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-bg">
      <style>
        {`
          .login-bg {
            min-height: 100vh;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .login-container {
            background: #fff;
            padding: 2.5rem 2rem;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(44, 62, 80, 0.2);
            width: 350px;
            animation: fadeIn 1s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .login-container h2 {
            margin-bottom: 1.5rem;
            color: #2575fc;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .login-container input {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border 0.2s;
          }
          .login-container input:focus {
            border-color: #2575fc;
            outline: none;
          }
          .login-container button[type="submit"] {
            width: 100%;
            padding: 0.75rem;
            background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            margin-bottom: 1rem;
          }
          .login-container button[type="submit"]:hover {
            background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
          }
          .login-container p {
            margin: 0.5rem 0 0.5rem 0;
            color: #444;
            font-size: 0.98rem;
          }
          .login-container .register-btn {
            background: none;
            border: 2px solid #2575fc;
            color: #2575fc;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
          }
          .login-container .register-btn:hover {
            background: #2575fc;
            color: #fff;
          }
        `}
      </style>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account?</p>
        <button className="register-btn" onClick={() => navigate('/AddStudentForm')}>Go to Register</button>
      </div>
    </div>
  );
};

export default Login;