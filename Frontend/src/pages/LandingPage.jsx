import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ProfessionalTextileBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* High-quality textile background image */}
      <div 
        className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/157312532/photo/white-ripe-cotton-crop-plants-rows-field-ready-for-harvest.webp?a=1&b=1&s=612x612&w=0&k=20&c=7xKZULtN-crLSXqI7q7Okkjrwg69wsz2NUazV0Qt8HM=')] bg-cover bg-center"
        style={{
          filter: 'brightness(1.05) contrast(0.9)'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white/80"></div>
      </div>
      
      {/* Floating textile elements */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/80 rounded-full"
          style={{
            width: `${Math.random() * 80 + 40}px`,
            height: `${Math.random() * 80 + 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)'
          }}
          animate={{
            y: [0, -50, -100, -150],
            x: [0, Math.random() * 30 - 15],
            opacity: [0.8, 0.9, 0.6, 0]
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 5,
            repeat: Infinity,
            repeatDelay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Professional background */}
      <ProfessionalTextileBackground />
      
      {/* Subtle mouse follower */}
      <motion.div
        className="fixed w-64 h-64 rounded-full bg-amber-100/20 pointer-events-none blur-3xl"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />
      
      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <motion.div 
          className="text-center space-y-8 max-w-4xl bg-white/90 backdrop-blur-md p-10 rounded-xl shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Professional header */}
          <div className="mb-6">
            <motion.p 
              className="text-sm font-medium text-blue-600 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              SINCE 1985
            </motion.p>
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight"
            >
              <span className="block font-light">Shaheed Wazir</span>
              <motion.span 
                className="block mt-2 font-serif text-5xl sm:text-6xl text-blue-700"
                whileHover={{ scale: 1.02 }}
              >
                Enterprises
              </motion.span>
            </motion.h1>
          </div>
          
          {/* Elegant divider */}
          <motion.div 
            className="w-20 h-0.5 bg-blue-400 mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
          
          {/* Value proposition */}
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Premium cotton and wool suppliers to global manufacturers, offering sustainable fibers with uncompromising quality.
          </motion.p>
          
          {/* Quality indicators */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { value: "1000+", label: "Tons Annual Capacity" },
              { value: "40+", label: "Countries Served" },
              { value: "A+", label: "Quality Grade" },
              { value: "ISO", label: "Certified" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <p className="text-2xl font-bold text-blue-600">{item.value}</p>
                <p className="text-xs font-medium text-gray-500 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Section */}
          <motion.div
            className="pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="mb-4">
              <Link
                to="/login"
                className="inline-block px-10 py-3.5 bg-blue-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
            <Link
              to="/products"
              className="inline-block text-sm text-blue-600 hover:text-amber-700 font-medium hover:underline"
            >
              Order Fabric Samples →
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Professional footer note */}
      <motion.div 
        className="absolute bottom-6 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-xs text-gray-500 font-medium">
          Certified Supplier • OEKO-TEX Standard 100 • GOTS Certified
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage;