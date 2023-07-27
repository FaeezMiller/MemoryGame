// making a list of all memory cards element
const cards = document.querySelectorAll('.memory-card');

let hasFlipedCard = false;
//locking Board to disable fliping card if it is not a match on previous two cards
let lockBoard = false;
let firstCard;
let secondCard;
//duble click on a same card

function flipCard(){
//if is lockBoard is true do not execute a rest of flipCard()
if(lockBoard) return;
if(this === firstCard) return;
//"this" represent element that fired flipCard() 
// add flip class, to element that was clicked
 this.classList.add('flip');

 if(!hasFlipedCard){
     //first click
     hasFlipedCard = true; //condition is now false
     firstCard = this; //chard that was clicked   

    } else {
        //second click
        hasFlipedCard = false;
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
// by using global data-* atribute in html we are comparing two diferent cards
// accesing dataset with dataset.character ?
   if(firstCard.dataset.character === secondCard.dataset.character){
        //it is a match!!
        disableCards();
    } else {
        // it is not a match!!
        unflipCards();
    } 
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
//using setTimeout to be able to see what is second card
    setTimeout(() =>{
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
      
            resetBoard();
    }, 1500);
}
function resetBoard(){
    [hasFlipedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    })
})(); //immediatly do function
// adding event listener to all of the cards
cards.forEach(card => card.addEventListener('click', flipCard));