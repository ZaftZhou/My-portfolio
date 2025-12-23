"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows } from "@react-three/drei";
import StudioRoom from "./StudioRoom";

export default function StudioScene() {
    return (
        <div className="w-full h-screen bg-prime-950">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[5, 3, 8]} fov={50} />

                <Suspense fallback={null}>
                    <Environment preset="city" intensity={0.5} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                    <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <StudioRoom />
                    </Float>

                    <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
                    <OrbitControls
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2}
                        minDistance={4}
                        maxDistance={15}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
