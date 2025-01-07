    // Global variables
    let horizontal = true;
    let maxscore = 100;
    let x, y;
    let currentHintIndex = 0;
    let directionMap = {};
    let startTime;
    let timerInterval;
    let isPaused = false;
    let pausedTime = 0; // To store the elapsed time when the game is paused
    let score = 0;

    // --- Helper Functions ---
    function closeModal(name) {
      document.getElementById(name).style.display = "none";
    }

    function showModal(name) {
      document.getElementById(name).style.display = "block";
    }

    function animTutorial() {
        let animState = document.getElementById("anim1").style.backgroundColor === "LightBlue";
        const cells = ["anim1", "anim2", "anim3", "anim4"];

        cells.forEach(id => {
            document.getElementById(id).style.backgroundColor = animState ? "White" : "LightBlue";
        });

        document.getElementById("anim5").style.backgroundColor = animState ? "LightBlue" : "White";
        document.getElementById("anim6").style.backgroundColor = animState ? "LightGray" : "LightBlue";
        document.getElementById("anim7").style.backgroundColor = animState ? "LightBlue" : "LightGray";
    }

    function updateHintText() {
      const hintTextElement = document.getElementById("hint-text");
        // Update hint text based on the current direction and cell
        if (horizontal) {
            const acrossHints = [
                "It's in the middle of your face", 
                "To assume or suggest", 
                "Used to describe a large number; In engineering: Forces that oppose a structure", 
                "In tune; accurate in pitch", 
                "No longer alive", 
               

            ];
            hintTextElement.textContent = acrossHints[x] || "";
        } else {
            const downHints = [
                "To walk taking slow steps, as if your feet are heavy", 
                "Literally, nobody", 
                "Japan's third-largest city, known as 'The Kitchen of Japan'", 
                "One _____ argument, doesn’t consider other perspectives", 
                "Online Marketplace for handmade goods",
               
            ];
            hintTextElement.textContent = downHints[y] || "";
        }
    }

    function colorSquares() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let cell = document.getElementById(`i${i}_${j}`);
                // Determine if the cell should be black based on the position
                let isBlackCell = (i === 0 && j === 0) || (i === 4 && j === 4);
                cell.style.backgroundColor = isBlackCell ? "black" : "white";
            }
        }
        
let lastClickedCellId = null; // Track the last clicked cell
        let start, end;
        if (horizontal) {
            start = 0;
            end = 5;

            for (let i = start; i < end; i++) {
                let cell = document.getElementById("i" + x + "_" + i);
                if (cell && !cell.classList.contains('black-cell')) {
                    cell.style.backgroundColor = "#99DAFF"; // Light blue for the current word
                }
            }
        } else {
            start = 0;
            end = 5;

            for (let i = start; i < end; i++) {
                let cell = document.getElementById("i" + i + "_" + y);
                if (cell && !cell.classList.contains('black-cell')) {
                    cell.style.backgroundColor = "#99DAFF";
                }
            }
        }

        // Highlight the currently selected cell
        if (document.getElementById("i" + x + "_" + y) && !document.getElementById("i" + x + "_" + y).classList.contains('black-cell')) {
            document.getElementById("i" + x + "_" + y).style.backgroundColor = "#FFD800"; // Yellow for the selected cell
        }
    }

    function initializeGame() {
      const table = document.getElementById("table");
      let tableHTML = "";
      for (let i = 0; i < 5; i++) {
        tableHTML += "<tr>";
        for (let j = 0; j < 5; j++) {
            const cellId = `i${i}_${j}`;
            // Determine if the cell should be black (disabled)
            const isBlackCell = (i === 0 && j === 0) || (i === 4 && j === 4);

            tableHTML += `<td><div style="position:relative;">
                            <input 
                                autocomplete='off' 
                                readonly 
                                onkeyup='handleKeyUp(event, ${i}, ${j})' 
                                onfocus='handleFocus(${i}, ${j})' 
                                onclick='handleCellClick(${i}, ${j})' 
                                class='cell ${isBlackCell ? 'black-cell' : ''}' 
                                id='${cellId}'
                                ${isBlackCell ? "disabled" : ""}
                            >
                            <span class="cell-number">${
                                (i === 0 && j === 1) ? "1" :
                                (i === 0 && j === 2) ? "2" :
                                (i === 0 && j === 3) ? "3" :
                                (i === 0 && j === 4) ? "4" :
                                (i === 1 && j === 0) ? "5" :
                                (i === 2 && j === 0) ? "6" :
                                (i === 3 && j === 0) ? "7" :
                                (i === 4 && j === 0) ? "8" : ""
                            }</span>
                        </div></td>`;
        }
        tableHTML += "</tr>";
    }
      table.innerHTML = tableHTML;

      // Initial setup
        x = 0;
        y = 1;
        document.getElementById(`i${x}_${y}`).focus();
      colorSquares();
      updateHintText();
      adjustSizes()
    }

    // --- Event Handlers ---
    function handleKeyUp(event, i, j) {
        const currentCell = document.getElementById(`i${i}_${j}`);

        // Handle letter input
        if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
            currentCell.value = event.key.toUpperCase();
            
            moveFocusToNextCell(i, j);
        }
        // Handle backspace
        else if (event.key === "Backspace") {
            if (currentCell.value === "") {
                moveFocusToPreviousCell(i, j);
            }
            currentCell.value = "";
            currentCell.style.color = "black";
        }
        // Handle arrow keys
        else if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
            moveFocusWithArrowKeys(event.key, i, j);
        }

        colorSquares();
        updateHintText();
        // Only check solution if all cells are filled
        if (isPuzzleFilled()) {
            checkSolution();
        }

       
    }

    function handleFocus(i, j) {
        x = i;
        y = j;
        colorSquares();
        updateHintText();
    }



