import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Layout } from 'antd';
import { Section } from '../../components/Section';
import Lights from '../../components/Lights';
import state from '../../components/state';
import { useInView } from 'react-intersection-observer';
const { Header, Footer, Sider, Content } = Layout;

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const HTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));
  const [refItem, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className='container'>
            <h1 className='title'>{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

const Chair = () => {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = e => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <Layout style={{ height: '100%', background: 'none' }}>
      {/* <Sider width={300}>Sider</Sider> */}
      <Content>
        <Canvas
          concurrent
          colorManagement
          camera={{ position: [0, 0, 120], fov: 70 }}
        >
          <Lights />
          <Suspense fallback={null}>
            <HTMLContent
              domContent={domContent}
              bgColor='#f15946'
              modelPath='/armchairYellow.gltf'
              position={250}
            >
              <span>Yellow </span>
            </HTMLContent>
            <HTMLContent
              domContent={domContent}
              bgColor='#571ec1'
              modelPath='/armchairGreen.gltf'
              position={0}
            >
              <span>Green </span>
            </HTMLContent>
            <HTMLContent
              domContent={domContent}
              bgColor='#636567'
              modelPath='/armchairGray.gltf'
              position={-250}
            >
              <span>Gray</span>
            </HTMLContent>
          </Suspense>
        </Canvas>

        <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
          <div style={{ position: 'sticky', top: 0 }} ref={domContent}></div>
          <div style={{ height: `${state.pages * 100}vh` }}> </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Chair;
