import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Float, useGLTF, useTexture } from "@react-three/drei";
const RubixCube = (props) => {
  const { nodes, materials } = useGLTF("/models/rubix_cube.glb");
  const [hovered, setHovered] = useState(false);
  const texture = useTexture("textures/cube.png");
  const cubeRef = useRef();
  const meshRef = useRef();
  useGSAP(() => {
    gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.5,
      })
      .to(cubeRef.current.rotation, {
        y: hovered ? "+=2" : `+=${Math.PI * 2}`,
        x: hovered ? "+=2" : `-=${Math.PI * 2}`,
        duration: 2.5,
        stagger: {
          each: 0.5,
        },
      });
  });

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
    <Float floatIntensity={2}>
      <group scale={0.007} {...props} dispose={null} ref={meshRef}>
        <mesh
          ref={cubeRef}
          castShadow
          receiveShadow
          geometry={nodes.Rubix_Cube_RCT_0.geometry}
          material={materials.material}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
          onPointerEnter={() => setHovered(true)}
        />
        <meshMatcapMaterial matcap={texture} toneMapped={false} />
      </group>
    </Float>
  );
};

useGLTF.preload("/models/rubix_cube.glb");
export default RubixCube;
