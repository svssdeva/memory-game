// Create a list that holds all of your cards
let card = document.querySelectorAll(".card");
let cards = [...card]

/*In the code block above, the cards' array[1] was created and the for loop
 helps to loop through each card till the full length of
cards array is covered. Each loop will add an event listener which listens
for a click on the card and runs the displayCard function
on click.*/
let displayCard = function() {
        this.classList.toggle("open");
        this.classList.toggle("show");
        this.classList.toggle("disabled");
    }
    /*The displayCard function here toggles ‘open’, ‘show’ and ‘disabled’ classes. 
This lets the card icon show and disables the card
when it’s opened. Hence, when a card is shown it can’t be clicked on again till it 
is closed.*/

// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//moves and counter declaration
let moves = 0;
let counter = document.querySelector(".moves");

let matchedCard = document.getElementsByClassName("match");

//variable for star's function handling declaration
const stars = document.getElementsByClassName("fa-star");
let starsList = document.getElementsByClassName("stars li");

const deck = document.querySelector(".deck");

function gameOn() {
    cardShuffle();
    //reset timer as each time a new game is started
    timerReset();
    //reset moves as each time a new game is started
    moveReset();
    cardsOpened = [];
}

function cardShuffle() {
    var i;
    var shuffledCards = shuffle(cards);
    for (i = 0; i < shuffledCards.length; i++) {
        deck.firstChild.data = "";
        for (let item of cards) {
            deck.appendChild(item);
        };
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
};

function timerReset() {
    second = 0,
        minute = 0,
        hour = 0;
    var timer = document.querySelector(".timer");
    timer.firstChild.data = "0 mins 0 secs";
    clearInterval(interval);
};

function moveReset() {
    moves = 0;
    counter.firstChild.data = moves;
    //reset rating as each time a new game is started
    for (let star of stars) {
        star.style.color = "#FFD700";
        star.style.visibility = "visible";
    }
};


var cardsOpened = [];
//card opened and pushed into this function for checking if the cards are matched or not 
function cardOpen() {
    cardsOpened.push(this);
    var length = cardsOpened.length;
    if (length === 2) {
        counterMoves();
        if (cardsOpened[0].type === cardsOpened[1].type) {
            //called matched function
            match();
        } else {
            //called unmatched function
            unmatch();
        }
    }
};
//here the function adds unmathced class to the selected cards and after 1100miliseconds
// later every other class is removed
function unmatch() {
    cardsOpened[0].classList.add("unmatched");
    cardsOpened[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        cardsOpened[0].classList.remove("show", "open", "no-event", "unmatched");
        cardsOpened[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        cardsOpened = [];
    }, 1100);
}
//function for adding matched and disabled classes and removing the other classes from
// selected class and array of opened cards is emptied.
function match() {
    cardsOpened[0].classList.add("match", "disabled");
    cardsOpened[0].classList.remove("show", "open", "no-event");
    cardsOpened[1].classList.add("match", "disabled");
    cardsOpened[1].classList.remove("show", "open", "no-event");
    cardsOpened = [];
}
// function to remove disable class and re eanble cards for getting clicked on and getting 
//into opened card array for rematching of 2 cards
function enable() {
    Array.prototype.map.call(cards, function(card) {
        card.classList.remove('disabled');
        for (let mcard of matchedCard) {
            mcard.classList.add("disabled");
        }
    });
}
//function for disabling clicks on matched class or reclicking a card which is already open.
function disable() {
    Array.prototype.map.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

function counterMoves() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first move(actually after 2 mouse clicks)
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        //calling start timer function
        timerInit();
    }
    starRating();
}

function starRating() {
    //setting rates based on moves
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}
//timer declaration
var second = 0,
    minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

//declaring start timer function for starting timer when the 
//game is started(actually after 1st move is made)
function timerInit() {
    interval = setInterval(function() {
        timer.firstChild.data = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}
let closeicon = document.querySelector(".close");
//declared a variable for getting a popup after all the cards are matched.
// For displaying rating and stars
let model = document.querySelector("#popup1");

//yay... you matched all cards
//function for getting you a well done greeting after you have matched all the cards...
function congratulations() {
    if (matchedCard.length == 16) {
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
function closemodel() {
    closeicon.addEventListener("click", function(e) {
        model.classList.remove("show");
        gameOn();
    });
}

//variable declaration for try again
const tryBtn = document.getElementById("try-again");
tryBtn.addEventListener("click", tryAgain);
//let's play again people
function tryAgain() {
    model.classList.remove("show");
    gameOn();
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", gameOn);

for (let card of cards) {
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};

window.onload = gameOn();