import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 1, 15);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 15, 10);
scene.add(pointLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false; // Optional: disable zooming

// Helper to create islands
function createIsland(name, position, color) {
    const geometry = new THREE.CylinderGeometry(3, 3.5, 1, 32);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const island = new THREE.Mesh(geometry, material);
    island.position.set(position.x, position.y, position.z);
    island.name = name; // For click detection
    scene.add(island);
    return island;
}

// Create the islands for each section
const islands = {
    experience: createIsland('experience', { x: -12, y: 0, z: 0 }, 0x4a90e2),
    projects: createIsland('projects', { x: 12, y: 0, z: 0 }, 0x7ed321),
    skills: createIsland('skills', { x: 0, y: 0, z: -12 }, 0xf5a623),
    education: createIsland('education', { x: 0, y: 0, z: 12 }, 0xbd10e0),
};

// Add text labels to islands
const loader = new FontLoader();
loader.load('https://unpkg.com/three@0.161.0/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textOptions = {
        font: font,
        size: 0.5,
        height: 0.1,
    };
    
    Object.keys(islands).forEach(key => {
        const textGeo = new TextGeometry(key.charAt(0).toUpperCase() + key.slice(1), textOptions);
        const textMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeo, textMat);
        textMesh.position.set(islands[key].position.x - 1.5, islands[key].position.y + 1, islands[key].position.z);
        scene.add(textMesh);
    });
});


// Starfield Background
function addStar() {
    const geometry = new THREE.SphereGeometry(0.1, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(400).fill().forEach(addStar);


// Modal Interaction
const modalContainer = document.getElementById('modal-container');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

closeModalBtn.addEventListener('click', () => {
    modalContainer.classList.add('hidden');
});

function showModal(contentId) {
    const content = document.getElementById(contentId + '-content').innerHTML;
    modalBody.innerHTML = content;
    modalContainer.classList.remove('hidden');
}

// Click Detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Object.values(islands));

    if (intersects.length > 0) {
        const islandName = intersects[0].object.name;
        showModal(islandName);
    }
});


// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();