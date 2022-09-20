//game constants & variables
let inputDir = {x:0, y:0};

let speed = 9;
let score = 0; 
let lastpainttime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7 }




//Game function
function main(ctime){
window.requestAnimationFrame(main);
//console.log(ctime)
if((ctime - lastpainttime)/1000 < 1/speed){
    return;
}

    lastpainttime = ctime;
    gameEngine();
}
function iscollide(snake){
    //if snake bump into itself
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if snake bump into the wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
    }
}

function gameEngine(){
    //part 1: update snake array & food
    if (iscollide(snakeArr)){
        inputDir = {x:0, y:0};
alert("Game Over, Press any key to play Again!");
snakeArr = [{x: 13, y: 15}];
score = 0;    
    }
//if snake has eaten the food then increment the score & regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += 1;
        if (score > Hiscoreval){
            Hiscoreval = score;
            localStorage.setItem("Hiscore", JSON.stringify(Hiscoreval));
            HiscoreBox.innerHTML = "Hiscore: " + Hiscoreval;
        }  
         scoreBox.innerHTML = "score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }
    //Move the snake
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: display the snake and food
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
         if(index === 0){
            snakeElement.classList.add('head'); 
        }
        else{
            snakeElement.classList.add('snake'); 
        }
        board.appendChild(snakeElement);
    });
    //display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
    
}




//Main logic starts here
let Hiscore = localStorage.getItem("Hiscore");
if(Hiscore === null){
    Hiscoreval = 0;
    localStorage.setItem("Hiscore", JSON.stringify(Hiscoreval))   
}
else{   
    Hiscoreval = JSON.parse(Hiscore);
    HiscoreBox.innerHTML = "Hiscore: " + Hiscore}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
inputDir = {x:0, y:1}//start the game
switch(e.key){
    case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;

        case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;

        case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;

        case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
        default:
            break;
}
});