// import { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiHome,
//   FiPieChart,
//   FiUsers,
//   FiSettings,
//   FiMail,
//   FiCalendar,
//   FiChevronDown,
//   FiChevronRight,
//   FiMenu,
//   FiX,
//   FiUser,
//   FiLogOut,
//   FiSearch
// } from 'react-icons/fi';

// import logo from '../../assets/logo-removebg-preview.png';
// // import Footer from "./Footer";


// const Navbar = ({children}) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [activeSubDropdown, setActiveSubDropdown] = useState(null);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const profileRef = useRef(null);
//   const navigate=useNavigate()

//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem('user'));
//   // console.log(user)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);


//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleDropdown = (item) => {
//     setActiveDropdown(activeDropdown === item ? null : item);
//     setActiveSubDropdown(null);
//   };

//   const toggleSubDropdown = (item) => {
//     setActiveSubDropdown(activeSubDropdown === item ? null : item);
//   };

//   const closeAll = () => {
//     setIsOpen(false);
//     setActiveDropdown(null);
//     setActiveSubDropdown(null);
//   };

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/aboutus" },

  
//     { name: "Contact", path: "/contactus" }
//   ];

//   const adminnavItems = [





//   ];
//   const InfiniteRotatingLogo = ({ logo }) => {
//     return (
//       <motion.div
//         className="h-16 w-16 md:h-20 md:w-20"
//         animate={{
//           rotate: 360,
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//         whileHover={{
//           scale: 1.1,
//           transition: { duration: 0.2 }
//         }}
//       >
//         <img InfiniteRotatingLogo
//           src={logo}
//           alt="MUET Logo"
//           className="h-full w-full object-contain rounded-full"
//         />
//       </motion.div>
//     );
//   };

//   return (
//     <>
    
//         <nav
//           className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-2 bg-[rgba(0,33,71,0.95)] backdrop-blur-md shadow-lg" : "py-3 bg-[rgba(0,33,71,0.9)]"
//             }`}
//         >
//           <div className="w-full px-4 mx-auto max-w-7xl ">
//             <div className="flex items-center justify-between">
//               {/* Logo */}
//               {/* Logo */}
//               <Link to="/" className="flex items-center space-x-3 group">
//                 <motion.div
//                   animate={{
//                     // rotate: 360,
//                   }}
//                   transition={{
//                     duration: 8,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                   whileHover={{
//                     scale: 1.1,
//                     transition: { duration: 0.2 }
//                   }}
//                   className="h-16 w-16 md:h-20 md:w-20"
//                 >
//                   <img
//                     src={logo}
//                     alt="MUET Logo"
//                     className="h-full w-full object-cover scale-100 rounded-full"
//                   />
//                 </motion.div>
//                 <div className="text-[17px] font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent leading-tight">
//                   <motion.div > Shaheed Wazir</motion.div>
//                   <div className="block text-[14px]">Enterprises</div>
                 
                  
//                 </div>
//               </Link>

//               {/* Desktop Navigation */}
//               <div className="hidden lg:flex ml-7 items-center space-x-1">
//                 {navItems.map((item, index) => (
//                   <div key={index} className="relative">
//                     {item.path ? (
//                       <Link
//                         to={item.path}
//                         className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === item.path
//                             ? "text-white bg-blue-600/20"
//                             : "text-blue-100 hover:text-white hover:bg-blue-500/10"
//                           }`}
//                       >
//                         {item.name}
//                       </Link>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => toggleDropdown(item.name)}
//                           className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-1 transition-colors ${activeDropdown === item.name
//                               ? "text-white bg-blue-600/20"
//                               : "text-blue-100 hover:text-white hover:bg-blue-500/10"
//                             }`}
//                         >
//                           <span>{item.name}</span>
//                           <motion.div
//                             animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <ChevronDown size={16} />
//                           </motion.div>
//                         </button>

