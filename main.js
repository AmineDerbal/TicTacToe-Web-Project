let win,turn;
let winPositions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];


const btns = document.querySelectorAll(".board-body .btn");
const settings = document.querySelector(".settings");
const start= document.querySelector("#start");
const player1 = document.querySelector("#option-player1");
const player2 = document.querySelector("#option-player2");
const hud = document.querySelector(".hud");
const comment = document.querySelector(".comment");


class Player{
  constructor(name,status){
    this.name = name;
    this.status = status;
    this.occupiedPositions = [];
  }
  

}


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
    console.log(element);
    element.disabled=false;
    element.style.backgroundColor="blue"
  }
}





start.addEventListener("click",() =>{
  settings.classList.toggle("fade");
  hud.classList.toggle("fade");
  comment.classList.toggle("fade");
  
  win = false;
  first = new Player("player1",player1.value);
  second = new Player("player2",player2.value);
  turn =first;
  console.log(first.name + " "+first.status);
  console.log(second.name + " "+second.status);
  
  console.log(turn.name + " "+turn.status);
  
  if (first.status == "cpu" || second.status == "cpu"){
    random = [1,2,3,4,5,6,7,8,9];
    versusCpu=true;
  }
  
  btnToggle();
  comments(first);
  
})


const cpuTurn=()=>{
  let number = getRandomNumber(random);
  const element = document.getElementById(number);
  game(element);
}










const game = (e)=>{
  
  if (turn == first){
    e.style.backgroundImage = "url('images/cross.png')";
    e.style.backgroundSize = "cover";
    e.disabled=true;
    first.occupiedPositions.push(parseInt(e.id));
    console.log(first.occupiedPositions);
    
    if (first.occupiedPositions.length>2 && checkWin(winPositions,first.occupiedPositions)){
      btnToggle();
      win = true;
      comment.textContent=turn.name+" has won";
    }

    if (win == false){
    if (versusCpu){
      for (i=0;i<random.length;i++){
        if (random[i]==e.id){
          random.splice(i,1);
          console.log(random);
          break;
        }
      }
    }
    turn = second;
    comments(turn);
    if(turn.status == "cpu"){
      console.log("the status of turn is " + turn.status);
      setTimeout(cpuTurn,3000);
      
    }
  }
    
  }
  else {
    e.style.backgroundImage="url('images/circle.png')";
    e.style.backgroundSize="cover";
    e.disabled=true;
    second.occupiedPositions.push(parseInt(e.id));
    console.log(second.occupiedPositions);
    if (second.occupiedPositions.length>2 && checkWin(winPositions,second.occupiedPositions)){
      comment.textContent ="you win";
    }

    if (win == false){
    if (versusCpu){
      for (i=0;i<random.length;i++){
        if (random[i]==e.id){
          random.splice(i,1);
          console.log(random);
          break;
        }
      }
    }
    turn=first;
    comments(turn);
    if(turn.status== "cpu"){
      console.log("the status of turn is " + turn.status);
      setTimeout(cpuTurn,3000);
    }
    
  }
}
  
  
}




const comments=(player)=>{
  comment.textContent = "the turn of the "+player.status +" "+player.name;
  
}





btns.forEach((button)=>{
  button.addEventListener("click",function(e){
    game(e.target);
  })
})
const btnToggle = () =>{
  btns.forEach((button)=>{
    button.classList.toggle("disabled");
    
  })
}





const getRandomNumber = (random) => {

  const randomIndex = Math.floor(Math.random()*random.length);
  const item = random[randomIndex];

  return item;
}


