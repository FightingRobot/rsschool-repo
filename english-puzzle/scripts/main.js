import vocabulary from './vocabulary.js';
import Geocode from './GeocodingAPI.js';
import Clock from './Clock.js';
import Weather from './WeatherAPI.js';
import Unsplash from './UnsplashAPI.js';
import YandexAPI from './YandexAPI.js';
import book1 from '../assets/vocabulary/data/book1.js';

class Controller {
  constructor() {
    this.book1 = book1;
    this.ruSentence = document.querySelector('.game-screen__sentence');
    this.pieces = document.querySelector('.game-screen__puzzle-pieces');
    this.currentDroppable = 0;
    this.enSentence = document.querySelectorAll('.playboard__sentence');

    this.currentSentence = 0;
    this.currentEngSentence = 0;
    this.piecesArr = [];
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  createRuSentence() {
    this.ruSentence.innerHTML = this.book1[this.currentSentence].textExampleTranslate;
  }

  createPieces() {
    this.currentEngSentence = this.book1[this.currentSentence].textExample.split(' ');
    this.piecesArr = [];

    for (let i = 0; i < this.currentEngSentence.length; i++) {
      let newElem = document.createElement('div');
      newElem.classList.add('puzzle-piece');
      newElem.setAttribute('data-order', i);
      newElem.innerHTML = this.currentEngSentence[i];
      this.piecesArr.push(newElem);
    }
  }

  addPieces() {
    let arr = this.piecesArr.slice();
    this.shuffle(arr);
    arr.map(a => {
      this.pieces.append(a);
    });
    this.currentDroppable = document.querySelector('.playboard__sentence_active');
  }

  setDragondrop() {
    let pieces = document.querySelectorAll('.puzzle-piece');

    for (let piece of pieces) {
      piece.onmousedown = function startDD(event) {
        // alert(piece.innerHTML)
        let shiftX = event.clientX - piece.getBoundingClientRect().left;
        let shiftY = event.clientY - piece.getBoundingClientRect().top;

        piece.style.position = 'absolute';
        piece.style.zIndex = 1000;
        document.body.append(piece);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
          piece.style.left = pageX - shiftX + 'px';
          piece.style.top = pageY - shiftY + 'px';
        }

        // let currentDroppable = document.querySelector('.playboard__sentence_active');
        let currentDroppable = document.querySelector('.playboard__sentence_active');
        // this.currentDroppable = document.querySelector('.playboard__sentence_active');
        // let currentDroppable = none;

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);

          piece.style.display = 'none';
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          piece.style.display = 'flex';

          if (!elemBelow) return;

          let droppableBelow = elemBelow.closest('.playboard__sentence_active');

          if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
              // логика обработки процесса "вылета" из droppable (удаляем подсветку)
              // leaveDroppable(currentDroppable);
              currentDroppable.style.backgroundColor = '#C030C0';
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
              // логика обработки процесса, когда мы "влетаем" в элемент droppable
              // enterDroppable(currentDroppable);
              currentDroppable.style.backgroundColor = '#C056C0';
            }
          }
        }

        document.addEventListener('mousemove', onMouseMove);

        piece.onmouseup = function endDD() {
          try {
            document.removeEventListener('mousemove', onMouseMove);
            piece.onmouseup = null;
            currentDroppable.append(piece);
            piece.style.position = 'static';
          } catch {

          }
        };

      };
    }
  }

  checkSentence() {
    // alert(this.currentDroppable.innerHTML)
    let nodes = this.currentDroppable.childNodes;
    let arr = Array.prototype.slice.call(nodes);
    let correct = 0;

    for (let i = 0; i < arr.length; i++) {
      if (i === Number(arr[i].getAttribute('data-order'))) {
        nodes[i].style.borderColor = 'green';
        correct++;
      } else {
        nodes[i].style.borderColor = 'red';
      }
    }
    if (correct === this.piecesArr.length) {
      btnCheck.textContent = 'Continue';
      btnCheck.onclick = this.continueGame.bind(this);
    }
  }

  dontknow() {
    let arr = this.piecesArr;
    for (let piece of arr) {
      this.enSentence[this.currentSentence].append(piece);
    }
    this.continueGame();
  }

  continueGame() {
    // this.makeInactive()
    btnCheck.onclick = this.checkSentence.bind(this);
    btnCheck.textContent = 'Check';

    this.enSentence[this.currentSentence].classList.remove('playboard__sentence_active');
    this.enSentence[this.currentSentence].style.backgroundColor = 'purple';
    this.currentSentence++;
    this.enSentence[this.currentSentence].classList.add('playboard__sentence_active');
    this.start();
  }

  makeInactive() {
    let nodes = this.currentDroppable.childNodes;
    for (let node of nodes) {
      // node.classList.add('puzzle-piece_placed');

      // node.addEventListener('mousedown', function () { alert('ass') });
      // node.addEventListener('mouseup', function () { return 'done' });
    }

  }

  start() {
    this.createRuSentence();
    this.createPieces();
    this.addPieces();
    this.setDragondrop();
  }
}

const btnStart = document.querySelector('.btn__start');
const btnCheck = document.querySelector('.btn__check');
const btnDknow = document.querySelector('.btn__dknow');

class MenuNavigation {
  constructor() {
    this.startScreen = document.querySelector('.start-screen');
    this.gameScreen = document.querySelector('.game-screen');
  }

  gameStart() {
    this.startScreen.classList.remove('start-screen_active');
    this.gameScreen.classList.add('game-screen_active');
  }
}

const menuNavigation = new MenuNavigation();
const controller = new Controller();

controller.start();

btnStart.onclick = menuNavigation.gameStart.bind(menuNavigation);
btnCheck.onclick = controller.checkSentence.bind(controller);
btnDknow.onclick = controller.dontknow.bind(controller);