import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://snapmart-backend.onrender.com/auth/user/users');
      setUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-blue-600 font-semibold">Loading users...</div>;
  }

  return (
    <div className="p-4  md:p-10 bg-gray-100 min-h-screen dark:bg-zinc-900 text-zinc-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-auto border-collapse bg-white dark:bg-zinc-800 rounded shadow">
          <thead className="bg-blue-100 dark:bg-zinc-700">
            <tr>
              <th className="px-4 py-3 border text-left">Image</th>
              <th className="px-4 py-3 border text-left">Name</th>
              <th className="px-4 py-3 border text-left">Email</th>
              <th className="px-4 py-3 border text-left">Role</th>
              <th className="px-4 py-3 border text-left">Gender</th>
              <th className="px-4 py-3 border text-left">Verified</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-zinc-700">
                <td className="px-4 py-2 border">
                  <img
                    src={user.img || 'https://via.placeholder.com/40'}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2 border font-medium">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border capitalize">
                  <span className={`px-2 py-1 text-xs rounded font-semibold ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-2 border capitalize">{user.gender || "N/A"}</td>
                <td className="px-4 py-2 border">
                  {user.isVerified ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
