import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, Code, ImageIcon, Play, Video } from 'lucide-react';
import Lightbox from '../components/portfolio/Lightbox';
import { PROJECTS_DATA } from '../data/siteData';

function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // 根据 slug 查找项目
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 如果找不到项目，重定向到 Portfolio 页面
  useEffect(() => {
    if (!project) {
      navigate('/portfolio');
    }
  }, [project, navigate]);

  if (!project) return null;

  const { details } = project;
  const mediaList = details.media || [];

  const openLightbox = (index) => {
    setCurrentMediaIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  return (
    <div className="min-h-screen bg-slate-950 animate-in fade-in duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 z-40 h-16 flex items-center px-4 sm:px-8 justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors font-medium group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </nav>

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className={`w-full h-64 md:h-96 rounded-3xl bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center shadow-2xl shadow-cyan-900/20 mb-12`}>
          <div className="absolute bottom-8 left-8 md:left-12 right-8">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase bg-black/30 backdrop-blur-md border border-white/10 rounded-full text-cyan-400">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Left Content */}
          <div className="md:col-span-2 space-y-10">
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Cpu size={20} className="text-cyan-500" /> The Challenge
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">{details?.challenge}</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code size={20} className="text-cyan-500" /> The Solution
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">{details?.solution}</p>
            </section>

            {/* Gallery */}
            <section>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ImageIcon size={20} className="text-cyan-500" /> Gallery & Media
              </h3>
              {mediaList.length > 0 ? (
                <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                  {mediaList.map((mediaItem, idx) => (
                    <div
                      key={idx}
                      className="break-inside-avoid relative group rounded-xl overflow-hidden bg-slate-800 border border-slate-700 cursor-pointer shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                      onClick={() => openLightbox(idx)}
                    >
                      {mediaItem.type === 'video' ? (
                        <div className="relative">
                          <video
                            src={mediaItem.url}
                            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                            muted
                            preload="metadata"
                            poster={mediaItem.poster}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-all duration-500">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/80 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Play fill="white" className="text-white ml-1" size={20} />
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-xs font-bold text-white flex items-center gap-1">
                            <Video size={12} /> Video
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={mediaItem.url}
                            alt={mediaItem.caption || `Gallery Image ${idx}`}
                            className="w-full h-auto object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                        </div>
                      )}

                      {/* Caption */}
                      {mediaItem.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-sm font-medium">{mediaItem.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 border border-dashed border-slate-700 p-8 rounded-xl text-center">
                  No media available for this project yet.
                </p>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-8 h-fit">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Project Details</h4>
              <div className="space-y-4">
                <div>
                  <span className="text-slate-500 text-sm block mb-1">Role</span>
                  <span className="text-white font-medium">{details?.role}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-sm block mb-1">Duration</span>
                  <span className="text-white font-medium">{details?.duration}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-sm block mb-1">Tech Stack</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-slate-800 border border-slate-700 rounded text-cyan-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        mediaList={mediaList}
        currentIndex={currentMediaIndex}
        onClose={closeLightbox}
        onNext={nextMedia}
        onPrev={prevMedia}
      />
    </div>
  );
}

export default ProjectDetailPage;
