"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, LogOut, Eye, Database } from "lucide-react";
import { PROJECTS_DATA } from "@/lib/siteData";

export default function AdminDashboard() {
    const [projects, setProjects] = useState(PROJECTS_DATA);
    const [activeTab, setActiveTab] = useState("projects");

    const tabs = [
        { id: "projects", label: "PROJECTS", count: projects.length },
        { id: "devlog", label: "DEVLOG", count: 0 },
        { id: "lab", label: "LAB", count: 0 },
    ];

    return (
        <div className="min-h-screen bg-prime-950">
            {/* Admin Header */}
            <header className="glass border-b border-white/5 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Database className="text-cyan-500" size={24} />
                        <h1 className="text-xl font-black text-white tracking-tighter uppercase">
                            ADMIN<span className="text-cyan-500">.</span>PANEL
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-[10px] font-black text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center gap-2">
                            <Eye size={14} /> VIEW SITE
                        </Link>
                        <button className="text-[10px] font-black text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest flex items-center gap-2">
                            <LogOut size={14} /> LOGOUT
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-full w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === tab.id
                                    ? "bg-cyan-500 text-black"
                                    : "text-slate-400 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                        {activeTab === "projects" && "Manage Projects"}
                        {activeTab === "devlog" && "Manage Devlog"}
                        {activeTab === "lab" && "Manage Lab"}
                    </h2>
                    <button className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-colors shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                        <Plus size={16} /> ADD NEW
                    </button>
                </div>

                {/* Projects Table */}
                {activeTab === "projects" && (
                    <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="text-left p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Title</th>
                                    <th className="text-left p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</th>
                                    <th className="text-left p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Featured</th>
                                    <th className="text-right p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white">{project.title}</div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">{project.slug}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.featured ? "bg-green-500/20 text-green-400" : "bg-white/5 text-slate-500"
                                                }`}>
                                                {project.featured ? "YES" : "NO"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Placeholder for other tabs */}
                {activeTab !== "projects" && (
                    <div className="glass-card rounded-2xl p-20 text-center border border-white/5">
                        <p className="text-slate-500 uppercase tracking-widest font-black opacity-50">
                            DB_CONNECTION_REQUIRED: Connect Vercel Postgres to enable this feature.
                        </p>
                    </div>
                )}
            </div>

            {/* Database Status Footer */}
            <footer className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 py-3 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                        <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                            LOCAL_MODE: Using static data (siteData.js)
                        </span>
                    </div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        Connect Vercel Postgres for live database
                    </span>
                </div>
            </footer>
        </div>
    );
}
