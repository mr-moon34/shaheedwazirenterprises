import { useState } from 'react';
import { motion } from 'framer-motion';

const CottonProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'yarn', name: 'Cotton Yarn' },
    { id: 'fabric', name: 'Cotton Fabric' },
    { id: 'wool', name: 'Wool Products' },
    { id: 'blends', name: 'Blended Fibers' }
  ];

  const products = [
    {
      id: 1,
      name: 'Premium Combed Cotton Yarn',
      category: 'yarn',
      specs: '30/1 Ne, 100% Cotton',
      image: 'https://barnhardtcotton.net/wp-content/uploads/2016/04/cotton-production-and-the-story-of-cotton.jpg'
    },
    {
      id: 2,
      name: 'Organic Cotton Jersey Fabric',
      category: 'fabric',
      specs: 'GSM 180, Oeko-Tex Certified',
      image: 'https://barnhardtcotton.net/wp-content/uploads/2016/04/cotton-production-and-the-story-of-cotton.jpg'
    },
    {
      id: 3,
      name: 'Merino Wool Roving',
      category: 'wool',
      specs: '19.5 Micron, Extra Fine',
      image: 'https://barnhardtcotton.net/wp-content/uploads/2016/04/cotton-production-and-the-story-of-cotton.jpg'
    },
    {
      id: 4,
      name: 'Cotton-Polyester Blend',
      category: 'blends',
      specs: '65/35 Blend, Carded',
      image: 'https://barnhardtcotton.net/wp-content/uploads/2016/04/cotton-production-and-the-story-of-cotton.jpg'
    },
    {
      id: 5,
      name: 'Egyptian Cotton Thread',
      category: 'yarn',
      specs: 'Extra Long Staple, 40/2 Ne',
      image: 'https://barnhardtcotton.net/wp-content/uploads/2016/04/cotton-production-and-the-story-of-cotton.jpg'
    },
    {
      id: 6,
      name: 'Cashmere Wool Batting',
      category: 'wool',
      specs: 'Grade A, 100% Pure',
      image: 'https://barnhardtcotton.net/wp-content/uploads/2016/04/cotton-production-and-the-story-of-cotton.jpg'
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633527992904-53f86f81a23a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y290dG9ufGVufDB8fDB8fHww')] bg-cover bg-center opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Shaheed Wazir Enterprises
          </motion.h1>
          <motion.p 
            className="text-xl text-amber-100 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            We deal all kind of yarn and cotton.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative h-60 overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity ${hoveredProduct === product.id ? 'opacity-100' : ''}`}></div>
                <div className={`absolute bottom-0 left-0 p-4 text-white transition-opacity ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-sm">{product.specs}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{product.specs}</p>
               
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quality Assurance Section */}
        <motion.div 
          className="mt-24 bg-white rounded-xl shadow-md p-8 md:p-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Quality Standards</h2>
              <p className="text-gray-600 mb-6">
                Every product undergoes rigorous quality checks to meet international textile standards. 
                We source only the finest raw materials and employ state-of-the-art processing techniques.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">ISO 9001:2015 Certified</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">OEKO-TEX Standard 100</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Organic Content Standard (OCS)</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-64">
              <img 
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                alt="Quality inspection" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CottonProductsPage;