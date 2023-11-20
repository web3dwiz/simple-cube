import {
  BoxGeometry,
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CustomShaderMaterial } from "./CustomShaderMaterial";
import { getRandomColor } from "./util";

export class ThreeApp {
  private scene: Scene;
  private camera: PerspectiveCamera;
  private orbit: OrbitControls;
  private renderer: WebGLRenderer;
  private cube?: Mesh;
  private material: CustomShaderMaterial;

  constructor(container: HTMLDivElement) {
    this.scene = new Scene();
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new PerspectiveCamera(45, aspect, 0.1, 1000);

    this.camera.position.set(3, 2, 3);
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.setSize(container.clientWidth, container.clientHeight, false);

    container.appendChild(this.renderer.domElement);

    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.addEventListener("change", this.render);

    this.material = new CustomShaderMaterial("#bdf101", "#dd4d4d");

    window.addEventListener(
      "resize",
      () => {
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.render();
      },
      false
    );

    this.handleMouseEvents();
  }

  private handleMouseEvents() {
    const mouse = new Vector2(0, 0);
    const raycaster = new Raycaster();
    const canvas = this.renderer.domElement;

    let isMouseMoved = false;

    canvas.addEventListener("pointerdown", () => {
      isMouseMoved = false;
    });

    canvas.addEventListener("pointermove", (e: PointerEvent) => {
      mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
      mouse.y = -(e.clientY / canvas.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      isMouseMoved = true;
    });

    canvas.addEventListener("pointerup", () => {
      if (!this.cube) return;
      const intersected = raycaster.intersectObject(this.cube);
      if (isMouseMoved || intersected.length == 0) return;
      this.material.uniforms.color1.value = getRandomColor();
      this.material.uniforms.color2.value = getRandomColor();

      this.render();
    });
  }

  public createObject() {
    this.cube = new Mesh(new BoxGeometry(), this.material);
    this.scene.add(this.cube);
    this.render();
  }

  private render = () => {
    this.renderer.render(this.scene, this.camera);
  };
}
