import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import LoginForm from '../components/LoginForm.jsx';
import axios from '../utils/axiosConfig.js';

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
      const response = await axios.post('/api/v1/users/login', formData);
      if (response.data.success || response.status === 200) { 
        navigate('/profile'); 
      } else { 
        setError(response.data.message || 'Login failed');
      } 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.error('Login error:', err);
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
