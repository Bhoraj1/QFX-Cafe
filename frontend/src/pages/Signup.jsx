import { useState } from "react";
import cup from "../assets/images/cup.jpg";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";
export default function Signup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return console.log("All fileds are required");
    }
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat w-full bg-cover bg-right-bottom sm:bg-bottom"
      style={{ backgroundImage: `url(${cup})` }}
    >
      <div className="w-full max-w-md mx-auto m-8 p-7 space-y-3 rounded-xl bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label
              htmlFor="username"
              className="block text-gray-400 dark:text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="w-full px-3 py-3 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="cafe@.com"
              className="w-full px-3 py-3 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="password"
              className="block text-gray-400 dark:text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-3 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800"
              onChange={handleInputChange}
            />
            <div className="flex justify-end text-xs text-gray-400 dark:text-gray-600">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm text-gray-900 dark:text-gray-50 bg-violet-400 dark:bg-violet-600"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700 dark:bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400 dark:text-gray-600">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700 dark:bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button aria-label="Log in with Google" className="p-3 rounded-sm">
            <FaGoogle className="w-5 h-5" />
          </button>
          <button aria-label="Log in with Twitter" className="p-3 rounded-sm">
            <FaTwitter className="w-5 h-5" />
          </button>
          <button aria-label="Log in with GitHub" className="p-3 rounded-sm">
            <FaGithub className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-center sm:px-6 text-gray-400 dark:text-gray-600 ">
          Already have an account?
          <a
            rel="noopener noreferrer"
            href="/login"
            className="underline text-gray-100 dark:text-gray-800"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
