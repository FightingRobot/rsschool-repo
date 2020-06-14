class Prompts {
    constructor() {
        this.btnBack = document.querySelector('.btn__back');
        this.btnTranslate = document.querySelector('.btn__translate');
        this.btnSound = document.querySelector('.btn__sound');

        this.picEnabled = true;
        this.translationEnabled = true;
        this.sentenceSolved = false;
    }

    showPicture() {
        // alert(this.picEnabled);
        let puzzlePieces = document.querySelector('.game-screen__puzzle-pieces');
        let pieces = puzzlePieces.querySelectorAll('.puzzle-piece');

        for (let piece of pieces) {
            if (this.picEnabled) {
                piece.classList.add('puzzle-piece_hidden');
            } else {
                piece.classList.remove('puzzle-piece_hidden');
            }
        }

        if (this.picEnabled) this.picEnabled = false;
        else this.picEnabled = true;
    }

    showTranslation() {
        const sentence = document.querySelector('.game-screen__sentence');

        if (this.translationEnabled) {
            sentence.style.visibility = 'hidden';
        } else {
            sentence.style.visibility = 'visible';
        }

        if (this.translationEnabled) this.translationEnabled = false;
        else this.translationEnabled = true;
    }

    listenSentence() {

    }

    init() {
        this.btnBack.onclick = this.showPicture;
        this.btnTranslate.onclick = this.showTranslation;
        this.btnSound.onclick = this.listenSentence;
    }
}

export default new Prompts();