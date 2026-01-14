"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Text, Float, Line, RoundedBox, Cone, Capsule } from "@react-three/drei";
import * as THREE from "three";

// --- High-Visibility Material Props ---
const GLASS_MAT = { color: "#ffffff", transparent: true, opacity: 0.1, roughness: 0.1, metalness: 0.9 };
const GLOW_MAT = { toneMapped: false }; // Allow colors to exceed 0-1 range

// --- Composite Geometries ---

function Person({ position, label, color = "#9e9a8d", isBooked = false }: { position: [number, number, number]; label?: string; color?: string; isBooked?: boolean }) {
    return (
        <group position={position}>
            <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Head */}
                <Sphere args={[0.35, 32, 32]} position={[0, 0.5, 0]}>
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.2} />
                </Sphere>
                {/* Body */}
                <Capsule args={[0.3, 0.7, 4, 8]} position={[0, -0.3, 0]}>
                    <meshStandardMaterial color={color} roughness={0.3} />
                </Capsule>

                {/* Validation Checkmark if Booked */}
                {isBooked && (
                    <Box args={[0.15, 0.15, 0.15]} position={[0.4, 0.5, 0.3]} rotation={[0, 0, 0.2]}>
                        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} {...GLOW_MAT} />
                    </Box>
                )}

                {label && (
                    <Text position={[0, -1.2, 0]} fontSize={0.25} color="white" font="/fonts/Inter-Bold.ttf" anchorX="center" anchorY="middle">
                        {label}
                    </Text>
                )}
            </Float>
        </group>
    );
}

function Phone({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
                {/* Body */}
                <RoundedBox args={[0.7, 1.4, 0.1]} radius={0.1} smoothness={4}>
                    <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
                </RoundedBox>
                {/* Screen Glow */}
                <Box args={[0.6, 1.3, 0.01]} position={[0, 0, 0.055]}>
                    <meshStandardMaterial color="#000" emissive="#80011f" emissiveIntensity={0.8} />
                </Box>
                {/* Notch */}
                <Box args={[0.2, 0.05, 0.06]} position={[0, 0.6, 0.05]}>
                    <meshStandardMaterial color="#000" />
                </Box>
                <Text position={[0, -1.0, 0]} fontSize={0.25} color="#ededed">
                    AI AGENT
                </Text>
            </Float>
        </group>
    );
}

function Calendar({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
                {/* Base */}
                <RoundedBox args={[1.4, 1.1, 0.1]} radius={0.05} smoothness={4}>
                    <meshStandardMaterial color="#f0f0f0" roughness={0.2} />
                </RoundedBox>
                {/* Header (Red) */}
                <Box args={[1.4, 0.25, 0.11]} position={[0, 0.45, 0]}>
                    <meshStandardMaterial color="#80011f" emissive="#80011f" emissiveIntensity={0.5} />
                </Box>

                {/* Grid Slots */}
                <group position={[-0.45, 0.1, 0.06]}>
                    <Box args={[0.25, 0.15, 0.01]} position={[0, 0, 0]}><meshStandardMaterial color="#ccc" /></Box>
                    <Box args={[0.25, 0.15, 0.01]} position={[0.3, 0, 0]}><meshStandardMaterial color="#ccc" /></Box>
                    <Box args={[0.25, 0.15, 0.01]} position={[0.6, 0, 0]}><meshStandardMaterial color="#ccc" /></Box>
                    <Box args={[0.25, 0.15, 0.01]} position={[0.9, 0, 0]}><meshStandardMaterial color="#ccc" /></Box>

                    <Box args={[0.25, 0.15, 0.01]} position={[0, -0.25, 0]}><meshStandardMaterial color="#ccc" /></Box>
                    <Box args={[0.25, 0.15, 0.01]} position={[0.3, -0.25, 0]}><meshStandardMaterial color="#ccc" /></Box>
                    {/* The Booked Slot (Green glow or Accent) */}
                    <Box args={[0.25, 0.15, 0.01]} position={[0.6, -0.25, 0]}>
                        <meshStandardMaterial color="#80011f" emissive="#80011f" emissiveIntensity={2} />
                    </Box>
                </group>

                <Text position={[0, -0.8, 0]} fontSize={0.25} color="#ededed">
                    SCHEDULE
                </Text>
            </Float>
        </group>
    );
}

// --- Main Flow Component ---

export function BookingFlow() {
    const signalRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        // Animate the signal particle
        if (signalRef.current) {
            const t = state.clock.getElapsedTime();
            // Simple linear interpolation back and forth
            // x ranges from approx -3 to +4
            const pos = -3 + (Math.sin(t * 1.5) + 1) * 3.5;
            signalRef.current.position.x = pos;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* 1. The Lead */}
            <Person position={[-3.5, 0, 0]} label="LEAD" color="#9e9a8d" />

            {/* Connection Line 1 */}
            <Line points={[[-3.5, 0, 0], [-1.2, 0, 0]]} color="#555" opacity={0.5} transparent lineWidth={3} />

            {/* 2. The AI Phone */}
            <Phone position={[-1.2, 0, 0]} />

            {/* Connection Line 2 */}
            <Line points={[[-1.2, 0, 0], [1.5, 0, 0]]} color="#555" opacity={0.5} transparent lineWidth={3} />

            {/* 3. The Calendar */}
            <Calendar position={[1.5, 0, 0]} />

            {/* Connection Line 3 */}
            <Line points={[[1.5, 0, 0], [4.5, 0, 0]]} color="#80011f" opacity={0.8} transparent lineWidth={4} />

            {/* 4. The Meeting (Booked) */}
            <group position={[4.5, 0, 0]}>
                <Person position={[-0.4, 0, 0]} color="#9e9a8d" />
                <Person position={[0.4, 0, 0]} color="#80011f" label="BOOKED" isBooked />
            </group>

            {/* Moving Data Signal */}
            <group ref={signalRef} position={[-3.5, 0.5, 0]}>
                <Sphere args={[0.15, 16, 16]}>
                    <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} {...GLOW_MAT} />
                </Sphere>
            </group>

        </group>
    );
}
