import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set up scene, camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

// set up geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

//texture loader
const textureLoader = new THREE.TextureLoader();

// Loading texture for all planets
const sunTexture = textureLoader.load('./2k_sun.jpg');
const moonTexture = textureLoader.load('./moon.jpeg');
const mercuryTexture = textureLoader.load('./2k_mercury.jpeg');
const venusTexture = textureLoader.load('./venus.webp');
const earthTexture = textureLoader.load('./2k_earth_daymap.jpg');
const marsTexture = textureLoader.load('./2k_mars.jpg');
const jupiterTexture = textureLoader.load('./jupiter.jpg');
const saturnTexture = textureLoader.load('./saturn.jpeg');
const uranusTexture = textureLoader.load('./uranus.jpeg');
const neptuneTexture = textureLoader.load('./neptune.jpg');
const saturnRingTexture = textureLoader.load('./saturn_texture.webp');

// planet details
const planetDetails = [
  {
    name: 'Mercury',
    radius: 0.383, // Relative to Earth
    distance: 8, // Scaled distance from Sun
    speed: 0.008, // Orbital speed
    color: 0x808080, // Gray
    material: mercuryTexture,
    moons: []
  },
  {
    name: 'Venus',
    radius: 0.949,
    distance: 10.8,
    speed: 0.007,
    color: 0xFAD470, // Light orange/yellow
    material: venusTexture,
    moons: []
  },
  {
    name: 'Earth',
    radius: 1.3,
    distance: 18,
    speed: 0.006,
    color: 0x4B6B95, // Blue
    material: earthTexture,
    moons: [
      {
        name: 'Moon',
        radius: 0.273,
        distance: 2,
        speed: 0.015,
        color: 0xC8C8C8
      }
    ]
  },
  {
    name: 'Mars',
    radius: 0.8,
    distance: 25,
    speed: 0.005,
    color: 0xDD4428, // Red
    material: marsTexture,
    moons: [
      {
        name: 'Phobos',
        radius: 0.25,
        distance: 2,
        speed: 0.02,
        color: 0x887878
      },
      {
        name: 'Deimos',
        radius: 0.2,
        distance: 3,
        speed: 0.018,
        color: 0x787878
      }
    ]
  },
  {
    name: 'Jupiter',
    radius: 2,
    distance: 35,
    speed: 0.004,
    color: 0xD8CA9D, // Light brown
    material: jupiterTexture,
    moons: [
      {
        name: 'Io',
        radius: 0.2,
        distance: 2,
        speed: 0.015,
        color: 0xFFFF00
      },
      {
        name: 'Europa',
        radius: 0.15,
        distance: 3,
        speed: 0.013,
        color: 0xFFFFFF
      }
      // {
      //   name: 'Ganymede',
      //   radius: 0.3,
      //   distance: 6.5,
      //   speed: 0.011,
      //   color: 0xC8C8C8
      // },
      // {
      //   name: 'Callisto',
      //   radius: 0.2,
      //   distance: 8.5,
      //   speed: 0.009,
      //   color: 0x808080
      // }
    ]
  },
  {
    name: 'Saturn',
    radius: 1.8,
    distance: 50,
    speed: 0.003,
    color: 0xEAD6B8, // Light gold
    material: saturnTexture,
    moons: [
      {
        name: 'Titan',
        radius: 0.3,
        distance: 2,
        speed: 0.012,
        color: 0xFAD470
      }
    ]
  },
  {
    name: 'Uranus',
    radius: 1.5,
    distance: 60,
    speed: 0.002,
    color: 0xB1E5EA, // Light blue
    material: uranusTexture,
    moons: [
      {
        name: 'Titania',
        radius: 0.3,
        distance: 2.5,
        speed: 0.014,
        color: 0xC8C8C8
      }
    ]
  },
  {
    name: 'Neptune',
    radius: 1.6,
    distance: 70,
    speed: 0.001,
    color: 0x3F54BA, // Deep blue
    material: neptuneTexture,
    moons: [
      {
        name: 'Triton',
        radius: 0.3,
        distance: 2,
        speed: 0.016,
        color: 0xC8C8C8
      }
    ]
  }
];

// planets and moons creation
const planetMeshes = planetDetails.map((planet,index) => {

  // create planet mesh
  const planetMaterial = new THREE.MeshStandardMaterial({ map: planet.material });
  const planetMesh = new THREE.Mesh(geometry, planetMaterial);

  // set position based on distance and scale based on radius
  planetMesh.position.x = planet.distance;
  planetMesh.scale.setScalar(planet.radius);

  // add to scene
  scene.add(planetMesh);
if (planet.moons.length === 0) return planetMesh;

  // create moons
  planet.moons.forEach((moon) => {

    // create moon mesh
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
    const moonMesh = new THREE.Mesh(geometry, moonMaterial);

    // set position based on distance and scale based on radius
    moonMesh.position.x = moon.distance;
    moonMesh.scale.setScalar(moon.radius);

    // add to planet
    planetMesh.add(moonMesh);
  });
  return planetMesh;
});

console.log(planetMeshes[5]);

// creating sun
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture, });
const sun = new THREE.Mesh(geometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

camera.position.z = 15;

// adding light
const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

// Add PointLight at the Sun's center
const pointlight = new THREE.PointLight(0xffffff, 1000); // (color, intensity, distance)
pointlight.position.set(0, 0, 0);
scene.add(pointlight);

// set up renderer
const canvas = document.querySelector('.threejs');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

// resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Add smooth damping effect

function animate() {
  window.requestAnimationFrame(animate);
  sun.rotation.y += 0.01;
  planetMeshes.forEach((planet, index) => {
    planet.rotation.z=THREE.MathUtils.degToRad(23.5); // tilt the planet
    planet.rotation.y += planetDetails[index].speed*5;
    planet.position.x = planetDetails[index].distance * Math.cos(planet.rotation.y/5);
    planet.position.z = planetDetails[index].distance * Math.sin(planet.rotation.y/5);

    planet.children.forEach((moon, mIndex) => {
        moon.rotation.z=THREE.MathUtils.degToRad(23.5); // tilt the moon
        moon.rotation.y += planetDetails[index].moons[mIndex].speed*10;
        moon.position.x = planetDetails[index].moons[mIndex].distance * Math.cos(moon.rotation.y/10);
        moon.position.z = planetDetails[index].moons[mIndex].distance * Math.sin(moon.rotation.y/10);
      
    })
  })

  // Update controls
  controls.update();
  renderer.render(scene, camera);

}
animate();

console.log(planetDetails[5]);
