let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let newbtn1 = document.querySelector("#new-btn1");
let msgcontainer = document.querySelector(".msg-container");
let rescontainer = document.querySelector(".res-container");
let msg = document.querySelector(".msg");
let res = document.querySelector(".res");
let line = document.querySelector(".line");

let turnO = true; //player x , player o

const resetGame = () => {
  count = 0;
  turnO = true;
  enableboxes();
  msgcontainer.classList.add("hide");
  rescontainer.classList.add("hiden");
  line.classList.add("hidden");
};

const winpattern = [
  [0, 1, 2 , 1 , -9 , 0],
  [0, 3, 6, -9, 0, 90],
  [0, 4, 8, 0, 0, 45],
  [1, 4, 7, 0, 0, 90],
  [2, 5, 8, 9, 0, 90],
  [2, 4, 6, 0, 0, 135],
  [3, 4, 5, 0, 0, 0],
  [6, 7, 8, 0, 9, 0],
];

const draw = () => {
  rescontainer.classList.remove("hiden");
};

let count = 0;
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkwinner();

    if ( !winnerfound && count == 9) {
      draw();
    }
  });
});

const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showwinner = (Winner) => {
  msg.innerText = `Congratulation, Winner is ${Winner}`;
  msgcontainer.classList.remove("hide");
  disableboxes();
};

let winnerfound = false;
const checkwinner = () => {
  for (let pattern of winpattern) {
    let posval1 = boxes[pattern[0]].innerText;
    let posval2 = boxes[pattern[1]].innerText;
    let posval3 = boxes[pattern[2]].innerText;

    if (posval1 != "" && posval2 != "" && posval3 != "") {
      if (posval1 == posval2 && posval2 == posval3) {
        line.classList.remove("hidden");
        let doc=document.querySelector(".line").style.transform = `translate(${pattern[3]}vw,${pattern[4]}vw) rotate(${pattern[5]}deg)`;
        console.log(doc);
        showwinner(posval1);
        winnerfound = true;
        break;
      }
    }
  }
};

newbtn.addEventListener("click", resetGame);
newbtn1.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