//                         <AnimatePresence>
//                           {activeDropdown === item.name && item.subItems && (
//                             <motion.div
//                               initial={{ opacity: 0, y: 10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               exit={{ opacity: 0, y: 10 }}
//                               className="absolute left-0 mt-1 w-56 bg-[#0A192F] rounded-lg shadow-xl border border-blue-500/20 backdrop-blur-md"
//                             >
//                               <ul className="py-1">
//                                 {item.subItems.map((subItem, subIndex) => (
//                                   <li key={subIndex}>
//                                     {subItem.path ? (
//                                       <Link
//                                         to={subItem.path}
//                                         onClick={closeAll}
//                                         className={`block px-4 py-2 text-sm ${location.pathname === subItem.path
//                                             ? "text-white bg-blue-600/20"
//                                             : "text-blue-100 hover:text-white hover:bg-blue-500/10"
//                                           }`}
//                                       >
//                                         {subItem.name}
//                                       </Link>
//                                     ) : (
//                                       <div className="relative">
//                                         <button
//                                           onClick={() => toggleSubDropdown(subItem.name)}
//                                           className={`flex justify-between items-center w-full px-4 py-2 text-sm ${activeSubDropdown === subItem.name
//                                               ? "text-white bg-blue-600/20"
//                                               : "text-blue-100 hover:text-white hover:bg-blue-500/10"
//                                             }`}
//                                         >
//                                           <span>{subItem.name}</span>
//                                           <ChevronRight size={16} />
//                                         </button>

//                                         <AnimatePresence>
//                                           {activeSubDropdown === subItem.name && (
//                                             <motion.div
//                                               initial={{ opacity: 0, x: 10 }}
//                                               animate={{ opacity: 1, x: 0 }}
//                                               exit={{ opacity: 0, x: 10 }}
//                                               className="absolute left-full top-0 ml-1 w-56 bg-[#0A192F] rounded-lg shadow-xl border border-blue-500/20"
//                                             >
//                                               <ul>
//                                                 {subItem.subItems.map((nestedItem, nestedIndex) => (
//                                                   <li key={nestedIndex}>
//                                                     <Link
//                                                       to={nestedItem.path}
//                                                       onClick={closeAll}
//                                                       className={`block px-4 py-2 text-sm ${location.pathname === nestedItem.path
//                                                           ? "text-white bg-blue-600/20"
//                                                           : "text-blue-100 hover:text-white hover:bg-blue-500/10"
//                                                         }`}
//                                                     >
//                                                       {nestedItem.name}
//                                                     </Link>
//                                                   </li>
//                                                 ))}
//                                               </ul>
//                                             </motion.div>
//                                           )}
//                                         </AnimatePresence>
//                                       </div>
//                                     )}
//                                   </li>
//                                 ))}
//                               </ul>
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </>
//                     )}
//                   </div>
//                 ))}



//                 <motion.div
//                   // whileHover={{ scale: 1.05 }}
//                   // whileTap={{ scale: 0.95 }}
//                   className="ml-4"
//                 >

//                   {/* {user portel show condition } */}
                  

//                 </motion.div>
               
//               </div>
//               {!user ?

// <Link
//   to="/login" // This should match the defined route
//   className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow-md hover:shadow-lg transition-all"
// >
//   <span>Login</span>
//   <motion.span
//     animate={{ x: [0, 2, 0] }}
//     transition={{ duration: 2, repeat: Infinity }}
//     className="ml-1"
//   >
//     <ChevronRight size={16} />
//   </motion.span>
// </Link> :
// <div className="ml-auto  flex items-center" ref={profileRef}>
//   <button
//     onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//     className="flex items-center space-x-2 "
//   >
//     <div className="relative">
//       {/* <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
//         <span className="font-medium text-white">SD</span>
//       </div> */}
//        <img
//   src={user?.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.username) + "&background=random"}
//   alt="Profile"
//   className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
// />
//       <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-[#0A192F]"></div>
//     </div>
//     <div className="hidden lg:block text-left">
//       <p className="text-md text-white font-medium">{user?.username}</p>
//       <p className="text-xs text-blue-300">{user?.role}</p>
//     </div>
//     <FiChevronDown className={`hidden text-gray-300 lg:block transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`} />
//   </button>

