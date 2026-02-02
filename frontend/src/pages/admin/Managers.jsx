import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Mail, MapPin, Calendar, X } from 'lucide-react';
import { managerAPI, branchAPI } from '../../services/api';

const AdminManagers = () => {
  const [managers, setManagers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingManager, setEditingManager] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    branch_id: '',
    phone: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [managersRes, branchesRes] = await Promise.all([
        managerAPI.getAll(),
        branchAPI.getAll()
      ]);
      setManagers(managersRes.data);
      setBranches(branchesRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load managers');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingManager(null);
    setFormData({ name: '', email: '', password: '', branch_id: '', phone: '' });
    setShowModal(true);
    setError('');
  };

  const handleOpenEdit = (manager) => {
    setEditingManager(manager);
    setFormData({
      name: manager.name,
      email: manager.email,
      password: '', // Don't show existing password
      branch_id: manager.branch?.id || manager.branch_id || '',
      phone: manager.phone || ''
    });
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For edit, only send password if it's not empty
      const submitData = { ...formData };
      if (editingManager && !submitData.password) {
        delete submitData.password;
      }

      if (editingManager) {
        await managerAPI.update(editingManager.id, submitData);
      } else {
        await managerAPI.create(submitData);
      }

      const managersRes = await managerAPI.getAll();
      setManagers(managersRes.data);
      setShowModal(false);
    } catch (err) {
      console.error('Error saving manager:', err);
      setError(err.response?.data?.message || 'Failed to save manager');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteManager = async (managerId) => {
    if (!confirm('Are you sure you want to delete this manager?')) return;

    try {
      await managerAPI.delete(managerId);
      setManagers(managers.filter(m => m.id !== managerId));
    } catch (err) {
      console.error('Error deleting manager:', err);
      alert('Failed to delete manager');
    }
  };

  const filteredManagers = managers.filter(manager =>
    manager.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.branch?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && managers.length === 0) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Managers</h1>
          <p className="text-gray-600 mt-1">Manage your team of managers</p>
        </div>
        <button onClick={handleOpenCreate} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Manager
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-sm text-red-700">{error}</p></div>}

      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search managers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field pl-10" />
        </div>
      </div>

      {filteredManagers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredManagers.map((manager) => (
            <div key={manager.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center ring-4 ring-primary-50">
                    <span className="text-xl font-bold text-primary-700">{manager.name?.charAt(0) || 'M'}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{manager.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{manager.role || 'Manager'}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleOpenEdit(manager)} className="p-2 hover:bg-amber-50 rounded-lg text-amber-600 transition-colors" title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteManager(manager.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{manager.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{manager.branch?.name || 'No branch assigned'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {manager.created_at ? new Date(manager.created_at).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{manager.tasks_completed || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">{manager.tasks_pending || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">Pending</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12"><p className="text-gray-500">No managers found</p></div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">{editingManager ? 'Edit Manager' : 'Add New Manager'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-sm text-red-700">{error}</p></div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password {editingManager && <span className="text-xs text-gray-500">(leave empty to keep current)</span>}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field"
                  required={!editingManager}
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                <select value={formData.branch_id} onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })} className="input-field" required>
                  <option value="">Select Branch</option>
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1" disabled={loading}>{loading ? 'Saving...' : (editingManager ? 'Update Manager' : 'Add Manager')}</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagers;