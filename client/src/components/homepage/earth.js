import React, { useState, useEffect } from "react";

import { gsap } from "gsap";

import * as THREE from "three";
import earthMap from "../../images/earth.jpg";

const vertexShader = `
varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D earthTexture;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1) * pow(intensity, 1.0);

    gl_FragColor = vec4(atmosphere + texture2D(earthTexture, vertexUV).xyz, 1);
}
`;

const atmosphereVertexShader = `
varying vec3 atmosphereVertexNormal;

void main() {
    atmosphereVertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.9);
}
`;

const atmosphereFragmentShader = `
varying vec3 atmosphereVertexNormal;

void main() {
    float intensity = pow(0.15 - dot(atmosphereVertexNormal, vec3(0, 0, 1.0)) - 0.1, 2.0);

    gl_FragColor = vec4(0.3, 0.6, 1.0, 0.35) * intensity;
}
`;

const Earth = ({ width, height }) => {
    const [sceneExist, setSceneExist] = useState(false);

    useEffect(() => {
        // if scene has been created, just remove it
        if (sceneExist) {
            const earthDiv = document.getElementById("earth");
            earthDiv.removeChild(earthDiv.lastChild);
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            70,
            width / height,
            0.01,
            10
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);

        const earthDiv = document.getElementById("earth");
        earthDiv.appendChild(renderer.domElement);

        // create a earth
        const earth = new THREE.Mesh(
            new THREE.SphereGeometry(5, 50, 50),
            new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    earthTexture: {
                        value: new THREE.TextureLoader().load(earthMap),
                    },
                },
            })
        );

        scene.add(earth);

        // create atmosphere
        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(5, 50, 50),
            new THREE.ShaderMaterial({
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                blending: THREE.AdditiveBlending,
            })
        );

        atmosphere.scale.set(1.15, 1.15, 1.15);

        scene.add(atmosphere);

        const group = new THREE.Group();
        group.add(earth);
        scene.add(group);

        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({ color: "#FFFFFF" });

        const starVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = -Math.random() * 1000;

            starVertices.push(x, y, z);
        }

        starGeometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(starVertices, 3)
        );

        const stars = new THREE.Points(starGeometry, starMaterial);

        scene.add(stars);

        // reset position of camera
        // make sure the value should greater than 1st param of THREE.SphereGeometry()
        camera.position.z = 10;
        camera.position.y = 5;
        const mouse = { x: null, y: null };

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            earth.rotation.y += 0.0025;

            gsap.to(group.rotation, {
                x: mouse.y * 0.5,
                y: mouse.x * 0.5,
                duration: 1.2,
            });
        }

        animate();
        setSceneExist(true);

        const handleMouse = (e) => {
            mouse.x = (e.clientX / width) * 2 - 1;
            mouse.y = (e.clientY / height) * 2 - 1;
        };

        earthDiv.addEventListener("mousemove", handleMouse);

        return () => {
            earthDiv.removeEventListener("mousemove", handleMouse);
        };
    }, [width, height]);

    return <div id="earth"></div>;
};

export default Earth;
