
let startWord = document.querySelector("#startword");
let endWord = document.querySelector("#endword");
let guess = document.querySelector("#guess");
let reset = document.querySelector(".btn-reset");
let attempts = 0;
const btnStart = document.querySelector(".btn-start");
const btnEnd = document.querySelector(".btn-end");
const btnGuess = document.querySelector(".btn-guess");
let score = document.querySelector(".score");
let inputStart = document.querySelector(".word--start");
let inputGuess = document.querySelector(".word--guess");
let inputEnd = document.querySelector(".word--end");
let words = [];
let lastGuess = document.querySelector(".last-guess");

startWord.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

endWord.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

guess.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

reset.addEventListener("click", function(e) {
        resetGame();
})

function resetGame() {
    words = [];
    startWord.classList.remove("hide");
    btnStart.classList.remove("hide");
    startWord.value = "";
    inputStart.innerHTML = "";
    endWord.classList.add("hide");
    btnEnd.classList.add("hide");
    endWord.value = "";
    inputEnd.innerHTML = "";
    guess.classList.add("hide");
    btnGuess.classList.add("hide");
    guess.value = "";
    inputGuess.innerHTML = "";
    attempts = 0;   
    score.innerHTML = ""; 
    score.style.color = "tomato";
}

btnStart.addEventListener("click", function() {
    start();
});
startWord.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        start();
    } 
});

btnEnd.addEventListener("click", function() {
    end();
});

endWord.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        end();
    } 
});

btnGuess.addEventListener("click", function() { 
    addWord();
});

guess.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        addWord();
    } 
});

function start() {
    words.push(startWord.value);
    inputStart.innerHTML = `${startWord.value}`;    
    startWord.classList.add("hide");
    btnStart.classList.add("hide");
    endWord.classList.remove("hide");
    btnEnd.classList.remove("hide");
}

function end() {
    if (startWord.value.length === endWord.value.length) {
        inputEnd.innerHTML = `${endWord.value}`;
        endWord.classList.add("hide");
        btnEnd.classList.add("hide");
        guess.classList.remove("hide");
        btnGuess.classList.remove("hide");
        score.innerHTML = "";
    } else {
        score.innerHTML = "..dude.. same length";
    };
}

function addWord() {
    if (guess.value.length != startWord.value.length) {
        score.innerHTML = "WRONG LENGTH, HELLO?!";
    } else {
        wordChecker();
        guess.value = "";
    }
}

function wordChecker() {
    let cheatCheck = 0;
    let lastWord = words[words.length-1];
    let guessWord = guess.value;
    for (let i = 0; i < lastWord.length; i++) {
        if (guessWord[i] != lastWord[i]) {
            cheatCheck++;
        } else {
            cheatCheck;
        }
    }    
    if (cheatCheck <= 1) {
        if (guess.value === endWord.value && attempts <= 10) {
            attempts++;
            score.innerHTML = `WOOPWOOP! You got the word in ${attempts} tries you beast!`;
            score.style.color = "green";
        } else if (guess.value === endWord.value && attempts > 10) {
            attempts++;
            score.innerHTML = `You got the word in ${attempts} tries. Have you tried using your brain? :)`;
            score.style.color = "green";
        } else if (startWord.value.length === guess.value.length) {
            attempts++;
            words.push(guess.value);
            score.innerHTML = "";            
            lastGuess.innerHTML  = `${guess.value}`; 
            inputGuess.innerHTML = `${words.slice(1).join(", ")}`;        
        } else {
            score.innerHTML = "WRONG HELLO?!";
        };      
    } else {
        score.innerHTML = "ONLY CHANGE 1 LETTER! STOP CHEATING!";       
    } 
}

