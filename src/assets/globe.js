import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ThreeGlobe from "three-globe";
import coordinates from "./files/map.json";
import flights from "./files/my-flights.json";
import countries from "./files/globe-data.json";

const init = (globeSize) => {
    let renderer, camera, scene, controls;
    // Scene
    scene = new THREE.Scene();

    // Canvas
    const canvas = document.querySelector(".webgl");

    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    // Mouse
    const mouse = {
        x: 0,
        y: 0,
    };

    // Mesh
    const myGlobe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
    })

        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(true)
        .atmosphereColor("#3a228a")
        .atmosphereAltitude(0.25);

    setTimeout(() => {
        myGlobe
            .arcsData(flights.flights)
            .arcColor((e) => {
                return '#A663A3';
            })
            .arcAltitude((e) => {
                return e.arcAlt;
            })
            .arcStroke((e) => {
                return e.status ? 0.5 : 0.3;
            })
            .arcDashLength(0.9)
            .arcDashGap(4)
            .arcDashAnimateTime(1000)
            .arcsTransitionDuration(1000)
            .arcDashInitialGap((e) => e.order * 1)
            .labelsData(coordinates.Map)
            .labelColor(() => "#ffcb21");
    });

    const globeMaterial = myGlobe.globeMaterial();
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    scene.add(myGlobe);

    window.addEventListener("resize", () => {
        // Update size
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Camera
    // Base camera
    camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        1000
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = globeSize || 200;
    scene.add(camera);

    // Add fog
    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.3);
    scene.add(ambientLight);
    scene.background = new THREE.Color(0x040d21);

    const dLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    const dLight2 = new THREE.DirectionalLight(0x7982f6, 1);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    const dLight3 = new THREE.DirectionalLight(0x8566cc, 0.5);
    dLight3.position.set(-200, 500, 200);
    camera.add(dLight3);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0)

    scene.background = 'transparent'

    // Controles
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.01;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1;
    controls.autoRotate = true;
    // controls.minPolarAngle = Math.PI / 3.5;
    // controls.maxPolarAngle = Math.Pi - Math.PI / 3;

    // const onDocumentMouseMove = (event) => {
    //     mouseX = event.clientX - windowX;
    //     mouseY = event.clientY - windowY;
    // };

    // document.addEventListener("mousemove", onDocumentMouseMove);

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    const windowX = window.innerWidth / 2;
    const windowY = window.innerHeight / 2;

    // Animate
    const clock = new THREE.Clock();

    const tick = () => {
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        const elapsedTime = clock.getElapsedTime();

        // Update objects
        myGlobe.rotation.y = 0.5 * elapsedTime;
        myGlobe.rotation.y += 0.5 * (targetX - myGlobe.rotation.y);

        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    };

    tick();
}

export default init