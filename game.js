        // Game variables
        let scene, camera, renderer, car, track;
        let speed = 0.25;
        let obstacles = [];
        let bullets = [];
        let gameStarted = false;
        let gameOverText, winText, levelText;
        let distance = 0;
        let level = 1;
        let maxDistance = 1200;
        let maxBullets = 5;
        let bulletsFired = 0;

        // Music configuration
        const levelMusic = {
            1: "./music/arcade-melody-295434.mp3",
            2: "./music/game-music-loop-1-143979.mp3",
            3: "./music/game-music-loop-3-144252.mp3",
            4: "./music/game-music-loop-6-144641.mp3",
            5: "./music/game-music-loop-7-145285.mp3"
        };

        let bgMusic;
        let currentMusicLevel = 0;

        // Initialize audio
        function initAudio() {
            bgMusic = new Audio();
            bgMusic.loop = true;
            bgMusic.volume = 0.7;
            document.addEventListener('click', () => {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
            }, { once: true });
        }

        // Initialize Three.js scene
        function init() {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 5, 10);
            camera.lookAt(0, 0, 0);

            renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('gameCanvas') });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);

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
            initAudio();
        }

        // Create text elements
        function createTextElement(text, color = "white") {
            let div = document.createElement("div");
            div.innerHTML = text;
            div.style.position = "fixed";
            div.style.top = "50%";
            div.style.left = "50%";
            div.style.transform = "translate(-50%, -50%)";
            div.style.fontSize = "clamp(20px, 5vw, 40px)";
            div.style.color = color;
            div.style.textShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
            div.style.display = "none";
            document.body.appendChild(div);
            return div;
        }

        // Create obstacles
        function createObstacle(zPos = -Math.random() * 50 - 10) {
            const obstacleGeometry = new THREE.BoxGeometry(2, 2, 2);
            const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
            let obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);

            obstacle.position.set((Math.random() - 0.5) * 8, 1, zPos);
            scene.add(obstacle);
            obstacles.push(obstacle);
        }

        // Shoot bullet
        function shootBullet() {
            if (bulletsFired >= maxBullets) return;

            const bulletGeometry = new THREE.SphereGeometry(0.3, 8, 8);
            const bulletMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
            let bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

            bullet.position.set(car.position.x, 1, car.position.z - 1);
            scene.add(bullet);
            bullets.push(bullet);
            bulletsFired++;
        }

        // Window resize handler
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // Move car
        function moveCar(direction) {
            car.position.x = Math.max(-4, Math.min(4, car.position.x + direction * 1));
        }

        // Update speed and level
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
                playMusicForLevel(newLevel);
                level = newLevel;
                showLevelUpMessage(level);
                car.material.color.set(newColor);
                car.material.emissive.set(newColor);
            }

            document.getElementById("speed").innerText = `Level ${level} | ${Math.floor(distance)} km/h`;
        }

        // Play music for level
        function playMusicForLevel(level) {
            if (currentMusicLevel === level) return;

            fadeOutMusic(() => {
                bgMusic.src = levelMusic[level];
                bgMusic.currentTime = 0;
                bgMusic.volume = 0;
                bgMusic.play().catch(e => console.error("Music play error:", e));
                fadeInMusic();
                currentMusicLevel = level;
            });
        }

        // Fade out music
        function fadeOutMusic(callback) {
            let fadeInterval = setInterval(() => {
                if (bgMusic.volume > 0.1) {
                    bgMusic.volume -= 0.1;
                } else {
                    clearInterval(fadeInterval);
                    if (callback) callback();
                }
            }, 100);
        }

        // Fade in music
        function fadeInMusic() {
            let fadeInterval = setInterval(() => {
                if (bgMusic.volume < 0.7) {
                    bgMusic.volume += 0.1;
                } else {
                    clearInterval(fadeInterval);
                }
            }, 100);
        }

        // Show level up message
        function showLevelUpMessage(level) {
            levelText.innerHTML = `🚀 LEVEL ${level} UNLOCKED!`;
            levelText.style.display = "block";
            setTimeout(() => {
                levelText.style.display = "none";
            }, 2000);
        }

        // Game over
        function gameOver() {
            gameStarted = false;
            gameOverText.style.display = "block";
        }

        // Win game
        function winGame() {
            gameStarted = false;
            winText.style.display = "block";
        }

        // Start game
        function startGame() {
            document.getElementById("shootText").style.display = "none";
            document.getElementById("bulletText").style.display = "none";
            document.getElementById("startButton").style.display = "none";
            
            init();
            gameStarted = true;
            
            for (let i = 0; i < 5; i++) {
                createObstacle(i * -15);
            }
            
            animate();
        }

        // Main animation loop
        function animate() {
            if (!gameStarted) return;

            requestAnimationFrame(animate);

            distance += speed;
            updateSpeed();

            // Update bullets
            bullets.forEach((bullet, index) => {
                bullet.position.z -= 1.5;
                if (bullet.position.z < -50) {
                    scene.remove(bullet);
                    bullets.splice(index, 1);
                }
            });

            // Update obstacles
            obstacles.forEach((obstacle, index) => {
                obstacle.position.z += speed;

                if (obstacle.position.z > 10) {
                    obstacle.position.z = -Math.random() * 50 - 20;
                    obstacle.position.x = (Math.random() - 0.5) * 8;
                }

                // Check bullet collisions
                bullets.forEach((bullet, bulletIndex) => {
                    if (bullet.position.distanceTo(obstacle.position) < 1.5) {
                        scene.remove(obstacle);
                        obstacles.splice(index, 1);
                        scene.remove(bullet);
                        bullets.splice(bulletIndex, 1);
                        createObstacle();
                    }
                });

                // Check car collisions
                if (Math.abs(car.position.x - obstacle.position.x) < 1.5 && 
                    Math.abs(car.position.z - obstacle.position.z) < 2) {
                    gameOver();
                }
            });

            renderer.render(scene, camera);
        }

        // Event listeners
        document.getElementById("startButton").addEventListener("click", startGame);
        document.getElementById("left").addEventListener("click", () => moveCar(-1));
        document.getElementById("right").addEventListener("click", () => moveCar(1));
        document.getElementById("shoot").addEventListener("click", shootBullet);
        document.getElementById("muteBtn").addEventListener("click", () => {
            bgMusic.muted = !bgMusic.muted;
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") moveCar(-1);
            if (event.key === "ArrowRight") moveCar(1);
            if (event.key === "w" || event.key === "W") shootBullet();
        });

        // Initialize on load
        window.addEventListener('load', () => {
            renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('gameCanvas') });
        });
