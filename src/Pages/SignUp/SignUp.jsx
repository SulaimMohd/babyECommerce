import React, { useState } from "react";
import authService from "../../appwrite/authConf";
import { logIn } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTryingToSignUp, setIsTryingToSignUp] = useState(false);
  const [isSignUpError, setIsSignUpError] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 6 characters'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsTryingToSignUp(true);
      try {
        const userData = await authService.createAccount(values);
        dispatch(logIn(userData));
        setIsTryingToSignUp(false);
        navigate(`/auth/${userData.userId}/home`);
      } catch (err) {
        setIsTryingToSignUp(false);
        setIsSignUpError(true);
        console.error(err);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up!
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${isSignUpError && 'border-red-500'}`}
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="mt-2 text-sm text-red-500">{formik.errors.name}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${isSignUpError && 'border-red-500'}`}
                placeholder="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
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
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${isSignUpError && 'border-red-500'}`}
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border-2 border-white text-sm font-medium rounded-md text-white bg-black  hover:bg-white hover:text-black
              hover:border-black hover:font-semibold transition duration-100 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 `}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Signing up' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
