q = console.log;

const addNewCardPage = document.getElementById("addNewCardPage");
const main = document.getElementById("main");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const showPager = document.getElementById("showPager");
showPager.innerHTML = "";
main.innerHTML = "";
let cardNumGlob = 0;
let cards = [];

const setMainElement = (cardNum) => {
  main.innerHTML = "";
  cardNumGlob = cardNum;
  //   cards = JSON.parse(localStorage.cards);
  if (cardNum != 1) {
    main.innerHTML += `<div id="previousCard" class="previousCard">
    <div class="box">
        <div class="flipBtn"><i class="fa fa-refresh"></i> Flip</div>
        <div>${cards[cardNum - 2].question}</div>
    </div>
    <div class="box hideCard">
        <div class="flipBtn"><i class="fa fa-refresh"></i> Flip</div>
        <div>${cards[cardNum - 2].answer}</div>
    </div>
  </div>`;
  }
  main.innerHTML += `<div id="thisCard" class="thisCard">
  <div id="questionBox" class="box" onclick="flip()">
      <div class="flipBtn"><i class="fa fa-refresh"></i> Flip</div>
      <div id="questionText">${cards[cardNum - 1].question}</div>
  </div>
  <div id="answerBox" class="box hideCard" onclick="flip()">
      <div class="flipBtn"><i class="fa fa-refresh"></i> Flip</div>
      <div id="answerText">${cards[cardNum - 1].answer}</div>
  </div>
</div>`;

  if (cardNum != cards.length) {
    main.innerHTML += `<div id="nextCard" class="nextCard">
  <div class="box">
      <div class="flipBtn"><i class="fa fa-refresh"></i> Flip</div>
      <div>${cards[cardNum].question}</div>
  </div>
  <div class="box hideCard">
      <div class="flipBtn"><i class="fa fa-refresh"></i> Flip</div>
      <div>${cards[cardNum].answer}</div>
  </div>
</div>`;
  }

  showPager.innerHTML = `${cardNumGlob}/${cards.length}`;
};

if (localStorage.cards) {
  cards = JSON.parse(localStorage.cards);
  setMainElement(1);
  cardNumGlob = 1;
}

function flip() {
  document.getElementById("questionBox").classList.toggle("hideCard");
  document.getElementById("answerBox").classList.toggle("hideCard");
}

function addNewCard() {
  addNewCardPage.classList.remove("hidden");
  setTimeout(() => {
    addNewCardPage.classList.remove("hidden1");
  }, 1);
}

function closeAddNewCardPage() {
  addNewCardPage.classList.add("hidden1");
  setTimeout(() => {
    addNewCardPage.classList.add("hidden");
  }, 500);
}

function nextCardShow() {
  if (cardNumGlob != cards.length) {
    document.getElementById("thisCard").classList.add("previousCard");
    document.getElementById("nextCard").classList.remove("nextCard");
    document.getElementById("nextCard").classList.add("thisCard");
    setTimeout(() => {
      setMainElement((cardNumGlob += 1));
    }, 500);
  }
}
function previousCardShow() {
  if (cardNumGlob != 1) {
    document.getElementById("thisCard").classList.add("nextCard");
    document.getElementById("previousCard").classList.remove("previousCard");
    document.getElementById("previousCard").classList.add("thisCard");
    setTimeout(() => {
      setMainElement((cardNumGlob -= 1));
    }, 500);
  }
}

function addCardToCards() {
  if (question.value && answer.value) {
    const newCardIndex = cards.length;
    cards[newCardIndex] = {
      question: question.value,
      answer: answer.value,
    };
    question.value = "";
    answer.value = "";
    localStorage.cards = JSON.stringify(cards);
    if (cardNumGlob == 0) {
      cardNumGlob += 1;
    }
    setMainElement(cardNumGlob);
    closeAddNewCardPage();
  }
}

const clearCards = () => {
  main.innerHTML = "";
  cards = [];
  localStorage.clear();
  showPager.innerHTML = "";
  cardNumGlob = 0;
};
