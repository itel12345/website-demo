let scene, camera, renderer, car, track;
let speed = 0.3;
let obstacles = [];
let gameStarted = false;
let gameOverText;

function init() {
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Makes it look better on high-res screens
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

   // Game Over Text
gameOverText = document.createElement("div");
gameOverText.innerHTML = "💥 You crashed! Game over dude. <br> <p style='text-align: center; margin-top: 10px;'>Try again.</p>";
gameOverText.style.position = "fixed";
gameOverText.style.top = "50%";
gameOverText.style.left = "50%";
gameOverText.style.transform = "translate(-50%, -50%)";
gameOverText.style.fontSize = "clamp(20px, 5vw, 40px)"; // Responsive font size
gameOverText.style.color = "white"; // Changed to white
gameOverText.style.display = "none";
document.body.appendChild(gameOverText);


    // Resize listener for responsiveness
    window.addEventListener("resize", onWindowResize);
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

// Handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Controls
document.addEventListener("keydown", (event) => {
    if (!gameStarted) return;
    if (event.key === "ArrowLeft" && car.position.x > -4) car.position.x -= 0.5;
    if (event.key === "ArrowRight" && car.position.x < 4) car.position.x += 0.5;
});

// Mobile Controls
document.getElementById("left").addEventListener("click", () => {
    if (!gameStarted) return;
    if (car.position.x > -4) car.position.x -= 0.5;
});

document.getElementById("right").addEventListener("click", () => {
    if (!gameStarted) return;
    if (car.position.x < 4) car.position.x += 0.5;
});

// Game loop
function animate() {
    if (!gameStarted) return;

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
            gameOverText.style.display = "block"; // Show Game Over Text
            gameStarted = false; // Stop the game
        }
    });

    // Keep camera with car
    camera.position.x = car.position.x;
    camera.lookAt(car.position.x, 0, 0);

    renderer.render(scene, camera);
}

// Start the game when "READY GO" button is clicked
document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("startButton").style.display = "none";
    gameStarted = true;
    animate();
});

// Initialize the scene
init();
