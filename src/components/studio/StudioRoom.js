"use client";

import { useState } from "react";
import { Box, Text, Html, useCursor } from "@react-three/drei";
import { useRouter } from "next/navigation";

export default function StudioRoom() {
    const router = useRouter();
    const [hovered, setHovered] = useState(null);

    useCursor(!!hovered);

    const navigate = (path) => {
        router.push(path);
    };

    return (
        <group position={[0, -1, 0]}>
            {/* Desk Base */}
            <Box args={[5.5, 0.15, 2.5]} position={[0, 1, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#1e293b" />
            </Box>
            <Box args={[0.15, 1, 0.15]} position={[-2.6, 0.5, 1.1]} castShadow />
            <Box args={[0.15, 1, 0.15]} position={[2.6, 0.5, 1.1]} castShadow />
            <Box args={[0.15, 1, 0.15]} position={[-2.6, 0.5, -1.1]} castShadow />
            <Box args={[0.15, 1, 0.15]} position={[2.6, 0.5, -1.1]} castShadow />

            {/* Monitor -> Portfolio */}
            <group
                position={[0, 1.8, -0.6]}
                onPointerOver={() => setHovered('portfolio')}
                onPointerOut={() => setHovered(null)}
                onClick={() => navigate('/portfolio')}
            >
                <Box args={[2.8, 1.6, 0.15]} castShadow>
                    <meshStandardMaterial color={hovered === 'portfolio' ? "#0f172a" : "#020617"} />
                </Box>
                <Box args={[0.3, 0.8, 0.1]} position={[0, -1.1, 0]} />
                <Box args={[1.2, 0.1, 0.6]} position={[0, -1.45, 0]} />

                <Html transform position={[0, 0, 0.09]} distanceFactor={1.8} pointerEvents="none">
                    <div className="w-[1280px] h-[800px] bg-prime-950 p-10 flex flex-col items-center justify-center border-[8px] border-cyan-500/20 rounded-xl overflow-hidden select-none">
                        <div className="text-[120px] font-black text-white mb-6 tracking-tighter uppercase">
                            PORTFOLIO<span className="text-cyan-500">.</span>OS
                        </div>
                        <div className={`text-4xl font-mono px-8 py-3 rounded-full border border-cyan-500/50 text-cyan-400 transition-all duration-300 ${hovered === 'portfolio' ? 'bg-cyan-500 text-black scale-110 shadow-[0_0_50px_rgba(34,211,238,0.5)]' : 'animate-pulse'}`}>
                            INITIALIZE_SYSTEM_CLICK
                        </div>
                    </div>
                </Html>
            </group>

            {/* Devlog Book -> Devlog */}
            <group
                position={[-1.8, 1.15, 0.4]}
                rotation={[0, 0.4, 0]}
                onPointerOver={() => setHovered('devlog')}
                onPointerOut={() => setHovered(null)}
                onClick={() => navigate('/devlog')}
            >
                <Box args={[0.6, 0.1, 0.8]} castShadow>
                    <meshStandardMaterial color={hovered === 'devlog' ? "#818cf8" : "#4f46e5"} />
                </Box>
                <Text position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.08} color="white" font="/fonts/inter-bold.woff">
                    TECH_LOGS
                </Text>
            </group>

            {/* Lab Sphere -> Lab */}
            <mesh
                position={[2, 1.4, 0.3]}
                onPointerOver={() => setHovered('lab')}
                onPointerOut={() => setHovered(null)}
                onClick={() => navigate('/lab')}
            >
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial
                    color="#22d3ee"
                    emissive="#22d3ee"
                    emissiveIntensity={hovered === 'lab' ? 5 : 2}
                />
                <pointLight intensity={2} color="#22d3ee" />
            </mesh>
        </group>
    );
}