//   {/* Profile Dropdown Menu */}
//   <AnimatePresence>
//     {profileDropdownOpen && (
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="absolute right-4 top-20 mt-2 w-56 origin-top-right bg-[#0A192F] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
//       >
//         <div className="py-1">
//           <a
//             onClick={()=>{
//               navigate('/Profile')
//             }}
//             className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#112240]"
//           >
//             <FiUser className="mr-3" />
//             View Profile
//           </a>
//           <a
//            onClick={()=>{
//             {user?.role==='admin'?navigate('/Dashboard'):navigate('/UserDashboard')}
//            }}
//             className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#112240]"
//           >
//             <FiSettings className="mr-3" />
//             Login
//           </a>
//           <div className="border-t border-[#112240]"></div>
//           <a
//             onClick={() => {
//               localStorage.clear()
//               navigate('/')
//               window.location.reload()
//             }}
//             className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-[#112240]"
//           >
//             <FiLogOut className="mr-3" />
//             Logout
//           </a>
//         </div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// </div>}

//               {/* Mobile Menu Button */}
//               <button
//                 className="lg:hidden p-2 text-blue-300 hover:text-white transition-colors"
//                 onClick={() => setIsOpen(true)}
//               >
//                 <Menu size={24} />
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           <AnimatePresence>
//             {isOpen && (
//               <>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="fixed inset-0 bg-black/50 z-40 touch-none"
//                   onClick={() => setIsOpen(false)}
//                 />

//                 <motion.div
//                   initial={{ x: "-100%" }}
//                   animate={{ x: 0 }}
//                   exit={{ x: "-100%" }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   className="fixed inset-y-0 left-0 w-80 max-w-full bg-[#0A192F] shadow-xl z-50 border-r border-blue-500/20 flex flex-col h-screen"            >
//                   <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
//                     <Link to="/" className="flex items-center space-x-3" onClick={closeAll}>
//                       <img
//                         src={logo}
//                         alt="MUET Logo"
//                         className="h-12 w-12"
//                       />
//                       <div className="text-sm font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent ">
//                         <div>Mehran University</div>
//                         <div className="text-[8px]">Of Engineering And Technology</div>
//                         <div className="text-[8px]">Jamshoro, Pakistan</div>
//                       </div>
//                     </Link>
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="p-1 text-blue-300 hover:text-white rounded-full "
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>

//                   <div className="flex-1 overflow-y-auto py-4 ">
//                     {navItems.map((item, index) => (
//                       <div key={index} className="border-b border-blue-900/30 last:border-0">
//                         {item.path ? (
//                           <Link
//                             to={item.path}
//                             onClick={closeAll}
//                             className={`block px-6 py-3 text-sm ${location.pathname === item.path
//                                 ? "text-white bg-blue-600/20"
//                                 : "text-blue-100 hover:text-white hover:bg-blue-500/10"
//                               }`}
//                           >
//                             {item.name}
//                           </Link>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => toggleDropdown(item.name)}
//                               className={`flex justify-between items-center w-full px-6 py-3 text-sm ${activeDropdown === item.name
//                                   ? "text-white bg-blue-600/20"
//                                   : "text-blue-100 hover:text-white hover:bg-blue-500/10"
//                                 }`}
//                             >
//                               <span>{item.name}</span>
//                               <motion.div
//                                 animate={{ rotate: activeDropdown === item.name ? 90 : 0 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <ChevronRight size={16} />
//                               </motion.div>
//                             </button>

//                             <AnimatePresence>
//                               {activeDropdown === item.name && item.subItems && (
//                                 <motion.div
//                                   initial={{ height: 0 }}
//                                   animate={{ height: "auto" }}
//                                   exit={{ height: 0 }}
//                                   className="overflow-hidden bg-blue-900/10"
//                                 >
//                                   {item.subItems.map((subItem, subIndex) => (
//                                     <div key={subIndex} className="border-t border-blue-900/20">
//                                       {subItem.path ? (
//                                         <Link
//                                           to={subItem.path}
//                                           onClick={closeAll}
//                                           className={`block px-10 py-2 text-xs ${location.pathname === subItem.path
//                                               ? "text-white bg-blue-600/20"
//                                               : "text-blue-100 hover:text-white hover:bg-blue-500/10"
//                                             }`}
//                                         >
//                                           {subItem.name}
//                                         </Link>
//                                       ) : (
//                                         <>
//                                           <button
//                                             onClick={() => toggleSubDropdown(subItem.name)}
//                                             className={`flex justify-between items-center w-full px-10 py-2 text-xs ${activeSubDropdown === subItem.name
//                                                 ? "text-white bg-blue-600/20"
//                                                 : "text-blue-100 hover:text-white hover:bg-blue-500/10"
//                                               }`}
//                                           >
//                                             <span>{subItem.name}</span>
//                                             <ChevronRight size={14} />
//                                           </button>

