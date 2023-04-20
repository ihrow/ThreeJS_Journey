import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { CineonToneMapping, LinearEncoding } from "three";

export const App = () => {
  return (
    <div className="canvas">
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3, 2, 6],
        }}
        gl={{
          antialias: true,
          // toneMapping: CineonToneMapping,
          // outputEncoding: LinearEncoding,
        }}
      >
        <Experience />
      </Canvas>
    </div>
  );
};
