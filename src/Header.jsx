import React from 'react';
import logo from './Assets/logo.png'
import authService from './appwrite/authConf';
import { logOut } from './store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useParams()
  const handleClick = async()=>{
    try{
        await authService.logout().then(()=> dispatch(logOut()))
        navigate('/login')
    }catch(err) {
        console.log(err)
    }
}
  return (
    <header className="bg-black text-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <span className="font-semibold text-lg">CuddleCubs</span>
        </div>

        {/* Navigation */}
        <nav className="flex-grow flex items-center justify-center md:justify-center">
          <ul className="flex space-x-6">
            <NavLink to={`/auth/${user}/home`}
                      className={({isActive})=> isActive ? "text-yellow-300":"text-white"}>
                <h3>
                  Home
                </h3>
            </NavLink>
            
            <NavLink 
                    to={`/auth/${user}/Products`}
                    className={({isActive})=> isActive ? "text-yellow-300":"text-white"}
                    >
                <h3>
                  Products
                </h3>
            </NavLink>
            <NavLink to={`/auth/${user}/cart`}
                    className={({isActive})=> isActive ? "text-yellow-300":"text-white"}>
                <h3>
                  Cart
                </h3>
            </NavLink>
          </ul>
        </nav>

        {/* Logout */}
        <div className="hidden md:block">
          <button 
                className="px-4 py-2 bg-white text-black font-semibold hover:bg-black hover:text-white border border-black transition duration-100 ease-in-out hover:border-white rounded-md focus:outline-none"
                onClick={()=> handleClick()}
                >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
