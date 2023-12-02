varying vec3 atmosphereVertexNormal;

void main() {
    float intensity = pow(0.15 - dot(atmosphereVertexNormal, vec3(0, 0, 1.0)) - 0.1, 2.0);

    gl_FragColor = vec4(0.3, 0.6, 1.0, 0.5) * intensity;
}