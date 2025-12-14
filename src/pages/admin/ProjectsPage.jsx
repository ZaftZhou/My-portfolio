import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, StarOff, Save, X } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/siteData';

function ProjectsPage() {
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleEdit = (project) => {
    setCurrentProject({ ...project });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentProject.id) {
      // Update existing
      setProjects(projects.map(p => p.id === currentProject.id ? currentProject : p));
    } else {
      // Add new
      const newProject = {
        ...currentProject,
        id: Math.max(...projects.map(p => p.id)) + 1
      };
      setProjects([...projects, newProject]);
    }
    setIsEditing(false);
    setCurrentProject(null);

    // TODO: 这里应该保存到后端或本地存储
    console.log('Project saved:', currentProject);
    alert('项目已保存！注意：这是演示版本，数据仅保存在内存中。');
  };

  const handleDelete = (id) => {
    if (confirm('确定要删除这个项目吗？')) {
      setProjects(projects.filter(p => p.id !== id));
      alert('项目已删除！注意：这是演示版本，数据仅保存在内存中。');
    }
  };

  const toggleFeatured = (id) => {
    setProjects(projects.map(p =>
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  const handleNewProject = () => {
    setCurrentProject({
      title: '',
      slug: '',
      category: 'Game Dev',
      description: '',
      tags: [],
      color: 'from-cyan-500 to-blue-600',
      featured: false,
      details: {
        role: '',
        duration: '',
        challenge: '',
        solution: '',
        features: [],
        media: []
      }
    });
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">项目管理</h1>
          <p className="text-slate-400">管理你的所有作品集项目</p>
        </div>
        <button
          onClick={handleNewProject}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all"
        >
          <Plus size={20} />
          添加新项目
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && currentProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-3xl w-full my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {currentProject.id ? '编辑项目' : '添加新项目'}
              </h2>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentProject(null);
                }}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">项目标题</label>
                <input
                  type="text"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="例如：VINCE – Virtual Integration Home"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">URL Slug</label>
                <input
                  type="text"
                  value={currentProject.slug}
                  onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="例如：vince-virtual-integration"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">分类</label>
                <select
                  value={currentProject.category}
                  onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option>Game Dev</option>
                  <option>Shaders</option>
                  <option>Simulator</option>
                  <option>3D Art</option>
                  <option>Tools</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">项目描述</label>
                <textarea
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  placeholder="简短描述项目..."
                />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={currentProject.featured || false}
                  onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-2 focus:ring-cyan-500"
                />
                <label htmlFor="featured" className="text-slate-300 font-medium cursor-pointer">
                  设为精选项目（在首页展示）
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-800">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all"
              >
                <Save size={20} />
                保存
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentProject(null);
                }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all"
              >
                取消
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-500 text-center">
              💡 注意：当前为演示版本，数据保存在内存中。生产环境需要连接后端 API。
            </p>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-2xl font-bold text-white">{project.id}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-cyan-400">{project.category}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{project.slug}</span>
                    </div>
                  </div>
                  {project.featured && (
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30 whitespace-nowrap">
                      精选
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleFeatured(project.id)}
                  className={`p-2 rounded-lg transition-all ${
                    project.featured
                      ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                  title={project.featured ? '取消精选' : '设为精选'}
                >
                  {project.featured ? <Star size={18} fill="currentColor" /> : <StarOff size={18} />}
                </button>
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all"
                  title="编辑"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg transition-all"
                  title="删除"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg mb-4">还没有任何项目</p>
          <button
            onClick={handleNewProject}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all"
          >
            <Plus size={20} />
            添加第一个项目
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
