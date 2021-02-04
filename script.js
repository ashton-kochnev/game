window.addEventListener('DOMContentLoaded', () => {
    const scoreBoard = document.querySelector('.score'),
          button = document.querySelector('.btn'),
          potatos = document.querySelectorAll('.potato'),
          sound = document.querySelector("#sound"),
          bestScore = document.querySelector(".best-score"),
          luka = document.querySelectorAll('.luka');

    let last,
        timeUp = false,
        score = 0;

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }   

    function random(potatos) {
        const index = Math.floor(Math.random() * potatos.length);
        if (potatos[index] === last) {
            return random(potatos);
        }
        last = potatos[index];
        return potatos[index];
    }

    function show() {
        const time = randomTime(200, 1000);
        const potato = random(potatos);
        potato.classList.add('up');
        setTimeout(() => {
            potato.classList.remove('up');
            if (!timeUp) show();
        }, time);
    }

    luka.forEach(index => index.addEventListener('click', function (e) {
        if(!e.isTrusted) return;
        score++;
        this.parentNode.classList.remove('up');
        sound.play();
        scoreBoard.textContent = score;
    }));

    button.addEventListener('click', function () {
        this.disabled = true;
        this.style.cursor = 'no-drop';
        timeUp = false;
        score = 0;
        show();
        setTimeout(() => {
            scoreBoard.textContent = 0;
            this.disabled = false;
            this.style.cursor = 'pointer';
            timeUp = true;
        }, 10000);
        if (score > bestScore.textContent) {
            bestScore.textContent = score;
        } 
    });
});