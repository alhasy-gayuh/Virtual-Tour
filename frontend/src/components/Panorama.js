import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, VRButton } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const Panorama = ({ vrImage }) => {
    const texture = useLoader(TextureLoader, vrImage);
    const sphereRef = useRef();

    return (
        <>
            <VRButton />
            <Canvas>
                <OrbitControls enableZoom={false} />
                <mesh ref={sphereRef}>
                    <sphereGeometry args={[500, 60, 40]} />
                    <meshBasicMaterial map={texture} side={2} />
                </mesh>
            </Canvas>
        </>
    );
};

export default Panorama;
