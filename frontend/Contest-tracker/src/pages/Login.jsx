import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import LoginForm from '../components/LoginForm.jsx'; 
import { getApiBaseURL } from '../utils/axiosConfig.js';

function Login() { 
  const [formData, setFormData] = useState({ email: '', password: '' }); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }; 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError(''); 
    setLoading(true); 
    try { 
      const apiUrl = getApiBaseURL();
      const loginUrl = `${apiUrl}/users/login`;
      const response = await fetch(loginUrl, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(formData), 
        credentials: 'include' 
      }); 
      const data = await response.json(); 
      if (response.ok) { 
        navigate('/profile'); 
      } else { 
        setError(data.message || 'Login failed');
      } 
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Network error. Please try again.');
    } finally { 
      setLoading(false); 
    } 
  }; 
      
      return ( 
      <LoginForm isRegister={false} 
      formData={formData} handleChange={handleChange} 
      handleSubmit={handleSubmit} 
      onToggleMode={() => navigate('/register')} 
      onForgotPassword={() => {}} 
      error={error} 
      loading={loading} /> ); }

export default Login;
