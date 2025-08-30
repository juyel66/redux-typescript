import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { registerUser } from "../features/authSlice";
import { Link, useNavigate } from "react-router";


const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
    setIsLoading(true)
    try {
      await dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      alert("Registration Successful!");
      navigate("/"); // home page
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="bg-gray-800 flex items-center justify-center min-h-screen w-full p-4">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Register Now!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
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
                className="bg-purple-600 cursor-pointer text-white font-bold py-2 px-4 rounded w-full hover:bg-purple-700 focus:outline-none focus:shadow-outline"
              >
                {isLoading ?
                <p>Registering...</p> : <p>Register</p>}
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-800">Please Login</Link>
          </div>
        </div>
        <div className="hidden md:flex md:w-1/2 bg-purple-600 text-white p-8 items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
            <p className="text-xl mb-6">Create your account</p>
            <p className="text-sm leading-relaxed">
              Register now to start your journey. Enter your details and join the community today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
