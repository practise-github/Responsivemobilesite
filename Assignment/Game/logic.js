//Game Screen
let gameSection = document.getElementById('game-section');
//Alert Banners should only be visible at the end of game
let alertBanners = document.getElementsByClassName('alert');
for (let index = 0; index < alertBanners.length; index++) {
    alertBanners[index].style.display='none';       
}
//Game Screen Position
let gameSectionYPosition = gameSection.offsetTop;
//Initially Game Screen should not be visible
gameSection.style.display = 'none';

//Play Button Fetched from DOM
let playInitButton = document.getElementById('playInitButton');
//Event Listener added to Play Button
playInitButton.addEventListener('click',function(e){
    e.preventDefault();
    playPuppyGame();
});

//Hit button fetched from DOM
let hitButton = document.getElementById('hit');
hitButton.addEventListener('click',function(){
    playerDeck.push(getNextCard());
    checkGameStatus();
});
//Stand button fetched from DOM
let standButton = document.getElementById('stand');
standButton.addEventListener('click',function(){
    gameOver = true;
    if(opponentScore>playerScore){
        playerWon = false;
        opponentWon = true;
        checkGameStatus();
    }
    while(opponentScore<=playerScore && opponentScore<=7 && playerScore<=7){
        opponentDeck.push(getNextCard());
        console.log(gameOver,playerWon,opponentWon);
        checkGameStatus();
        console.log("While loops");
    }
    console.log(gameOver,playerWon,opponentWon);
    if(gameOver && playerWon == false && opponentWon == false){
        if(playerScore > opponentScore){
            playerWon = true;
            opponentWon = false;
        }
        else{
            playerWon = false;
            opponentWon = true;
        }
        checkGameStatus();  
    }
    
});
//Surrender button fetched from DOM
let surrenderButton = document.getElementById('surrender');
surrenderButton.addEventListener('click',function(){
    gameOver = true;
    playerWon = false;
    checkGameStatus();
});
//Text area for player
let textAreaPlayer = document.getElementById('text-area-for-player');
//Text area for opponent
let textAreaopponent = document.getElementById('text-area-for-opponent');


//Responsible for Initialising Game Section
function playPuppyGame(){
    for (let index = 0; index < alertBanners.length; index++) {
        alertBanners[index].style.display='none';       
    }
    gameSection.style.display = 'block';
    window.scrollTo(0,gameSectionYPosition);
    playInitButton.style.display = 'none';
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    initDeck(deck);
    shuffleCards(deck);
    playerDeck = [ getNextCard() , getNextCard() ];
    opponentDeck = [ getNextCard() , getNextCard() ];
    checkGameStatus();
}

//Important variable we will be using it through out our code
let playerDeck = [],
    opponentDeck = [],
    gameOver = false,
    playerScore = 0,
    opponentScore = 0,
    deck = [],
    playerWon = false,
    opponentWon = false,
    gameStarted = false;

let suits = ['Heart','Spade','Diamond','Club'];
let cards = ['6','5','4','3','2'];



//This function initializes the deck with 52 cards.
//Should be the very first step of GamePlay
//The Global Variable deck gets populated with 52 card 
//object with suit and value as attribute when initDeck is called
function initDeck(deck){
    for(let i=0;i<suits.length;i++){
        
            let card = {
               
                value : cards[j]
            };
            deck.push(card);
        
    }
    
}

//Use displayCardFromDeck whenever you want to display
//any card from any deck
function displayCardFromDeck(card){
    return card.value + " of " + card.suit;
}

//Displays card and score in DOM
function checkGameStatus(){
    //TODO the remaining tasks here!
    scoreCalculator(playerDeck,opponentDeck);

    if(playerScore>7){
        playerWon = false;
        opponentWon = true;
        gameOver = true;
    }
    else if(opponentScore>7){
        playerWon = true;
        opponentWon = false;
        gameOver = true;
    }

    displayInDOMTheScoreAndCards();
    //Check to see if game is over and who is the winner
    //Based on it change the page's layout
    if (gameOver){
        if(playerWon){
            alertBanners[0].style.display = 'block';
            gameSection.style.display = 'none';
            playInitButton.style.display = 'inline';
            let wonAnalysis = document.getElementById('won-analysis');
            wonAnalysis.innerHTML = "Your Score: "+ playerScore + " opponent Score: "+ opponentScore;
        }
        else{
            alertBanners[1].style.display = 'block';
            gameSection.style.display = 'none';
            playInitButton.style.display = 'inline';
            let lostAnalysis = document.getElementById('lost-analysis');
            lostAnalysis.innerHTML = "Your Score: "+ playerScore + " opponent Score: "+ opponentScore;
        }
    }
}

//Shuffles the deck
/*function shuffleCards(deck){
    for(let i=0;i<deck.length;i++){
        let swapIndex = Math.trunc(Math.random()*deck.length);
        let temp = deck[i];
        deck[i] = deck[swapIndex];
        deck[swapIndex] = temp;
    }
}*/

//Updates the score everytime
//Should later be optimised
/*function scoreCalculator(playerDeck,opponentDeck){
    playerScore=0;
    opponentScore=0;
    let hasAce = false;
   
    for(let i=0;i<playerDeck.length;i++){
        if(playerDeck[i] == 'Ace'){
            hasAce = true;
        }
        playerScore += scoreSwitch(playerDeck[i].value);
    }
    if(hasAce && playerScore+10<=21){
        playerScore+=10;
    }
    hasAce = false;
    for(let i=0;i<opponentDeck.length;i++){
        if(opponentDeck[i] == 'Ace'){
            hasAce = true;
        }
        opponentScore += scoreSwitch(opponentDeck[i].value);
    }
    if(hasAce && opponentScore+10<=21){
        opponentScore+=10;
    }
    
}*/

//Returns equivalent integer value from a stringified value
function scoreSwitch(value){
    
    let answer = null;
    switch(value){
        case '6' :
            return 6;
        case '5' :
            return 5;
        case '4' :
            return 4;
        case '3' :
            return 3;
        case '2' :
            return 2;
        default : 
            return 1;
    }
}

//Assigns the card to opponent or player
function getNextCard(){
    return deck.shift();
}

function displayInDOMTheScoreAndCards(){
    let playerString = '';
    let opponentString = '';
    for(let i=0;i<playerDeck.length;i++){
        playerString += displayCardFromDeck(playerDeck[i]) + "\n";
    }
    for(let i=0;i<opponentDeck.length;i++){
        opponentString += displayCardFromDeck(opponentDeck[i]) + "\n";
    }

    textAreaopponent.innerText = opponentString + "Score: "+ opponentScore;
    textAreaPlayer.innerText = playerString + "Score: "+ playerScore;
}

