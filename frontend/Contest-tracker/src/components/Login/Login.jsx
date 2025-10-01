import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';

function Login() {
  const [formData, setFormData] = useState({
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
      const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens if needed
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        navigate('/profile'); // Redirect to profile or home
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      isRegister={false}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onToggleMode={() => navigate('/register')}
      onForgotPassword={() => {}}
      error={error}
      loading={loading}
    />
  );
}

export default Login;
