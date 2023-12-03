uniform sampler2D earthTexture;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1) * pow(intensity, 1.0);

    gl_FragColor = vec4(atmosphere + texture2D(earthTexture, vertexUV).xyz, 1);
}