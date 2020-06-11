import book1 from '../assets/vocabulary/data/book1.js';
import level1 from '../assets/paintings/level1.js';
import setDragondrop from './dragondrop.js'
import MenuNavigation from './MenuNavigation.js'

const btnStart = document.querySelector('.btn__start');
const btnCheck = document.querySelector('.btn__check');
const btnDknow = document.querySelector('.btn__dknow');

class Controller {
  constructor() {
    this.playboard = document.querySelector('.playboard');
    this.ruSentence = document.querySelector('.game-screen__sentence');
    this.pieces = document.querySelector('.game-screen__puzzle-pieces');
    this.currentDroppable = 0;
    this.enSentence = document.querySelectorAll('.playboard__sentence');

    this.currentLevel = 0;
    this.currentPage = 0;
    this.currentSentence = 0;
    this.currentLib = 0;

    this.currentEngSentence = 0;
    this.piecesArr = [];
    this.widthArr = [];
  }

  // setCurrentRound() {
  //   if (this.currentSentence > 9) {
  //     this.currentSentence = 0;
  //     this.currentPage++;
  //   }
  // }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  createRuSentence() {
    // alert(this.currentSentence);
    // alert(this.currentPage);
    this.ruSentence.innerHTML = book1[this.currentSentence].textExampleTranslate;
  }

  createPicture() {
    this.playboard.style.backgroundImage = `url('assets/paintings/${level1[0].cutSrc}')`
  }

  createPieces() {
    this.currentEngSentence = book1[this.currentSentence].textExample.split(' ');
    this.piecesArr = [];

    for (let i = 0; i < this.currentEngSentence.length; i++) {
      let newElem = document.createElement('div');
      newElem.classList.add('puzzle-piece');
      newElem.setAttribute('data-order', i);
      newElem.innerHTML = this.currentEngSentence[i];
      this.piecesArr.push(newElem);
    }
  }

  determineWidth() {
    this.currentDroppable = document.querySelector('.playboard__sentence_active');
    const measurementSquare = document.querySelector('.measure');
    const width = this.currentDroppable.offsetWidth;
    let widthArr = [];
    let pieces = this.piecesArr;

    for (let piece of pieces) {
      measurementSquare.textContent = piece.textContent;
      widthArr.push(measurementSquare.offsetWidth);
    }

    let piecesWidth = widthArr.reduce((sum, a) => sum + a);
    let delta = Math.floor((width - piecesWidth) / pieces.length);
    let newWidthArr = widthArr.map(x => x + delta);
    let reduced = 0;

    this.piecesArr.map((x, i) => {
      if (i > 0) {
        reduced += newWidthArr[i - 1];
      }

      x.style.width = `${newWidthArr[i]}px`;
      x.style.backgroundImage = `url('assets/paintings/${level1[0].cutSrc}')`;
      x.style.backgroundPosition = `-${reduced}px -${this.currentSentence * 30}px`;
      // x.style.backgroundAttachment = `scroll`;
    });
  }

  addPieces() {
    let arr = this.piecesArr.slice();
    this.shuffle(arr);
    arr.map(a => {
      this.pieces.append(a);
    });
  }

  checkSentence() {
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
    // this.setCurrentRound();
    this.createRuSentence();
    this.createPicture()
    this.createPieces();
    this.determineWidth();
    this.addPieces();
    setDragondrop();
  }
}

const controller = new Controller();

controller.start();

btnStart.onclick = MenuNavigation.gameStart.bind(MenuNavigation);
btnCheck.onclick = controller.checkSentence.bind(controller);
btnDknow.onclick = controller.dontknow.bind(controller);