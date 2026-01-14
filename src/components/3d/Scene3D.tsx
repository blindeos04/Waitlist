"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

const PRIMARY = "#9e9a8d";
const ACCENT = "#80011f";

// --- PERSON FIGURE ---
function PersonFigure({ label = "LEAD", color = PRIMARY, scale = 1 }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={groupRef} scale={scale}>
            {/* Head */}
            <mesh position={[0, 1.1, 0]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
            </mesh>
            {/* Neck */}
            <mesh position={[0, 0.88, 0]}>
                <cylinderGeometry args={[0.07, 0.07, 0.1, 16]} />
                <meshStandardMaterial color={color} />
            </mesh>
            {/* Torso */}
            <mesh position={[0, 0.5, 0]}>
                <capsuleGeometry args={[0.18, 0.45, 8, 16]} />
                <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
            </mesh>
            {/* Arms */}
            <group position={[-0.28, 0.65, 0]} rotation={[0, 0, 0.25]}>
                <mesh><capsuleGeometry args={[0.05, 0.28, 4, 8]} /><meshStandardMaterial color={color} /></mesh>
            </group>
            <group position={[0.28, 0.65, 0]} rotation={[0, 0, -0.25]}>
                <mesh><capsuleGeometry args={[0.05, 0.28, 4, 8]} /><meshStandardMaterial color={color} /></mesh>
            </group>
            {/* Legs */}
            <mesh position={[-0.1, 0.1, 0]}><capsuleGeometry args={[0.06, 0.32, 4, 8]} /><meshStandardMaterial color="#333" /></mesh>
            <mesh position={[0.1, 0.1, 0]}><capsuleGeometry args={[0.06, 0.32, 4, 8]} /><meshStandardMaterial color="#333" /></mesh>
            {/* Label */}
            <Text position={[0, -0.3, 0]} fontSize={0.12} color={color} anchorX="center">{label}</Text>
        </group>
    );
}

// --- PHONE ---
function Phone({ scale = 1 }) {
    const groupRef = useRef<THREE.Group>(null);
    const screenRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
        }
        if (screenRef.current) {
            const mat = screenRef.current.material as THREE.MeshStandardMaterial;
            mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
        }
    });

    return (
        <group ref={groupRef} scale={scale}>
            <mesh><boxGeometry args={[0.45, 0.85, 0.035]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[0, 0, 0.019]}><boxGeometry args={[0.4, 0.75, 0.005]} /><meshStandardMaterial color="#111" /></mesh>
            <mesh ref={screenRef} position={[0, 0, 0.023]}><boxGeometry args={[0.38, 0.72, 0.002]} /><meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.6} toneMapped={false} /></mesh>
            <mesh position={[0, 0.36, 0.025]}><boxGeometry args={[0.12, 0.025, 0.005]} /><meshStandardMaterial color="#000" /></mesh>
            <Text position={[0, -0.55, 0]} fontSize={0.1} color={PRIMARY} anchorX="center">OUTREACH</Text>
        </group>
    );
}

// --- CALENDAR ---
function Calendar({ scale = 1 }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <group ref={groupRef} scale={scale}>
            <mesh><boxGeometry args={[0.8, 0.65, 0.045]} /><meshStandardMaterial color="#f5f5f5" roughness={0.3} /></mesh>
            <mesh position={[0, 0.23, 0.024]}><boxGeometry args={[0.8, 0.15, 0.01]} /><meshStandardMaterial color={ACCENT} /></mesh>
            {[-0.22, 0, 0.22].map((x, i) => (
                <mesh key={i} position={[x, 0.33, 0]}><cylinderGeometry args={[0.03, 0.03, 0.07, 16]} /><meshStandardMaterial color="#888" metalness={0.8} /></mesh>
            ))}
            {[0, 1, 2, 3, 4].map((col) =>
                [0, 1].map((row) => {
                    const isBooked = col === 3 && row === 0;
                    return (
                        <mesh key={`${col}-${row}`} position={[-0.28 + col * 0.14, 0.02 - row * 0.14, 0.028]}>
                            <boxGeometry args={[0.11, 0.11, 0.005]} />
                            <meshStandardMaterial color={isBooked ? ACCENT : "#e0e0e0"} emissive={isBooked ? ACCENT : "#000"} emissiveIntensity={isBooked ? 0.5 : 0} />
                        </mesh>
                    );
                })
            )}
            <Text position={[0, -0.45, 0]} fontSize={0.1} color={PRIMARY} anchorX="center">BOOKED</Text>
        </group>
    );
}

// --- GLOWING ARC THAT CONNECTS ALL ELEMENTS ---
function ConnectingArc() {
    const arcRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (arcRef.current) {
            const mat = arcRef.current.material as THREE.MeshStandardMaterial;
            mat.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
        }
    });

    return (
        <mesh ref={arcRef} position={[0, 0.3, -0.5]} rotation={[0.2, 0, 0]}>
            <torusGeometry args={[3.2, 0.02, 8, 128, Math.PI]} />
            <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={2}
                transparent
                opacity={0.6}
                toneMapped={false}
            />
        </mesh>
    );
}

// --- UNIFIED HERO 3D SCENE ---
export function HeroScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0.5, 6], fov: 50 }}
                gl={{ alpha: true }}
                style={{ touchAction: 'none' }}
            >
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <directionalLight position={[-5, 5, 5]} intensity={0.5} color={PRIMARY} />
                    <pointLight position={[0, 0, 4]} intensity={0.5} color="#fff" />
                    <pointLight position={[-3, 0, 2]} intensity={0.3} color={PRIMARY} />
                    <pointLight position={[3, 0, 2]} intensity={0.3} color={ACCENT} />

                    {/* CONNECTING ARC - positioned to touch all elements */}
                    <ConnectingArc />

                    {/* LEFT: Lead Person */}
                    <Float speed={2} floatIntensity={0.3}>
                        <group position={[-3.2, -0.2, 0]}>
                            <PersonFigure label="LEAD" color="#666" scale={0.9} />
                        </group>
                    </Float>

                    {/* TOP CENTER: Phone/Outreach */}
                    <Float speed={1.5} floatIntensity={0.2}>
                        <group position={[0, 1.2, 0]}>
                            <Phone scale={0.85} />
                        </group>
                    </Float>

                    {/* RIGHT: Calendar */}
                    <Float speed={1.5} floatIntensity={0.2}>
                        <group position={[3.2, -0.2, 0]}>
                            <Calendar scale={0.85} />
                        </group>
                    </Float>
                </Suspense>
            </Canvas>
        </div>
    );
}
