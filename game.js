let scene, camera, renderer, car, track;
let speed = 0.25; // Initial speed
let obstacles = [];
let bullets = [];
let gameStarted = false;
let gameOverText;
let winText;
let distance = 0;
let level = 1;
let levelText;
let maxDistance = 1200; // Winning distance

// Initialize Three.js Scene
function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    const trackGeometry = new THREE.PlaneGeometry(10, 100);
    const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, side: THREE.DoubleSide });
    track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.rotation.x = -Math.PI / 2;
    track.position.y = -0.1;
    scene.add(track);

    const carGeometry = new THREE.BoxGeometry(2, 1, 3);
    const carMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 1 });
    car = new THREE.Mesh(carGeometry, carMaterial);
    car.position.set(0, 1, 0);
    scene.add(car);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffff, 3, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    gameOverText = createTextElement("💥 You crashed! Game Over.");
    winText = createTextElement("🎉 Well Done! You Won!");
    levelText = createTextElement("", "#0ff");

    window.addEventListener("resize", onWindowResize);
}

// Function to create text elements
function createTextElement(text, color = "white") {
    let div = document.createElement("div");
    div.innerHTML = text;
    div.style.position = "fixed";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%, -50%)";
    div.style.fontSize = "clamp(20px, 5vw, 40px)";
    div.style.color = color;
    div.style.textShadow = "0 0 10px " + color + ", 0 0 20px " + color;
    div.style.display = "none";
    document.body.appendChild(div);
    return div;
}

// Create obstacles (Red Cubes)
function createObstacle(zPos = -Math.random() * 50 - 10) {
    const obstacleGeometry = new THREE.BoxGeometry(2, 2, 2);
    const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    let obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);

    obstacle.position.set((Math.random() - 0.5) * 8, 1, zPos);
    scene.add(obstacle);
    obstacles.push(obstacle);
}

// Create bullet when shooting (W Key)
function shootBullet() {
    const bulletGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const bulletMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    let bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

    bullet.position.set(car.position.x, 1, car.position.z - 1);
    scene.add(bullet);
    bullets.push(bullet);
}

// Window Resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Move Car Left/Right
function moveCar(direction) {
    car.position.x = Math.max(-4, Math.min(4, car.position.x + direction * 1));
}

// Update Speed & Levels
function updateSpeed() {
    let newLevel = level;
    let newColor;

    if (distance >= maxDistance) {
        winGame();
        return;
    } else if (distance >= 900) {  
        newLevel = 5;  
        speed = 0.9;  
        newColor = 0x000000;
    } else if (distance >= 600) {  
        newLevel = 4;  
        speed = 0.6;  
        newColor = 0xFFA500;
    } else if (distance >= 300) {  
        newLevel = 3;  
        speed = 0.4;  
        newColor = 0x800080;
    } else if (distance >= 150) {  
        newLevel = 2;  
        speed = 0.3;  
        newColor = 0xFFFF99;
    } else {  
        newLevel = 1;  
        speed = 0.25;
        newColor = 0x00ffff;
    }

    if (newLevel !== level) {
        level = newLevel;
        showLevelUpMessage(level);
        car.material.color.set(newColor);
        car.material.emissive.set(newColor);
    }

    document.getElementById("speed").innerText = `Level ${level} | ${Math.floor(distance)} km/h`;
}

// Show Level-Up Message
function showLevelUpMessage(level) {
    levelText.innerHTML = `🚀 LEVEL ${level} UNLOCKED!`;
    levelText.style.display = "block";
    
    setTimeout(() => {
        levelText.style.display = "none";
    }, 2000);
}

// Animate Game
function animate() {
    if (!gameStarted) return;

    requestAnimationFrame(animate);

    distance += speed;
    updateSpeed();

    bullets.forEach((bullet, index) => {
        bullet.position.z -= 1.5;
        if (bullet.position.z < -50) {
            scene.remove(bullet);
            bullets.splice(index, 1);
        }
    });

    obstacles.forEach((obstacle, index) => {
        obstacle.position.z += speed;

        if (obstacle.position.z > 10) {
            obstacle.position.z = -Math.random() * 50 - 20;
            obstacle.position.x = (Math.random() - 0.5) * 8;
        }

        bullets.forEach((bullet, bulletIndex) => {
            if (bullet.position.distanceTo(obstacle.position) < 1.5) {
                scene.remove(obstacle);
                obstacles.splice(index, 1);
                scene.remove(bullet);
                bullets.splice(bulletIndex, 1);
                createObstacle(); // Keep spawning new ones
            }
        });

        if (Math.abs(car.position.x - obstacle.position.x) < 1.5 && Math.abs(car.position.z - obstacle.position.z) < 2) {
            gameOver();
        }
    });

    renderer.render(scene, camera);
}

// Game Over
function gameOver() {
    gameStarted = false;
    gameOverText.style.display = "block";
    console.log("Game Over! Distance:", Math.floor(distance));
}

// Win Game
function winGame() {
    gameStarted = false;
    winText.style.display = "block";
    console.log("You Won! Final Distance:", Math.floor(distance));
}

// Start Game
document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("startButton").style.display = "none";
    gameStarted = true;

    for (let i = 0; i < 5; i++) {
        createObstacle(i * -15);
    }

    animate();
});

// Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveCar(-1);
    if (event.key === "ArrowRight") moveCar(1);
    if (event.key === "w" || event.key === "W") shootBullet();
});
let maxBullets = 5; // User can shoot only 5 bullets
let bulletsFired = 0; // Track the number of bullets fired

function shootBullet() {
    if (bulletsFired >= maxBullets) return; // Stop shooting if out of bullets

    const bulletGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const bulletMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    let bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

    bullet.position.set(car.position.x, 1, car.position.z - 1);
    scene.add(bullet);
    bullets.push(bullet);
    
    bulletsFired++; // Increase the bullet count
}

init();

