import cards from './cards.js';

const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuLinks = document.querySelectorAll('.burger-menu__link');
const trainBox = document.querySelector('.train-box');
const startBtn = document.querySelector('.start-btn');

const mainContent = document.querySelector('.main__content');
const wordCardTranslate = document.querySelector('.word-card__translate');
const statusBar = document.querySelector('.status-bar');
const buttonsBlock = document.querySelector('.buttons-block');

const correctSound = document.querySelector('.sound-correct');
const errorSound = document.querySelector('.sound-error');

const gameWon = document.querySelector('.game-won-popup');
const gameLost = document.querySelector('.game-lost-popup');

class Card {
  constructor() {

  }

  createCard(word, image, translation, audioSrc) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');

    const wordCardBackground = document.createElement('div');
    wordCardBackground.classList.add('word-card__background');
    const wordCardImage = document.createElement('div');
    wordCardImage.classList.add('word-card__image');
    wordCardImage.style.backgroundImage = `url('${image}')`;
    wordCardBackground.append(wordCardImage);
    wordCard.append(wordCardBackground);


    const wordCardDescription = document.createElement('div');
    wordCardDescription.classList.add('word-card__description');
    const header = document.createElement('h3');
    header.textContent = word;
    const wordCardTranslate = document.createElement('div');
    wordCardTranslate.classList.add('word-card__translate');
    wordCardDescription.append(header);
    wordCardDescription.append(wordCardTranslate);

    wordCard.append(wordCardDescription);

    const wordCardTranslation = document.createElement('div');
    wordCardTranslation.classList.add('word-card__translation');
    const translate = document.createElement('h3');
    translate.textContent = translation;
    wordCardTranslation.append(translate);
    wordCard.append(wordCardTranslation);

    const audio = document.createElement('audio');
    audio.setAttribute('src', audioSrc)
    wordCard.append(audio);

    wordCard.id = word;
    wordCard.onclick = this.cardHandler.bind(this);

    mainContent.append(wordCard);
  }

  drawLayout() {
    mainContent.innerHTML = '';
    cards[0].forEach((a, i) => this.createCard(a, cards[i + 1][i].image));
    startBtn.querySelector('span').textContent = 'START GAME';
    siteBehavior.defaultState();
  }

  findCategory(event) {
    if (!event.target.className.includes('burger-menu__link')) {
      burgerMenu.querySelectorAll('.burger-menu__link').forEach(x => {
        if (event.currentTarget.querySelector('h3').textContent === x.textContent) {
          burgerMenu.querySelectorAll('.burger-menu__link_active').forEach(x => x.classList.remove('burger-menu__link_active'));
          x.classList.add('burger-menu__link_active');
        }
      })

      return cards[0].indexOf(event.currentTarget.querySelector('h3').textContent);
    } else {
      burgerMenu.querySelectorAll('.burger-menu__link_active').forEach(x => x.classList.remove('burger-menu__link_active'));
      event.target.classList.add('burger-menu__link_active');
      if (event.target.textContent == 'Statistics') {
        statistics.drawStats();
      } else {
        return cards[0].indexOf(event.target.textContent);
      }
    }

  }

  swapCards(event) {
    siteBehavior.defaultState();
    startBtn.querySelector('span').textContent = 'START GAME';

    let foundCategory = this.findCategory(event);
    if (foundCategory === undefined) return

    if (foundCategory === -1) {
      mainContent.innerHTML = '';
      this.drawLayout();
      return
    }

    let category = cards[foundCategory + 1];

    let allCards = document.querySelectorAll('.word-card');

    if (!allCards.length) {
      this.drawLayout();
      allCards = document.querySelectorAll('.word-card');
    }

    allCards.forEach((a, i) => {
      a.querySelector('.word-card__description').querySelector('h3').textContent = category[i].word;
      a.querySelector('.word-card__image').style.backgroundImage = `url('${category[i].image}')`;
      a.querySelector('.word-card__translation').querySelector('h3').textContent = category[i].translation;
      a.querySelector('audio').setAttribute('src', category[i].audioSrc);
      a.classList.add('play-card');
      a.id = category[i].word;
      a.onclick = this.cardHandler.bind(this);
    });
  }

  cardHandler() {
    if (event.target.className.includes('word-card__translate')) {
      const translationOverlay = event.currentTarget.querySelector('.word-card__translation');
      translationOverlay.classList.add('word-card__translation_active');
      event.currentTarget.onmouseleave = () => {
        translationOverlay.classList.remove('word-card__translation_active');
      }
    } else {
      if (event.currentTarget.className.includes('play-card') && !JSON.parse(localStorage.getItem('isPlay'))) {
        event.currentTarget.querySelector('audio').play();
        statistics.addWordStats(event.currentTarget.id, 'clickAmount');
      }
    }

    if (!event.currentTarget.className.includes('play-card')) {
      this.swapCards(event);
    }

    return event.currentTarget
  }
}

