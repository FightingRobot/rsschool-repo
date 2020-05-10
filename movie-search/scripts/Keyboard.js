export default class Keyboard {
    constructor() {
        this.layoutEventCodes = [
            ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
            ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
            ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
            ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
            ['ControlLeft', 'OSLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
        ];

        this.engLayoutLowerCase = [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete'],
            ['Capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
            ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift'],
            ['Ctrl/Change layout', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
        ];

        this.engLayoutUpperCase = [
            ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
            ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Delete'],
            ['Capslock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
            ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift'],
            ['Ctrl/Change layout', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
        ];

        this.rusLayoutLowerCase = [
            ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete'],
            ['Capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
            ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift'],
            ['Ctrl/Change layout', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
        ];

        this.rusLayoutUpperCase = [
            ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
            ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '|', 'Delete'],
            ['Capslock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
            ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift'],
            ['Ctrl/Change layout', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
        ];

        this.keyboardState = {
            isCaps: false,
            clicked: undefined,
        };
    }

    createKeyboard() {
        const mainContent = document.querySelector('.search-form__keyboard');
        const keyboard = document.createElement('div');
        keyboard.classList.add('keyboard');

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        keyboard.append(buttons);

        mainContent.append(keyboard);

        this.textarea = document.querySelector('.search-form__search');
    }

    fillKeyCodes() {
        const codes = this.layoutEventCodes;
        for (let i = 0; i < codes.length; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            document.querySelector('.buttons').append(row);

            for (const code of codes[i]) {
                const key = document.createElement('div');
                key.classList.add('key');
                key.classList.add(code);

                switch (code) {
                    case 'Space':
                        key.classList.add('space');
                        break;
                    case 'ControlLeft':
                    case 'Backspace':
                    case 'Enter':
                    case 'CapsLock':
                    case 'ShiftLeft':
                        key.classList.add('long');
                        break;
                    case 'ControlRight':
                    case 'Tab':
                    case 'Delete':
                    case 'ShiftRight':
                        key.classList.add('mid');
                        break;
                }

                row.append(key);
            }
        }
    }

    changeLayout(layout) {
        const buttons = document.querySelectorAll('.key');
        const newLayout = layout.reduce((x, y) => x.concat(y));

        buttons.forEach((a, i) => a.innerHTML = newLayout[i]);
    }

    keyboardOrMouseCheck(event) {
        if (event.code === undefined) {
            return event.target
        }
        return document.querySelector(`.${event.code}`);
    }

    addActive(func) {
        func.className.includes('CapsLock') ? func.classList.toggle('active') : func.classList.add('active');
    }

    keyboardStateUpdate(lang) {
        if (localStorage.getItem('isEng') === null) {
            localStorage.setItem('isEng', true);
        } else {
            localStorage.setItem('isEng', lang);
        }

        return lang;
    }

    keyboardStateController() {
        const currentLayout = {
            upperCase: undefined,
            lowerCase: undefined,
        };

        if (localStorage.getItem('isEng') === 'false') {
            currentLayout.upperCase = this.rusLayoutUpperCase;
            currentLayout.lowerCase = this.rusLayoutLowerCase;
        } else {
            currentLayout.upperCase = this.engLayoutUpperCase;
            currentLayout.lowerCase = this.engLayoutLowerCase;
        }

        return currentLayout;
    }

    action() {
        document.addEventListener('keydown', this.push.bind(this));
        document.addEventListener('keyup', this.release.bind(this));
        window.onmousedown = this.push.bind(this);
        window.onmouseup = this.release.bind(this);
    }

    langChanger() {
        if (document.querySelector('.ControlLeft').className.includes('active')
            || document.querySelector('.ShiftLeft').className.includes('active')
            && document.querySelector('.AltLeft').className.includes('active')) {
            if (localStorage.getItem('isEng') === 'true') {
                this.keyboardStateUpdate(false);

                if (this.keyboardState.isCaps) {
                    this.changeLayout(this.keyboardStateController().upperCase);
                } else {
                    this.changeLayout(this.keyboardStateController().lowerCase);
                }
            } else if (localStorage.getItem('isEng') === 'false') {
                this.keyboardStateUpdate(true);

                if (this.keyboardState.isCaps) {
                    this.changeLayout(this.keyboardStateController().upperCase);
                } else {
                    this.changeLayout(this.keyboardStateController().lowerCase);
                }
            }
        }
    }

    space(event) {
        event.preventDefault();

        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        this.addActive(this.keyboardOrMouseCheck(event));
        this.textarea.setRangeText(' ', start, end, 'end');
    }

    enter(event) {
        event.preventDefault();

        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        this.addActive(this.keyboardOrMouseCheck(event));
        document.querySelector('.search-form__find').click();
        document.querySelector('.keyboard').classList.remove('keyboard_active');
    }

    shiftDown(event) {
        if (!this.keyboardState.isCaps) {
            this.changeLayout(this.keyboardStateController().upperCase);
        } else if (this.keyboardState.isCaps) {
            this.changeLayout(this.keyboardStateController().lowerCase);
        }

        this.addActive(this.keyboardOrMouseCheck(event));
    }

    shiftUp() {
        if (!this.keyboardState.isCaps) {
            this.changeLayout(this.keyboardStateController().lowerCase);
        } else if (this.keyboardState.isCaps) {
            this.changeLayout(this.keyboardStateController().upperCase);
        }
    }

    capslock(event) {
        if (!this.keyboardState.isCaps) {
            this.changeLayout(this.keyboardStateController().upperCase);
            this.keyboardState.isCaps = true;
        } else if (this.keyboardState.isCaps) {
            this.changeLayout(this.keyboardStateController().lowerCase);
            this.keyboardState.isCaps = false;
        }

        this.addActive(this.keyboardOrMouseCheck(event));
    }

    tab(event) {
        event.preventDefault();

        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        this.addActive(this.keyboardOrMouseCheck(event));
        this.textarea.setRangeText('\t', start, end, 'end');
    }

    backspace(event) {
        event.preventDefault();
        this.addActive(this.keyboardOrMouseCheck(event));

        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        if (this.textarea.value === '') {
            return;
        }

        if (start === end) {
            this.textarea.setRangeText('', start - 1, end);
        } else {
            this.textarea.setRangeText('', start, end);
        }
    }

    deleteKey(event) {
        event.preventDefault();
        this.addActive(this.keyboardOrMouseCheck(event));

        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        if (this.textarea.value === '') {
            return;
        }

        if (start === end) {
            this.textarea.setRangeText('', start, end + 1);
        } else {
            this.textarea.setRangeText('', start, end);
        }
    }

    addSymbol(event) {
        event.preventDefault();

        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        this.addActive(this.keyboardOrMouseCheck(event));
        this.textarea.setRangeText(this.keyboardOrMouseCheck(event).textContent, start, end, 'end');
    }

    push(event) {
        document.querySelector('.search-form__search').focus();
        this.keyboardState.clicked = event.target;

        if (this.keyboardOrMouseCheck(event).className.includes('Space')) {
            this.space(event);
        } else if (this.keyboardOrMouseCheck(event).className.includes('Tab')) {
            this.tab(event);
        } else if (this.keyboardOrMouseCheck(event).className.includes('Enter')) {
            this.enter(event);
        } else if (this.keyboardOrMouseCheck(event).className.includes('CapsLock')) {
            this.capslock(event);
        } else if (this.keyboardOrMouseCheck(event).className.includes('ShiftLeft') || this.keyboardOrMouseCheck(event).className.includes('ShiftRight')) {
            this.shiftDown(event);
        } else if (this.keyboardOrMouseCheck(event).className.includes('Backspace')) {
            this.backspace(event);
        } else if (this.keyboardOrMouseCheck(event).className.includes('Delete')) {
            this.deleteKey(event);
        } else if (this.keyboardOrMouseCheck(event).className.includes('ControlLeft')
            || this.keyboardOrMouseCheck(event).className.includes('ControlRight')
            || this.keyboardOrMouseCheck(event).className.includes('AltLeft')
            || this.keyboardOrMouseCheck(event).className.includes('AltRight')
            || this.keyboardOrMouseCheck(event).className.includes('OSLeft')) {
            event.preventDefault();
            this.keyboardOrMouseCheck(event).classList.add('active');
        } else if (this.keyboardOrMouseCheck(event).className.includes('key ')) {
            this.addSymbol(event);
        }

        this.langChanger();
    }

    release(event) {
        if (!this.keyboardState.clicked.className.includes('CapsLock')) {
            this.keyboardState.clicked.classList.remove('active');
        }

        if (!this.keyboardOrMouseCheck(event).className.includes('CapsLock')) {
            this.keyboardOrMouseCheck(event).classList.remove('active');
        }

        if (this.keyboardState.clicked.className.includes('ShiftLeft') || this.keyboardState.clicked.className.includes('ShiftRight')
            || this.keyboardOrMouseCheck(event).className.includes('ShiftLeft') || this.keyboardOrMouseCheck(event).className.includes('ShiftRight')) {
            this.shiftUp(event);
            document.querySelector('.ShiftLeft').classList.remove('active');
            document.querySelector('.ShiftRight').classList.remove('active');
        }
    }

    initializeKeyboard(layout) {
        this.createKeyboard();
        this.fillKeyCodes();
        this.changeLayout(layout)
        this.keyboardStateUpdate(localStorage.getItem('isEng'));
        this.action();
    }
}