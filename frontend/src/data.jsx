import { useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const Data = ({ email, setUser, setLoading }) => {
  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/${email}`);
        const data = await response.json();
        console.log("Fetched data:", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return null; // no UI here, only data fetching
};

export default Data;