//                                           <AnimatePresence>
//                                             {activeSubDropdown === subItem.name && (
//                                               <motion.div
//                                                 initial={{ height: 0 }}
//                                                 animate={{ height: "auto" }}
//                                                 exit={{ height: 0 }}
//                                                 className="overflow-hidden bg-blue-900/20"
//                                               >
//                                                 {subItem.subItems.map((nestedItem, nestedIndex) => (
//                                                   <Link
//                                                     key={nestedIndex}
//                                                     to={nestedItem.path}
//                                                     onClick={closeAll}
//                                                     className={`block px-14 py-2 text-xs ${location.pathname === nestedItem.path
//                                                         ? "text-white bg-blue-600/20"
//                                                         : "text-blue-100 hover:text-white hover:bg-blue-500/10"
//                                                       }`}
//                                                   >
//                                                     {nestedItem.name}
//                                                   </Link>
//                                                 ))}
//                                               </motion.div>
//                                             )}
//                                           </AnimatePresence>
//                                         </>
//                                       )}
//                                     </div>
//                                   ))}
//                                 </motion.div>
//                               )}
//                             </AnimatePresence>
//                           </>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="p-4 border-t border-blue-500/20">
//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       {!user?
//                       <Link
//                         to="/login"
//                         onClick={closeAll}
//                         className="block w-full px-4 py-3 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow"
//                       >
//                         Login Login
//                       </Link>:
//                       <div className="ml-auto  flex items-center" ref={profileRef}>
//                       <button
//                         onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                         className="flex items-center space-x-2 "
//                       >
//                         <div className="relative">
//                           {/* <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
//                             <span className="font-medium text-white">SD</span>
//                           </div> */}
//                             <img
//                       src={user?.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.username) + "&background=random"}
//                       alt="Profile"
//                       className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
//                     />
//                           <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-[#0A192F]"></div>
//                         </div>
//                         <div className="hidden lg:block text-left">
//                           <p className="text-md text-white font-medium">{user?.username}</p>
//                           <p className="text-xs text-blue-300">{user?.role}</p>
//                         </div>
//                         <FiChevronDown className={`hidden text-gray-300 lg:block transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`} />
//                       </button>

//                       {/* Profile Dropdown Menu */}
//                       <AnimatePresence >
//                         {!profileDropdownOpen && (
//                           <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             transition={{ duration: 0.2 }}
//                             className="absolute right-4 bottom-0 mt-2 w-56 origin-top-right bg-[#0A192F] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
//                           >
//                             <div className="py-1">
//                               <a
//                                 onClick={()=>{
//                                   navigate('/Profile')
//                                 }}
//                                 className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#112240]"
//                               >
//                                 <FiUser className="mr-3" />
//                                 View Profile
//                               </a>
//                               <a
//                                onClick={()=>{
//                                 {user?.role==='admin'?navigate('/Dashboard'):navigate('/UserDashboard')}
//                                }}
//                                 className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#112240]"
//                               >
//                                 <FiSettings className="mr-3" />
//                                 Login
//                               </a>
//                               <div className="border-t border-[#112240]"></div>
//                               <a
//                                 onClick={() => {
//                                   localStorage.clear()
//                                   navigate('/')
//                                   window.location.reload()
//                                 }}
//                                 className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-[#112240]"
//                               >
//                                 <FiLogOut className="mr-3" />
//                                 Logout
//                               </a>
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>}
//                     </motion.div>


                    
//                   </div>
                  
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>
//         </nav>
//       <div className="">
//       {children}
//       </div>
//       {/* <Footer /> */}

