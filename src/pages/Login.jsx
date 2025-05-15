import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { login, loading, error } = useContext(AuthContext); // Use error from AuthContext
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLocalError(null); // Clear client-side errors

    // Client-side validation
    if (!email || !password) {
      setLocalError("Email and password are required.");
      return;
    }

    try {
      await login(email, password);
      navigate("/admin/cars/longueduree");
    } catch (err) {
      console.error("Login failed:", err);
      setLocalError("Invalid email or password.");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        {localError && <div className='text-red-500 mb-4'>{localError}</div>}
        {error && <div className='text-red-500 mb-4'>{error.message}</div>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border border-gray-300 rounded-md py-2 px-4'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 mb-2' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full border border-gray-300 rounded-md py-2 px-4'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-darkBlue text-white py-2 px-4 rounded-md hover:bg-darkBlue-light'
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
