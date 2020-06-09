export default class Speech {
    constructor() {
        this.recognition = 0;
        this.btn = document.querySelector('.btn__mic');
    }

    initializeSpeech() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.interimResults = true;
        this.btn.onclick = this.startRecord.bind(this);
    }

    startRecord() {
        this.btn.classList.toggle('btn__mic_active');

        this.recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            console.log(transcript);
        });

        this.recognition.addEventListener('result', this.startSearch);
        this.recognition.start();
    }
}
