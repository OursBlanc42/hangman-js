const buttonNewGame = document.getElementById("newGame");
const history = document.getElementById("history");
let wordToGuess = "";
let memory = [];
let wordMasked = document.getElementById("wordMasked");
let progress = new Array(wordToGuess.length);
let letterInput = "";
let message = document.getElementById("message");
let gameOver = false;
let life = document.getElementById("life");
let maxLife = 6;
let fullHeart = "";
let imageState = document.getElementById("state");

// Image library
const images = {
  0: "img/0b.png",
  1: "img/1b.png",
  2: "img/2b.png",
  3: "img/3b.png",
  4: "img/4b.png",
  5: "img/5b.png",
  6: "img/6b.png",
};


// At first start :
PickAWord();
progress.fill("_");
wordMasked.textContent = progress.join(" ");
fullHeart = maxLife;
life.textContent = "❤️".repeat(fullHeart);
imageState.src = images[0];



// Event listener : new game
buttonNewGame.addEventListener('click', function() {
	console.log("Start new game");
	PickAWord();
	progress.fill("_");
	wordMasked.textContent = progress.join(" ");

	// Reset state
	gameOver = false;
	memory = [];
	fullHeart = maxLife;
	life.textContent = "❤️".repeat(fullHeart);
	imageState.src = images[0];
	message.classList.remove("fail","success","victory","gameover");
	message.textContent = "";
	history.textContent = "";
});


// Event listener : User input
window.addEventListener("keydown", (event) => {
	letterInput = String(event.key).toUpperCase();
	console.log("User input = " + letterInput);
	CheckLetter();
});

function CheckLetter() {
	let inMemory = false;
	let isSuccess = false;
	
	if (gameOver) return;  // if lost, exit immediately
	if (!progress.includes("_")) return; // if won, exit immediately
	
	// Check if letter is in memory
	for (let i = 0; i < memory.length; i++) {
		if (memory[i] === letterInput) {
			inMemory = true;
		}
	}
	
	// If not in memory, check if in the word
	if (inMemory === false) {
		for (let i = 0; i < wordToGuess.length; i++) {
			if (wordToGuess[i] === letterInput) {
				progress[i] = letterInput;
				isSuccess= true;
			}
		}
		
		if (isSuccess) {
			message.classList.remove("fail");
			message.classList.add("success");
			message.textContent = "Bravo ! La lettre " + letterInput + " fait partie du mot !";
		} else {
			message.classList.remove("success");
			message.classList.add("fail");
			message.textContent = "Dommage ! La lettre " + letterInput + " ne fait pas partie du mot !";
			RemoveAHeart();
		}
		
		// Update history
		history.appendChild(document.createTextNode(letterInput + ", "));
		memory.push(letterInput);
		console.log("Memory : " + memory);
		
		// Update wordmasked
		wordMasked.textContent = progress.join(" ");
		
	} else {
			message.classList.remove("success");
			message.classList.add("fail");
			message.textContent = "Vous avez déja essayé la lettre " + letterInput + " !";
		}
	
	console.log(progress);
	
	if (gameOver === true) {
		console.log("Perdu !");
		message.classList.remove("fail");
		message.classList.remove("success");
		message.classList.add("gameover");
		message.textContent = "Dommage ! Vous avez perdu !";
		return;
	}
	
	if (!(progress.includes("_"))) {
		console.log("Victoire !");
		message.classList.remove("fail");
		message.classList.remove("success");
		message.classList.add("victory");
		message.textContent = "Bravo ! Vous avez gagné !";
		return;
	}
	
	
}
	
function PickAWord() {
    const randomIndex = Math.floor(Math.random() * wordLibrary.length);
    wordToGuess = wordLibrary[randomIndex].toUpperCase();
    console.log("Mot à deviner :", wordToGuess);

    progress = new Array(wordToGuess.length).fill("_");
    wordMasked.textContent = progress.join(" ");
}
	
function RemoveAHeart() {
	fullHeart--;

	if (fullHeart <= 0) {
		fullHeart = 0;
		gameOver = true;
	}

	const brokenHeart = maxLife - fullHeart;
	life.textContent = "❤️".repeat(fullHeart) + "💔".repeat(brokenHeart);
	imageState.src = images[brokenHeart];
	
}

	
	
	
	
