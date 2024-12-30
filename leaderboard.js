document.addEventListener('DOMContentLoaded', () => {
    const leaderboardDiv = document.getElementById('leaderboard');
     const storedGameData = localStorage.getItem('currentGameData');

    let gameData;
    if(storedGameData) {
        gameData = JSON.parse(storedGameData);

    } else {
      leaderboardDiv.innerHTML = '<p>No game data found, please return to the game and play</p>';
      return;
    }

    let currentLeaderboard = JSON.parse(localStorage.getItem("wordleLeaderboard") || "[]");
        currentLeaderboard.push(gameData);

    currentLeaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem("wordleLeaderboard", JSON.stringify(currentLeaderboard));



    if(currentLeaderboard.length === 0) {
        leaderboardDiv.innerHTML = '<p>No scores yet, play a game to get added!</p>';
        return;
    }
    let leaderboardHTML = '<div class="leaderboard">';
    currentLeaderboard.forEach((entry, index) => {
       leaderboardHTML += `
           <div class="leaderboard-item">
                <span class="leaderboard-rank">${index + 1}.</span>
                <span class="leaderboard-name">${entry.name}</span>
                <span class="leaderboard-score">${entry.score}</span>
                <span class="leaderboard-time">${formatTime(entry.time)}</span>
            </div>
        `;
    });
        leaderboardHTML += '</div>';
    leaderboardDiv.innerHTML = leaderboardHTML;

    function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;

            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds).padStart(2, '0');

            return `${formattedMinutes}:${formattedSeconds}`;
        }
});
