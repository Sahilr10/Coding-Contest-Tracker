import { useEffect, useState } from "react";
import ContestContext from "./ContestContext";
import axios from "../utils/axiosConfig.js";

const ContestContextProvider = ({ children }) => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get("/api/v1/contests/all");

        setContests(res.data.data.contests);
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
