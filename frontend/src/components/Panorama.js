import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

const Panorama = ({ vrImage }) => {
    const texture = useLoader(THREE.TextureLoader, vrImage);
    const sphereRef = useRef();

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.xr.enabled = true;
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const vrButton = VRButton.createButton(renderer);
        document.body.appendChild(vrButton);

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            document.body.removeChild(vrButton);
            document.body.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Canvas>
            <OrbitControls enableZoom={false} />
            <mesh ref={sphereRef}>
                <sphereGeometry args={[500, 60, 40]} />
                <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>
        </Canvas>
    );
};

export default Panorama;
