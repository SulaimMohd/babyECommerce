import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authService from "../../appwrite/authConf";
import { logIn } from "../../store/authSlice";

const LogIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isTryingToLogIn, setIsTryingToLogIn] = useState(false)
  const [isWrongPasswordOrEmail, setIsWrongPasswordOrEmail] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsTryingToLogIn(true)
      try {
        const userData = await authService.login(values);
        dispatch(logIn(userData));
        setIsTryingToLogIn(false);
        if (userData.userId === '66573f820008cbfb24cd') {
          navigate('/admin/addProduct')
        } else {
          navigate(`/auth/${userData.userId}/home`)
        }
      } catch (err) {
        setIsTryingToLogIn(false);
        setIsWrongPasswordOrEmail(true);
        console.error(err);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log In
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${isWrongPasswordOrEmail && 'border-red-500'}`}
                placeholder={isWrongPasswordOrEmail ? "Enter valid email" : "Email address"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="mt-2 text-sm text-red-500">{formik.errors.email}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${isWrongPasswordOrEmail && 'border-red-500'}`}
                placeholder={isWrongPasswordOrEmail ? "Invalid password" : "Password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              Don't have an Account ? <span> </span>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-black hover:text-gray-500 font-semibold"
              >
                Sign up
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border-2 border-black text-sm font-medium rounded-md text-white bg-black  hover:bg-white hover:text-black hover:border-black hover:font-semibold transition duration-100 ease-in-out"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Checking' : 'Log In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

