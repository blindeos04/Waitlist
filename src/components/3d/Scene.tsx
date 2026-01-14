"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload, Float } from "@react-three/drei";

interface SceneProps {
    children: React.ReactNode;
}

export function Scene({ children }: SceneProps) {
    return (
        <div className="h-full w-full min-h-[400px]">
            <Canvas
                camera={{ position: [0, 0, 14], fov: 45 }} /* Moved camera back (z:14) and increased FOV (45) */
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    {/* High Intensity Lighting Bundle for Dark Mode Visibility */}
                    <ambientLight intensity={1.5} /> {/* Increased base brightness */}

                    <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
                    <directionalLight position={[-5, 5, 5]} intensity={2} color="#9e9a8d" /> {/* Primary fill */}

                    {/* Rim Light for separation */}
                    <spotLight position={[0, 10, -5]} intensity={5} angle={0.5} penumbra={1} color="#80011f" />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        {children}
                    </Float>

                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
