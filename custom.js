let intro = document.querySelector(".intro");
let game = document.querySelector(".game");
let result = document.querySelector(".result");
let buttonX = document.querySelector(".btn-x");
let buttonO = document.querySelector(".btn-o");
let boxs = document.querySelectorAll(".box");
let turn = "";

////////////////////////////////////////////////////////////

buttonO.onclick = function () {
  turn = "o";
  intro.classList.add("hidden");
  game.classList.add("show", "o");
};
buttonX.onclick = function () {
  turn = "x";
  intro.classList.add("hidden");
  game.classList.add("show", "x");
};

////////////////////////////////////////////////////////////

boxs.forEach(function (box) {
  box.onclick = function () {
    action(this, true);
  };
});

////////////////////////////////////////////////////////////

function robot() {
  game.lastElementChild.style.pointerEvents = "none";
  setTimeout(() => {
    let arr = Array.from(boxs).filter((b) => !b.classList.contains("select"));
    action(arr[Math.floor(Math.random() * arr.length)], false);
    game.lastElementChild.style.pointerEvents = "all";
  }, 1000);
}

////////////////////////////////////////////////////////////

function action(box, isRobot) {
  box.textContent = turn;
  if (win()) return;
  box.classList.add("select");
  if (drow()) return;
  if (turn == "o") {
    turn = "x";
    game.classList.remove("o");
    game.classList.add("x");
    if (isRobot === true) robot();
  } else {
    turn = "o";
    game.classList.remove("x");
    game.classList.add("o");
    if (isRobot === true) robot();
  }
}

////////////////////////////////////////////////////////////

function win() {
  let arr = Array.from(boxs).map((b) => b.textContent);
  let condition =
    (arr[0] === arr[1] && arr[1] === arr[2] && arr[2] !== "") ||
    (arr[3] === arr[4] && arr[4] === arr[5] && arr[5] !== "") ||
    (arr[6] === arr[7] && arr[7] === arr[8] && arr[8] !== "") ||
    (arr[0] === arr[3] && arr[3] === arr[6] && arr[6] !== "") ||
    (arr[1] === arr[4] && arr[4] === arr[7] && arr[7] !== "") ||
    (arr[2] === arr[5] && arr[5] === arr[8] && arr[8] !== "") ||
    (arr[0] === arr[4] && arr[4] === arr[8] && arr[8] !== "") ||
    (arr[2] === arr[4] && arr[4] === arr[6] && arr[6] !== "");
  if (condition) {
    game.lastElementChild.style.pointerEvents = "none";
    setTimeout(() => {
      game.classList.remove("show");
      result.firstElementChild.firstElementChild.textContent = turn;
      result.classList.add("show");
    }, 1000);
    return true;
  }
}

////////////////////////////////////////////////////////////

function drow() {
  if (Array.from(boxs).every((o) => o.classList.contains("select"))) {
    setTimeout(() => {
      game.classList.remove("show");
      result.firstElementChild.innerHTML = "Match has been drawn!";
      result.classList.add("show");
    }, 1000);
    return true;
  }
}

////////////////////////////////////////////////////////////

result.lastElementChild.onclick = () => window.location.reload();

////////////////////////////////////////////////////////////
