import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { FaEdit, FaTrash, FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface Bounty {
  id: number;
  title: string;
  description: string;
  reward: number;
  status: 'active' | 'inactive';
  type: 'time' | 'quantity';
  quantity: number;
  days?: number;
  hours?: number;
  minutes?: number;
  expiryDate?: string;
}

interface BountyParticipation {
  id: number;
  user: string;
  email: string;
  date: string;
  type: 'time' | 'quantity';
  bountyId: number;
  bountyTitle: string;
  status: 'completed' | 'in_progress' | 'failed';
  submissionType: 'link' | 'text';
  submissionContent: string;
  submittedAt: string;
  notes?: string;
}

const BountiesManagement = forwardRef(({ onActionButtonVisibilityChange }: { onActionButtonVisibilityChange?: (visible: boolean) => void }, ref) => {
  const [activeTab, setActiveTab] = useState<'create' | 'results'>('create');

  const handleTabChange = (tab: 'create' | 'results') => {
    setActiveTab(tab);
    // Hide action button when in results tab
    if (onActionButtonVisibilityChange) {
      onActionButtonVisibilityChange(tab === 'create');
    }
  };
  const [bounties, setBounties] = useState<Bounty[]>([
    {
      id: 1,
      title: 'Complete Tasks & Earn Coins!',
      description: 'Join the challenge and maximize your rewards',
      reward: 200,
      status: 'active',
      type: 'quantity',
      quantity: 5,
      expiryDate: '2025-12-31'
    },
    {
      id: 2,
      title: 'Refer a Friend',
      description: 'Get bonus points for each referral',
      reward: 50,
      status: 'active',
      type: 'quantity',
      quantity: 3
    },
  ]);

  const [participations] = useState<BountyParticipation[]>([
    {
      id: 1,
      user: 'John Doe',
      email: 'john@example.com',
      date: '2025-01-15',
      type: 'quantity',
      bountyId: 1,
      bountyTitle: 'Complete Tasks & Earn Coins!',
      status: 'completed',
      submissionType: 'link',
      submissionContent: 'https://github.com/johndoe/my-project',
      submittedAt: '2025-01-15 14:30:00'
    },
    {
      id: 2,
      user: 'Jane Smith',
      email: 'jane@example.com',
      date: '2025-01-16',
      type: 'time',
      bountyId: 2,
      bountyTitle: 'Refer a Friend',
      status: 'in_progress',
      submissionType: 'text',
      submissionContent: 'I have successfully referred 3 friends to the platform. Here are their emails: friend1@email.com, friend2@email.com, friend3@email.com',
      submittedAt: '2025-01-16 09:15:00'
    },
    {
      id: 3,
      user: 'Bob Johnson',
      email: 'bob@example.com',
      date: '2025-01-17',
      type: 'quantity',
      bountyId: 1,
      bountyTitle: 'Complete Tasks & Earn Coins!',
      status: 'completed',
      submissionType: 'link',
      submissionContent: 'https://portfolio.bobjohnson.dev/tasks-completed',
      submittedAt: '2025-01-17 16:45:00',
      notes: 'Excellent work! All tasks completed with high quality.'
    },
  ]);

  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedParticipation, setSelectedParticipation] = useState<BountyParticipation | null>(null);

  // Expose openModal method to parent component
  useImperativeHandle(ref, () => ({
    openModal: () => setShowForm(true)
  }));

  const toggleRowExpansion = (bountyId: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(bountyId)) {
      newExpandedRows.delete(bountyId);
    } else {
      newExpandedRows.add(bountyId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleViewParticipation = (participation: BountyParticipation) => {
    setSelectedParticipation(participation);
    setShowViewModal(true);
  };
  const [editingBounty, setEditingBounty] = useState<Bounty | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reward: '',
    type: 'quantity' as 'time' | 'quantity',
    quantity: '',
    days: '',
    hours: '',
    minutes: '',
    status: 'active' as 'active' | 'inactive',
    expiryDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBounty) {
      setBounties(bounties.map(b =>
        b.id === editingBounty.id
          ? {
              ...b,
              ...formData,
              reward: parseInt(formData.reward),
              quantity: formData.type === 'time' ? 0 : parseInt(formData.quantity),
              days: formData.days ? parseInt(formData.days) : undefined,
              hours: formData.hours ? parseInt(formData.hours) : undefined,
              minutes: formData.minutes ? parseInt(formData.minutes) : undefined
            }
          : b
      ));
      setEditingBounty(null);
    } else {
      const newBounty: Bounty = {
        id: Math.max(...bounties.map(b => b.id)) + 1,
        ...formData,
        reward: parseInt(formData.reward),
        quantity: formData.type === 'time' ? 0 : parseInt(formData.quantity),
        days: formData.days ? parseInt(formData.days) : undefined,
        hours: formData.hours ? parseInt(formData.hours) : undefined,
        minutes: formData.minutes ? parseInt(formData.minutes) : undefined
      };
      setBounties([...bounties, newBounty]);
    }
    setFormData({ title: '', description: '', reward: '', type: 'quantity', quantity: '', days: '', hours: '', minutes: '', status: 'active', expiryDate: '' });
    setShowForm(false);
    // TODO: Call API
    console.log('Saved bounty:', formData);
  };

  const handleEdit = (bounty: Bounty) => {
    setEditingBounty(bounty);
    setFormData({
      title: bounty.title,
      description: bounty.description,
      reward: bounty.reward.toString(),
      type: bounty.type,
      quantity: bounty.quantity.toString(),
      days: bounty.days?.toString() || '',
      hours: bounty.hours?.toString() || '',
      minutes: bounty.minutes?.toString() || '',
      status: bounty.status,
      expiryDate: bounty.expiryDate || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setBounties(bounties.filter(b => b.id !== id));
    // TODO: Call API
    console.log('Deleted bounty:', id);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => handleTabChange('create')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'create'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Create
          </button>
          <button
            onClick={() => handleTabChange('results')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'results'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Results
          </button>
        </div>
      </div>

      {activeTab === 'create' ? (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="hidden md:table-cell px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="hidden md:table-cell px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bounties.map((bounty) => (
              <>
                <tr key={bounty.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpansion(bounty.id)}>
                  <td className="px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-900 max-w-32 md:max-w-none truncate md:whitespace-nowrap" title={bounty.title}>{bounty.title}</td>
                  <td className="hidden md:table-cell px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-900 max-w-xs truncate">{bounty.description}</td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{bounty.reward} coins</td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                    <span className={`px-1 md:px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      bounty.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {bounty.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{bounty.expiryDate || 'No expiry'}</td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(bounty);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <FaEdit className="text-sm md:text-base" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(bounty.id);
                        }}
                        className="text-red hover:text-red-900 p-1"
                        title="Delete"
                      >
                        <FaTrash className="text-sm md:text-base" />
                      </button>
                      <button
                        onClick={() => toggleRowExpansion(bounty.id)}
                        className="text-gray hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                        title={expandedRows.has(bounty.id) ? "Collapse" : "Expand"}
                      >
                        {expandedRows.has(bounty.id) ? <FaChevronDown /> : <FaChevronRight />}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRows.has(bounty.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="px-4 md:px-12 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="md:hidden">
                          <span className="font-medium text-gray-700">Description:</span>
                          <p className="mt-1 text-gray-900">{bounty.description}</p>
                          <span className="font-medium text-gray-700 block mt-3">Expiry:</span>
                          <span className="text-gray-900">{bounty.expiryDate || 'No expiry'}</span>
                        </div>
                        <div className="md:hidden">
                          <span className="font-medium text-gray-700">Full Details:</span>
                          <div className="mt-2 space-y-1">
                            <div>ID: {bounty.id}</div>
                            <div>Title: {bounty.title}</div>
                            <div>Reward: {bounty.reward} coins</div>
                            <div>Status: {bounty.status}</div>
                            <div>Expiry: {bounty.expiryDate || 'No expiry'}</div>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <span className="font-medium text-gray-700">Additional Information:</span>
                          <div className="mt-2 space-y-1">
                            <div>Bounty ID: {bounty.id}</div>
                            <div>Current Status: {bounty.status}</div>
                            <div>Participants: 0</div>
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

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add Bounty</h3>
              <p className="text-sm text-gray-600 mt-1">Any new bounty added will appear on the live store.</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Choose Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as 'time' | 'quantity'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="time">Time</option>
                  <option value="quantity">Quantity</option>
                </select>
              </div>

              {/* Quantity/Time Duration */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.type === 'time' ? 'Time Duration' : 'Quantity'}
                </label>
                {formData.type === 'time' ? (
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Days</label>
                      <input
                        type="number"
                        value={formData.days || ''}
                        onChange={(e) => setFormData({...formData, days: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Hours</label>
                      <input
                        type="number"
                        value={formData.hours || ''}
                        onChange={(e) => setFormData({...formData, hours: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="23"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                      <input
                        type="number"
                        value={formData.minutes || ''}
                        onChange={(e) => setFormData({...formData, minutes: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="59"
                        placeholder="0"
                      />
                    </div>
                  </div>
                ) : (
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                )}
              </div>

              {/* Bounty Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bounty Name</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Task */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Task</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              {/* Reward */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reward</label>
                <input
                  type="number"
                  value={formData.reward}
                  onChange={(e) => setFormData({...formData, reward: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBounty(null);
                    setFormData({ title: '', description: '', reward: '', type: 'quantity', quantity: '', days: '', hours: '', minutes: '', status: 'active', expiryDate: '' });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray transition-colors"
                >
                  Exit
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </>
      ) : (
        /* Results Tab */
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="hidden md:table-cell px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounty ID</th>
                  <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {participations.map((participation) => (
                  <>
                    <tr key={participation.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpansion(participation.id)}>
                      <td className="px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-900 max-w-20 md:max-w-none truncate md:whitespace-nowrap" title={participation.user}>{participation.user}</td>
                      <td className="hidden md:table-cell px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-900 max-w-xs truncate">{participation.email}</td>
                      <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{participation.date}</td>
                      <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                        <span className={`px-1 md:px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          participation.type === 'quantity' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {participation.type}
                        </span>
                      </td>
                      <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">#{participation.bountyId}</td>
                      <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewParticipation(participation);
                          }}
                          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors text-xs"
                          title="View Details"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    {expandedRows.has(participation.id) && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-4 md:px-12 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="md:hidden">
                              <span className="font-medium text-gray-700">Email:</span>
                              <span className="ml-2 text-gray-900">{participation.email}</span>
                              <span className="font-medium text-gray-700 block mt-3">Bounty:</span>
                              <span className="ml-2 text-gray-900">{participation.bountyTitle}</span>
                            </div>
                            <div className="md:hidden">
                              <span className="font-medium text-gray-700">Full Details:</span>
                              <div className="mt-2 space-y-1">
                                <div>ID: {participation.id}</div>
                                <div>User: {participation.user}</div>
                                <div>Email: {participation.email}</div>
                                <div>Date: {participation.date}</div>
                                <div>Type: {participation.type}</div>
                                <div>Bounty: {participation.bountyTitle}</div>
                                <div>Status: {participation.status.replace('_', ' ')}</div>
                              </div>
                            </div>
                            <div className="hidden md:block">
                              <span className="font-medium text-gray-700">Participation Details:</span>
                              <div className="mt-2 space-y-1">
                                <div>Participation ID: {participation.id}</div>
                                <div>Bounty: {participation.bountyTitle}</div>
                                <div>Entry Date: {participation.date}</div>
                                <div>Current Status: {participation.status.replace('_', ' ')}</div>
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
      )}

      {/* View Modal */}
      {showViewModal && selectedParticipation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">Participation Details</h3>
              <p className="text-sm text-gray-600 mt-1">Review user submission and participation information</p>
            </div>

            <div className="space-y-6">
              {/* User Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedParticipation.user}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedParticipation.email}</p>
                </div>
              </div>

              {/* Participation Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entry Date</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedParticipation.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bounty Type</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded capitalize">{selectedParticipation.type}</p>
                </div>
              </div>

              {/* Bounty Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bounty Title</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">#{selectedParticipation.bountyId} - {selectedParticipation.bountyTitle}</p>
              </div>

              {/* Submission Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Submission ({selectedParticipation.submissionType === 'link' ? 'Link' : 'Text'})
                </label>
                {selectedParticipation.submissionType === 'link' ? (
                  <a
                    href={selectedParticipation.submissionContent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline bg-gray-50 px-3 py-2 rounded block break-all"
                  >
                    {selectedParticipation.submissionContent}
                  </a>
                ) : (
                  <div className="bg-gray-50 px-3 py-2 rounded">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedParticipation.submissionContent}</p>
                  </div>
                )}
              </div>

              {/* Submission Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submitted At</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedParticipation.submittedAt}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedParticipation(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

BountiesManagement.displayName = 'BountiesManagement';

export default BountiesManagement;
