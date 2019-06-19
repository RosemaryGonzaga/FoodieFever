export function scoreGuesses() {
    let numCorrect = 0;
    let targetNum = 0;
    const guesses = document.getElementsByClassName("drop-boxes");
    Array.from(guesses).forEach(guess => {
        // console.log(numCorrect);
        // console.log(guess);
        // debugger
        if (guess.innerHTML === guess.id) {
            numCorrect++;
        }
        targetNum++;
    });
    if (numCorrect === targetNum) {
        displayWinModal();
    } else {
        displayTryAgainModal();
    }
}

function displayWinModal() {
    let message1 = "You are correct!";
    let message2 = "Try a different comparison from the menu.";

    // need to factor this out later when I add other food comparisons
    let message3 = "Why do you suppose searches for 'beef' spike in March?";
    let message4 = "Hint: Go to Google Trends and ";
    let linkText = "compare 'beef' with 'beef - corned'";
    let linkHref = "https://trends.google.com/trends/explore?date=all&geo=US&q=beef,beef%20-%20corned";
    // window.alert(message1)    // temporary ... need to make an actual modal

    document.getElementById("modal-msg1").textContent = message1;
    document.getElementById("modal-msg2").textContent = message2;
    document.getElementById("modal-msg3").textContent = message3;
    document.getElementById("modal-msg4").textContent = message4;
    let link = document.getElementById("modal-link");
    link.setAttribute("href", linkHref);
    link.textContent = linkText;

    const winModal = document.getElementById("guess-modal");
    winModal.classList.remove("hidden");
}

function displayTryAgainModal() {
    let message1 = "Try again";
    // window.alert(message1)   // temporary ... need to make an actual modal

    document.getElementById("modal-msg1").textContent = message1;
    const tryAgainModal = document.getElementById("guess-modal");
    tryAgainModal.classList.remove("hidden");
}

export function closeModal() {
    const modal = document.getElementById("guess-modal");
    modal.classList.add("hidden");
}