function handleCellClick(clickedX, clickedY) {
    const cellId = `i${clickedX}_${clickedY}`;
    const cell = document.getElementById(cellId);

    if (cell.disabled) return;

    // If a different cell is clicked, reset its state
    if (lastClickedCellId && lastClickedCellId !== cellId) {
        const lastCell = document.getElementById(lastClickedCellId);
        if (lastCell) {
            lastCell.dataset.clickCount = "0"; // Reset click count
            delete directionMap[lastClickedCellId]; // Reset direction
        }
    }

    let clickCount = parseInt(cell.dataset.clickCount) || 0;
    let cellHorizontal = directionMap[cellId] === "across";

    // First click logic
    if (clickCount === 0) {
        clickCount = 1;
        if (clickedX === 0) {
            cellHorizontal = isWordFilled('down', clickedX, clickedY);
        } else if (clickedY === 0) {
            cellHorizontal = !isWordFilled('across', clickedX, clickedY);
        } else { 
            cellHorizontal = true; // Default to horizontal
        }
    } else {
        // Toggle logic (and special case for first row/column)
        if ((clickedX === 0 || clickedY === 0) && clickCount === 1) {
            cellHorizontal = !cellHorizontal;
            clickCount = 0; // Reset after toggle
        } else {
            cellHorizontal = !cellHorizontal;
        }
        clickCount++;
    }

    // Update cell data and global variables
    directionMap[cellId] = cellHorizontal ? "across" : "down";
    cell.dataset.clickCount = clickCount;
    horizontal = cellHorizontal;

    // Update last clicked cell ID
    lastClickedCellId = cellId;

    // Other logic
    x = clickedX;
    y = clickedY;
    cell.focus();
    updateHintText();
    colorSquares();
}


