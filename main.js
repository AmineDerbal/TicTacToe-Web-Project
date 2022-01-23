let win,currentTurnPlayer,numberOfTurns;
let winPositions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let crossImageUrl ="url('images/cross.png')";
let circleImageUrl = "url('images/circle.png')";



const btns = document.querySelectorAll(".board-body .btn");
const settings = document.querySelector(".settings");
const start= document.querySelector("#start");
const player1 = document.querySelector("#option-player1");
const player2 = document.querySelector("#option-player2");
const player1Score = document.querySelector(".player1-score");
const player2Score = document.querySelector(".player2-score");
const hud = document.querySelector(".hud");
const comment = document.querySelector(".comment");


class Player{
  constructor(name,status,mark){
    this.name = name;
    this.status = status;
    this.mark = mark;
    this.occupiedPositions = [];
    this.score = 0;

  }
  

}

start.addEventListener("click",() =>{
  settings.classList.toggle("fade");
  hud.classList.toggle("fade");
  comment.classList.toggle("fade");
  numberOfTurns=0;
  win = false;
  crossPlayer = new Player("player1",player1.value,crossImageUrl);
  circlePlayer = new Player("player2",player2.value,circleImageUrl);
  currentTurnPlayer =crossPlayer;
  showScore(crossPlayer, circlePlayer);
  console.log(crossPlayer.name + " "+crossPlayer.status);
  console.log(circlePlayer.name + " "+circlePlayer.status);
  
  console.log(currentTurnPlayer.name + " "+currentTurnPlayer.status);
  
  if (crossPlayer.status == "cpu" || circlePlayer.status == "cpu"){
    random = [1,2,3,4,5,6,7,8,9];
    versusCpu=true;
  }
  
  btnToggle();
  comments(crossPlayer);
  if(crossPlayer.status== "cpu"){
    setTimeout(function (){cpuTurn(currentTurnPlayer)} ,2000);
  }
  
})


const containsAll= (arr,target) => target.every(v=>arr.includes(v));





const checkWin = (arr,target)=>{
  for (i=0;i<arr.length;i++){
    
    if(containsAll(target,arr[i])){
      console.log(arr[i]);
      colorTiles(arr[i]);
      console.log("all element are included");
      return true;
      
    };
  }
  
}
const colorTiles = (arr)=>{
  for(i=0;i<arr.length;i++){
    element=document.getElementById(arr[i]);
    console.log(element.id);
    element.disabled=false;
    element.style.backgroundColor="blue"
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


const game = (e,player) => {
  e.style.backgroundImage = player.mark;
  e.style.backgroundSize = "cover";
  e.disabled=true;
  player.occupiedPositions.push(parseInt(e.id, 10));
  numberOfTurns++;
  console.log(player.occupiedPositions);
  
  if(player.occupiedPositions.length > 2 && checkWin(winPositions,player.occupiedPositions)) {
    btnToggle();
    win = true;
    comment.textContent = player.name+ " has won";
    return;
  }
  if(numberOfTurns >=9){
    comment.textContent = " it's a tie";
    return;
  }
  
  if (win == false){
    currentTurnPlayer = changeTurn(player);
    comments(currentTurnPlayer);
    if(versusCpu){
      removePositionFromRandom(e.id,random);
      if(currentTurnPlayer.status == "cpu"){
        console.log("the status of currentTurnPlayer is " + currentTurnPlayer.status);
        setTimeout(function (){cpuTurn(currentTurnPlayer)} ,2000);
  
      }
    }
  
  }
  
  }




  const changeTurn = (player) => {
    if(player==crossPlayer){
      return circlePlayer;
    }
    return crossPlayer;
  }
  







const comments=(player)=>{
  comment.textContent = "the currentTurnPlayer of the "+player.status +" "+player.name;
  
}





btns.forEach((button)=>{
  button.addEventListener("click",function(e){
    game(e.target,currentTurnPlayer);
  })
})


const btnToggle = () =>{
  btns.forEach((button)=>{
    button.classList.toggle("disabled");
    
  })
}




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
