import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

const CardModel = () => {
  // Load the 3D model from the specified path
  const { scene } = useGLTF("/textures/pos.glb");
  // Create a reference to access the 3D object in the component
  const posRef = useRef();

  return (
    <>
      <primitive
        ref={posRef}
        object={scene}
        scale={1.5} // Controls the size of the model (3 times larger than original)
        position={[0, 0, -1]} // Position in 3D space [x, y, z] - centered horizontally, vertically, and slightly forward
        rotation={[2, 0, 0]} // Rotation in radians [x, y, z] - slight tilt forward and rotation to the right
      />
    </>
  );
};
export default CardModel;
