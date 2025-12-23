"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "admin123") { // Placeholder for demo
            router.push("/admin/dashboard");
        } else {
            alert("Unauthorized Access");
        }
    };

    return (
        <div className="min-h-screen bg-prime-950 flex items-center justify-center p-4">
            <div className="glass-card p-12 max-w-md w-full rounded-2xl border border-white/10">
                <h1 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase text-center">
                    SYSTEM<span className="text-cyan-500">.</span>ADMIN
                </h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Access Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                            placeholder="Enter system key..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition-colors shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                    >
                        INITIALIZE_SESSION
                    </button>
                </form>
            </div>
        </div>
    );
}