class PlayMode {
  constructor() {
    this.active = undefined;
    this.playCards = undefined;
    this.random = undefined;
    this.mistakes = 0;
  }

  gameStart() {
    let allPlayCards = mainContent.querySelectorAll('.play-card');
    this.playCards = Array.prototype.slice.call(allPlayCards);
    this.mistakes = 0;

    if (!this.playCards.length) {
      localStorage.setItem('isStarted', false);
      return
    } else {
      localStorage.setItem('isStarted', true);
    }

    startBtn.onclick = this.repeatWord.bind(this);
    startBtn.classList.add('start-btn_repeat-word');

    this.playCards.forEach(a => a.onclick = this.cardCompare.bind(this));
    this.randomizeCard();
  }

  randomizeCard() {
    this.random = Math.round(Math.random() * (this.playCards.length - 1));
    this.playCards[this.random].querySelector('audio').play();
  }

  cardCompare() {
    if (event.currentTarget.className.includes('play-card_answered')) return

    if (event.currentTarget.id === this.playCards[this.random].id) {
      event.currentTarget.classList.add('play-card_answered');
      statistics.addWordStats(event.currentTarget.id, 'guessedRight');
      this.answerCheck(true);
    } else {
      statistics.addWordStats(this.playCards[this.random].id, 'guessedWrong');
      this.answerCheck(false);
    }
  }

  answerCheck(isTrue) {
    if (isTrue) {
      correctSound.play();

      const rightAnswer = document.createElement('img');
      rightAnswer.setAttribute('src', './assets/img/star-win.svg');
      rightAnswer.classList.add('star');
      statusBar.append(rightAnswer);

      this.playCards.splice(this.random, 1);
      if (this.playCards.length) {
        this.randomizeCard();
      } else {
        this.endGame();
      }

    } else {
      this.mistakes++;
      errorSound.play();
      const wrongAnswer = document.createElement('img');
      wrongAnswer.setAttribute('src', './assets/img/star.svg');
      wrongAnswer.classList.add('star');
      statusBar.append(wrongAnswer);
    }
  }

  endGame() {
    mainContent.innerHTML = '';
    if (this.mistakes === 0) {
      gameWon.style.display = 'flex';
      gameWon.querySelector('audio').play();
    } else {
      gameLost.querySelector('span').textContent = 'Mistakes:' + this.mistakes;
      gameLost.style.display = 'flex';
      gameLost.querySelector('audio').play();
    }


    setTimeout(() => {
      gameWon.style.display = 'none';
      gameLost.style.display = 'none';
      card.drawLayout();
    }, 5000)
  }

  repeatWord() {
    this.playCards[this.random].querySelector('audio').play();
  }
}

class SiteBehavior {
  constructor() {
  }

  burgerOpener() {
    burger.classList.toggle('burger_active');
    burgerMenu.classList.toggle('burger-menu_active');
  }

  trainOn() {
    document.body.classList.toggle('body_play');
    if (!JSON.parse(localStorage.getItem('isPlay'))) {
      localStorage.setItem('isPlay', true);
    } else {
      localStorage.setItem('isPlay', false);
      localStorage.setItem('isStarted', false);
      mainContent.querySelectorAll('.play-card').forEach(a => {
        a.onclick = card.cardHandler.bind(card);
      });
      this.defaultState()
    }
  }

