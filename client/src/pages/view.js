import React, { useState, useEffect } from "react";

import * as THREE from "three";
import vertexShader from "../shaders/vertex.glsl";

import earth from "../images/earth.jpg";

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// create a sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        // fragmentShader: "",
    })
);

scene.add(sphere);

// reset position of camera
// make sure the value should greater than 1st param of THREE.SphereGeometry()
camera.position.z = 13;

// custom shader

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
const View = () => {
    useEffect(() => {});

    return <div></div>;
};

export default View;
