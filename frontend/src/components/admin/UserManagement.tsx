import React, { useState } from 'react';
import { FaCoins, FaPlus, FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface User {
  id: number;
  username: string;
  email: string;
  points: number;
  status: 'active' | 'inactive';
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'user1', email: 'user1@example.com', points: 150, status: 'active' },
    { id: 2, username: 'user2', email: 'user2@example.com', points: 200, status: 'active' },
    { id: 3, username: 'user3', email: 'user3@example.com', points: 50, status: 'inactive' },
  ]);

  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [showAddPointsModal, setShowAddPointsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [pointsToAdd, setPointsToAdd] = useState('');

  const toggleRowExpansion = (userId: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(userId)) {
      newExpandedRows.delete(userId);
    } else {
      newExpandedRows.add(userId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleAddPoints = (user: User) => {
    setSelectedUser(user);
    setShowAddPointsModal(true);
  };

  const submitAddPoints = () => {
    if (selectedUser && pointsToAdd) {
      setUsers(users.map(user =>
        user.id === selectedUser.id
          ? { ...user, points: user.points + parseInt(pointsToAdd) }
          : user
      ));
      setShowAddPointsModal(false);
      setSelectedUser(null);
      setPointsToAdd('');
      // TODO: Call API to add points
      console.log(`Added ${pointsToAdd} points to user ${selectedUser.username}`);
    }
  };

  return (
    <div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="hidden md:table-cell px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <>
                <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpansion(user.id)}>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{user.id}</td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{user.username}</td>
                  <td className="hidden md:table-cell px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{user.email}</td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900 flex items-center">
                    {user.points} <FaCoins className="ml-1 text-yellow-500" />
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                    <span className={`px-1 md:px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddPoints(user);
                      }}
                      className="bg-green text-white px-2 md:px-3 py-1 rounded hover:bg-green-700 transition-colors text-xs md:text-sm"
                    >
                      Add Points
                    </button>
                    <button
                      onClick={() => toggleRowExpansion(user.id)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                    >
                      {expandedRows.has(user.id) ? <FaChevronDown /> : <FaChevronRight />}
                    </button>
                  </td>
                </tr>
                {expandedRows.has(user.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="px-4 md:px-12 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="md:hidden">
                          <span className="font-medium text-gray-700">Email:</span>
                          <span className="ml-2 text-gray-900">{user.email}</span>
                        </div>
                        <div className="md:hidden">
                          <span className="font-medium text-gray-700">Full Details:</span>
                          <div className="mt-2 space-y-1">
                            <div>ID: {user.id}</div>
                            <div>Username: {user.username}</div>
                            <div>Email: {user.email}</div>
                            <div>Points: {user.points}</div>
                            <div>Status: {user.status}</div>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <span className="font-medium text-gray-700">Additional Information:</span>
                          <div className="mt-2 space-y-1">
                            <div>User ID: {user.id}</div>
                            <div>Account Status: {user.status}</div>
                            <div>Last Activity: Recent</div>
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

      {/* Add Points Modal */}
      {showAddPointsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add Points to {selectedUser.username}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Points to Add</label>
              <input
                type="number"
                value={pointsToAdd}
                onChange={(e) => setPointsToAdd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter points"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddPointsModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={submitAddPoints}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Add Points
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
