import { useState, useEffect } from 'react';
import { CheckSquare, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardAPI, taskAPI } from '../../services/api';

const ManagerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, tasksRes] = await Promise.all([
        dashboardAPI.getStats(),
        taskAPI.getMyTasks()
      ]);

      setStats(statsRes.data);
      setMyTasks(tasksRes.data.slice(0, 5)); // Latest 5 tasks
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
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

  const completedTasks = stats?.completed_tasks || 0;
  const pendingTasks = stats?.pending_tasks || 0;
  const overdueTasks = stats?.overdue_tasks || 0;
  const totalTasks = stats?.total_tasks || 0;

  const statsData = [
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: CheckSquare,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+3',
      trend: 'up'
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      icon: Clock,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '-2',
      trend: 'down'
    },
    {
      title: 'Overdue Tasks',
      value: overdueTasks,
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      change: '-1',
      trend: 'down'
    },
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: TrendingUp,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+2',
      trend: 'up'
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

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-700 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center ring-4 ring-white/30">
            <span className="text-3xl font-bold text-white">
              {currentUser.name?.charAt(0) || 'M'}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}!</h1>
            <p className="text-primary-100 mt-1">Here's your performance overview</p>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Tasks */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">My Recent Tasks</h2>
          <Link to="/manager/tasks" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </Link>
        </div>

        {myTasks.length > 0 ? (
          <div className="space-y-4">
            {myTasks.map((task) => (
              <div key={task.id} className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${getStatusBadge(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBadge(task.priority)}`}>
                      {task.priority} priority
                    </span>
                  </div>
                  <div className="text-gray-500">
                    Due: {task.due_date}
                  </div>
                  <div className="text-gray-500">
                    {task.branch?.name || 'N/A'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No tasks assigned yet</p>
          </div>
        )}
      </div>

      {/* Progress Overview */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Task Completion Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-semibold text-gray-900">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all"
                style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
              <p className="text-xs text-gray-500 mt-1">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{pendingTasks}</p>
              <p className="text-xs text-gray-500 mt-1">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{overdueTasks}</p>
              <p className="text-xs text-gray-500 mt-1">Overdue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;