import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiDownload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
// autoTable(jsPDF);


const CustomerTransactions = () => {

  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Calculate running balance
  const calculateRunningBalance = (transactions) => {
    let balance = 0;
    return transactions.map(transaction => {
      if (transaction.type === 'credit') {
        balance += transaction.amount;
      } else if (transaction.type === 'debit') {
        balance -= transaction.amount;
      } else if (transaction.type === 'amount') {
        if (transaction.amounttype === 'credit') {
          balance += transaction.amount;
        } else {
          balance -= transaction.amount;
        }
      }
      return {
        ...transaction,
        runningBalance: balance
      };
    });
  };

  // Export to Excel function
  const exportToExcel = () => {
  // Prepare the transaction data
  const excelData = filteredTransactions.map(t => ({
    Date: new Date(t.date).toLocaleDateString(),
    Description: t.description,
    Credit: t.type === 'credit' ? t.amount : '',
    Debit: t.type === 'debit' ? t.amount : '',
    Amount: t.type === 'amount' ? t.amount : '',
    'Amount Type': t.amounttype || '',
    'Running Balance': t.runningBalance
  }));

  // Calculate the final balance
  const finalBalance = filteredTransactions.length > 0 
    ? filteredTransactions[filteredTransactions.length - 1].runningBalance 
    : 0;

  // Add empty row for separation
  excelData.push({
    Date: '',
    Description: '',
    Credit: '',
    Debit: '',
    Amount: '',
    'Amount Type': '',
    'Running Balance': ''
  });

  // Add footer row
  excelData.push({
    Date: '',
    Description: 'TOTAL BALANCE',
    Credit: '',
    Debit: '',
    Amount: '',
    'Amount Type': '',
    'Running Balance': finalBalance
  });

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Define the border style
  const borderStyle = {
    top: { style: 'thin', color: { rgb: '000000' } },
    bottom: { style: 'thin', color: { rgb: '000000' } },
    left: { style: 'thin', color: { rgb: '000000' } },
    right: { style: 'thin', color: { rgb: '000000' } }
  };

  // Apply borders to all cells
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_address = { c: C, r: R };
      const cell_ref = XLSX.utils.encode_cell(cell_address);
      
      if (!worksheet[cell_ref]) continue;
      
      worksheet[cell_ref].s = worksheet[cell_ref].s || {};
      worksheet[cell_ref].s.border = borderStyle;
      
      // Style the footer row differently
      if (R === range.e.r) {
        worksheet[cell_ref].s.font = { bold: true };
        if (C === 1 || C === 6) { // Description and Running Balance columns
          worksheet[cell_ref].s.fill = { fgColor: { rgb: 'D9D9D9' } };
        }
      }
      
      // Right-align numeric columns
      if ([2, 3, 4, 6].includes(C)) { // Credit, Debit, Amount, Running Balance columns
        worksheet[cell_ref].s.alignment = { horizontal: 'right' };
      }
    }
  }

  // Create workbook and save
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
  
  // Note: We use XLSX.write instead of XLSX.writeFile to support styling
  XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
  // Create a Blob and trigger download
  const blob = new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${customer?.name}_Transactions.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
};

  // Export to PDF function
  const exportToPDF = () => {
    try {
      // Create a new PDF document in landscape mode (optional)
      const doc = new jsPDF('p', 'pt', 'a4'); // 'p' for portrait, 'a4' for standard paper size
  
      // Add title
      doc.setFontSize(18);
      doc.setTextColor(40, 53, 147);
      doc.setFont('helvetica', 'bold');
      doc.text(`Transactions for ${customer?.name}`, 40, 40);
  
      // Add generation date
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 40, 60);
  
      // Add customer info
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text(`Customer: ${customer?.name}`, 40, 80);
      doc.text(`Email: ${customer?.email}`, 40, 95);
      doc.text(`Phone: ${customer?.phone || 'N/A'}`, 40, 110);
      doc.text(`Current Balance: ${formatCurrency(customer?.balance)}`, 40, 125);
  
      // Prepare table data
      const headers = [
        ['Date', 'Description', 'Credit', 'Debit', 'Balance']
      ];
  
      const tableData = filteredTransactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.description || '-',
        t.type === 'credit' ? formatCurrency(t.amount) : '-',
        t.type === 'debit' ? formatCurrency(t.amount) : '-',
        formatCurrency(t.runningBalance)
      ]);
  
      // Add the table
      doc.autoTable({
        head: headers,
        body: tableData,
        startY: 140,
        styles: {
          fontSize: 9,
          cellPadding: 4,
          overflow: 'linebreak',
          halign: 'center'
        },
        headStyles: {
          fillColor: [44, 62, 80],
          textColor: 255,
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 80, halign: 'center' }, // Date
          1: { cellWidth: 'auto', halign: 'left' }, // Description
          2: { cellWidth: 60, halign: 'right', textColor: [0, 128, 0] }, // Credit
          3: { cellWidth: 60, halign: 'right', textColor: [255, 0, 0] }, // Debit
          4: { cellWidth: 60, halign: 'right', fontStyle: 'bold' } // Balance
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        margin: { top: 140 }
      });
  
      // Add summary at the end
      const finalY = doc.lastAutoTable.finalY || 140;
      doc.setFontSize(12);
      doc.setTextColor(44, 62, 80);
      doc.setFont('helvetica', 'bold');
      doc.text('Summary', 40, finalY + 30);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Transactions: ${filteredTransactions.length}`, 40, finalY + 50);
      doc.text(`Final Balance: ${formatCurrency(customer?.balance)}`, 40, finalY + 70);
  
      // Save the PDF
      doc.save(`${customer?.name}_transactions.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    }
  };
  // Fetch customer and transactions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch customer details
        const customerRes = await axios.get(`https://shaheedwazirenterprises.onrender.com/api/customers/getcustomer/${customerId}`);
        // console.log(customerRes)
        setCustomer(customerRes.data.user);
        
        // Fetch transactions
        const transactionsRes = await axios.get(`https://shaheedwazirenterprises.onrender.com/api/transactions?customer=${customerId}&sort=-date`);
        console.log(transactionsRes)
        const transactionsData = await transactionsRes.data
        
        // Calculate running balance
        const transactionsWithBalance = calculateRunningBalance(transactionsData);
        setTransactions(transactionsWithBalance);
        setFilteredTransactions(transactionsWithBalance);
      } catch (error) {
        toast.error('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [customerId]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!customer) {
    return <div className="p-6 text-center">Customer not found</div>;
  }

  return (
    <div className="p-6 my-12  bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm  max-md:text-x  text-blue-600 hover:text-blue-800"
          >
            <FiChevronLeft className="mr-1" /> Back to Customers
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={exportToExcel}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm max-md:px-3 max-md:py-1 max-md:text-xs "
            >
              <FiDownload className="mr-2" />
              Export Excel
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm max-md:px-3 max-md:py-1 max-md:text-xs "
            >
              <FiDownload className="mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Transactions for {customer.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Customer Details</h3>
              <p className="text-gray-800">Name: {customer.name}</p>
              <p className="text-gray-800">Email: {customer.email}</p>
              <p className="text-gray-800">Phone: {customer.phone || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <label htmlFor="entries" className="text-sm text-gray-600 mr-2">
                Show
              </label>
              <select
                id="entries"
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-600 ml-2">entries</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((transaction) => (
                    <tr key={transaction._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {transaction.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-green-600">
                        {transaction.type === 'credit' ? formatCurrency(transaction.amount) : '–'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">
                        {transaction.type === 'debit' ? formatCurrency(transaction.amount) : '–'}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${transaction.amounttype === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                        {transaction.amounttype === 'debit' ? formatCurrency(transaction.amount) : transaction.amounttype === 'credit' ? formatCurrency(transaction.amount) : '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total Balance */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">Total Balance:</p>
                <p className={`text-lg font-bold ${
                  customer.balance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(customer.balance)}
                </p>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">{Math.min(indexOfLastItem, filteredTransactions.length)}</span> of{' '}
                <span className="font-medium">{filteredTransactions.length}</span> entries
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTransactions;