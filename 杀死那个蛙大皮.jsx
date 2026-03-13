let player, frogs = [];
let frogCount = 0;
let killedFrogs = 0;
let moveSpeed = 20;

function startGame(count) {
    frogCount = count;
    killedFrogs = 0;
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    
    player = document.getElementById("player");
    player.style.left = "10px";
    player.style.top = "200px";
    
    spawnFrogs(frogCount);
}

function spawnFrogs(count) {
    const gameArea = document.getElementById("game-area");
    frogs = [];
    
    for (let i = 0; i < count; i++) {
        let frog = document.createElement("div");
        frog.classList.add("frog");
        frog.style.left = Math.random() * 550 + "px";
        frog.style.top = Math.random() * 250 + "px";
        gameArea.appendChild(frog);
        frogs.push(frog);
    }
}

// 绑定按钮移动事件
document.getElementById("move-left").addEventListener("click", () => movePlayer(-moveSpeed, 0));
document.getElementById("move-right").addEventListener("click", () => movePlayer(moveSpeed, 0));
document.getElementById("move-up").addEventListener("click", () => movePlayer(0, -moveSpeed));
document.getElementById("move-down").addEventListener("click", () => movePlayer(0, moveSpeed));
document.getElementById("attack").addEventListener("click", attackFrog);

function movePlayer(dx, dy) {
    let left = parseInt(player.style.left) + dx;
    let top = parseInt(player.style.top) + dy;

    // 限制主角不能跑出游戏区域
    if (left >= 0 && left <= 550) player.style.left = left + "px";
    if (top >= 0 && top <= 250) player.style.top = top + "px";
}

function attackFrog() {
    let playerLeft = parseInt(player.style.left);
    let playerTop = parseInt(player.style.top);
    
    frogs.forEach((frog, index) => {
        let frogLeft = parseInt(frog.style.left);
        let frogTop = parseInt(frog.style.top);
        
        if (Math.abs(playerLeft - frogLeft) < 50 && Math.abs(playerTop - frogTop) < 50) {
            playScreamSound();
            let blood = document.createElement("div");
            blood.classList.add("blood");
            blood.style.left = frogLeft + "px";
            blood.style.top = frogTop + "px";
            document.getElementById("game-area").appendChild(blood);
            
            frog.remove();
            frogs.splice(index, 1);
            killedFrogs++;

            if (killedFrogs === frogCount) {
                setTimeout(() => {
                    alert("恭喜通关！");
                }, 500);
            }
        }
    });
}

// 添加键盘控制（WASD）
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w": movePlayer(0, -moveSpeed); break;
        case "s": movePlayer(0, moveSpeed); break;
        case "a": movePlayer(-moveSpeed, 0); break;
        case "d": movePlayer(moveSpeed, 0); break;
        case " ": attackFrog(); break; // 按空格攻击
    }
});

function playScreamSound() {
    let screams = ["scream1.mp3", "scream2.mp3", "scream3.mp3"];
    let scream = new Audio(screams[Math.floor(Math.random() * screams.length)]);
    scream.play();
}
