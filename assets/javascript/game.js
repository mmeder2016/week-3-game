// GLOBAL VARAIABLES

function TestJ()
{
	document.getElementById("id-button").value = "Tested.";
}

document.onkeyup = function(event) {
	if(gameObj.gameInProgress())
	{
		gameObj.addGuess(String.fromCharCode(event.keyCode).toUpperCase());
		console.log("document.onkeyup: " + String.fromCharCode(event.keyCode).toUpperCase());
	}
	else
	{
		// Start a new word and reset variables
		gameObj.resetGame();
		console.log("document.onkeyup: new word: " + gameObj.wordToGuess);
	}
};

var gameObj = {
	// This will hold the current word to guess
	wordToGuess: "", 
	// This will hold the players version of the word to guess. initially it
	// will be the same length as wordToGuess but all of the characters will
	// be initialized with underscores
	playersWord: "", 
	// This is a list of the letters the player has previously guessed
	usedLetters: "",
	// The count of previous wins
	winCount: 0,
	// Flag to indicate if we are in the middle of a game
	gameHasStarted:false,

	words3: [
		'VANILLA',
		'CHOCOLATE',
		'STRAWBERRY',
	],
	gameInProgress: function()
	{
		return this.gameHasStarted;
	},
	resetGame: function()
	{
		this.wordToGuess = "";
		this.usedLetters = "";
		this.gameHasStarted = true;
		this.setNewWord();
	},
	setNewWord: function()
	{
		this.wordToGuess = this.words3[Math.floor(Math.random() * this.words3.length)];
		this.playersWord = "";
		for (var i = 0; i < this.wordToGuess.length; ++i) {
		    this.playersWord += '_';
		}
		this.updateHTML();	
	},
	addGuess: function(letter)
	{
		// if the letter has not been guessed already
		if(this.usedLetters.indexOf(letter) == -1)
		{
			this.usedLetters += letter;
			for (var i = 0; i <= this.wordToGuess.length; i++) {
				if(letter === this.wordToGuess.charAt(i) ) {
			    	// Replace the _ with the letter
			    	this.playersWord = this.playersWord.substring(0, i) + letter + this.playersWord.substring(i+1);
			    }
			}			
			if(this.wordToGuess === this.playersWord) {
				this.win();
			}
			this.updateHTML();
		}
		else {
			alert("Letter " + letter + " has already been guessed!");
		}
	},
	win: function()
	{
		this.winCount++;
		this.gameHasStarted = false;
	},
	updateHTML: function()
	{
		document.getElementById("players-word").innerHTML = this.playersWord;
		document.getElementById("used-letters").innerHTML = this.usedLetters;
		document.getElementById("num-wins").innerHTML = this.winCount;
	}
}

