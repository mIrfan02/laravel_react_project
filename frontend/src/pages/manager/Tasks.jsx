import { useState, useEffect } from 'react';
import { Search, X, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { taskAPI } from '../../services/api';

const ManagerTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getMyTasks();
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskAPI.updateStatus(taskId, newStatus);

      // Update local state
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ));

      if (selectedTask?.id === taskId) {
        setSelectedTask({ ...selectedTask, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating task status:', err);
      alert('Failed to update task status');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      'completed': 'bg-green-100 text-green-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      'pending': 'bg-amber-100 text-amber-700',
      'overdue': 'bg-red-100 text-red-700'
    };
    return badges[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      'high': 'bg-red-100 text-red-700 border-red-200',
      'medium': 'bg-amber-100 text-amber-700 border-amber-200',
      'low': 'bg-green-100 text-green-700 border-green-200'
    };
    return badges[priority] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    if (status === 'overdue') return <AlertCircle className="w-5 h-5 text-red-600" />;
    return <Calendar className="w-5 h-5 text-blue-600" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600 mt-1">Manage and track your assigned tasks</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field min-w-[150px]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="card hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-primary-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(task.status)}
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{task.description}</p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(task.priority)}`}>
                      {task.priority} priority
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {task.due_date}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Branch: {task.branch?.name || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <CheckCircle2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No tasks found</p>
        </div>
      )}

      {/* Task Detail Drawer */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">Task Details</h2>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
              {/* Title and Status */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedTask.title}</h3>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBadge(selectedTask.status)}`}>
                    {selectedTask.status}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{selectedTask.description}</p>
              </div>

              {/* Task Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card bg-gray-50">
                  <p className="text-sm font-medium text-gray-600 mb-1">Priority</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getPriorityBadge(selectedTask.priority)}`}>
                    {selectedTask.priority}
                  </span>
                </div>
                <div className="card bg-gray-50">
                  <p className="text-sm font-medium text-gray-600 mb-1">Branch</p>
                  <p className="text-gray-900 font-semibold">{selectedTask.branch?.name || 'N/A'}</p>
                </div>
                <div className="card bg-gray-50">
                  <p className="text-sm font-medium text-gray-600 mb-1">Created Date</p>
                  <p className="text-gray-900 font-semibold">
                    {selectedTask.created_at ? new Date(selectedTask.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="card bg-gray-50">
                  <p className="text-sm font-medium text-gray-600 mb-1">Due Date</p>
                  <p className="text-gray-900 font-semibold">{selectedTask.due_date}</p>
                </div>
              </div>

              {/* Update Status */}
              <div className="card bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Update Task Status</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleStatusChange(selectedTask.id, 'pending')}
                    className={`p-3 rounded-lg border-2 font-medium transition-all ${
                      selectedTask.status === 'pending'
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedTask.id, 'in-progress')}
                    className={`p-3 rounded-lg border-2 font-medium transition-all ${
                      selectedTask.status === 'in-progress'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedTask.id, 'completed')}
                    className={`p-3 rounded-lg border-2 font-medium transition-all ${
                      selectedTask.status === 'completed'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedTask.id, 'overdue')}
                    className={`p-3 rounded-lg border-2 font-medium transition-all ${
                      selectedTask.status === 'overdue'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-red-300'
                    }`}
                  >
                    Overdue
                  </button>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Task created</p>
                      <p className="text-xs text-gray-500">
                        {selectedTask.created_at ? new Date(selectedTask.created_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                  {selectedTask.status === 'completed' && selectedTask.completed_date && (
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Task completed</p>
                        <p className="text-xs text-gray-500">
                          {new Date(selectedTask.completed_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerTasks;