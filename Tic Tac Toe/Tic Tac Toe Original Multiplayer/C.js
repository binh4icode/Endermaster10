let board = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: ''
}
let winCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],]
var player= "X";
var turns= 0;


let currentPlayer = 'X'


function checkWinner(player) {
    for (let i = 0; i < 8; i++) {
        let count = 0
        for ( let j = 0; j < 3;j++) {
            if(board[winCombination[i][j]]==player) {
                count++
            }
            if(count == 3) {
                return true
            }
        }
}
return false
}

let turn=0;
function checkTie(){
turn++
 if (turn == 9) {
    return true
 } else {
     return false
 }

}


function mark(position) {
    console.log("Hi")
    console.log(currentPlayer)
    document.getElementById("c" + position).value = currentPlayer
    document.getElementById("c" + position).disabled = true
    board[position] = currentPlayer

 
    if (checkWinner(currentPlayer)) {
        document.getElementById("ins").textContent = "The winner is Player " + currentPlayer;
        disableBtn()
    } else if (checkTie()){
        document.getElementById("ins").textContent = "It is a tie between Player X and Player O.";
    } else {
        if (currentPlayer == 'X') {
            currentPlayer = 'O'
        } else {
            currentPlayer = 'X'
        }
    }
}

function disableBtn(){
    // document.getElementById("c1").disable=true
    // document.getElementById("c2").disable=true
    // document.getElementById("c3").disable=true
    // document.getElementById("c4").disable=true
    // document.getElementById("c5").disable=true
    // document.getElementById("c6").disable=true
    // document.getElementById("c7").disable=true
    // document.getElementById("c8").disable=true
    // document.getElementById("c9").disable=true
    for(let i=1; i<10;i++) {
        document.getElementById("c"+ i).disabled = true             
    }
}





function reset() {
    board = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: ''
}
    
for (let i=1;i<10;i++){
    document.getElementById("c" + i).value = ""
     document.getElementById("c" + i).disabled = false
     document.getElementById("ins").textContent = "Enjoy playing this classic game! There is a single player mode available, and a two player mode. You can be X or O."
}
    currentPlayer = 'X'
    turn = 0
}




