const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector("#msg-container");
const msg = document.querySelector("#msg");

let turnO = true; // O starts

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Reset logic
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Enable boxes
const enableBoxes = () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
};

// Disable boxes
const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

// Show winner
const showWinner = (winner) => {
  msg.innerText = `🎉 Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText.trim();
    let pos2 = boxes[pattern[1]].innerText.trim();
    let pos3 = boxes[pattern[2]].innerText.trim();

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }

  // Draw check
  const isDraw = [...boxes].every(box => box.innerText.trim() !== "");
  if (isDraw) {
    msg.innerText = "😐 Match Drawn!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

// Game click logic
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }
    box.disabled = true;
    turnO = !turnO;

    checkWinner();
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
