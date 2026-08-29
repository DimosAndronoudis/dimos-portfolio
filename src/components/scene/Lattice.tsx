"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const POINTS = 320;
const MAX_SEGMENTS = 700;
const LINK_DISTANCE = 1.15;
const SPREAD = 5.2;

/** Deterministic PRNG so the field is identical on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildField() {
  const random = mulberry32(0x5eed);
  const points = new Float32Array(POINTS * 3);

  for (let i = 0; i < POINTS; i++) {
    points[i * 3] = (random() - 0.5) * SPREAD * 2;
    points[i * 3 + 1] = (random() - 0.5) * SPREAD;
    points[i * 3 + 2] = (random() - 0.5) * SPREAD;
  }

  // Link near neighbours once, at build time — nothing is recomputed per frame.
  const segments: number[] = [];
  for (let i = 0; i < POINTS && segments.length < MAX_SEGMENTS * 6; i++) {
    for (let j = i + 1; j < POINTS; j++) {
      const dx = points[i * 3] - points[j * 3];
      const dy = points[i * 3 + 1] - points[j * 3 + 1];
      const dz = points[i * 3 + 2] - points[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz > LINK_DISTANCE * LINK_DISTANCE) continue;
      segments.push(
        points[i * 3], points[i * 3 + 1], points[i * 3 + 2],
        points[j * 3], points[j * 3 + 1], points[j * 3 + 2],
      );
      if (segments.length >= MAX_SEGMENTS * 6) break;
    }
  }

  return { points, links: new Float32Array(segments) };
}

function Field() {
  const group = useRef<THREE.Group>(null);
  const { points, links } = useMemo(() => buildField(), []);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;
    // Slow drift, plus a shallow parallax lean toward the pointer.
    node.rotation.y += delta * 0.035;
    node.rotation.x = THREE.MathUtils.lerp(
      node.rotation.x,
      state.pointer.y * 0.16,
      0.03,
    );
    node.position.x = THREE.MathUtils.lerp(
      node.position.x,
      state.pointer.x * 0.5,
      0.03,
    );
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[links, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#33415a" transparent opacity={0.5} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ffb454"
          size={0.032}
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>
    </group>
  );
}

export function Lattice() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 7], fov: 55 }}
    >
      <fog attach="fog" args={["#0b0e14", 6, 13]} />
      <Field />
    </Canvas>
  );
}
