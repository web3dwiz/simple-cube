import { Color, ColorRepresentation, ShaderMaterial } from "three";

export class CustomShaderMaterial extends ShaderMaterial {
  constructor(color1: ColorRepresentation, color2: ColorRepresentation) {
    super();
    this.uniforms = {
      color1: {
        value: new Color(color1),
      },
      color2: {
        value: new Color(color2),
      },
    };

    this.vertexShader = `
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `;

    this.fragmentShader = `
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      vec3 color = mix( color1, color2, vUv.y );
      float d = 0.0;
      uv = uv * 2. - 1.;
      d = length(abs(uv) - 0.5);
      gl_FragColor = vec4(fract(d * 1.) * color, 1.0);
    }`;
  }
}
