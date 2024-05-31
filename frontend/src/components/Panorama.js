import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { VRButton, XR, Controllers } from '@react-three/xr';

const Panorama = ({ vrImage }) => {
    const texture = useLoader(THREE.TextureLoader, vrImage);

    return (
        <>
            <VRButton />
            <Canvas>
                <XR>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls enableZoom={false} enablePan={false} />
                    <mesh>
                        <sphereGeometry args={[500, 60, 40]} scale={[-1, 1, 1]} />
                        <meshBasicMaterial map={texture} side={THREE.BackSide} />
                    </mesh>
                    <Controllers />
                </XR>
            </Canvas>
        </>
    );
};

export default Panorama;
