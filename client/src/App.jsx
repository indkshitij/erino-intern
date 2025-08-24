import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leads from "./pages/Leads";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import NewLead from "./pages/NewLead";
import { useContext } from "react";
import AppContext from "./AppContext/AppContext";

function App() {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <>
      <Navbar />
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/leads" />} />

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />

        <Route
          path="/leads"
          element={isLoggedIn ? <Leads /> : <Navigate to="/login" />}
        />
        <Route
          path="/leads/new"
          element={isLoggedIn ? <NewLead mode="create" /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/leads/:id/edit"
          element={isLoggedIn ? <NewLead mode="edit" /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
