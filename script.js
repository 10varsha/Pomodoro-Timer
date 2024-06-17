document.addEventListener("DOMContentLoaded", () => {
    let focusButton = document.getElementById("focus");
    let buttons = document.querySelectorAll(".btn");
    let shortBreakButton = document.getElementById("shortBreak");
    let longBreakButton = document.getElementById("longBreak");
    let startBtn = document.getElementById("btn-start");
    let reset = document.getElementById("btn-reset");
    let pause = document.getElementById("btn-pause");
    let time = document.getElementById("time");
    let set;
    let count = 59;
    let paused = true;
    let minCount = 24;
    time.textContent = `${minCount + 1}:00`;

    const appendZero = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    const pauseTime = () => {
        paused = true;
        clearInterval(set);
        startBtn.classList.remove("hide");
        pause.classList.add("show");
        reset.classList.add("show");
    };

    if (reset) {
        reset.addEventListener("click", () => {
            pauseTime();
            count = 59;
            minCount = 24;
            time.textContent = `${minCount + 1}:00`;
        });
    }

    const removeFocus = () => {
        buttons.forEach((btn) => {
            btn.classList.remove("btn-focus");
        });
    };

    if (focusButton) {
        focusButton.addEventListener("click", () => {
            removeFocus();
            focusButton.classList.add("btn-focus");
            pauseTime();
            minCount = 24;
            count = 59;
            time.textContent = `${minCount + 1}:00`;
        });
    }

    if (shortBreakButton) {
        shortBreakButton.addEventListener("click", () => {
            removeFocus();
            shortBreakButton.classList.add("btn-focus");
            pauseTime();
            minCount = 4;
            count = 59;
            time.textContent = `${minCount + 1}:00`;
        });
    }

    if (longBreakButton) {
        longBreakButton.addEventListener("click", () => {
            removeFocus();
            longBreakButton.classList.add("btn-focus");
            pauseTime();
            minCount = 14;
            count = 59;
            time.textContent = `${minCount + 1}:00`;
        });
    }

    if (pause) {
        pause.addEventListener("click", pauseTime);
    }

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            reset.classList.add("show");
            pause.classList.add("show");
            startBtn.classList.add("hide");
            startBtn.classList.remove("show");
            if (paused) {
                paused = false;
                time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
                set = setInterval(() => {
                    count--;
                    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
                    if (count === 0) {
                        if (minCount !== 0) {
                            minCount--;
                            count = 60;
                        } else {
                            clearInterval(set);
                        }
                    }
                }, 1000);
            }
        });
    }
});
