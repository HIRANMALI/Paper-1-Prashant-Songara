import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../context/authContext";

const schema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        "Enter a valid email"
      )
      .required("Email is required"),

    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .required("Password is required")
})

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)

 const handleLogin = async (formData) => {
    await login(formData)
 }

  return (
    <div className="h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4 w-80 border border-black rounded-lg p-6">

        <h2 className="text-xl font-semibold text-center">Login Form</h2>

        <div>
            <label htmlFor="email">Email</label>
            <input
            {...register("email")}
            type="email"
            placeholder="Email"
            id="email"
            className="border p-1 w-full"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
            <label htmlFor="password">Password</label>
            <input
            {...register("password")}
            type="password"
            placeholder="Password"
            id="password"
            className="border p-1 w-full"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-1 rounded">
            Login
        </button>

        <p className="text-center">
            Don't have an account?{" "}
            <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
            >
            Signup
            </span>
        </p>
        </form>
    </div>
  );
};

export default Login;