  localhostFiller() {
    if (JSON.parse(localStorage.getItem('isPlay')) === null) {
      localStorage.setItem('isPlay', false);
    }

    if (JSON.parse(localStorage.getItem('isStarted')) === null) {
      localStorage.setItem('isStarted', false);
    }

    if (JSON.parse(localStorage.getItem('playedCards')) === null) {
      localStorage.setItem('playedCards', JSON.stringify([]));
    }
  }

  defaultState() {
    localStorage.setItem('isStarted', false);
    statusBar.innerHTML = '';
    startBtn.onclick = playMode.gameStart.bind(playMode);
    startBtn.classList.remove('start-btn_repeat-word');
    buttonsBlock.innerHTML = '';
    mainContent.querySelectorAll('.play-card').forEach(x => x.classList.remove('play-card_answered'));
  }
}

class Statistics {
  constructor() {
    this.clickAmount = undefined;
    this.playedCards = JSON.parse(localStorage.getItem('playedCards'));
  }

  addWordStats(card, parameter) {
    for (let a of this.playedCards) {
      if (a.word === card) {
        a[`${parameter}`]++;
        return
      }
    }

    let newWord = {};
    newWord.word = card;
    newWord.clickAmount = 0;
    newWord.guessedRight = 0;
    newWord.guessedWrong = 0;
    newWord[`${parameter}`]++;
    this.playedCards.push(newWord);

    localStorage.setItem('playedCards', JSON.stringify(this.playedCards));
  }

  drawStats() {
    mainContent.innerHTML = '';
    buttonsBlock.innerHTML = '';
    startBtn.querySelector('span').textContent = 'REPEAT DIFFICULT WORDS';

    startBtn.onclick = this.repeatDifficultWords;
    const clearBtn = document.createElement('div');
    clearBtn.classList.add('clear-btn');
    clearBtn.textContent = 'R';
    clearBtn.onclick = this.clearStat.bind(this);
    buttonsBlock.append(clearBtn);

    const headContent = ['Word', 'Translation', 'Category', 'Clicked', 'Guessed Right', 'Guessed Wrong', 'r/w%'];
    const table = document.createElement('table');
    mainContent.append(table);

    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');

    for (let unit of headContent) {
      const td = document.createElement('td');
      td.textContent = unit;
      td.classList.add('head-buttons')
      td.onclick = this.sortStat.bind(this);
      headRow.append(td);
    }
    thead.append(headRow);
    table.append(thead);

    const tbody = document.createElement('tbody');

    for (let i = 1; i < cards.length; i++) {

      for (let j = 0; j < cards[i].length; j++) {
        let wordRow = document.createElement('tr');

        for (let a = 0; a < headContent.length; a++) {
          const td = document.createElement('td');
          if (a === 0) {
            td.textContent = cards[i][j].word;
            td.classList.add('word');
          } else if (a == 1) {
            td.textContent = cards[i][j].translation;
            td.classList.add('translation');
          } else if (a == 2) {
            td.textContent = cards[0][i - 1];
            td.classList.add('category');
          } else if (a == 3) {
            td.textContent = 0;

            for (let x of this.playedCards) {
              if (x.word === cards[i][j].word) {
                td.textContent = x.clickAmount;
              }
            }

            td.classList.add('clicks');
          } else if (a == 4) {
            td.textContent = 0;

            for (let x of this.playedCards) {
              if (x.word === cards[i][j].word) {
                td.textContent = x.guessedRight;
              }
            }

            td.classList.add('guessed-right');
          } else if (a == 5) {
            td.textContent = 0;

            for (let x of this.playedCards) {
              if (x.word === cards[i][j].word) {
                td.textContent = x.guessedWrong;
              }
            }

            td.classList.add('guessed-wrong');
          } else if (a == 6) {
            td.textContent = 0;

            for (let x of this.playedCards) {
              if (x.word === cards[i][j].word) {
                if ((x.guessedRight === 0) && (x.guessedWrong === 0)) {
                  td.textContent = 0;
                } else if (x.guessedWrong === 0) {
                  td.textContent = 100;
                } else {
                  td.textContent = Math.round((x.guessedRight / (x.guessedRight + x.guessedWrong)) * 100);
                }
              }
            }

            td.classList.add('percentage');
          }

          wordRow.append(td);
        }

        tbody.append(wordRow);
      }
    }

    table.append(tbody);
  }

