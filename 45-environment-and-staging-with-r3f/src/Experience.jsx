import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  Stage,
  Environment,
  Sky,
  ContactShadows,
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  Lightformer,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import { useControls } from "leva";

export default function Experience() {
  const cube = useRef();
  const directLightRef = useRef();
  useHelper(directLightRef, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta / 2;
  });

  const { color, opacity, blur } = useControls("contactShadows", {
    color: "#4b2709",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 3.5, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 20, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  return (
    <>
      {/* <BakeShadows /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      {/* <SoftShadows size={25} samples={10} /> */}

      <Environment
        background
        // files={[
        //   "./environmentMaps/1/px.jpg",
        //   "./environmentMaps/1/nx.jpg",
        //   "./environmentMaps/1/py.jpg",
        //   "./environmentMaps/1/ny.jpg",
        //   "./environmentMaps/1/pz.jpg",
        //   "./environmentMaps/1/nz.jpg",
        // ]}
        // files={"./environmentMaps/the_sky_is_on_fire_2k.hdr"}
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        <color args={["#000000"]} attach={"background"} />
        <Lightformer
          position-z={-5}
          scale={5}
          color={"red"}
          intensity={10}
          form={"ring"}
        />
      </Environment>

      <color args={["ivory"]} attach={"background"} />

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <directionalLight
        shadow-mapSize={[2048, 2048]}
        castShadow
        ref={directLightRef}
        position={sunPosition}
        intensity={1.5}
      /> */}

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        blend={100}
        // temporal
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      />

      {/* <ambientLight intensity={0.5} /> */}

      <mesh castShadow position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      <mesh castShadow ref={cube} position-x={2} position-y={1} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      {/* <mesh rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
    </>
  );
}