//     </>
//   );
// };

// export default Navbar;


import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

import logo from '../../assets/logo-removebg-preview.png';

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (item) => {
    setActiveDropdown(activeDropdown === item ? null : item);
    setActiveSubDropdown(null);
  };

  const toggleSubDropdown = (item) => {
    setActiveSubDropdown(activeSubDropdown === item ? null : item);
  };

  const closeAll = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" }

  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-sm ${scrolled ? "py-0" : "py-0"}`}
      >
        <div className="w-full px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center  group">
              <div className="h-20 w-20 md:h-24 md:w-32">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="size-full object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex ml-7 items-center space-x-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`px-4 py-2 text-md font-large rounded-lg transition-colors ${location.pathname === item.path
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-1 transition-colors ${activeDropdown === item.name
                            ? "text-blue-600 font-semibold"
                            : "text-gray-700 hover:text-blue-600"
                          }`}
                      >
                        <span>{item.name}</span>
                        <motion.div
                          animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>
                    </>
                  )}
                </div>
              ))}

              {!user ? (
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-all ml-4"
                >
                  <span>Login</span>
                  <motion.span
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-1"
                  >
                    <ChevronRight size={16} />
                  </motion.span>
                </Link>
              ) : (
                <div className="ml-auto flex items-center" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2"
                  >
                    <div className="relative">
                      <img
                        src={user?.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.username) + "&background=random"}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover border-2 border-blue-100"
                      />
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm text-gray-800 font-medium">{user?.username}</p>
                      <p className="text-sm font-bold text-blue-600"> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                    </div>
                    <FiChevronDown className={`hidden text-gray-500 lg:block transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''
                      }`} />
                  </button>

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
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={35} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <div className="h-full">
          
            
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 touch-none"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-xl z-50 border-r border-gray-200 flex flex-col h-screen"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <Link to="/" className="flex items-center space-x-3" onClick={closeAll}>
                    <img
                      src={logo}
                      alt="Company Logo"
                      className="h-20 w-32"
                    />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-600 hover:text-blue-600 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                  {navItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-0">
                      {item.path ? (
                        <Link
                          to={item.path}
                          onClick={closeAll}
                          className={`block px-6 py-3 text-[25px] ${location.pathname === item.path
                              ? "text-blue-600 font-semibold bg-blue-50"
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className={`flex justify-between items-center w-full px-6 py-3 text-sm ${activeDropdown === item.name
                                ? "text-blue-600 font-semibold bg-blue-50"
                                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                              }`}
                          >
                            <span>{item.name}</span>
                            <motion.div
                              animate={{ rotate: activeDropdown === item.name ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight size={16} />
                            </motion.div>
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 mb-10 border-t border-gray-200">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {!user ? (
                      <Link
                        to="/login"
                        onClick={closeAll}
                        className="block w-full px-4 py-3 text-lg font-medium text-center text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                      >
                        Login
                      </Link>
                    ) : (<>

                          

                      <div className="flex items-center space-x-3">
                        <img
                          src={user?.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.username) + "&background=random"}
                          alt="Profile"
                          className="h-10 w-10 rounded-full object-cover border-2 border-blue-100"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{user?.username}</p>
                          <p className="text-xs text-gray-500">{user?.role}</p>
                        </div>
                      </div>
                      <AnimatePresence>

<motion.div
  // initial={{ opacity: 0, y: -10 }}
  // animate={{ opacity: 1, y: 0 }}
  // exit={{ opacity: 0, y: -10 }}
  // transition={{ duration: 0.2 }}
  className="   w-full bg-white rounded-lg shadow-lg ring-1 ring-gray-200 focus:outline-none z-50"
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
</AnimatePresence>

                      
                
                      {/* <div></div> */}
                      </>
                    
                    
                    
                    )}
                  </motion.div>
                </div>
              </motion.div>
          
            </div>
          )}
        </AnimatePresence>
      </nav>
      <div className="pt-12">
        {children}
      </div>
    </>
  );
};

export default Navbar;