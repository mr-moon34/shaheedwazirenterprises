import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiGlobe, FiTrendingUp } from 'react-icons/fi';

const AboutUs = () => {
  const stats = [
    { value: '10+', label: 'Years Experience', icon: <FiAward className="text-3xl" /> },
    { value: '500+', label: 'Clients Worldwide', icon: <FiUsers className="text-3xl" /> },
    { value: '24/7', label: 'Global Support', icon: <FiGlobe className="text-3xl" /> },
    { value: '99.9%', label: 'Uptime Guarantee', icon: <FiTrendingUp className="text-3xl" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=2070')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-full flex flex-col justify-center px-6 lg:px-16 text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Story</h1>
          <p className="text-xl max-w-3xl">
            Pioneering innovative solutions since 2012, we bridge technology and business needs with cutting-edge expertise.
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 -mt-16 relative z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all"
          >
            <div className="text-blue-600 mb-4 flex justify-center">{stat.icon}</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              To empower businesses through transformative technology solutions that drive growth, efficiency, and competitive advantage in an increasingly digital world.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                </div>
                <p className="ml-3 text-gray-700">
                  Deliver exceptional value through innovation
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                </div>
                <p className="ml-3 text-gray-700">
                  Foster long-term partnerships built on trust
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                </div>
                <p className="ml-3 text-gray-700">
                  Push boundaries of what's technologically possible
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;