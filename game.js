let scene, camera, renderer, car, track;
let speed = 0.25; // Start speed for level 1
let obstacles = [];
let gameStarted = false;
let gameOverText;
let distance = 0;
let level = 1;
let levelText;

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

    for (let i = 0; i < 5; i++) {
        createObstacle(i * -15); // Spaces obstacles naturally
    }

    gameOverText = document.createElement("div");
    gameOverText.innerHTML = "💥 You crashed! Game over dude. <br> <p style='text-align: center; margin-top: 10px;'>Try again.</p>";
    gameOverText.style.position = "fixed";
    gameOverText.style.top = "50%";
    gameOverText.style.left = "50%";
    gameOverText.style.transform = "translate(-50%, -50%)";
    gameOverText.style.fontSize = "clamp(20px, 5vw, 40px)";
    gameOverText.style.color = "white";
    gameOverText.style.display = "none";
    document.body.appendChild(gameOverText);

    levelText = document.createElement("div");
    levelText.style.position = "fixed";
    levelText.style.top = "40%";
    levelText.style.left = "50%";
    levelText.style.transform = "translate(-50%, -50%)";
    levelText.style.fontSize = "clamp(20px, 5vw, 50px)";
    levelText.style.color = "#0ff";
    levelText.style.textShadow = "0 0 10px #0ff, 0 0 20px #0ff";
    levelText.style.display = "none";
    document.body.appendChild(levelText);

    window.addEventListener("resize", onWindowResize);
}

function createObstacle(zPos = -Math.random() * 50 - 10) {
    const obstacleGeometry = new THREE.BoxGeometry(2, 2, 2);
    const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    let obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    
    obstacle.position.set((Math.random() - 0.5) * 8, 1, zPos);
    scene.add(obstacle);
    obstacles.push(obstacle);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function moveCar(direction) {
    car.position.x = Math.max(-4, Math.min(4, car.position.x + direction * 1));
}

function updateSpeed() {
    let newLevel = level;

    if (distance >= 1200) {  
        newLevel = 5;  
        speed = 0.9;  
    } else if (distance >= 900) {  
        newLevel = 4;  
        speed = 0.6;  
    } else if (distance >= 600) {  
        newLevel = 3;  
        speed = 0.4;  
    } else if (distance >= 300) {  
        newLevel = 2;  
        speed = 0.3;  
    } else {  
        newLevel = 1;  
        speed = 0.25;  // Slower than 0.3
    }

    if (newLevel !== level) {
        level = newLevel;
        showLevelUpMessage(level);
    }

    document.getElementById("speed").innerText = `Level ${level} | ${Math.floor(distance)} km/h`;
}

// Show level-up message for 2 seconds
function showLevelUpMessage(level) {
    levelText.innerHTML = `🚀 LEVEL ${level} UNLOCKED!`;
    levelText.style.display = "block";
    
    setTimeout(() => {
        levelText.style.display = "none";
    }, 2000);
}

function animate() {
    if (!gameStarted) return;

    requestAnimationFrame(animate);

    distance += speed;
    updateSpeed(); // Update speed based on distance

    // Move obstacles toward the player
    obstacles.forEach((obstacle) => {
        obstacle.position.z += speed;

        // Reset obstacle when out of view with better spacing
        if (obstacle.position.z > 10) {
            obstacle.position.z = -Math.random() * 50 - 20;
            obstacle.position.x = (Math.random() - 0.5) * 8;
        }

        // Collision detection
        if (
            Math.abs(car.position.x - obstacle.position.x) < 1.5 &&
            Math.abs(car.position.z - obstacle.position.z) < 2
        ) {
            gameOver();
        }
    });

    renderer.render(scene, camera);
}

function gameOver() {
    gameStarted = false;
    gameOverText.style.display = "block";
    console.log("Game Over! Distance:", Math.floor(distance));
}

document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("startButton").style.display = "none";
    gameStarted = true;
    animate();
});

init();
