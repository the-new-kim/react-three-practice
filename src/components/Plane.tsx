import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import { degreesToRadians } from "popmotion";

interface IPlaneProps {
  position?: any;
  rotationY?: number;
}

export default function Plane({ position, rotationY }: IPlaneProps) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(
    THREE.TextureLoader,
    "https://images.pexels.com/photos/12394537/pexels-photo-12394537.jpeg"
  );

  useEffect(() => {
    if (!meshRef.current || !rotationY) return;
    meshRef.current.rotation.y = degreesToRadians(rotationY);
  }, [meshRef, rotationY]);

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[4, 4]} />
      <meshBasicMaterial
        side={THREE.DoubleSide}
        map={texture}
        attach="material"
        // wireframe
      />
    </mesh>
  );
}
