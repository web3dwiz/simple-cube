## Install Packages

yarn

## Run Project

yarn dev

## Build Packages

yarn build

## Transpile to JavaScript

- tsc
- update import
  import {
  BoxGeometry,
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,} from 'https://unpkg.com/three@0.158.0/build/three.module.js'
  import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';

## Performance

Since there is no animation, we don't use requestAnimationFrame. The scene is updated only whenever users rotate/drag the scene or hit the object

## CustomShaderMaterial

- Created a simple pattern using distance field
- Created a gradient color
- Introduced 2 uniform color variables which can be used for pulsing glow animation if we update them in the animation loop with render function
