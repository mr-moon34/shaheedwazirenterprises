import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Admin/Dashboard';
import UserDashboard from './pages/UserDashboard';
import CustomerManagement from './pages/Admin/CustomerManagement';
import AddCustomerForm from './pages/AddCustomerForm';
import TransactionManagement from './pages/Admin/TransactionManagement';
import AddTransactionForm from './pages/Admin/AddTransactionForm';
import CustomerTransactions from './pages/Admin/CustomerTransactions';
import UserManager from './pages/Admin/UserManager';
import TransactionTrash from './pages/Admin/TransactionTrash';
import AdminViewProfile from './pages/Admin/AdminViewProfile';
import AddUserForm from './pages/Admin/AddUserForm';
// import ContactUs from './pages/Contactus';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './pages/components/ProtectedRoute';
import Navbar from './pages/components/Navbar';
import EditUserPage from './pages/Admin/EditUserPage';
import SidebarWithNavbar from './pages/components/Sidebar';
import CottonProductsPage from './pages/components/ProductPage';
import EditCustomer from './pages/Admin/EditCustomer.jsx';


function App() {
  return (
    <Routes>

      <Route path="/" element={<Navbar>
        
        <LandingPage /></Navbar>} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/contactus" element={<Navbar><ContactUs /></Navbar>} />
      
      */}
      <Route path="/aboutus" element={<Navbar><AboutUs /></Navbar>} />
      <Route path="/products" element={<Navbar><CottonProductsPage /></Navbar>} />


      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
      <Route path="/UserManager" element={<SidebarWithNavbar><UserManager /></SidebarWithNavbar>} />
      <Route path="/AddUser" element={<SidebarWithNavbar><AddUserForm /></SidebarWithNavbar>} />
            <Route path="/EditUser/:id" element={<SidebarWithNavbar><EditUserPage /></SidebarWithNavbar>} />
            <Route path="/EditCustomer/:id" element={<SidebarWithNavbar><EditCustomer /></SidebarWithNavbar>} />

            <Route path="/TransactionTrash" element={<SidebarWithNavbar><TransactionTrash /></SidebarWithNavbar>} />
        <Route path="/Userdashboard" element={<SidebarWithNavbar><Dashboard /></SidebarWithNavbar>} />
        <Route path="/dashboard" element={<SidebarWithNavbar><UserDashboard /></SidebarWithNavbar>} />
        </Route>
        {/* <Route path="/CustomerTransactions/:customerId" element={<CustomerTransactions />} /> */}


        <Route path="/AddTransaction" element={<SidebarWithNavbar><AddTransactionForm /></SidebarWithNavbar>} />
        <Route path="/AddCustomer" element={<SidebarWithNavbar><AddCustomerForm /></SidebarWithNavbar>} />
        <Route path="/Profile" element={<SidebarWithNavbar><AdminViewProfile /></SidebarWithNavbar>} />
        <Route path="/TransactionManagement" element={<SidebarWithNavbar><TransactionManagement /></SidebarWithNavbar>} />
        <Route path="/AddCustomer" element={<SidebarWithNavbar><AddCustomerForm /></SidebarWithNavbar>} />
        <Route path="/CustomerManagement" element={<SidebarWithNavbar><CustomerManagement /></SidebarWithNavbar>} />
        <Route path="/CustomerTransactions/:customerId" element={<SidebarWithNavbar><CustomerTransactions /></SidebarWithNavbar>} />

  














    </Routes>
  );
}

export default App;
