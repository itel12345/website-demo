let scene, camera, renderer, cube, controls, goal, obstacles;
let gameStarted = false;

// ✅ Initialize the game
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.6); // Adjust for mobile
    document.getElementById("canvas-container").appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    camera.position.set(0, 5, 10);
    controls.update();

    // ✅ Add grid background
    const gridHelper = new THREE.GridHelper(20, 20, 0x00ffcc, 0x00ffcc);
    scene.add(gridHelper);

    // ✅ Create player (glowing cube)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 1 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0.5, 0);
    scene.add(cube);

    // ✅ Add goal (winning point)
    const goalGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const goalMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
    goal = new THREE.Mesh(goalGeometry, goalMaterial);
    goal.position.set(4, 0.5, -4);
    scene.add(goal);

    // ✅ Add obstacles
    obstacles = [];
    for (let i = 0; i < 3; i++) {
        let obsGeometry = new THREE.BoxGeometry(1, 1, 1);
        let obsMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        let obstacle = new THREE.Mesh(obsGeometry, obsMaterial);
        obstacle.position.set((Math.random() * 8) - 4, 0.5, (Math.random() * 8) - 4);
        scene.add(obstacle);
        obstacles.push(obstacle);
    }

    // ✅ Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00ffff, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    animate();
}

// ✅ Handle movement
function movePlayer(direction) {
    if (!gameStarted) return;

    let moveSpeed = 0.3;
    if (direction === "left") cube.position.x -= moveSpeed;
    if (direction === "right") cube.position.x += moveSpeed;
    if (direction === "up") cube.position.z -= moveSpeed;
    if (direction === "down") cube.position.z += moveSpeed;

    checkWin();
}

// ✅ Keyboard Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") movePlayer("left");
    if (event.key === "ArrowRight") movePlayer("right");
    if (event.key === "ArrowUp") movePlayer("up");
    if (event.key === "ArrowDown") movePlayer("down");
});

// ✅ Mobile Controls
document.getElementById("left-btn").addEventListener("click", () => movePlayer("left"));
document.getElementById("right-btn").addEventListener("click", () => movePlayer("right"));
document.getElementById("up-btn").addEventListener("click", () => movePlayer("up"));
document.getElementById("down-btn").addEventListener("click", () => movePlayer("down"));

// ✅ Check win/loss conditions
function checkWin() {
    if (cube.position.distanceTo(goal.position) < 0.5) {
        document.getElementById("status").innerText = "🎉 You Win!";
        gameStarted = false;
    }

    for (let obs of obstacles) {
        if (cube.position.distanceTo(obs.position) < 0.5) {
            document.getElementById("status").innerText = "❌ You Lose!";
            gameStarted = false;
        }
    }
}

// ✅ Animate the game loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// ✅ Start the game
document.getElementById("start-btn").addEventListener("click", () => {
    gameStarted = true;
    document.getElementById("status").innerText = "Game Started!";
});

// ✅ Run game when page loads
document.addEventListener("DOMContentLoaded", () => {
    init();
});
