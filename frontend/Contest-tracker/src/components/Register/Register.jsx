import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';

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
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login'); // Redirect to login after successful registration
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
    <Form
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
