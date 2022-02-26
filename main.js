let win,currentTurnPlayer,numberOfTurns,versusCpu;
let winPositions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let crossImageUrl ="url('images/cross.png')";
let circleImageUrl = "url('images/circle.png')";
const boardBackgroundColor ="#df00ff24";


const btns = document.querySelectorAll(".board-body .btn");
const settings = document.querySelector(".settings");
const start= document.querySelector("#start");
const player1 = document.querySelector("#option-player1");
const player2 = document.querySelector("#option-player2");
const player1Score = document.querySelector(".player1-score");
const player2Score = document.querySelector(".player2-score");
const hud = document.querySelector(".hud");
const comment = document.querySelector(".comment");
const buttonRestart = document.querySelector(".button-restart");
const changePlayerStatus = document.querySelector("#change-player");
const board = document.querySelector(".board");


class Player{
  constructor(name,status,mark){
    this.name = name;
    this.status = status;
    this.mark = mark;
    this.occupiedPositions = [];
    this.score = 0;

  }
  

}

const newGameSetting = () => {
  numberOfTurns =0;
  win = false;
  crossPlayer.occupiedPositions=[];
  circlePlayer.occupiedPositions=[];
  currentTurnPlayer =crossPlayer;
  if (crossPlayer.status == "cpu" || circlePlayer.status == "cpu"){
    random = [1,2,3,4,5,6,7,8,9];
    versusCpu=true;
  }
  comments(currentTurnPlayer);
  if(crossPlayer.status== "cpu"){
    setTimeout(function (){cpuTurn(currentTurnPlayer)} ,2000);
  }
  
}

start.addEventListener("click",() =>{
  board.classList.toggle("fade");
  settings.classList.toggle("fade");
  hud.classList.toggle("fade");
  buttonRestartToggle();
 // comment.classList.toggle("fade");
  crossPlayer = new Player("Cross-Player",player1.value,crossImageUrl);
  circlePlayer = new Player("Circle-Player",player2.value,circleImageUrl);

  newGameSetting();
  showScore(crossPlayer, circlePlayer);
  console.log(crossPlayer.name + " "+crossPlayer.status);
  console.log(circlePlayer.name + " "+circlePlayer.status);
  
  console.log(currentTurnPlayer.name + " "+currentTurnPlayer.status);
  
  
})


const containsAll= (arr,target) => target.every(v=>arr.includes(v));




const checkWin = (arr,target)=>{
  for (i=0;i<arr.length;i++){
    
    if(containsAll(target,arr[i])){
      console.log(arr[i]);
      colorTiles(arr[i]);
      return true;
      
    };
  }
  
}
const colorTiles = (arr)=>{
  for(i=0;i<arr.length;i++){
    element=document.getElementById(arr[i]);
    console.log(element.id);
    
    element.style.backgroundColor="blue";
  }
}


const showScore = (player1,player2) =>{
  player1Score.textContent=player1.score;
  player2Score.textContent=player2.score;
}



const cpuTurn=(player)=>{
  let number = getRandomNumber(random);
  const element = document.getElementById(number);
  game(element,player);
}

const changeTurn = (player) => {
  if(player==crossPlayer){
    return circlePlayer;
  }
  return crossPlayer;
}


const comments=(player)=>{
comment.textContent = "turn of the "+player.name +" ("+player.status+")";

}

const game = (e,player) => {
  e.style.backgroundImage = player.mark;
  e.style.backgroundSize = "cover";
  e.disabled=true;
  player.occupiedPositions.push(parseInt(e.id, 10));
  numberOfTurns++;
  console.log(player.occupiedPositions);

  if(player.occupiedPositions.length > 2 && checkWin(winPositions,player.occupiedPositions)) {
    win = true;
    player.score++;
    showScore(crossPlayer, circlePlayer);
    comment.textContent = player.name+ " has won";
    disableBoardButton();
    return;
  }

  if(numberOfTurns >=9){
    comment.textContent = " it's a tie";
    disableBoardButton();
    return;
  }

  if (win == false){
    currentTurnPlayer = changeTurn(player);
    comments(currentTurnPlayer);
    if(versusCpu){
      removePositionFromRandom(e.id,random);
      runCpuTurn(currentTurnPlayer);
    }
  
  }


}


btns.forEach((button)=>{
  button.addEventListener("click",function(e){
    game(e.target,currentTurnPlayer);
  })
})




// get a Random number from array random
const getRandomNumber = (random) => {

  const randomIndex = Math.floor(Math.random()*random.length);
  const item = random[randomIndex];

  return item;
}

// remove an occupied position from random array
const removePositionFromRandom = (id,random) => {
  for(i=0;i<random.length;i++){
    if(random[i] == id){
      random.splice(i,1);
      console.log(random);
      break;
    }
  }
}



buttonRestart.addEventListener("click", ()=>{
  newGameSetting();
 resetBoard();

})


const buttonRestartToggle =() => {
  buttonRestart.classList.toggle("fade");
}

const runCpuTurn = (currentTurnPlayer) =>{
  if(currentTurnPlayer.status == "cpu"){
    console.log("the status of currentTurnPlayer is " + currentTurnPlayer.status);
    setTimeout(function (){cpuTurn(currentTurnPlayer)} ,1000);

  }
  else return;


}

const disableBoardButton =() =>{
  btns.forEach((butoon)=>{
   if (button.disabled != true) button.disabled=true;
  })
}

const enableBoardButton =() =>{
  btns.forEach((button)=>{
   if (button.disabled != false) button.disabled=false;
  })
}


changePlayerStatus.addEventListener("click", ()=>{
  settings.classList.toggle("fade");
  hud.classList.toggle("fade");
  board.classList.toggle("fade");
  buttonRestartToggle();
  resetBoard();
  
  
})

const resetBoard =() =>{
  btns.forEach((button) =>{
    
    if (button.disabled) button.disabled=false;
    button.style.backgroundImage="none";
    if(button.style.backgroundColor != boardBackgroundColor){
      button.style.backgroundColor = boardBackgroundColor;
    }
    
  })
}



