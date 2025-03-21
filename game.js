let scene, camera, renderer, car, track;
let speed = 0.3;
let obstacles = [];

function init() {
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Track
    const trackGeometry = new THREE.PlaneGeometry(10, 100);
    const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, side: THREE.DoubleSide });
    track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.rotation.x = -Math.PI / 2;
    track.position.y = -0.1;
    scene.add(track);

    // Car
    const carGeometry = new THREE.BoxGeometry(2, 1, 3);
    const carMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 1 });
    car = new THREE.Mesh(carGeometry, carMaterial);
    car.position.set(0, 1, 0);
    scene.add(car);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffff, 3, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    // Obstacles
    for (let i = 0; i < 5; i++) {
        createObstacle();
    }

    animate();
}

// Create obstacles randomly on the track
function createObstacle() {
    const obstacleGeometry = new THREE.BoxGeometry(2, 2, 2);
    const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.8 });
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.set((Math.random() - 0.5) * 8, 1, -Math.random() * 50);
    scene.add(obstacle);
    obstacles.push(obstacle);
}

// Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && car.position.x > -4) car.position.x -= 0.5;
    if (event.key === "ArrowRight" && car.position.x < 4) car.position.x += 0.5;
});

// Mobile Controls
document.getElementById("left").addEventListener("click", () => {
    if (car.position.x > -4) car.position.x -= 0.5;
});

document.getElementById("right").addEventListener("click", () => {
    if (car.position.x < 4) car.position.x += 0.5;
});

// Game loop
function animate() {
    requestAnimationFrame(animate);

    // Move obstacles
    obstacles.forEach(obstacle => {
        obstacle.position.z += speed;
        if (obstacle.position.z > 5) {
            obstacle.position.z = -50;
            obstacle.position.x = (Math.random() - 0.5) * 8;
        }

        // Collision Detection
        if (Math.abs(obstacle.position.z - car.position.z) < 1.5 && Math.abs(obstacle.position.x - car.position.x) < 1.5) {
            alert("💥 Crash! Game Over.");
            window.location.reload();
        }
    });

    // Keep camera with car
    camera.position.x = car.position.x;
    camera.lookAt(car.position.x, 0, 0);

    renderer.render(scene, camera);
}

init();

