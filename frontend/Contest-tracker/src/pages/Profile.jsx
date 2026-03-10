import { useEffect, useState } from "react";
import { useDemo } from "../context/DemoContext";
import { demoUser } from "../Demo/demoData";
import ProfileTabs from "../components/ProfileTabs";
import Loader from "../components/Loader";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { isDemo } = useDemo();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo) {
      console.log("🔥 DEMO MODE ACTIVE – using demo user");
      setUser(demoUser);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/users/me", {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("User fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isDemo]);

  if (loading) return <Loader />;

  if (!user && !isDemo) return <Navigate to="/login" />;

  return (
    <div className="max-w-[80vw] mx-auto min-h-screen">
      <ProfileTabs user={user} />
    </div>
  );
};

export default Profile;
