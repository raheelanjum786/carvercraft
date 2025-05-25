import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const CardModel = () => {
  const { scene } = useGLTF("/textures/carvercraft.glb");
  const cardRef = useRef();

  return (
    <>
      <primitive
        ref={cardRef}
        object={scene}
        scale={6}
        position={[2, 0, 0]}
        rotation={[0.9, -0.1, 0.3]}
      />
    </>
  );
};
export default CardModel;
