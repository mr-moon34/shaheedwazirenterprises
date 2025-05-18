import { useState, useRef, useEffect } from 'react';
import { 
  FiHome, 
  FiPieChart, 
  FiUsers, 
  FiSettings, 
  FiMail, 
  FiCalendar,
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiSearch
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo-removebg-preview.png';

const SidebarWithNavbar = ({children}) => {
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));
   // converts JSON string to object
 


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      name: 'Home',
      icon: <FiHome className="text-lg" />,
      link: 'dashboard'
    },
    
    {
      name: 'Customer Managment',
      icon: <FiUsers className="text-lg" />,
      // link: '#',
      submenu: [
        { name: 'All Customer', link: 'CustomerManagement' },

        { name: 'Add Customer', link: 'AddCustomer' },
       
      
      ]
    },
   
    {
      name: 'Transaction',
      icon: <FiUsers className="text-lg" />,
      link: 'TransactionManagement',
      // submenu: [
      //   { name: 'All Users', link: 'All-Users' },
      //   { name: 'Pending Users', link: 'LoginApprove' }
      // ]
    },
  
    {
      name: 'TransactionTrash',
      icon: <FiMail className="text-lg" />,
      link: 'TransactionTrash'
    },
    {
      name: 'Users',
      icon: <FiSettings className="text-lg" />,
      // link: '#',
      submenu: [
        { name: 'All Users', link: 'Userdashboard' },

        { name: 'Add User', link: 'AddUser' },
       
      
      ]
    },
   
    {
      name: 'Settings',
      icon: <FiSettings className="text-lg" />,
      link: '#',
      submenu: [
        { name: 'Profile', link: 'Profile' },
       
      
      ]
    }
  ];

  const usermenuItems = [
    {
      name: 'Dashboard',
      icon: <FiHome className="text-lg" />,
      link: 'CustomerManagement'
    },
    {
      name: 'Customer Managment',
      icon: <FiUsers className="text-lg" />,
      link: '#',
      submenu: [
        { name: 'All Customer', link: 'CustomerManagement' },

        { name: 'Add Customer', link: 'AddCustomer' },
       
      
      ]
    },
    {
      name: 'Transaction',
      icon: <FiUsers className="text-lg" />,
      link: 'TransactionManagement',
      // submenu: [
      //   { name: 'All Users', link: 'All-Users' },
      //   { name: 'Pending Users', link: 'LoginApprove' }
      // ]
    },
    {
      name: 'Settings',
      icon: <FiSettings className="text-lg" />,
      link: '#',
      submenu: [
        { name: 'Profile', link: 'Profile' },
       
      
      ]
    }
    
   
   
  ];

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-white shadow-xs h-16 flex items-center px-4">
        {/* Mobile menu button */}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-black bg-gray-50 shadow-2xl lg:hidden mr-2"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo/Brand */}
        <div className="flex   max-sm:w-full "
        onClick={()=>{
          navigate('/')
        }}>
          <img 
          
          src={logo}
          alt="MUET Logo"
          className="w-30 h-24 object-contain  drop-shadow-2xs drop-shadow-white rounded-full"
        />
           
          {/* <motion.div 
            // whileHover={{ scale: 1.05 }}
            className="text-lg flex justify-center items-center  max-md:hidden font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent"
          >
            
            
            Shaheed Wazir Enterprises
          </motion.div> */}
        </div>

        {/* Search Bar - Desktop */}
        {/* <div className="hidden lg:flex mx-4 flex-1 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#112240] border border-[#233554] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div> */}

        {/* Profile Dropdown */}
        <div className="ml-auto  flex items-center" ref={profileRef}>
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center focus:outline-none"
          >
            <div className="relative">
            <img
                      src={user?.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.username) + "&background=random"}
                      alt="Profile"
                      className="size-10 rounded-full flex items-center justify-center"
                    />
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-[#0A192F]"></div>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-sm font-bold text-blue-600"> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
            <FiChevronDown className={`hidden lg:block transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-4 top-20 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-gray-200 focus:outline-none z-50"
                      >
                        <div className="py-1">
                          <a
                            onClick={() => {
                              navigate('/Profile');
                              setProfileDropdownOpen(false);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FiUser className="mr-3" />
                            View Profile
                          </a>
                          <a
                            onClick={() => {
                              user?.role === 'admin' ? navigate('/Dashboard') : navigate('/UserDashboard');
                              setProfileDropdownOpen(false);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FiSettings className="mr-3" />
                            Dashboard
                          </a>
                          <div className="border-t border-gray-200"></div>
                          <a
                            onClick={() => {
                              localStorage.clear();
                              navigate('/');
                              window.location.reload();
                            }}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <FiLogOut className="mr-3" />
                            Logout
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
        </div>
      </nav>

      {/* Mobile Search - appears below navbar when needed */}
      {/* <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-[#0A192F] px-4 py-2 shadow-md">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#112240] border border-[#233554] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div> */}

      {/* Desktop Sidebar - starts below navbar */}
      <motion.div
        initial={{ width: "16rem" }}
        animate={{ width: isOpen ? "16rem" : "5rem" }}
        className="hidden lg:block fixed top-16 left-0 bottom-0 overflow-hidden z-40  bg-white  text-black shadow-xs"
      >
        <div className="flex flex-col h-full w-full">
          {/* Collapse button */}
          <div className="flex justify-end p-3 ">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-full mt-2  hover:bg-blue-300 transition-colors"
            >
              {isOpen ? (
                <FiChevronDown className="text-black transform rotate-90" />
              ) : (
                <FiChevronRight className="text-black transform rotate-90" />
              )}
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex-1  overflow-y-auto">
            {user?.role==='admin'&&
            <ul className="space-y-1 px-3 py-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <div className="relative">
                    <a
                      // onClick={()=>}
                      onClick={(e) => {
                        if (item.submenu) {
                          e.preventDefault();
                          toggleDropdown(index);
                        }else{
                        navigate(`/${item.link}`)}
                      }}
                      className={`flex items-center justify-between p-3 rounded-lg hover:bg-blue-200 transition-colors ${activeDropdown === index ? 'bg-blue-100' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span>{item.icon}</span>
                        {isOpen && <span className="font-medium">{item.name}</span>}
                      </div>
                      {item.submenu && isOpen && (
                        <span>
                          {activeDropdown === index ? (
                            <FiChevronDown className="text-sm" />
                          ) : (
                            <FiChevronRight className="text-sm" />
                          )}
                        </span>
                      )}
                    </a>

                    {item.submenu && activeDropdown === index && isOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="ml-8 overflow-hidden"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a
                              // href={subItem.link}
                              className="block p-2 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                              onClick={()=>{
                                
                                navigate(`/${subItem.link}`)}
                            }
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>}
            {user?.role==='user'&&
            <ul className="space-y-1 px-3 py-2">
              {usermenuItems.map((item, index) => (
                <li key={index}>
                  <div className="relative">
                    <a
                      // href={item.link}
                      onClick={(e) => {
                        if (item.submenu) {
                          e.preventDefault();
                          toggleDropdown(index);
                        }
                        else{
                        navigate(`/${item.link}`)}
                      }}
                      className={`flex items-center justify-between p-3 rounded-lg hover:bg-blue-200 transition-colors ${activeDropdown === index ? 'bg-blue-200' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span>{item.icon}</span>
                        {isOpen && <span className="font-medium">{item.name}</span>}
                      </div>
                      {item.submenu && isOpen && (
                        <span>
                          {activeDropdown === index ? (
                            <FiChevronDown className="text-sm" />
                          ) : (
                            <FiChevronRight className="text-sm" />
                          )}
                        </span>
                      )}
                    </a>

                    {item.submenu && activeDropdown === index && isOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="ml-8 overflow-hidden"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a
                              // href={subItem.link}
                              onClick={()=>{
                                
                                  navigate(`/${subItem.link}`)}
                              }
                              className="block p-2 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-[#112240]">
            {isOpen ? (
              <div className="flex items-center space-x-3">
                  <img
                      src={user?.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.username) + "&background=random"}
                      alt="Profile"
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
                    />
                <div>
                  <p className="font-medium">{user?.username}</p>
                  <p className="text-sm font-bold text-blue-600"> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                 <img
                      src={user?.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.username) + "&background=random"}
                      alt="Profile"
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
                    />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0  bg-opacity-15 z-30 lg:hidden"
              style={{ top: '4rem' }}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-16 left-0 bottom-0 w-64 z-40 bg-white text-black shadow-xl lg:hidden"
            >
              <div className="flex flex-col h-full">
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                  {user?.role==='admin'&&
                  <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <div className="relative">
                          <a
                            // href={item.link}
                            onClick={(e) => {
                              if (item.submenu) {
                                e.preventDefault();
                                toggleDropdown(index);
                              }
                              else{
                                
                                
                                  navigate(`/${item.link}`)
                             
                              }
                            }}
                            className={`flex items-center justify-between p-3 rounded-lg hover:bg-blue-200 transition-colors ${activeDropdown === index ? 'bg-blue-100' : ''}`}
                          >
                            <div className="flex items-center space-x-3">
                              <span>{item.icon}</span>
                              <span className="font-medium">{item.name}</span>
                            </div>
                            {item.submenu && (
                              <span>
                                {activeDropdown === index ? (
                                  <FiChevronDown className="text-sm" />
                                ) : (
                                  <FiChevronRight className="text-sm" />
                                )}
                              </span>
                            )}
                          </a>

                          {item.submenu && activeDropdown === index && (
                            <ul className="ml-8 mt-1 space-y-1">
                              {item.submenu.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <a
                                    // href={subItem.link}
                                   

                                        onClick={(e) => {
                            
                                    navigate(`/${subItem.link}`)

                              
                                    }}

                                    className="block p-2 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                                  >
                                    {subItem.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>}

                  {user?.role==='user'&&
                  <ul className="space-y-2">
                    {usermenuItems.map((item, index) => (
                      <li key={index}>
                        <div className="relative">
                          <a
                            // href={item.link}d
                            onClick={(e) => {
                              if (item.submenu) {
                                e.preventDefault();
                                toggleDropdown(index);
                              }
                              else{
                                
                                
                                navigate(`/${item.link}`)
                           
                            }
                            }}
                            className={`flex items-center justify-between p-3 rounded-lg hover:bg-blue-200 transition-colors ${activeDropdown === index ? 'bg-blue-100' : ''}`}
                          >
                            <div className="flex items-center space-x-3">
                              <span>{item.icon}</span>
                              <span className="font-medium">{item.name}</span>
                            </div>
                            {item.submenu && (
                              <span>
                                {activeDropdown === index ? (
                                  <FiChevronDown className="text-sm" />
                                ) : (
                                  <FiChevronRight className="text-sm" />
                                )}
                              </span>
                            )}
                          </a>

                            {item.submenu && activeDropdown === index && (
                              <ul className="ml-8 mt-1 space-y-1">
                                {item.submenu.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <a
                                      // href={subItem.link}
                                      className="block p-2 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                                    onclick={()=>{
                                      navigate(`/${subItem.link}`)

                                    }}
                                  
                                  
                                      
                                  
                                    
                                    >
                                      {subItem.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>
                      </li>
                    ))}
                  </ul>}
                </nav>

                <div className="p-4 border-t border-[#112240]">
                  <div className="flex items-center space-x-3">
                  <img
                      src={user?.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.username) + "&background=random"}
                      alt="Profile"
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
                    />
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm font-bold text-blue-600"> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div 
        className={`transition-all duration-300 min-h-screen ${isOpen ? 'lg:pl-64' : 'lg:pl-20'}`}
        style={{ }} /* Compensate for navbar + mobile search height */
      >
        {
          children
        }
      </div>
    </div>
  );
};

export default SidebarWithNavbar;