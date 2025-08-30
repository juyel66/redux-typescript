import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";
import { Link, useNavigate } from "react-router";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      alert("Login Successful!");
      navigate("/"); // home page
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="bg-gray-800 flex items-center justify-center min-h-screen w-full p-4">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login Now!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="bg-purple-600 text-white font-bold py-2 px-4 rounded w-full hover:bg-purple-700 focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-800">Please Register</Link>
          </div>
        </div>
        <div className="hidden md:flex md:w-1/2 bg-purple-600 text-white p-8 items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-xl mb-6">Login to your account</p>
            <p className="text-sm leading-relaxed">
              Enter your credentials to access your account. If you don't have an account yet, you can register and join the community today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
