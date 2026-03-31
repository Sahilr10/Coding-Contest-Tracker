import { useEffect, useState } from "react";
import ContestContext from "./ContestContext";
import { getApiBaseURL } from "../utils/axiosConfig.js";

const ContestContextProvider = ({ children }) => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const apiUrl = getApiBaseURL();
        const res = await fetch(`${apiUrl}/contests/all`, {
          credentials: 'include'
        });

        if (!res.ok) throw new Error("Failed to fetch contests");

        const json = await res.json();
        setContests(json.data.contests);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return (
    <ContestContext.Provider
      value={{
        contests,
        loading,
        error,
        setContests,
      }}
    >
      {children}
    </ContestContext.Provider>
  );
};

export default ContestContextProvider;
