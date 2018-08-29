// Create a list that holds all of your cards

let card = document.getElementsByClassName("card");
let cards = [...card]

const deck = document.getElementById("card-deck");

//moves and counter declaration
let moves = 0;
let counter = document.querySelector(".moves");

//variable for star's function handling declaration
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");

let matchedCard = document.getElementsByClassName("match");

let closeicon = document.querySelector(".close");
//declared a variable for getting a popup after all the cards are matched. For displaying rating and stars
let model = document.getElementById("popup1");

var openedCards = [];
//timer declaration
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//called function as soon as the html file is opened
document.body.onload = startGame();

//function declaration
function startGame(){
    //shuffle deck fucntion called for shuffling the cards stored in the array
    cards = shuffle(cards);
    //remove all exisiting classes from each card so that card's functionality can be handled such as opening matching...
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    //reset moves as each time a new game is started
    moves = 0;
    counter.innerHTML = moves;
    //reset rating as each time a new game is started
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer as each time a new game is started
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}
//function declaration for toggling classes of the clicked class via "this" method.
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};
//card opened and pushed into this function for checking if the cards are matched or not 
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            //called matched function
            match();
        } else {
            //called unmatched function
            unmatch();
        }
    }
};
//here the function adds unmathced class to the selected cards and after 1100miliseconds later every other class is removed
function unmatch(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}
//function for adding matched and disabled classes and removing the other classes from selected class and array of opened cards is emptied.
function match(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}
// function to remove disable class and re eanble cards for getting clicked on and getting into opened card array for rematching of 2 cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}
//function for disabling clicks on matched class or reclicking a card which is already open.
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first move(actually after 2 mouse clicks)
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        //calling start timer function
        startTimer();
    }
    //setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}
//declaring start timer function for starting timer when the game is started(actually after 1st move is made)
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

//yay... you matched all cards
//function for getting you a well done greeting after you have matched all the cards...
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        //show congratulations model
        model.classList.add("show");

        //declared star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing number of moves, rating, total time on model
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //close function call
        closemodel();
    };
}
//close function declaration
function closemodel(){
    closeicon.addEventListener("click", function(e){
        model.classList.remove("show");
        startGame();
    });
}

//let's play again people
function playAgain(){
    model.classList.remove("show");
    startGame();
}

//here is the real magic. without it nothing will happen..
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};

