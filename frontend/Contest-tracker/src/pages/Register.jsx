import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import { getApiBaseURL } from '../utils/axiosConfig.js';

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
      const apiUrl = getApiBaseURL();
      const registerUrl = `${apiUrl}/users/register`;
      const response = await fetch(registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response);

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
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