  repeatDifficultWords() {
    mainContent.innerHTML = '';
    const interactedCards = JSON.parse(localStorage.getItem('playedCards'));
    let cardsArr = cards.reduce((x, y) => x.concat(y));
    let i = 0;

    interactedCards.sort((x, y) => y.guessedWrong - x.guessedWrong);

    for (let unit of interactedCards) {
      if ((unit.guessedWrong > 0) && (i < 8)) {
        i++;

        for (let a of cardsArr) {
          if ((a.word === unit.word)) {
            card.createCard(a.word, a.image, a.translation, a.audioSrc);
            mainContent.querySelectorAll('.word-card').forEach(x => {
              x.classList.add('play-card');
            });
          }

        }
      }
    }

    buttonsBlock.innerHTML = '';
    playMode.gameStart();
  }

  clearStat() {
    this.playedCards = [];
    localStorage.setItem('playedCards', JSON.stringify([]));
    this.drawStats();
  }

  sortStat() {
    // alert(event.target.textContent)
    let clickedButton = event.target.textContent;
    let tbody = document.querySelector('tbody');
    let tbodyArr = Array.prototype.slice.call(tbody);
    alert(tbody.querySelector('.word').textContent);

    if (clickedButton === 'Word') {
      let sortParameter = Array.prototype.slice.call(tbody.querySelectorAll('.word'));
      sortParameter.forEach(x => alert(x.innerHTML));
      sortParameter.sort();
      alert(sortParameter)


    }
    // else if (clickedButton === 'Translation') {
    //   let sortParameter = tbody.querySelectorAll('.translation');

    // } else if (clickedButton === 'Category') {
    //   let sortParameter = tbody.querySelectorAll('.category');

    // } else if (clickedButton === 'Clicked') {
    //   let sortParameter = tbody.querySelectorAll('.clicks');

    // } else if (clickedButton === 'Guessed Right') {
    //   let sortParameter = tbody.querySelectorAll('.guessed-right');

    // } else if (clickedButton === 'Guessed Wrong') {
    //   let sortParameter = tbody.querySelectorAll('.guessed-wrong');

    // } else if (clickedButton === 'r/w%') {
    //   let sortParameter = tbody.querySelectorAll('.percentage');

    // }

    // let tr = tbody.querySelectorAll('tr');
    // tbody[5].textContent.sort((a, b) => a - b);
    // alert(tbodyArr[0].firstChild.textContent)
    tbodyArr.sort((a, b) => {
      alert(a.innerHTML);
      alert(b.innerHTML);
      // if (a[5].textContent > b[5].textContent) return 1
      // if (a[5].textContent < b[5].textContent) return -1
    });

    // alert(tbodyArr[0].firstChild.textContent)
    // alert(tbodyArr[5].firstChild.textContent);
    // let tbodyArr = Array.prototype.slice.call(tbody);
    // alert(tbodyArr.querySelector(td).innerHTML);

    // alert(tbody.childNodes.forEach(x => alert(x.firstChild.textContent)));
    // tbody.childNodes.forEach(x => x.firstChild.textContent);
    // tbody.childNodes[0].sort();
    // if (event.target.textContent == 'Word') {
    //   let units = Array.prototype.slice.call(table.querySelectorAll('word'));
    //   alert(units);
    //   units.sort();
    //   alert(units);
    // }
  }
}

const siteBehavior = new SiteBehavior();
const card = new Card();
const playMode = new PlayMode();
const statistics = new Statistics();

if (statistics.playedCards === null) {
  statistics.playedCards = [];
}

siteBehavior.localhostFiller();

if (JSON.parse(localStorage.getItem('isPlay'))) {
  document.body.classList.add('body_play');
}

card.drawLayout();

burger.onclick = siteBehavior.burgerOpener;
burgerMenu.onclick = siteBehavior.burgerOpener;
trainBox.onclick = siteBehavior.trainOn.bind(siteBehavior);
startBtn.onclick = playMode.gameStart.bind(playMode);
burgerMenuLinks.forEach(a => a.onclick = card.swapCards.bind(card));