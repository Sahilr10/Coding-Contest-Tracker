import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { X } from "lucide-react";
import UserDetails from "../components/UserDetails";
import Loader from "../components/Loader.jsx";
import axios from "axios";
import ProfileTabs from "../components/ProfileTabs.jsx";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "/api/v1";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/users/me");
        setUser(response.data.data); //  user stored here
      } catch (err) {
        setError("User not logged in");
      } finally {
        setLoading(false); //  important
      }
    };

    fetchUser();
  }, []);

  // Guard rendering
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="max-w-[80vw] mx-auto min-h-screen no-scrollbar">
      <div className="flex justify-between text-3xl text-white mb-5 pt-8">
        Profile
        <button
          className="hover:bg-white/20 p-2 rounded-full transition"
          onClick={() => navigate(-1)}
        >
          <X />
        </button>
      </div>
      <div>
      <UserDetails user={user} />
      </div>

      <div className="my-5  ">
        <ProfileTabs user={user} />
      </div>

      

    </div>
  );
}

export default Profile;
