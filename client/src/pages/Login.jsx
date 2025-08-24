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
import { Mail, Lock } from "lucide-react";
import { validateLoginForm } from "../util/Validate.js";

const Login = () => {
    useEffect(()=>{
      document.title = "Login"
    })
  const { backendUrl, login } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const onLogin = async () => {
    const errorMessage = validateLoginForm(form);
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/auth/login`, form, {
        withCredentials: true,
      });

      login();
      toast.success(data.message || "Logged in successfully!");
      navigate("/leads");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl backdrop-blur-lg bg-white/70 border border-purple-100">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </CardTitle>
          <CardDescription className="text-gray-600">
            Login to continue managing your leads
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
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
            onClick={onLogin}
            className="w-full bg-[#8E24AA] hover:bg-[#7B1FA2] text-white transition-all shadow-md"
          >
            Login
          </Button>
          <p className="text-sm text-gray-600 text-center">
            New here?{" "}
            <Link
              to="/register"
              className="text-[#8E24AA] font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
