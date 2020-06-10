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
    this.sentence = document.querySelector('.game-screen__sentence');
    this.pieces = document.querySelector('.game-screen__puzzle-pieces');
    this.currentDroppable = document.querySelector('.playboard__sentence_active');

    this.currentSentence = 0;
    this.currentEngSentence = 0;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  createSentence() {
    this.sentence.innerHTML = this.book1[this.currentSentence].textExampleTranslate;
  }

  createTranslation() {
    this.currentEngSentence = this.book1[this.currentSentence].textExample.split(' ');
    let engSentence = this.book1[this.currentSentence].textExample.split(' ');
    // alert(engSentence)
    // alert(this.currentEngSentence)
    // this.currentEngSentence = engSentence;
    this.shuffle(engSentence)

    for (let word of engSentence) {
      let newElem = document.createElement('div');
      newElem.classList.add('puzzle-piece');
      newElem.innerHTML = word;
      this.pieces.append(newElem);
    }
  }

  setDragondrop() {
    let pieces = document.querySelectorAll('.puzzle-piece');

    for (let piece of pieces) {
      piece.onmousedown = function (event) {
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

        let currentDroppable = document.querySelector('.playboard__sentence_active');
        // let currentDroppable = none;

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);

          // piece.hidden = true;
          piece.style.display = 'none';
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          piece.style.display = 'flex';
          // piece.hidden = false;

          // alert(elemBelow.className)

          if (!elemBelow) return;

          let droppableBelow = elemBelow.closest('.playboard__sentence_active');
          // alert(droppableBelow)

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

        piece.onmouseup = function () {
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
    let nodes = this.currentDroppable.childNodes;
    let arr = Array.prototype.slice.call(nodes);

    for (let i = 0; i < arr.length; i++) {
      // alert(arr[i].textContent)
      // alert(this.currentEngSentence[i])
      if (arr[i].textContent === this.currentEngSentence[i]) {
        nodes[i].style.borderColor = 'green';
      } else {
        nodes[i].style.borderColor = 'red';
      }
    }

    // alert(arr);
  }

  start() {
    this.createSentence();
    this.createTranslation();
    this.setDragondrop();
  }
}

const btnStart = document.querySelector('.btn__start');
const btnCheck = document.querySelector('.btn__check');

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