import { useState, useEffect } from 'react';
import { Users, CheckSquare, Clock, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardAPI, taskAPI, managerAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, tasksRes, managersRes] = await Promise.all([
        dashboardAPI.getStats(),
        taskAPI.getAll(),
        managerAPI.getAll()
      ]);

      setStats(statsRes.data);
      setTasks(tasksRes.data.slice(0, 5)); // Latest 5 tasks
      setManagers(managersRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
          <button onClick={fetchData} className="mt-2 text-red-600 underline">
            Try again
          </button>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Managers',
      value: stats?.total_managers || 0,
      icon: Users,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Tasks',
      value: stats?.total_tasks || 0,
      icon: CheckSquare,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Pending Tasks',
      value: stats?.pending_tasks || 0,
      icon: Clock,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      change: '-3%',
      trend: 'down'
    },
    {
      title: 'Overdue Tasks',
      value: stats?.overdue_tasks || 0,
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      change: '-15%',
      trend: 'down'
    }
  ];

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
      'high': 'bg-red-100 text-red-700',
      'medium': 'bg-amber-100 text-amber-700',
      'low': 'bg-green-100 text-green-700'
    };
    return badges[priority] || 'bg-gray-100 text-gray-700';
  };

  const totalTasks = stats?.total_tasks || 1; // Avoid division by zero
  const completedTasks = stats?.completed_tasks || 0;
  const inProgressTasks = stats?.in_progress_tasks || 0;
  const pendingTasks = stats?.pending_tasks || 0;
  const overdueTasks = stats?.overdue_tasks || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-2 mt-3">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`w-16 h-16 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Status Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Completed</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{completedTasks} tasks</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">In Progress</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{inProgressTasks} tasks</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(inProgressTasks / totalTasks) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Pending</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{pendingTasks} tasks</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all"
                style={{ width: `${(pendingTasks / totalTasks) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Overdue</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{overdueTasks} tasks</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all"
                style={{ width: `${(overdueTasks / totalTasks) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Managers</h3>
          {managers.length > 0 ? (
            <div className="space-y-4">
              {managers
                .sort((a, b) => (b.tasks_completed || 0) - (a.tasks_completed || 0))
                .slice(0, 5)
                .map((manager, index) => (
                  <div key={manager.id} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-700">#{index + 1}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center ring-2 ring-primary-200">
                      <span className="text-sm font-semibold text-primary-700">
                        {manager.name?.charAt(0) || 'M'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{manager.name}</p>
                      <p className="text-xs text-gray-500">{manager.branch?.name || 'No branch'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{manager.tasks_completed || 0}</p>
                      <p className="text-xs text-gray-500">completed</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No managers found</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
          <Link to="/admin/tasks" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </Link>
        </div>
        {tasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Assigned To</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{task.branch?.name || 'N/A'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary-700">
                            {task.assigned_to?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900">{task.assigned_to?.name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{task.due_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;