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

export default new MenuNavigation();