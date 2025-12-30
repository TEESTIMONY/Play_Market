import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { FaToggleOn, FaToggleOff, FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface RedeemCode {
  id: number;
  code: string;
  value: number;
  status: 'active' | 'inactive';
  createdDate: string;
  usedBy?: string;
}

const RedeemCodesManagement = forwardRef((_props, ref) => {
  const [codes, setCodes] = useState<RedeemCode[]>([
    { id: 1, code: 'WELCOME100', value: 100, status: 'active', createdDate: '2025-01-01' },
    { id: 2, code: 'BONUS50', value: 50, status: 'active', createdDate: '2025-01-02' },
    { id: 3, code: 'EXPIRED25', value: 25, status: 'inactive', createdDate: '2025-01-03', usedBy: 'user1' },
  ]);

  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [showForm, setShowForm] = useState(false);

  // Expose openModal method to parent component
  useImperativeHandle(ref, () => ({
    openModal: () => setShowForm(true)
  }));

  const toggleRowExpansion = (codeId: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(codeId)) {
      newExpandedRows.delete(codeId);
    } else {
      newExpandedRows.add(codeId);
    }
    setExpandedRows(newExpandedRows);
  };
  const [formData, setFormData] = useState({ code: '', value: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode: RedeemCode = {
      id: Math.max(...codes.map(c => c.id)) + 1,
      ...formData,
      value: parseInt(formData.value),
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setCodes([...codes, newCode]);
    setFormData({ code: '', value: '' });
    setShowForm(false);
    // TODO: Call API
    console.log('Created code:', newCode);
  };

  const toggleStatus = (id: number) => {
    setCodes(codes.map(code =>
      code.id === id
        ? { ...code, status: code.status === 'active' ? 'inactive' : 'active' }
        : code
    ));
    // TODO: Call API
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="hidden md:table-cell px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="hidden md:table-cell px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used By</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {codes.map((code) => (
              <>
                <tr key={code.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpansion(code.id)}>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-mono text-gray-900 bg-gray-50">{code.code}</td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{code.value} points</td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                    <span className={`px-1 md:px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      code.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {code.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{code.createdDate}</td>
                  <td className="hidden md:table-cell px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{code.usedBy || 'Not used'}</td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(code.id);
                      }}
                      className={`px-2 md:px-3 py-1 rounded transition-colors text-xs md:text-sm text-white ${
                        code.status === 'active'
                          ? 'bg-red hover:bg-red-700'
                          : 'bg-green hover:bg-green-700'
                      }`}
                    >
                      {code.status === 'active' ? <FaToggleOff className="inline mr-1" /> : <FaToggleOn className="inline mr-1" />}
                      {code.status === 'active' ? 'Inactive' : 'Active'}
                    </button>
                    <button
                      onClick={() => toggleRowExpansion(code.id)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                    >
                      {expandedRows.has(code.id) ? <FaChevronDown /> : <FaChevronRight />}
                    </button>
                  </td>
                </tr>
                {expandedRows.has(code.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="px-4 md:px-12 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="md:hidden">
                          <span className="font-medium text-gray-700">Created:</span>
                          <span className="ml-2 text-gray-900">{code.createdDate}</span>
                          <span className="font-medium text-gray-700 block mt-3">Used By:</span>
                          <span className="ml-2 text-gray-900">{code.usedBy || 'Not used'}</span>
                        </div>
                        <div className="md:hidden">
                          <span className="font-medium text-gray-700">Full Details:</span>
                          <div className="mt-2 space-y-1">
                            <div>ID: {code.id}</div>
                            <div>Code: {code.code}</div>
                            <div>Value: {code.value} points</div>
                            <div>Status: {code.status}</div>
                            <div>Created: {code.createdDate}</div>
                            <div>Used By: {code.usedBy || 'Not used'}</div>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <span className="font-medium text-gray-700">Additional Information:</span>
                          <div className="mt-2 space-y-1">
                            <div>Code ID: {code.id}</div>
                            <div>Current Status: {code.status}</div>
                            <div>Usage Count: {code.usedBy ? 1 : 0}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add Code Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add Code</h3>
            <p className="text-sm text-gray-600 mb-4">code added here will be redeemable :</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter code :</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="e.g. WELCOME100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter reward :</label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 100"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ code: '', value: '' });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Exit
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

RedeemCodesManagement.displayName = 'RedeemCodesManagement';

export default RedeemCodesManagement;
