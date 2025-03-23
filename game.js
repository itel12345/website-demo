let scene, camera, renderer, car, track;
let speed = 0.25; // Start speed for level 1
let obstacles = [];
let gameStarted = false;
let gameOverText;
let distance = 0;
let level = 1;
let levelText;

// Create Name Input & Button
const gameNameContainer = document.createElement("div");
gameNameContainer.id = "gameNameContainer";
gameNameContainer.innerHTML = `
    <label for="gameNameInput" style="color:white; font-size:18px; display:block; margin-bottom:5px;">Enter Your Name</label>
    <input type="text" id="gameNameInput" style="padding:10px; font-size:20px; width: 200px; text-align:center; border-radius:5px; border:2px solid #0ff;">
    <button id="readyGoButton" style="display:none; margin-top:10px; padding:10px; font-size:20px; background:#0ff; color:black; border:none; border-radius:5px; cursor:pointer; margin-left:10px;">Ready Go!</button>
`;
gameNameContainer.style.position = "fixed";
gameNameContainer.style.top = "10px";
gameNameContainer.style.left = "50%";
gameNameContainer.style.transform = "translateX(-50%)";
gameNameContainer.style.textAlign = "center";
gameNameContainer.style.color = "white";
gameNameContainer.style.background = "rgba(0, 0, 0, 0.8)";
gameNameContainer.style.padding = "15px";
gameNameContainer.style.borderRadius = "10px";
document.body.appendChild(gameNameContainer);

document.getElementById("gameNameInput").addEventListener("input", function() {
    document.getElementById("readyGoButton").style.display = this.value.trim() ? "inline-block" : "none";
});

document.getElementById("readyGoButton").addEventListener("click", () => {
    gameNameContainer.style.display = "none"; // Hide input and button
    gameStarted = true;
    for (let i = 0; i < 5; i++) createObstacle(i * -15);
    animate();
});

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

// Create obstacles
function createObstacle(zPos = -Math.random() * 50 - 10) {
    const obstacleGeometry = new THREE.BoxGeometry(2, 2, 2);
    const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    let obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);

    obstacle.position.set((Math.random() - 0.5) * 8, 1, zPos);
    obstacle.visible = false;
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
        speed = 0.25;
    }

    if (newLevel !== level) {
        level = newLevel;
        showLevelUpMessage(level);
    }
}

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
    updateSpeed();

    obstacles.forEach((obstacle) => {
        obstacle.visible = true;
        obstacle.position.z += speed;

        if (obstacle.position.z > 10) {
            obstacle.position.z = -Math.random() * 50 - 20;
            obstacle.position.x = (Math.random() - 0.5) * 8;
        }

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
// Create left and right arrow buttons
const leftButton = document.createElement("button");
leftButton.innerHTML = "⬅️";
leftButton.style.position = "fixed";
leftButton.style.bottom = "10%";
leftButton.style.left = "5%";
leftButton.style.fontSize = "clamp(40px, 8vw, 80px)"; // Big and responsive
leftButton.style.padding = "15px";
leftButton.style.borderRadius = "50%";
leftButton.style.background = "#0ff";
leftButton.style.border = "none";
leftButton.style.cursor = "pointer";
leftButton.style.boxShadow = "0 0 15px #0ff";
leftButton.style.width = "clamp(80px, 15vw, 120px)"; // Adjusts with screen size
leftButton.style.height = "clamp(80px, 15vw, 120px)"; // Same width & height for circle shape

const rightButton = document.createElement("button");
rightButton.innerHTML = "➡️";
rightButton.style.position = "fixed";
rightButton.style.bottom = "10%";
rightButton.style.right = "5%";
rightButton.style.fontSize = "clamp(40px, 8vw, 80px)"; // Big and responsive
rightButton.style.padding = "15px";
rightButton.style.borderRadius = "50%";
rightButton.style.background = "#0ff";
rightButton.style.border = "none";
rightButton.style.cursor = "pointer";
rightButton.style.boxShadow = "0 0 15px #0ff";
rightButton.style.width = "clamp(80px, 15vw, 120px)";
rightButton.style.height = "clamp(80px, 15vw, 120px)";

document.body.appendChild(leftButton);
document.body.appendChild(rightButton);

// Mobile-friendly event listeners
leftButton.addEventListener("touchstart", () => moveCar(-1));
rightButton.addEventListener("touchstart", () => moveCar(1));

// Prevent accidental scrolling on mobile
document.body.style.overflow = "hidden";

init();
