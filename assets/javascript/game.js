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
	// When playing the game, format the playersWord for html with a 
	// space between the letters/underscores - it just looks nicer	
	var formattedPlayersWord = "";
	if(gameObj.gameHasStarted)
	{

		for (var i = 0; i < gameObj.playersWord.length; i++) {
			formattedPlayersWord += gameObj.playersWord.charAt(i);
			if(i + 1 != gameObj.playersWord.length) {
				formattedPlayersWord += " ";
			}
		}
	}
	else 
	{
		formattedPlayersWord = "NONE";
	}
	document.getElementById("players-word").innerHTML = formattedPlayersWord;
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
	// be initialized with underscores. As a letter is correctly guessed, it
	// will be made visible in playersWord at the correct position.
	playersWord: "", 
	// This is a list of the letters the player has previously guessed
	usedLetters: "",
	// The count of previous wins
	winCount: 0,
	// Flag to indicate if we are in the middle of a game
	gameHasStarted: false,
	// Initially giving only 10 guesses
	guessesRemaining: 10,

	words3: [
		'VANILLA',
		'CHOCOLATE',
		'STRAWBERRY',
	],

	// Initialize variables after a win to make the page looks good between 
	// games. Also allows so that the first keypress after a win will only 
	// start the game and not be the first guess
	resetBetweenGames: function() {
		this.wordToGuess = "";
		this.usedLetters = "";
		this.playersWord = "NONE";
		this.guessesRemaining = 0;
		this.gameHasStarted = false;
	},
	// Initialize variables after a keypress to start the new game
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
		// initialize var "playersWord" to the same length as var "wordToGuess"
		// with all of characters initialized to underscores.
		for (var i = 0; i < this.wordToGuess.length; ++i) {
		    this.playersWord += '_';
		}
		updateHTML();	
	},
	addGuess: function(letter)
	{
		// If the letter has not been guessed already
		if(this.usedLetters.indexOf(letter) == -1)
		{
			this.guessesRemaining--; 
			this.usedLetters += letter;
			// Check all the letters in var "wordToGuess" to see if it matches
			// the guess and then update the playersWord
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
				this.resetBetweenGames();
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
		this.resetBetweenGames();
	},
}