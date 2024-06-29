let teamATime = 300; // 5 minutes in seconds
let teamBTime = 300; // 5 minutes in seconds
let teamATimer;
let teamBTimer;
let teamABanCount = 0;
let teamBBanCount = 0;
const maxBanCount = 2;

function startTimer(team) {
    if (team === 'team-a') {
        teamATimer = setInterval(() => {
            if (teamATime > 0) {
                teamATime--;
                document.getElementById('team-a-timer').textContent = formatTime(teamATime);
            } else {
                clearInterval(teamATimer);
                alert('Team A has run out of time!');
                startTimer('team-b');
            }
        }, 1000);
    } else if (team === 'team-b') {
        teamBTimer = setInterval(() => {
            if (teamBTime > 0) {
                teamBTime--;
                document.getElementById('team-b-timer').textContent = formatTime(teamBTime);
            } else {
                clearInterval(teamBTimer);
                alert('Team B has run out of time!');
                startTimer('team-a');
            }
        }, 1000);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function banCharacter(team) {
    if (team === 'team-a' && teamABanCount < maxBanCount) {
        clearInterval(teamATimer);
        const banInput = document.getElementById('team-a-ban-input');
        const banList = document.getElementById('team-a-ban-list');
        const character = banInput.value.trim();
        
        if (character) {
            const listItem = document.createElement('li');
            listItem.textContent = character;
            banList.appendChild(listItem);
            banInput.value = '';
            teamABanCount++;
        }
        
        teamATime = 300; // Reset time for next turn
        document.getElementById('team-a-timer').textContent = formatTime(teamATime);
        
        if (teamABanCount < maxBanCount) {
            startTimer('team-b');
        }
    } else if (team === 'team-b' && teamBBanCount < maxBanCount) {
        clearInterval(teamBTimer);
        const banInput = document.getElementById('team-b-ban-input');
        const banList = document.getElementById('team-b-ban-list');
        const character = banInput.value.trim();
        
        if (character) {
            const listItem = document.createElement('li');
            listItem.textContent = character;
            banList.appendChild(listItem);
            banInput.value = '';
            teamBBanCount++;
        }
        
        teamBTime = 300; // Reset time for next turn
        document.getElementById('team-b-timer').textContent = formatTime(teamBTime);
        
        if (teamBBanCount < maxBanCount) {
            startTimer('team-a');
        }
    }
}

// Start the timer for Team A when the page loads
window.onload = () => {
    startTimer('team-a');
};
