const cardsNodeList = document.querySelectorAll(".card-inner");
const cards = Array.from(cardsNodeList);
const winMsg = document.querySelector(".winning-msg");
const restartBtn = document.getElementById('restartBtn');

const pairs = [
    'p1',
    'p2',
    'p3',
    'p4',
    'p5',
    'p6',
    'p7',
    'p8',
    'p1',
    'p2',
    'p3',
    'p4',
    'p5',
    'p6',
    'p7',
    'p8'
]

pairs.sort(() => Math.random()-0.5);
console.log(pairs);

let cardsFlipped = 0;
let card1 = null;
let card2 = null;
let cardOne;
let cardTwo;
let pairFound = false;

cards.forEach(card => card.addEventListener("click", flipCard));
restartBtn.addEventListener('click', () => location.reload());

function assignPairs() {
    cards.forEach((card, index) => {
        card.children[1].classList.add(pairs[index]);
    });
}

assignPairs();


function flipCard() {
  //this.children[1].classList[1]; delete this?
  if (this.classList[1] == "flip") {
    this.classList.remove("flip");
    card1 = null;
    card2 = null;
    cardsFlipped--;
  } else if (cardsFlipped <= 1) {
    this.classList.add("flip");
    cardsFlipped++;
    if (card1 == null) {
      card1 = this.children[1].classList[1];
      cardOne = this;
    } else {
      card2 = this.children[1].classList[1];
      cardTwo = this;
    }
    if (card1 != null && card2 != null) {
      if (card1 == card2) {
        cardOne.classList.add("found");
        cardTwo.classList.add("found");
        cardsFlipped = 0;
        card1 = null;
        card2 = null;
        cardOne = null;
        cardTwo = null;
        checkWin();
      }
    }
  }
  if (cardsFlipped == 2) {
    setTimeout(
      () =>
        cards.forEach(card => {
          if (card.classList.contains('flip') && !card.classList.contains('found')) {
            card.classList.remove("flip");
            card1 = null;
            card2 = null;
            cardsFlipped--;
          }
        }),
      700
    );
  } else {
    pairFound = false;
  }
}
let pairsFound = 0;
function checkWin() {
    if (cards.every(card => card.classList.contains('found'))) {
      setTimeout(() => winMsg.classList.add('show'), 500);
    }
}