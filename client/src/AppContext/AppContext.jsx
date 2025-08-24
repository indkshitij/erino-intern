import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    status: "",
    source: "",
    qualified: "",
    searchEmail: "",
    searchCompany: "",
    searchCity: "",
    scoreMin: "",
    scoreMax: "",
    valueMin: "",
    valueMax: "",
    lastAfter: "",
    lastBefore: "",
  });

  const resetFilters = () => {
    setFilters({
      status: "",
      source: "",
      qualified: "",
      searchEmail: "",
      searchCompany: "",
      searchCity: "",
      scoreMin: "",
      scoreMax: "",
      valueMin: "",
      valueMax: "",
      lastAfter: "",
      lastBefore: "",
    });
    setPage(1);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${backendUrl}/auth/check`, { withCredentials: true });
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [backendUrl]);

  const login = () => setIsLoggedIn(true);

  const logout = async () => {
    try {
      await axios.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isLoggedIn,
        login,
        logout,
        loading,
        page,
        setPage,
        limit,
        setLimit,
        totalPages,
        setTotalPages,
        total,
        setTotal,
        filters,
        setFilters,
        resetFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
