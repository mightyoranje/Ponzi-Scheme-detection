// Login.js
//import  {ReactComponent as YourSvgFile} from './login.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    console.log(username);
    console.log(password);
    e.preventDefault();
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      // Redirect to success page
       window.location.href = data.redirect_url;
      // <Link to={"/success"} />;
    } else {
      // Handle login error
      console.log(data.message);
      setError(data.message);
    }
  };

  return (
   
    <div className="w-full min-h-screen flex justify-center items-center mt-10 ">
     

    <div className="w-1/3">
    <div
      style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Welcome Back
        </h2>
        <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <label className="sr-only" htmlFor="email">Username</label>
              <input
                placeholder="Username"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required=""
                autoComplete="username"
                type="text"
                value={username}
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                placeholder="Password"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required=""
                autoComplete="current-password"
                type="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                type="checkbox"
                name="remember-me"
                id="remember-me"
              />
              <label className="ml-2 block text-sm text-gray-400" htmlFor="remember-me">Remember me</label>
            </div>

            <div className="text-sm">
              <a className="font-medium text-indigo-500 hover:text-indigo-400" href="#">Forgot your password?</a>
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-700 text-center">
        <span className="text-gray-400">Don't have an account?</span>
        <a className="font-medium text-indigo-500 hover:text-indigo-400" href="#">Sign up</a>
      </div>
    </div>
  </div></div>
  );
};

export default Login;
