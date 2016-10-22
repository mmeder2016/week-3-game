// GLOBAL Functions
document.onkeyup = function(event) {
	if(gameObj.gameHasStarted)
	{
		var letter = String.fromCharCode(event.keyCode).toUpperCase();
		var ret = gameObj.addGuess(letter);
		if(ret === 0) // the guess was correct, but not a win
		{
			document.getElementById("players-word").innerHTML = reFormatPlayersWord();
			document.getElementById("used-letters").innerHTML = gameObj.usedLetters;
		} else if(ret === 1) // The guess was incorrect
		{
			document.getElementById("used-letters").innerHTML = gameObj.usedLetters;
			document.getElementById("guesses-remaining").innerHTML = gameObj.guessesRemaining;
		} else if(ret === 3) // The guess was already used
		{
			alert("Letter " + letter + " has already been guessed!");
		} else if(ret ===2 || ret === 4) 
		{
			// The game is over (2 - player out of guesses, 4 - player won)
			if(ret === 2)
			{
				alert("You're out of guesses fool! The word was " + gameObj.wordToGuess);
			} else if (ret ===4)
			{
				winGame();
			}
			gameObj.resetBetweenGames();
			resetGameHtml();
			document.getElementById("game-state").innerHTML = "PRESS ANY KEY TO GET <br> STARTED! <br><br> WINS <br>";
		}
	}
	else
	{
		// Start a new word and reset variables
		gameObj.startGame();
		gameObj.setGuessesRemaining(12);
		resetGameHtml();
		document.getElementById("game-state").innerHTML = "GAME IS IN PROGRESS<br> GOOD LUCK <br><br> WINS <br>";
		document.getElementById("left-img").innerHTML="";
		document.getElementById("top-text").innerHTML = "HANGMAN";
	}
};
// This is called when the player wins the game to put on whatever show yo
// have planned
winGame = function()
{
	var elem = document.getElementById("left-img");
	document.getElementById("top-text").innerHTML = gameObj.playersWord;

	var img = document.createElement('IMG');
	img.setAttribute("width", "100%");
	img.setAttribute("height", "100%");
	if(gameObj.playersWord === "CHOCOLATE")
	{
		img.setAttribute("src", "assets/images/chocolate.png");
	} else if (gameObj.playersWord === "VANILLA")
	{
		img.setAttribute("src", "assets/images/vanilla.png");
	} else if (gameObj.playersWord === "STRAWBERRY")
	{
		img.setAttribute("src", "assets/images/strawberry.png");
	}
	elem.appendChild(img);
}
// Helper function to reset some of the html text
resetGameHtml = function()
{
	document.getElementById("players-word").innerHTML = reFormatPlayersWord();
	document.getElementById("num-wins").innerHTML = gameObj.winCount;
	document.getElementById("used-letters").innerHTML = gameObj.usedLetters;
	document.getElementById("guesses-remaining").innerHTML = gameObj.guessesRemaining;
}

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
// USING THE GAME OBJECT
/*
Methods used
	startGame();
	setGuessesRemaining(12);
	resetBetweenGames();
	addGuess(letter);

Variables used
	gameHasStarted
	playersWord
	winCount;
	usedLetters;
	guessesRemaining

Usage: tell what variables were modified after each state so the user can
update the html page.

	if(gameObj.gameHasStarted)
	{
		var letter = String.fromCharCode(event.keyCode).toUpperCase();
		var ret = gameObj.addGuess(letter);
		if(ret === 0) // the guess was correct, but not a win
		{
			// updated gameObj.playersWord;
			// updated gameObj.usedLetters;
		} else if(ret === 1) // The guess was incorrect
		{
			// updated gameObj.usedLetters;
			// updated gameObj.guessesRemaining;
		} else if(ret === 3) // The guess was already used
		{
			// inform player
		} else if(ret ===2 || ret === 4) 
		{
			// The game is over (2 - player out of guesses, 4 - player won)
			// inform player
			// call gameObj.resetBetweenGames();
			// updated gameObj.playersWord
			// updated gameObj.winCount;
			// updated gameObj.usedLetters;
			// updated gameObj.guessesRemaining;
		}
	}
	else
	{
		// call gameObj.startGame();
		// call gameObj.setGuessesRemaining(12);
		// updated gameObj.playersWord
		// updated gameObj.winCount;
		// updated gameObj.usedLetters;
		// updated gameObj.guessesRemaining;
	}
*/
// Game Object - only game logic, no DOM calls
var gameObj = {
	// This will hold the current word to guess
	wordToGuess: "", 
	// This will hold the players version of the word to guess. initially it
	// will be initialized with underscores. As a letter is correctly guessed, 
	// it will be made visible in playersWord at the correct position.
	playersWord: "", 
	// This is a list of the letters the player has previously guessed. This
	// includes correct and incorrect guesses
	usedLetters: "",
	// The count of previous wins
	winCount: 0,
	// Flag to indicate if we are in the middle of a game or between games
	gameHasStarted: false,
	// Allowing 10 incorrect guesses - this can be set externally by calling
	// gameObj.setGuessesRemaining(8)
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
	// go to the array and get a random word to guess
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
	// addGuess() Performs all of the logic for adding a letter guess to the game
	// Return values
	// 	0 - the guess was correct
	// 	1 - the guess was incorrect
	// 	2 - the guess was incorrect player is out of guesses
	// 	3 – the guess was already used
	// 	4 - the game was won
	addGuess: function(letter)
	{
		var retval = -1;
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
			    	retval = 0; // The guess was correct
			    }
			}	
			if(correctGuess === false)
			{
				retval = 1; // The guess was incorrect
				this.guessesRemaining--;
				if(this.guessesRemaining === 0)
				{
					retval = 2; // The player is out of guesses
				}
			}		
			if(this.wordToGuess === this.playersWord) {
				retval = 4; // The player won the game
				this.winCount++;
			}
		}
		else {
			retval = 3; // This guess was already used
		}
		return retval;
	},
	setGuessesRemaining: function(n)
	{
		this.guessesRemaining = n;
	},
}