


// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.getElementById("game-container").appendChild(canvas);

    // Set Canvas Size
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.7;

    // Cube Properties
    let cube = {
        x: canvas.width / 2 - 25,
        y: canvas.height / 2 - 25,
        size: 50,
        color: "cyan",
        dx: 5,
        dy: 5
    };

    // Draw Cube
    function drawCube() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = cube.color;
        ctx.fillRect(cube.x, cube.y, cube.size, cube.size);
    }

    // Move Cube
    function moveCube(event) {
        switch (event.key) {
            case "ArrowLeft":
                cube.x -= cube.dx;
                break;
            case "ArrowRight":
                cube.x += cube.dx;
                break;
            case "ArrowUp":
                cube.y -= cube.dy;
                break;
            case "ArrowDown":
                cube.y += cube.dy;
                break;
        }
        drawCube();
    }

    // Event Listener for Movement
    window.addEventListener("keydown", moveCube);

    // Initial Draw
    drawCube();
});



const scene = new THREE.Scene();
