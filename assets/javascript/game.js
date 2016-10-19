// GLOBAL Functions
document.onkeyup = function(event) {
	if(gameObj.gameInProgress())
	{
		gameObj.addGuess(String.fromCharCode(event.keyCode).toUpperCase());
	}
	else
	{
		// Start a new word and reset variables
		gameObj.startGame();
	}
};

updateHTML = function()
{
	var formatPlayersWord = "";
	if(gameObj.gameInProgress())
	{
		// When playing the game, format the playersWord for html with a 
		// space between the letters - it just looks nicer
		for (var i = 0; i < gameObj.playersWord.length; i++) {
			formatPlayersWord += gameObj.playersWord.charAt(i);
			if(i + 1 != gameObj.playersWord.length) {
				formatPlayersWord += " ";
			}
		}
	}
	else 
	{
		formatPlayersWord = "NONE";
	}
	document.getElementById("players-word").innerHTML = formatPlayersWord;
	document.getElementById("used-letters").innerHTML = gameObj.usedLetters;
	document.getElementById("num-wins").innerHTML = gameObj.winCount;
	document.getElementById("guesses-remaining").innerHTML = gameObj.guessesRemaining;
}

// Game Object
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

	guessesRemaining: 10,

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
		this.playersWord = "NONE";
		this.guessesRemaining = 0;
		this.gameHasStarted = false;
	},
	startGame: function()
	{
		this.wordToGuess = "";
		this.usedLetters = "";
		this.playersWord = "";
		this.gameHasStarted = true;
		this.guessesRemaining = 10;
		this.setNewWord();
	},
	setNewWord: function()
	{
		this.wordToGuess = this.words3[Math.floor(Math.random() * this.words3.length)];
		this.playersWord = "";
		for (var i = 0; i < this.wordToGuess.length; ++i) {
		    this.playersWord += '_';
		}
		updateHTML();	
	},
	addGuess: function(letter)
	{
		// if the letter has not been guessed already
		if(this.usedLetters.indexOf(letter) == -1)
		{
			this.guessesRemaining--; 
			this.usedLetters += letter;
			// Check all the letters in var "wordToGuess"
			for (var i = 0; i < this.wordToGuess.length; i++) {
				// If we find the letter in var "wordToGuess"
				// Remember, all unguessed letters in var "playersWord" are 
				// masked with an underscore
				if(letter === this.wordToGuess.charAt(i) ) {
			    	// Replace the _ with the letter by creating a new string
			    	this.playersWord = this.playersWord.substring(0, i) + letter + this.playersWord.substring(i+1);
			    }
			}			
			if(this.wordToGuess === this.playersWord) {
				this.win();
			}
			else if(this.guessesRemaining === 0)
			{
				alert("You're out of guesses fool! The word was " + this.wordToGuess);
				this.resetGame();
			}
			updateHTML();
		}
		else {
			alert("Letter " + letter + " has already been guessed!");
		}
	},
	win: function()
	{
		this.winCount++;
		this.resetGame();
	},
}