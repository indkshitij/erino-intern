import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/AppContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { validateRegisterForm } from "../util/Validate.js";

const Register = () => {
    useEffect(()=>{
      document.title = "Register"
    })
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onRegister = async () => {
    const errorMessage = validateRegisterForm(form);
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/auth/register`, form, {
        withCredentials: true,
      });

      toast.success(data.message || "User registered successfully!");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl backdrop-blur-lg bg-white/70 border border-purple-100">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Create Account ✨
          </CardTitle>
          <CardDescription className="text-gray-600">
            Join us and start managing your leads in seconds
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          
          
          <div className="relative">
            <User className="absolute left-3 top-2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Full Name"
              aria-label="Full Name"
              className="pl-10"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
              className="pl-10"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2 text-gray-400 h-5 w-5" />
            <Input
              type="password"
              placeholder="Password"
              aria-label="Password"
              className="pl-10"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={onRegister}
            className="w-full bg-[#8E24AA] hover:bg-[#7B1FA2] text-white transition-all shadow-md"
          >
            Register
          </Button>
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#8E24AA] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
