window.onload = startGame();
var openedCard = [];
var matchedCard = [];
var counter = 0;
var sec = 0;
var min = 0;
var click = 0;
var interval;
var stars = document.querySelector('.stars');
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

function startGame() {
    matchedCard = [];
    counter = 0;
    sec = 0;
    min = 0;
    click = 0;
    clearInterval(interval);
    document.querySelector('.moves').innerHTML = counter;
	var card = document.getElementsByClassName('card');
    var cards = [...card];
	for (var i = 0; i < cards.length; i++){
	   cards[i].addEventListener('click', flippingCards);
	};
	var deck = document.querySelector('.deck');
    deck.innerHTML = '';
	var shuffledCards = shuffle(cards);
	for (var i= 0; i < shuffledCards.length; i++){
    	deck.appendChild(shuffledCards[i]);
   }
}

function flippingCards() {
    click++;
    openedCard.push(this);
    var len = openedCard.length;
    this.classList.add('open');
    this.classList.add('disabled');
    if (len == 2) {
        count();
        disable();
        if (openedCard[0].dataset.card === openedCard[1].dataset.card) {
            matchedCard.push(openedCard[0], openedCard[1])
            correctMatch();
        }
        else {
            incorrectMatch();
        }
    }
    if (click === 1) {
        interval = setInterval(startTime, 1000);
    }
}

function correctMatch() {
    setTimeout(function() {
        openedCard = [];
        enable();
    }, 500);
    if (matchedCard.length === 16) {
        finish();
    }
}

function incorrectMatch() {
    setTimeout(function(){
        openedCard = [];
        enable();
    }, 700);
}

function count() {
    counter++;
    var moves = document.querySelector('.moves');
    moves.innerHTML = counter;
    rate();
}

function rate() {
    var starRating = document.querySelector('.starRating');
    if (counter > 16 && counter <= 25) {
        stars.children[2].innerHTML = '<i class="fa fa-star-o">';
        starRating.children[2].innerHTML = '<i class="fa fa-star-o">'
    } else if (counter > 25 && counter <= 30) {
        stars.children[1].innerHTML = '<i class="fa fa-star-o">';
        starRating.children[1].innerHTML = '<i class="fa fa-star-o">'
    } else if (counter > 30) {
        stars.children[0].innerHTML = '<i class="fa fa-star-o">'
        starRating.children[0].innerHTML = '<i class="fa fa-star-o">'
    }
}

function disable(){
    Array.prototype.filter.call(document.getElementsByClassName('card'), function(card){
        card.classList.add('disabled');
    });
}

//enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(document.getElementsByClassName('card'), function(card){
        card.classList.remove('disabled', 'open');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add('disabled', 'done');
        }
    });
}

function finish() {
    clearInterval(interval);
    setTimeout(function() {
        document.querySelector('#popup').style.display = 'block';
        document.querySelector('#finalMove').innerHTML = counter;
        document.querySelector('#totalTime').innerHTML = sec + 'Sec ' + min + 'Min';
    }, 1000);
}

function restart() {
    document.querySelector('#popup').style.display = 'none';
    document.querySelector('.time').children[0].innerHTML = '00';
    document.querySelector('.time').children[1].innerHTML = '00';
    for (var i = 0; i < 3; i++) {
        stars.children[i].innerHTML = '<i class="fa fa-star">';
    }
    Array.prototype.filter.call(document.getElementsByClassName('card'), function(card){
        card.classList.remove('disabled', 'open', 'done');
    });
    startGame();
}

function startTime() {
    var time = document.querySelector('.time');
    sec++;
    if (sec === 60) {
        min++;
        sec = 0;
    }
    if (sec < 10) {
        time.children[0].innerHTML =  "0" + sec;
    } else {
        time.children[0].innerHTML = sec;
    }
    if (min < 10) {
        time.children[1].innerHTML =  "0" + min;
    } else {
        time.children[1].innerHTML = min;
    }
}