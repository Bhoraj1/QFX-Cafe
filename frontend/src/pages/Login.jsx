import { useState } from "react";
import cup from "../assets/images/cup.jpg";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  singInFailure,
} from "../redux/user/userSlice";
export default function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(singInFailure("All fileds are required"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(singInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(singInFailure(error.message));
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat w-full bg-cover bg-right-bottom sm:bg-bottom"
      style={{ backgroundImage: `url(${cup})` }}
    >
      <div className="flex flex-col mx-auto m-5 max-w-md sm:w-full p-7 rounded-xl sm:p-10 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 ">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm text-gray-400 dark:text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="cafe@.com"
                className="w-full px-3 py-2 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline text-gray-400 dark:text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50"
              >
                Sign in
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-400 dark:text-gray-600">
              Do not have an account yet?
              <a
                rel="noopener noreferrer"
                href="/signup"
                className="hover:underline text-violet-400 dark:text-violet-600"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
        {error && (
          <Alert
            className="mt-3 items-center  text-md text-red-600"
            color="failure"
          >
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}
