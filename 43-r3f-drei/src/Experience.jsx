import {
  Float,
  Text,
  Html,
  OrbitControls,
  TransformControls,
  PivotControls,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useRef } from "react";
export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        scale={100}
        fixed={true}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
      >
        <mesh position-x={-2} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <Html
          wrapperClass="label"
          position={[-2, 1, 0]}
          center
          distanceFactor={8}
          // occlude={[sphereRef, cubeRef]}
        >
          That's a sphere!
        </Html>
      </PivotControls>

      <mesh position-x={2} scale={1.5} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cubeRef} mode="translate" />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial
          color={"greenyellow"}
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
        />
      </mesh>
      <Float speed={3}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          position={[0, 2, -2]}
          color={"salmon"}
          maxWidth={4}
          textAlign="center"
        >
          I love R3F and DREI.
        </Text>
      </Float>
    </>
  );
}
