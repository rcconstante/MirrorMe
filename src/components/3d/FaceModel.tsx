import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ scrollY }: { scrollY: number }) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // In a real implementation, we would load a face model from a GLTF file
  // For this demo, we'll create a stylized abstract face representation
  
  useFrame((state) => {
    if (group.current) {
      // Subtle floating animation
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
      
      // Respond to scroll position
      const scrollFactor = scrollY * 0.001;
      group.current.rotation.y += scrollFactor;
      
      // Subtle breathing effect
      group.current.scale.x = 1 + Math.sin(state.clock.getElapsedTime()) * 0.02;
      group.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime()) * 0.02;
      group.current.scale.z = 1 + Math.sin(state.clock.getElapsedTime()) * 0.02;
    }
  });

  return (
    <group ref={group}>
      {/* Abstract face components */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.5}
          roughness={0.2}
          emissive="#6E44FF"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.4, 0.2, 1]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial 
          color="#5BC0BE" 
          emissive="#5BC0BE"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <mesh position={[0.4, 0.2, 1]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial 
          color="#5BC0BE" 
          emissive="#5BC0BE"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Neural network-like connections */}
      {Array.from({ length: 30 }).map((_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 1.4 + Math.random() * 0.2;
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.03 + Math.random() * 0.02, 8, 8]} />
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? "#5BC0BE" : "#6E44FF"} 
              emissive={Math.random() > 0.5 ? "#5BC0BE" : "#6E44FF"}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const FaceModel: React.FC = () => {
  const [scrollY, setScrollY] = React.useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Model scrollY={scrollY} />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default FaceModel;