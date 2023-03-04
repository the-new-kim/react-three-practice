import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  circOut,
  cubicBezier,
  useScroll,
  useSpring,
  useTime,
  useTransform,
} from "framer-motion";
import { degreesToRadians } from "popmotion";
import { Suspense, useRef } from "react";

import { Mesh } from "three";
import { Ball } from "./components/Ball";
import Plane from "./components/Plane";
import Section from "./components/Section";

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

function Scene() {
  const { scrollYProgress } = useScroll();

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("Page scroll: ", latest);
  // });

  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(270)]
  );

  const distance = useTransform(scrollYProgress, [0, 1], [10, 5]);

  const time = useTime();

  const springY = useSpring(yAngle, {
    // duration: 1,
    // stiffness: 50,
    // velocity: 10,
    // mass: 0.5,
    // duration: 10,
    restSpeed: 3,
  });

  useFrame(({ camera }) => {
    camera.position.setFromCylindricalCoords(
      40,
      yAngle.get(),
      // time.get() * 0.0005
      1
    );

    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* <fog attach="fog" args={["#17171b", 30, 40]} /> */}
      <pointLight position={[0, 10, 200]} intensity={0.8} />
      <directionalLight position={[0, -200, -5]} intensity={0.2} />
      <directionalLight position={[0, 200, -5]} intensity={0.2} />

      <Box />
      <Plane position={[0, 0, 30]} rotationY={0} />
      <Plane position={[0, 0, -30]} rotationY={180} />
      <Plane position={[30, 0, 0]} rotationY={90} />
      <Plane position={[-30, 0, 0]} rotationY={90} />

      {/* <Ball position={[2, 0, 0]} /> */}

      <Stars />
    </>
  );
}

function App() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
      }}
    >
      <Suspense>
        <Canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "black",
          }}
        >
          <Scene />
          {/* <OrbitControls /> */}
        </Canvas>
      </Suspense>
      <div style={{ zIndex: 10000, width: "100%" }}>
        {Array.from(Array(4)).map((_, index) => (
          <Section key={index}>{"Section " + (index + 1)}</Section>
        ))}
      </div>
    </div>
  );
}

export default App;
