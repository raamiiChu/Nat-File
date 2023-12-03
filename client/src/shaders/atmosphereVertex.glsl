varying vec3 atmosphereVertexNormal;

void main() {
    atmosphereVertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.9);
}