import React, { useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ReactLogo = (props) => {
  const meshRef = useRef();
  const { nodes, materials } = useGLTF("/models/react.glb");

  useGSAP(() => {
    gsap.to(meshRef.current.position, {
      y: 10 * props.speed,
      scrollTrigger: {
        trigger: "#canvas-container",
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
    });
  }, [props.speed]);

  return (
    <Float floatIntensity={1}>
      <group
        ref={meshRef}
        position={[0, 0, 0]}
        scale={0.3}
        {...props}
        dispose={null}
      >
        <mesh
          geometry={nodes["React-Logo_Material002_0"].geometry}
          material={materials["Material.002"]}
          position={[0, 0.07, 0.18]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.39, 0.39, 0.5]}
        />
      </group>
    </Float>
  );
};

useGLTF.preload("/models/react.glb");

export default ReactLogo;
