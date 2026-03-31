import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import axios from '../utils/axiosConfig.js';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/v1/users/register', formData);
      if (response.data.success || response.status === 201) {
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      isRegister={true}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onToggleMode={() => navigate('/login')}
      onForgotPassword={() => {}}
      error={error}
      loading={loading}
    />
  );
}

export default Register;
