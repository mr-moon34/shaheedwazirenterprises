import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddTransactionForm = () => {
  const navigate = useNavigate();
  const user  = JSON.parse(localStorage.getItem('user'));
  // console.log(user)
  const [formData, setFormData] = useState({
    transactionType: 'credit',
    customer: '',
    date: new Date().toISOString().split('T')[0],
    rate: '',
    weight: '',
    amount: '',
    description: '',
    attachment: null,
    invoice: null,
    userid:user._id,
    amounttype:''
  });
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Fetch customers
  useEffect(() => {

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://shaheed-wazir-enterprises.onrender.com/api/customers/')
        setCustomers(response.data.customers);
        setFilteredCustomers(response.data.customers);
      } catch (error) {
        toast.error('Failed to fetch customers');
      }
    };
    fetchCustomers();
  }, []);

  // Filter customers based on search
  useEffect(() => {
    if (customerSearch) {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(customerSearch.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [customerSearch, customers]);

  // Fetch recent transactions
  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/transactions?limit=5');
  //       const data = await response.json();
  //       setTransactions(data);
  //     } catch (error) {
  //       console.error('Error fetching transactions:', error);
  //     }
  //   };
  //   fetchTransactions();
  // }, []);

  const handleChange = (e) => {
    console.log(e.target.value )

    const { name, value } = e.target;
    // console.log(e.target.value)
    setFormData(prev => ({

      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
  
    if (file && file.name.toLowerCase().endsWith('.zip')) {
      alert("ZIP files are not allowed.");
      e.target.value = ''; // Clear the file input
      return;
    }
  
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));
  };
  

  // const handleFileChange = (e) => {
  // const file = e.target.files[0];
  // if (!file) return;

  // // Check file type
  // const validTypes = ['image/png', 'application/pdf'];
  // if (!validTypes.includes(file.type)) {
  //   alert('Please select a PNG or PDF file only');
  //   e.target.value = ''; // Clear the input
  //   return;
  // }

  // Update your form data
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   // Validate file type (PNG or PDF)
  //   const validTypes = ['image/png', 'application/pdf'];
  //   const fileExtension = file.name.split('.').pop().toLowerCase();
  
  //   if (!validTypes.includes(file.type) && !['png', 'pdf'].includes(fileExtension)) {
  //     // Show error message
  //     setFormData({
  //       ...formData,
  //       invoice: null,  // Clear any previous file
  //       fileError: 'Only PNG and PDF files are allowed'
  //     });
  //     e.target.value = '';  // Reset the file input
  //     return;
  //   }
  
  //   // Validate file size (optional - example for 5MB limit)
  //   const maxSize = 5 * 1024 * 1024; // 5MB
  //   if (file.size > maxSize) {
  //     setFormData({
  //       ...formData,
  //       invoice: null,
  //       fileError: 'File size must be less than 5MB'
  //     });
  //     e.target.value = '';
  //     return;
  //   }
  
  //   // If file is valid
  //   setFormData({
  //     ...formData,
  //     invoice: file,  // Set the valid file
  //     fileError: null  // Clear any previous errors
  //   });
  // };

  const calculateAmount = () => {
    if (formData.rate && formData.weight) {
      const amount = parseFloat(formData.rate) * parseFloat(formData.weight);
      setFormData(prev => ({
        ...prev,
        amount: amount.toFixed(2)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append('customer', formData.customer);
      formPayload.append('type', formData.transactionType);
      formPayload.append('date', formData.date);
      formPayload.append('rate', formData.rate);
      formPayload.append('weight', formData.weight);
      formPayload.append('amount', formData.amount);
      formPayload.append('description', formData.description);
  
      formPayload.append('userid', formData.userid);
      formPayload.append('amounttype', formData.amounttype);



      if (formData.attachment) formPayload.append('attachment', formData.attachment);
      if (formData.invoice) formPayload.append('invoice', formData.invoice);



        const response = await axios.post('https://shaheed-wazir-enterprises.onrender.com/api/transactions/addTransaction',formPayload)
        if(response.data.success){
      toast.success('Transaction added successfully!');
      navigate('/TransactionManagement');}
    } catch (error) {
      toast.error(error.message || 'Error adding transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add Transaction</h1>
          <button
            onClick={() => navigate('/TransactionManagement')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <FiX /> Cancel
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex border-b mb-6">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, transactionType: 'credit' }))}
              className={`px-4 py-2 font-medium ${formData.transactionType === 'credit' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            >
              Add Credit
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, transactionType: 'debit' }))}
              className={`px-4 py-2 font-medium ${formData.transactionType === 'debit' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
            >
              Add Debit
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, transactionType: 'amount' }))}
              className={`px-4 py-2 font-medium ${formData.transactionType === 'amount' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Add Amount
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search customer..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                  />
                  <FiSearch className="absolute right-3 top-3 text-gray-400" />
                </div>
                <select
                  name="customer"
                  value={formData?.customer}
                  onChange={handleChange}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Customer</option>
                  {filteredCustomers.map(customer => (
                    <option key={customer._id} value={customer._id}>{customer.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {formData.transactionType === 'amount' && (
                <>
                  

                  
                    {/* <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                     */}
                     {/* <select name="amounttype" id="amounttype">Select Amount-Type</select> */}
                     <select
                  name="amounttype"
                  value={formData?.amounttype}
                  onChange={handleChange}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Amount-Type</option>
                  
                    <option  value="debit">Debit</option>
                    <option  value="credit">Credit</option>


                
                </select>
                
                </>
              )}
              </div>

              {formData.transactionType !== 'amount' && (
                <>
                  <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
                    <input
                      type="number"
                      id="rate"
                      name="rate"
                      value={formData.rate}
                      onChange={(e)=>{handleChange(e),calculateAmount()}}
                      onBlur={calculateAmount}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter rate"
                      step="0.01"
                      min="0"
                      // disabled
                    />
                  </div>

                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={(e)=>{handleChange(e),calculateAmount()}}
                      onBlur={calculateAmount}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter weight"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </>
              )}

              <div className={formData.transactionType === 'amount' ? 'md:col-span-2' : ''}>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                  step="0.01"
                  min="0"
                  // disabled
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
                <div className="flex items-center">
  <input
    type="file"
    id="attachment"
    name="attachment"
    onChange={handleFileChange}
    className="hidden"
    // accept=".png,.pdf,image/png,application/pdf"  // This restricts to PNG and PDF
  />
  <label
    htmlFor="attachment"
    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
  >
    Choose File
  </label>
  <span className="ml-2 text-sm text-gray-500">
    {formData.attachment ? formData.attachment.name : 'No file chosen'}
  </span>
</div>
              </div>
              <div>
  <label htmlFor="invoice" className="block text-sm font-medium text-gray-700 mb-1">Invoice</label>
  <div className="flex items-center">
    <input
      type="file"
      id="invoice"
      name="invoice"
      onChange={handleFileChange}
      className="hidden"
      // accept=".png,.pdf,image/png,application/pdf"  // Restrict to PNG and PDF
    />
    <label
      htmlFor="invoice"
      className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
    >
      Choose File
    </label>
    <span className="ml-2 text-sm text-gray-500">
      {formData.invoice ? formData.invoice.name : 'No file chosen'}
    </span>
  </div>
  {/* {formData.invoice && !['image/png', 'application/pdf'].includes(formData.invoice.type) && (
    <p className="mt-1 text-sm text-red-600">Please select a PNG or PDF file only</p>
  )} */}
</div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiSave className="-ml-1 mr-2 h-4 w-4" />
                    {formData.transactionType === 'credit' ? 'Add Credit' : 
                     formData.transactionType === 'debit' ? 'Add Debit' : 'Add Amount'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Recent Transactions Table */}
        {/* <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr key={transaction._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.invoice ? (
                          <a href={transaction.invoice} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                            View Invoice
                          </a>
                        ) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.addedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          View
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No recent transactions
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AddTransactionForm;