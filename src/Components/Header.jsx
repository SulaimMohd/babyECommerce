import React,{useEffect, useState} from 'react';
import logo from '../Assets/logo.png'
import authService from '../appwrite/authConf';
import { logOut } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authData = useSelector(state => state)
  console.log('This is the state from the header')
  const user = authData.auth.userData.userId
  // const { user } = useParams()
  const [isSmallScreen, setIsSmallScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(!window.innerWidth < 768); // Adjust the threshold according to your needs
    };

    // Initial check
    checkScreenSize();

    // Event listener for screen size changes
    window.addEventListener('resize', checkScreenSize);

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  const handleClick = async()=>{
    try{
        await authService.logout().then(()=> dispatch(logOut()))
        navigate('/login')
    }catch(err) {
        console.log(err)
    }
}
  return (
    <header className="bg-black text-white shadow-lg sticky top-0 z-10 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between ">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2 " />
          <span className="font-semibold text-lg">CuddleCubs</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex items-center justify-center md:justify-center">
              <ul className="flex">
                <li className={`md:hidden relative ${!isSmallScreen && 'w-0'}`}>
                  <select
                    onChange={(e) => {
                      const url = e.target.value;
                      navigate(url)
                    }}
                    className="block appearance-none bg-transparent border border-white text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-white focus:bg-transparent"
                  >
                    <option value={`/auth/${user}/home`}>Home</option>
                    <option value={`/auth/${user}/products`}>Products</option>
                    <option value={`/auth/${user}/cart`}>Cart</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                    </svg>
                  </div>
                </li>
                  {isSmallScreen && <li className={`${isSmallScreen ?  'flex gap-10 w-0 text-xl': 'flex'}`}>
                      <NavLink
                      to={`/auth/${user}/home`}
                      className={({ isActive }) =>
                        isActive ? "text-yellow-300 " : "text-white"
                      }
                    >
                      <h3 className="hidden md:block">Home</h3>
                    </NavLink>

                    <NavLink
                      to={`/auth/${user}/products`}
                      className={({ isActive }) =>
                        isActive ? "text-yellow-300" : "text-white "
                      }
                    >
                      <h3 className="hidden md:block">Products</h3>
                    </NavLink>

                    <NavLink
                      to={`/auth/${user}/cart`}
                      className={({ isActive }) =>
                        isActive ? "text-yellow-300" : "text-white"
                      }
                    >
                      <h3 className="hidden md:block">Cart</h3>
                    </NavLink>
                    
                    
                    </li>
                  
                  }

                   
              </ul>
        </nav>

        {/* Logout */}
        <div className="1">
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
  // return (
  //   <header className="bg-black text-white shadow-lg sticky top-0 z-10">
  //     <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
  //       {/* Logo */}
  //       <div className="flex items-center">
  //         <img src={logo} alt="Logo" className="h-8 sm:h-4 mr-2" />
  //         <span className="font-semibold text-lg sm:text-sm">CuddleCubs</span>
  //       </div>

  //       {/* Navigation */}
  //       <nav className="flex-grow flex items-center justify-center md:justify-center text-lg ">
  //         <ul className="flex space-x-6">
  //           <NavLink
  //             to={`/auth/${user}/home`}
  //             className={({ isActive }) => (isActive ? 'text-yellow-300' : 'text-white')}
  //           >
  //             <h3 className="">Home</h3>
  //           </NavLink>

  //           <NavLink
  //             to={`/auth/${user}/products`}
  //             className={({ isActive }) => (isActive ? 'text-yellow-300' : 'text-white')}
  //           >
  //             <h3 className="sm:text-sm">Products</h3>
  //           </NavLink>
  //           <NavLink
  //             to={`/auth/${user}/cart`}
  //             className={({ isActive }) => (isActive ? 'text-yellow-300' : 'text-white')}
  //           >
  //             <h3 className="sm:text-sm">Cart</h3>
  //           </NavLink>
  //         </ul>
  //       </nav>

  //       {/* Logout */}
  //       <div className="">
  //         <button
  //           className="px-2 py-1 bg-white text-black font-semibold hover:bg-black hover:text-white border border-black transition duration-100 ease-in-out hover:border-white rounded-md focus:outline-none sm:px-4 sm:py-2"
  //           onClick={() => handleClick()}
  //         >
  //           Logout
  //         </button>
  //       </div>
  //     </div>
  //   </header>
  // );
};

export default Header;
