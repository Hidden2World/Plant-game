document.addEventListener("DOMContentLoaded", function() {
    const gridsize = 10;
    const grid = document.getElementById("grid");
    const cells = [];
    let score = 2;

    const plantOptions = [
        { name: "Rose", color: "red" },
        { name: "Sunflower", color: "yellow" },
        { name: "Tulip", color: "pink" },
        { name: "Lily", color: "orange" },
        { name: "Orchid", color: "purple" },
        { name: "Daisy", color: "white" },
        { name: "Bluebell", color: "blue" }
    ];

    const container = document.createElement("div");
    container.classList.add("container");

    // Create the plant selection dropdown
    
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdown-container");
    const dropdownLabel = document.createElement("label");
    dropdownLabel.textContent = "Select a plant: ";
    const plantSelect = document.createElement("select");
    plantOptions.forEach(function(plant) {
        const option = document.createElement("option");
        option.value = plant.color;
        option.textContent = plant.name;
        plantSelect.appendChild(option);
        
        
    });
    dropdownContainer.appendChild(dropdownLabel);
    dropdownContainer.appendChild(plantSelect);
    container.appendChild(dropdownContainer);

    // Create the grid
    for (let i = 0; i < gridsize; i++) {
        for (let j = 0; j < gridsize; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            grid.appendChild(cell);
            cells.push(cell);
        }
    }
    container.appendChild(grid);
    document.body.appendChild(container);

    // Plant a plant when a cell is clicked
    cells.forEach(function(cell) {
        cell.addEventListener("click", function() {
            if (!cell.classList.contains("planted") && score >= 1) {
                const selectedColor = plantSelect.value;
                cell.classList.add("planted");
                cell.style.backgroundColor = selectedColor;
                score -= 1;
                updateScore();
                plantGrowthAnimation(cell);
            } else if (cell.classList.contains("fully-grown")) {
                
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
        }, 30000);
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
        cell.style.backgroundColor = "";
        score += 1;
        updateScore();
    }
});
