import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Briefcase, Settings, TrendingUp, Eye, Calendar } from 'lucide-react';
import { PROJECTS_DATA, EXPERIENCE_DATA } from '../../data/siteData';

function DashboardPage() {
  const stats = [
    {
      name: '总项目数',
      value: PROJECTS_DATA.length,
      icon: FolderOpen,
      color: 'from-cyan-500 to-blue-600',
      link: '/admin/projects'
    },
    {
      name: '精选项目',
      value: PROJECTS_DATA.filter(p => p.featured).length,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      link: '/admin/projects'
    },
    {
      name: '工作经历',
      value: EXPERIENCE_DATA.length,
      icon: Briefcase,
      color: 'from-emerald-500 to-teal-600',
      link: '/admin/experience'
    },
  ];

  const recentProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">欢迎回来！👋</h1>
        <p className="text-slate-400">这里是你的作品集管理中心，你可以在这里管理所有内容。</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium group-hover:text-cyan-400 transition-colors">
                {stat.name}
              </h3>
            </Link>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar size={20} className="text-cyan-400" />
            最近的项目
          </h2>
          <Link
            to="/admin/projects"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            查看全部 →
          </Link>
        </div>

        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-all"
            >
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
                <FolderOpen size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{project.title}</h3>
                <p className="text-slate-400 text-sm">{project.category}</p>
              </div>
              {project.featured && (
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30">
                  精选
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">快速操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/projects"
            className="p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-all text-center group"
          >
            <FolderOpen size={32} className="text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-slate-300 text-sm font-medium">管理项目</span>
          </Link>
          <Link
            to="/admin/experience"
            className="p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-all text-center group"
          >
            <Briefcase size={32} className="text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-slate-300 text-sm font-medium">工作经历</span>
          </Link>
          <Link
            to="/admin/settings"
            className="p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-all text-center group"
          >
            <Settings size={32} className="text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-slate-300 text-sm font-medium">个人设置</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            className="p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-all text-center group"
          >
            <Eye size={32} className="text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-slate-300 text-sm font-medium">预览网站</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
