import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

const Panorama = ({ vrImage }) => {
    const texture = useLoader(THREE.TextureLoader, vrImage);
    const sphereRef = useRef();

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer();
        renderer.xr.enabled = true;
        const vrButton = VRButton.createButton(renderer);
        document.body.appendChild(vrButton);

        return () => {
            document.body.removeChild(vrButton);
        };
    }, []);

    return (
        <Canvas vr={{ enabled: true }}>
            <OrbitControls enableZoom={false} />
            <mesh ref={sphereRef}>
                <sphereGeometry args={[500, 60, 40]} />
                <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>
        </Canvas>
    );
};

export default Panorama;
