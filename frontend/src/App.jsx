import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminTasks from './pages/admin/Tasks';
import AdminManagers from './pages/admin/Managers';
import AdminBranches from './pages/admin/Branches';
import ManagerDashboard from './pages/manager/Dashboard';
import ManagerTasks from './pages/manager/Tasks';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [role, setRole] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || 'admin';
  });

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated');
      const userStr = localStorage.getItem('user');

      setIsAuthenticated(auth === 'true');

      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setRole(user.role || 'admin');
        } catch (e) {
          console.error('Error parsing user:', e);
        }
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to={role === 'admin' ? '/admin/dashboard' : '/manager/dashboard'} replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
        } />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout role={role} setRole={setRole} />
            </ProtectedRoute>
          }
        >
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/tasks" element={<AdminTasks />} />
          <Route path="admin/managers" element={<AdminManagers />} />
          <Route path="admin/branches" element={<AdminBranches />} />
          <Route path="manager/dashboard" element={<ManagerDashboard />} />
          <Route path="manager/tasks" element={<ManagerTasks />} />
          <Route path="*" element={<Navigate to={role === 'admin' ? '/admin/dashboard' : '/manager/dashboard'} replace />} />
        </Route>

        <Route path="/" element={<Navigate to={isAuthenticated ? (role === 'admin' ? '/admin/dashboard' : '/manager/dashboard') : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;