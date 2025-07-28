import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-bg">
      <style>
        {`
          .register-bg {
            min-height: 100vh;
            background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .register-container {
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
          .register-container h2 {
            margin-bottom: 1.5rem;
            color: #6a11cb;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .register-container input {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border 0.2s;
          }
          .register-container input:focus {
            border-color: #6a11cb;
            outline: none;
          }
          .register-container button[type="submit"] {
            width: 100%;
            padding: 0.75rem;
            background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            margin-bottom: 1rem;
          }
          .register-container button[type="submit"]:hover {
            background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
          }
          .register-container p {
            margin: 0.5rem 0 0.5rem 0;
            color: #444;
            font-size: 0.98rem;
          }
          .register-container .login-btn {
            background: none;
            border: 2px solid #6a11cb;
            color: #6a11cb;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
          }
          .register-container .login-btn:hover {
            background: #6a11cb;
            color: #fff;
          }
        `}
      </style>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            autoComplete="name"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account?</p>
        <button className="login-btn" onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    </div>
  );
};
export default Register;