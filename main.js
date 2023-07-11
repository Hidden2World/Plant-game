document.addEventListener("DOMContentLoaded", function() {
    const gridsize = 10; 
    const grid = document.getElementById("grid");
    const cells = [];
    let score = 2;

    
    // Create the grid
    for (let i = 0; i < gridsize; i++) {
        for (let j = 0; j < gridsize; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            grid.appendChild(cell);
            cells.push(cell);
        }
    }

    // Plant a plant when a cell is clicked
    cells.forEach(function(cell) {
        
        cell.addEventListener("click", function() {
            
            if (!cell.classList.contains("planted") && score >= 1) {
                cell.classList.add("planted");
                cell.style.backgroundColor = getRandomColor();
                score -= 1;
                updateScore();
                plantGrowthAnimation(cell);
            } else if (cell.classList.contains("fully-grown")) {
                score += 1;
                resetPlant(cell);
            }
        });
    });

    // Function to animate plant growth
    function plantGrowthAnimation(cell) {
        const cellWidth = cell.offsetWidth;
        const cellHeight = cell.offsetHeight;
        const initialSize = 0;
        const finalSize = Math.min(cellWidth - 3, cellHeight - 3);

        const centerX = cellWidth / 2;
        const centerY = cellHeight / 2;
        const initialX = centerX - initialSize / 2;
        const initialY = centerY - initialSize / 2;

        cell.style.width = initialSize + "px";
        cell.style.height = initialSize + "px";
        cell.style.borderRadius = "50%";
        cell.style.transformOrigin = "center";
        cell.style.transform = `translate(${initialX}px, ${initialY}px)`;
        cell.classList.add("initial");
        

        const growthInterval = setInterval(function() {
            const currentSize = parseInt(cell.style.width) || initialSize;
            
            if (currentSize < finalSize) {
                const newSize = currentSize + 5;
                const newX = centerX - newSize / 2;
                const newY = centerY - newSize / 2;

                cell.style.width = newSize + "px";
                cell.style.height = newSize + "px";
                cell.style.borderRadius = "50%";
                cell.style.transform = `translate(${newX}px, ${newY}px)`;
            } else {
                clearInterval(growthInterval);
                cell.classList.remove("initial");
                cell.classList.add("fully-grown");
                score += 1;
                updateScore();
            }
        }, 600000);
    }

    // Function to generate a random flower color
    function getRandomColor() {
        const colors = ["red", "blue", "yellow", "pink", "orange", "purple", "green"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Function to update the score
    function updateScore() {
        const scoreDisplay = document.getElementById("score");
        scoreDisplay.textContent = `Plants: ${score}`;
        
    }

    // Function to reset the plant
    function resetPlant(cell) {
        cell.classList.remove("fully-grown");
        cell.classList.remove("planted");
        cell.style.width = "10";
        cell.style.height = "10";
        cell.style.borderRadius = "50%";
        cell.style.transform = `translate(${newX}px, ${newY}px)`;
        score += 1;
    }
});
