import React, { useEffect, useState } from "react";
import { useSignInUserMutation } from "../api/authApi";
import { useDispatch } from "react-redux";
import { signIn } from "../slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInUserWithApi, { data, isSuccess }] = useSignInUserMutation();

  const userData = { email, password };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUserWithApi(userData);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(signIn(data));
      navigate("/");
    }
  }, [isSuccess, data, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600 mb-8 block text-center hover:text-blue-800 transition-colors"
        >
          Our Products
        </Link>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-12"
            />
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-12"
            />
            <FaLock className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
