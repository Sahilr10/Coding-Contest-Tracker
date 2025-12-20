import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/v1/users/me', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        } else {
          setError('User not logged in');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/login');
      } else {
        setError('Logout failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!user) {
    return <div className="p-4">Loading user data...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-2">
        <span className="font-semibold">Username:</span> {user.username}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Email:</span> {user.email}
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