// Initialize lastClickedCellId outside the function
let lastClickedCellId = null;

    function isWordFilled(direction, startX, startY) {
        if (direction === 'across') {
            for (let j = 0; j < 5; j++) {
                const cell = document.getElementById(`i${startX}_${j}`);
                if (!cell || cell.disabled || cell.value === "") return false;
            }
        } else { // direction === 'down'
            for (let i = 0; i < 5; i++) {
                const cell = document.getElementById(`i${i}_${startY}`);
                if (!cell || cell.disabled || cell.value === "") return false;
            }
        }
        return true;
    }

    function insertChar(char) {
        const currentCell = document.getElementById(`i${x}_${y}`);
        if (!currentCell.disabled) {
            currentCell.value = char;
           
            moveFocusToNextCell(x, y);
            colorSquares();
            updateHintText();
            // Only check solution if all cells are filled
            if (isPuzzleFilled()) {
                checkSolution();
            }
           
        }
    }

    function deleteChar() {
        const currentCell = document.getElementById(`i${x}_${y}`);
        if (!currentCell.disabled) {
            if (currentCell.value === "") {
                moveFocusToPreviousCell(x, y);
            }
            currentCell.value = "";
            currentCell.style.color = "black";
            colorSquares();
            updateHintText();
        }
    }

    function scrollHint(direction) {
      currentHintIndex = horizontal ? x : y + 5;
      currentHintIndex += direction;

      if (currentHintIndex < 0) {
          currentHintIndex = 9;
          horizontal = false;
      } else if (currentHintIndex > 9) {
          currentHintIndex = 0;
          horizontal = true;
      }

      // Switch to down direction when hint index is between 5 and 9 (inclusive)
      if (currentHintIndex >= 5 && currentHintIndex <= 9) {
          horizontal = false;
      } else {
          horizontal = true;
      }

      // Update x and y based on the direction
      if (horizontal) {
          // Across: x stays the same, y might move to the beginning of the row
          x = currentHintIndex;
          y = 0; // Start from the first cell of the row for across
      } else {
          // Down: x moves to the top of the column, y stays the same
          x = 0; // Start from the first cell of the column for down
          y = currentHintIndex - 5;
      }

      // Find the first non-disabled cell in the row (for across) or column (for down)
      if (horizontal) {
          for (let tempY = 0; tempY < 5; tempY++) {
              if (!document.getElementById(`i${x}_${tempY}`).disabled) {
                  y = tempY;
                  break;
              }
          }
      } else {
          for (let tempX = 0; tempX < 5; tempX++) {
              if (!document.getElementById(`i${tempX}_${y}`).disabled) {
                  x = tempX;
                  break;
              }
          }
      }

      // Additional check in case the above logic fails to find a non-disabled cell
      while (document.getElementById(`i${x}_${y}`).disabled) {
          if (horizontal) {
              y++;
              if (y > 4) {
                  y = 0;
                  x++;
              }
          } else {
              x++;
              if (x > 4) {
                  x = 0;
                  y++;
              }
          }
          if (x > 4 || y > 4) {
              x = 0;
              y = 0;
          }
      }

      colorSquares();
      updateHintText();
      document.getElementById(`i${x}_${y}`).focus();
    }

    // --- Navigation Functions ---
    function moveFocusToNextCell(i, j) {
        let nextCellFound = false;
        if (horizontal) {
            for (let newY = j + 1; newY < 5 && !nextCellFound; newY++) {
                if (!document.getElementById(`i${i}_${newY}`).disabled) {
                    x = i;
                    y = newY;
                    nextCellFound = true;
                }
            }
            if (!nextCellFound) {
                for (let newX = i + 1; newX < 5 && !nextCellFound; newX++) {
                    for (let newY = 0; newY < 5 && !nextCellFound; newY++) {
                        if (!document.getElementById(`i${newX}_${newY}`).disabled) {
                            x = newX;
                            y = newY;
                            nextCellFound = true;
                            horizontal = true;
                        }
                    }
                }
            }
        } else {
            for (let newX = i + 1; newX < 5 && !nextCellFound; newX++) {
                if (!document.getElementById(`i${newX}_${j}`).disabled) {
                    x = newX;
                    y = j;
                    nextCellFound = true;
                }
            }
            if (!nextCellFound) {
                for (let newY = j + 1; newY < 5 && !nextCellFound; newY++) {
                    for (let newX = 0; newX < 5 && !nextCellFound; newX++) {
                        if (!document.getElementById(`i${newX}_${newY}`).disabled) {
                            x = newX;
                            y = newY;
                            nextCellFound = true;
                            horizontal = false;
                        }
                    }
                }
            }
        }

        if (nextCellFound) {
            document.getElementById(`i${x}_${y}`).focus();
        }
    }

    function moveFocusToPreviousCell(i, j) {
        let prevCellFound = false;
        if (horizontal) {
            for (let newY = j - 1; newY >= 0 && !prevCellFound; newY--) {
                if (!document.getElementById(`i${i}_${newY}`).disabled) {
                    x = i;
                    y = newY;
                    prevCellFound = true;
                }
            }
        } else {
            for (let newX = i - 1; newX >= 0 && !prevCellFound; newX--) {
                if (!document.getElementById(`i${newX}_${j}`).disabled) {
                    x = newX;
                    y = j;
                    prevCellFound = true;
                }
            }
        }

        if (prevCellFound) {
            document.getElementById(`i${x}_${y}`).focus();
        }
    }

    function moveFocusWithArrowKeys(key, i, j) {
        if (key === "ArrowLeft" && y > 0) {
            y--;
        } else if (key === "ArrowRight" && y < 4) {
            y++;
        } else if (key === "ArrowUp" && x > 0) {
            x--;
        } else if (key === "ArrowDown" && x < 4) {
            x++;
        }

        // Skip disabled cells
        while (document.getElementById(`i${x}_${y}`).disabled) {
            if (key === "ArrowLeft" && y > 0) {
                y--;
            } else if (key === "ArrowRight" && y < 4) {
                y++;
            } else if (key === "ArrowUp" && x > 0) {
                x--;
            } else if (key === "ArrowDown" && x < 4) {
                x++;
            }
        }

        document.getElementById(`i${x}_${y}`).focus();
    }

    // --- Game Logic Functions ---
    function checkLetter(i, j, letter) {
        // Define the correct solution
        const correctSolution = [
            ["", "N", "O", "S", "E"],
            ["P", "O", "S", "I", "T"],
            ["L", "O", "A", "D", "S"],
            ["O", "N", "K", "E", "Y"],
            ["D", "E", "A", "D", ""],
        ];

        // Check if the entered letter matches the correct solution
        return correctSolution[i][j] === letter;
    }
    function isPuzzleFilled() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const cell = document.getElementById(`i${i}_${j}`);
                if (!cell.disabled && cell.value === "") {
                    return false; // Found an empty cell
                }
            }
        }
        return true; // All cells are filled
    }
    function checkSolution() {
        let isCorrect = true;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const cell = document.getElementById(`i${i}_${j}`);
                if (!cell.disabled) {
                    const expectedLetter = getExpectedLetter(i, j);
                    if (cell.value !== expectedLetter) {
                        isCorrect = false;
                        break;
                    }
                }
            }
            if (!isCorrect) break;
        }
    
        if (isCorrect) {
            showCongratsPopup();
            startConfetti();
        } else {
            showTryAgainPopup();
            stopConfetti();
        }
    }

    function getExpectedLetter(i, j) {
        // Define the correct solution
        const correctSolution = [
            ["", "N", "O", "S", "E"],
            ["P", "O", "S", "I", "T"],
            ["L", "O", "A", "D", "S"],
            ["O", "N", "K", "E", "Y"],
            ["D", "E", "A", "D", ""],
        ];
        return correctSolution[i][j];
    }
    

    function handlePuzzleCompletion(isCorrect) {
        

      
    }

    function showWinModal() {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("myModal").focus();
    }

  
   function showCongratsPopup() {
            const completionTime = document.getElementById("timerDisplay").textContent;
            document.getElementById("completionMessage").textContent = `You have successfully completed the crossword in ${completionTime}`;
            document.getElementById("modalOverlay").style.display = "block";
            document.getElementById("congratsModal").style.display = "block";
            clearInterval(timerInterval); // Stop the timer

            // Get the player's name (ensure it's not empty)
            const playerName = document.getElementById("userNameDisplay").textContent;

            // Check if leaderboardRef is defined (Firebase is initialized)
            if (typeof leaderboardRef !== 'undefined') {
                // Save the result to Firebase
                leaderboardRef.push({
                    name: playerName,
                    time: completionTime,
                    timestamp: new Date().toUTCString() // Add the timestamp in UTC string format
                })
                .then(() => {
                    console.log("Leaderboard entry saved successfully!");
                })
                .catch((error) => {
                    console.error("Error saving leaderboard entry:", error);
                    // Display an error message to the user if needed
                    alert("An error occurred while saving your score. Please try again.");
                });
            } else {
                console.error("Firebase is not initialized. Leaderboard entry not saved.");
                alert("An error occurred. Please check your Firebase setup.");
            }
        }
    function showTryAgainPopup() {
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("tryAgainModal").style.display = "block";
        // Don't pause the timer here
    }
    
    function hideTryAgainPopup() {
        document.getElementById("modalOverlay").style.display = "none";
        document.getElementById("tryAgainModal").style.display = "none";
        // Timer continues running in the background
    }

    function gotoLeaderboard() {
        // Placeholder for leaderboard URL
        window.location.href = "leaderboard.html"; // Replace with your actual leaderboard URL
    }
    
    // --- Timer Functions ---
    function togglePause() {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(timerInterval);
            pausedTime = new Date() - startTime; // Calculate elapsed time before pausing
            document.getElementById("pauseModal").style.display = "flex";
        } else {
            resumeGame();
        }
    }

    function resumeGame() {
        document.getElementById("pauseModal").style.display = "none";
        document.getElementById("modalOverlay").style.display = "none";
        document.getElementById("congratsModal").style.display = "none";
        
    
        // Only resume the timer if the game was previously paused and not completed
        if (isPaused) {
            startTime = new Date() - pausedTime; // Adjust start time to resume from paused time
            updateTimerDisplay();
            timerInterval = setInterval(updateTimerDisplay, 1000);
            isPaused = false;
            pausedTime = 0; // Reset paused time
        }
    }
    

    function updateTimerDisplay() {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, "0");
        const seconds = (elapsedTime % 60).toString().padStart(2, "0");
        document.getElementById("timerDisplay").textContent = `${minutes}:${seconds}`;
    }

    function startTimer() {
        startTime = isPaused ? new Date() - pausedTime : new Date(); // Start time depends on whether the game was paused
        updateTimerDisplay();
        timerInterval = setInterval(updateTimerDisplay, 1000);
    }

      function startGame() {
            const name = document.getElementById("nameInput").value;
            document.getElementById("userNameDisplay").textContent = name;
            document.getElementById("overlay").style.display = "none";
            startTimer();
            // You might want to add a check here:
           
        }
    function adjustSizes() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
      
        // Determine container width based on screen size
        const containerWidth = Math.min(390, windowWidth * 0.9);
        const cellSize = containerWidth / 5;
      
        // Set table size
        const table = document.getElementById("table");
        table.style.width = `${containerWidth}px`;
        table.style.height = `${containerWidth}px`; // Assuming a square table
      
        // Adjust cell size based on table size
        const cells = document.querySelectorAll("#table .cell");
        cells.forEach((cell) => {
          cell.style.width = `${cellSize}px`;
          cell.style.height = `${cellSize}px`;
        });
      
        // Update hint container width to match the table width
        document.getElementById("hint-container").style.width = `${containerWidth}px`;
      }
      

    // --- Initialization ---
    window.onload = function () {
        setInterval(animTutorial, 2000);
        initializeGame(); 
        adjustSizes();
        window.addEventListener("resize", adjustSizes);
    };

    document.addEventListener("scroll", () => {
        window.scrollTo(0, 0);
    }, { passive: false });

    // --- Prevent Zooming and Scrolling ---
    (function () {
        const disableZoom = () => {
            document.addEventListener("gesturestart", (e) => e.preventDefault());
            document.addEventListener("gesturechange", (e) => e.preventDefault());
            document.addEventListener("gestureend", (e) => e.preventDefault());
            document.addEventListener("keydown", (e) => {
                if ((e.ctrlKey || e.metaKey) && ["+", "-", "0"].includes(e.key)) {
                    e.preventDefault();
                }
            });
            document.addEventListener('dblclick', (e) => e.preventDefault());

            let viewportMetaTag = document.querySelector("meta[name='viewport']");
            if (!viewportMetaTag) {
                viewportMetaTag = document.createElement('meta');
                viewportMetaTag.name = 'viewport';
                document.head.appendChild(viewportMetaTag);
            }
            viewportMetaTag.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
        };

        const disableScrolling = () => {
            const preventDefault = (e) => e.preventDefault();
            window.addEventListener('wheel', preventDefault, { passive: false });
            window.addEventListener('touchmove', preventDefault, { passive: false });
            window.addEventListener('keydown', (e) => {
                const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', ' '];
                if (keys.includes(e.key)) {
                    e.preventDefault();
                }
            });

            document.documentElement.style.position = 'fixed';
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.width = '100%';
            document.documentElement.style.height = '100%';

            document.body.style.position = 'fixed';
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
            document.body.style.margin = '0';
        };

        disableZoom();
        disableScrolling();
    })();
