import { useGLTF, useTexture } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HackerRoom = ({ scale, position, rotation, ...props }) => {
  const meshref = useRef();
  const { nodes, materials } = useGLTF("/models/hacker-room.glb");

  const monitortxt = useTexture("textures/desk/monitor.png");
  const screenTxt = useTexture("textures/desk/screen.png");

  useGSAP(() => {
    gsap.to(meshref.current.rotation, {
      x: rotation[0] + 0.5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#canvas-container",
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
    });

    const startPosition = [position[0] - 10, position[1] + 5, position[2] + 50];

    meshref.current.position.set(...startPosition);
    meshref.current.scale.set(scale * 1, scale * 1, scale * 1);

    gsap.to(meshref.current.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 2,
      ease: "power2.out",
    });

    gsap.to(meshref.current.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 1.5,
      ease: "power2.out",
    });
  }, [scale, position, rotation]);

  return (
    <group {...props} rotation={rotation} dispose={null} ref={meshref}>
      <mesh
        geometry={nodes.screen_screens_0.geometry}
        material={materials.screens}
      >
        <meshMatcapMaterial map={screenTxt} />
      </mesh>
      <mesh
        geometry={nodes.screen_glass_glass_0.geometry}
        material={materials.glass}
      />
      <mesh
        geometry={nodes.table_table_mat_0_1.geometry}
        material={materials.table_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_2.geometry}
        material={materials.computer_mat}
      >
        <meshMatcapMaterial map={monitortxt} />
      </mesh>
      <mesh
        geometry={nodes.table_table_mat_0_3.geometry}
        material={materials.server_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_4.geometry}
        material={materials.vhsPlayer_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_5.geometry}
        material={materials.stand_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_6.geometry}
        material={materials.mat_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_7.geometry}
        material={materials.arm_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_8.geometry}
        material={materials.tv_mat}
      >
        <meshMatcapMaterial map={monitortxt} />
      </mesh>
      <mesh
        geometry={nodes.table_table_mat_0_9.geometry}
        material={materials.cables_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_10.geometry}
        material={materials.props_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_11.geometry}
        material={materials.ground_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_12.geometry}
        material={materials.key_mat}
      />
    </group>
  );
};
useGLTF.preload("/models/hacker-room.glb");
export default HackerRoom;
