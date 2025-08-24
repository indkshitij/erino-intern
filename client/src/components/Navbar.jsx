import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, LogOut, UserPlus, LogIn } from "lucide-react";
import AppContext from "../AppContext/AppContext";
import axios from "axios";

const Navbar = () => {
  const { isLoggedIn, logout, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full bg-white px-7 shadow-sm py-2 flex justify-between items-center">
      <Link to="/" className="text-3xl  font-semibold text-purple-800 flex gap-1 items-center">
        <img src="logo.png" className="w-10 h-auto" alt="logo" />
        erino
      </Link>

      {/* normal */}
      <div className="hidden md:flex gap-2 text-base font-medium items-center">
        {isLoggedIn ? (
          <>
            <div className="md:flex gap-5 text-base font-medium items-center ">
              <Link
                to="/leads"
                className="cursor-pointer text-purple-600 hover:text-purple-800"
              >
                Leads
              </Link>
              <Link
                to="/leads/new"
                className="cursor-pointer text-purple-600 hover:text-purple-800"
              >
                New Lead
              </Link>
              <Button
                size="sm"
                onClick={handleLogout}
                className="cursor-pointer flex items-center gap-1 bg-red-500 text-white hover:bg-red-600"
              >
                <LogOut size={16} /> Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="outline"
                className="cursor-pointer flex items-center gap-1 border-purple-600 text-purple-600 hover:text-purple-600 hover:bg-purple-100"
              >
                <LogIn size={16} /> Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="default"
                className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer flex items-center gap-1"
              >
                <UserPlus size={16} /> Register
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="text-xl leading-5 tracking-wide font-semibold text-purple-600">
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 pl-4">
              {isLoggedIn ? (
                <>
                  <SheetClose asChild>
                    <Link to="/leads">Leads</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/leads/new">New Lead</Link>
                  </SheetClose>
                  <Button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-400 text-white w-min"
                  >
                    <LogOut size={16} /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn size={16} /> Login
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/register" className="flex items-center gap-2">
                      <UserPlus size={16} /> Register
                    </Link>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
