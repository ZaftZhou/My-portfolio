import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: '项目管理', path: '/admin/projects', icon: FolderOpen },
    { name: '工作经历', path: '/admin/experience', icon: Briefcase },
    { name: '个人设置', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      logout();
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          {isSidebarOpen ? (
            <>
              <Link to="/" className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Portfolio Admin
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors mx-auto"
            >
              <Menu size={20} />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
                title={!isSidebarOpen ? item.name : ''}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">退出登录</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Top Bar */}
        <header className="h-16 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-white">
            {menuItems.find((item) => item.path === location.pathname)?.name || 'Admin'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg">
              <User size={18} className="text-cyan-400" />
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
