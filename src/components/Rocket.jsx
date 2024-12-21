import React, { useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Rocket = (props) => {
  const { nodes, materials } = useGLTF("/models/rocket.glb");
  const containerRef = useRef();
  const rocketRef = useRef();
  const fireRef = useRef();

  // Separate the parallax effect
  useGSAP(() => {
    gsap.to(containerRef.current.position, {
      y: 10 * props.speed,
      scrollTrigger: {
        trigger: "#canvas-container",
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
    });
  }, [props.speed]);

  useGSAP(() => {
    gsap.to(rocketRef.current.rotation, {
      z: Math.PI + 0.5,
      duration: 2,
      repeat: -1,
      ease: "power1.inOut",
    });

    gsap.to(fireRef.current.scale, {
      x: 0.8,
      y: 0.8,
      z: 0.8,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(fireRef.current.material, {
      opacity: 0.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  return (
    <Float floatIntensity={0.5}>
      <group {...props} dispose={null} ref={containerRef}>
        <group rotation={[5, 0.9, 0]} scale={0.5}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group
              ref={rocketRef}
              position={[0, 0, 0.865]}
              rotation={[-Math.PI / 2, 0, -2.595]}
              scale={100}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder_Charcoal_0.geometry}
                material={materials.Charcoal}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder_Gloss_Red_0.geometry}
                material={materials.Gloss_Red}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder_Gloss_White_0.geometry}
                material={materials.Gloss_White}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder_Material001_0.geometry}
                material={materials["Material.001"]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder_White_Glow_0.geometry}
                material={materials.White_Glow}
              />
            </group>
            <mesh
              ref={fireRef}
              castShadow
              receiveShadow
              geometry={nodes.Icosphere_Flame_0.geometry}
              material={materials.material_0}
              position={[0, -145.482, 0]}
              rotation={[1.596, -0.006, 0.725]}
              scale={72.665}
            />
          </group>
        </group>
      </group>
    </Float>
  );
};

useGLTF.preload("/models/rocket.glb");
export default Rocket;
