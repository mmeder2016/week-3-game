// GLOBAL Functions
document.onkeyup = function(event) {
	if(gameObj.gameHasStarted)
	{
		gameObj.addGuess(String.fromCharCode(event.keyCode).toUpperCase());

	}
	else
	{
		// Start a new word and reset variables
		gameObj.startGame();
		gameObj.setGuessesRemaining(12);
		updateHTML();
	}
};

// When playing the game, format the playersWord for html with a 
// space between the letters/underscores - it just looks nicer
reFormatPlayersWord = function()
{
	var str = "";
	for (var i = 0; i < gameObj.playersWord.length; i++) {
		str += gameObj.playersWord.charAt(i);
		if(i + 1 != gameObj.playersWord.length) {
			str += " ";
		}
	}
	return str;
}

updateHTML = function()
{
	// When playing the game, format the playersWord for html with a 
	// space between the letters/underscores - it just looks nicer	
	var formattedPlayersWord = "";
	if(gameObj.gameHasStarted)
	{
		formattedPlayersWord = reFormatPlayersWord();
		document.getElementById("game-state").innerHTML = "GAME IS IN PROGRESS<br> GOOD LUCK <br><br> WINS <br>";
	}
	else 
	{
		formattedPlayersWord = "NONE";
		document.getElementById("game-state").innerHTML = "PRESS ANY KEY TO GET <br> STARTED! <br><br> WINS <br>";
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
	// This is a list of the letters the player has previously guessed. This
	// includes correct and incorrect guesses
	usedLetters: "",
	// The count of previous wins
	winCount: 0,
	// Flag to indicate if we are in the middle of a game or between games
	gameHasStarted: false,
	// Allowing 10 incorrect guesses
	guessesRemaining: 10,

	// The possible words that will be used in the game
	words3: [
		'VANILLA',
		'CHOCOLATE',
		'STRAWBERRY',
	],

	// Initialize variables after a win to make the page looks as one would 
	// expect it to between games. Also allows so that the first keypress 
	// after a win will only start the game and not be the first guess
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
	},
	addGuess: function(letter)
	{
		// If the letter has not been guessed already
		if(this.usedLetters.indexOf(letter) == -1)
		{
			// boolean to mark whether the guess was a correct one so that
			// guessesRemaining can be decremented if the guess was wrong
			var correctGuess = false;
			 
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
			    	correctGuess = true;
			    }
			}	
			if(correctGuess === false)
			{
				this.guessesRemaining--;
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
			// The letter has been guessed already
			alert("Letter " + letter + " has already been guessed!");
		}
	},
	win: function()
	{
		this.winCount++;
		this.resetBetweenGames();
	},
	setGuessesRemaining: function(n)
	{
		this.guessesRemaining = n;
	},
}