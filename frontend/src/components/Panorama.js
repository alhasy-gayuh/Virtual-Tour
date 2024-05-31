import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

const Panorama = ({ vrImage }) => {
    const texture = useLoader(THREE.TextureLoader, vrImage);
    const sphereRef = useRef();
    const vrButtonRef = useRef(null);
    const rendererRef = useRef();

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.xr.enabled = true;
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create VR button and append it to the body
        const vrButton = VRButton.createButton(renderer);
        document.body.appendChild(vrButton);
        vrButtonRef.current = vrButton;
        rendererRef.current = renderer;

        return () => {
            // Remove VR button and dispose renderer
            if (vrButtonRef.current) {
                document.body.removeChild(vrButtonRef.current);
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        };
    }, []);

    return (
        <Canvas
            gl={{ antialias: true }}
            onCreated={({ gl }) => {
                rendererRef.current = gl;
                gl.xr.enabled = true;
                gl.setSize(window.innerWidth, window.innerHeight);
            }}
        >
            <OrbitControls enableZoom={false} />
            <mesh ref={sphereRef}>
                <sphereGeometry args={[500, 60, 40]} />
                <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>
        </Canvas>
    );
};

export default Panorama;
