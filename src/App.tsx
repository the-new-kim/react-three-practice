import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import { Mesh } from "three";
import { Ball } from "./components/Ball";

function Box() {
  const meshRef = useRef<Mesh>(null);
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.01;
    // meshRef.current.rotation.z += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
}

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Suspense>
        <Canvas
          style={{
            width: "100%",
            height: "100vh",
            background: "black",
          }}
        >
          <pointLight position={[0, 10, 100]} intensity={0.8} />
          <directionalLight position={[0, -100, -5]} intensity={0.2} />
          <Box />
          <Ball position={[2, 0, 0]} />

          <Stars />

          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
