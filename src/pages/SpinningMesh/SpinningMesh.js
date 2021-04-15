import React, { useRef, useState } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';

import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
  Stars,
  Html,
} from '@react-three/drei';

import { useSpring, a } from 'react-spring/three';
import { Physics, useBox, usePlane } from '@react-three/cannon';

softShadows();

function Box({ position, args, color, speed }) {
  // const ref = useRef(null);
  const [ref, api] = useBox(() => ({ mass: 2 }));
  // useFrame(() => (api.position.x = ref.current.rotation.y += 0.01));
  // useFrame(({ clock }) =>
  //   api.position.set(Math.sin(clock.getElapsedTime()) * 5, 1, 0),
  // );

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  const onClick = () => {
    api.velocity.set(0, 5, 10);
  };

  return (
    <a.mesh
      onClick={onClick}
      scale={props.scale}
      castShadow
      ref={ref}
      position={position}
    >
      <boxBufferGeometry attach='geometry' args={args} />
      {/* <circleBufferGeometry attach='geometry' args={[2, 200]} /> */}
      <MeshWobbleMaterial
        attach='material'
        color={color}
        speed={speed}
        factor={0.6}
      />
      <Html>
        <span>box</span>
      </Html>
    </a.mesh>
  );
}

function Plane() {
  const [planeRef] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <group>
      <mesh
        ref={planeRef}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
      >
        <planeBufferGeometry attach='geometry' args={[100, 100]} />
        <meshLambertMaterial attach='material' color='gray' />
      </mesh>
    </group>
  );
}

export default function SpinningMesh() {
  return (
    <>
      <Canvas
        shadows
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        {/* <Stars /> */}
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <Physics>
          <Plane />
          <Box
            position={[0, 1, 0]}
            args={[3, 2, 1]}
            color='lightblue'
            speed={2}
          />
          <Box position={[-10, 10, -5]} color='pink' speed={11} />
          <Box position={[10, 16, -2]} color='gray' speed={11} />
        </Physics>
        <OrbitControls />
      </Canvas>
    </>
  );
}
