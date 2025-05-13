import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const CardModel = () => {
  const { scene } = useGLTF("/textures/carvercraft.glb");
  const cardRef = useRef();

  // Rotation configuration - adjust these values to change rotation behavior
  const rotationSpeed = 0.01; // Speed of rotation (higher = faster)
  const initialRotation = [40, Math.PI / 10, 30]; // Initial rotation in radians [x, y, z]

  useFrame(({ clock }) => {
    // Vertical floating animation
    cardRef.current.position.y = Math.sin(clock.elapsedTime) * 0.9 - 1; // Lowered the base position by subtracting instead of adding

    // Y-axis rotation - modify rotationSpeed to change rotation speed
    cardRef.current.rotation.y += rotationSpeed;

    // You can also add rotation on other axes if needed:
    // cardRef.current.rotation.x += 0.005;
    // cardRef.current.rotation.z += 0.002;
  });

  return (
    <>
      <primitive
        ref={cardRef}
        object={scene}
        scale={6}
        position={[0, 5, -5]}
        rotation={initialRotation}
      />
    </>
  );
};
export default CardModel;
