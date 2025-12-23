import StudioScene from "@/components/studio/StudioScene";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <StudioScene />

      {/* UI Overlays */}
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-indigo-600 bg-clip-text text-transparent tracking-tighter">
          ZHOU BOWEN / STUDIO
        </h1>
        <p className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mt-2">
          Technical Generalist Portfolio
        </p>
      </div>

      <div className="absolute bottom-10 right-10 z-10 text-right pointer-events-none">
        <p className="text-[10px] font-black text-cyan-500/50 tracking-widest uppercase mb-1">
          _ENV_CONNECTED
        </p>
        <p className="text-slate-600 text-[10px] uppercase font-bold">
          Orbit: LMB / Zoom: SCRL
        </p>
      </div>
    </main>
  );
}
