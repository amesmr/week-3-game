var upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var music = [
    ["CRACKER", "KEROSENE HAT"],
    ["JOHNNY CASH", "HURT"],
    ["ETTA JAMES", "AT LAST"],
    ["QUEEN", "BOHEMIAN RHAPSODY"],
    ["INGRID MICHAELSON", "THE WAY I AM"],
    ["GORILLAZ", "NOVEMBER HAS COME"],
    ["FUGEES", "KILLING ME SOFTLY WITH HIS SONG"]
];

var guesses = 0;
var guessTries = 12;
var wins = 0;
var item = 0;
var isLetter = true;
var bandUsed = "";

function gotKeystroke(keyCode) {
    var x = String.fromCharCode(keyCode);
    var result = "";
    var message = "";
    if (upperLetters.includes(x)) {
        if (isLetter == false) {
            //clear out the error message
            document.getElementById("winLose").innerHTML = "";
            isLetter = true;
        }
        var charFound = false;
        var arrWordGuess = document.getElementById("wordGuess").innerHTML.split("");
        if (document.getElementById("guessedLetters").innerHTML.indexOf(x) >= 0) {
            // user has aleady guessed this letter, do nothing with counts and exit
        } else {
            document.getElementById("charGuess").innerHTML = x;
            if (guesses == 0) {
                document.getElementById("guessedLetters").innerHTML = x;
                // Clear out the messages upon start of new game
                document.getElementById("winLose").innerHTML = "";
            } else {
                document.getElementById("guessedLetters").innerHTML =
                    document.getElementById("guessedLetters").innerHTML + ", " + x;
            }
            for (i = 0; i < music[item][0].length; i++) {
                if (music[item][0].charAt(i) == " ") {
                    // do nothing for spaces.  Give them a mulligan and go to the next character
                } else if (music[item][0].charAt(i) == x) {
                    arrWordGuess[i] = x;
                    charFound = true;
                }
            }
            if (charFound == false) {
                // if they guessed a letter correct, it doesn't count as a missed guess
                guesses++;
                // show the user how many guesses remain
                document.getElementById("guessCount").innerHTML = guessTries - guesses;
                if (guesses == guessTries) {
                    message = "Too bad! You\'ve LOST! Try again.";
                    result = message.bold();
                    document.getElementById("winLose").innerHTML = result;
                    // Too many guesses! You lose!!  reinit the game
                    initGame();
                }
            } else {
                document.getElementById("wordGuess").innerHTML = arrWordGuess.join("");
            }
            if (document.getElementById("wordGuess").innerHTML.indexOf("-") < 0) {
                // they won!!
                document.getElementById("winCount").innerHTML++;
                message = "Congratulations!! You\'ve WON! Try Again.";
                result = message.italics();
                document.getElementById("winLose").innerHTML = result;
                initGame();
            }
        }
    } else {
        // The player entered a non letter character.  Inform them and let them try again.
        document.getElementById("winLose").innerHTML = "You must enter letters only. Try Again.";
        isLetter = false;
    }
}

function initGame() {
    document.getElementById("charGuess").innerHTML = "";
    document.getElementById("guessedLetters").innerHTML = "";
    document.getElementById("guessCount").innerHTML = guessTries;
    // Clear it out from the last game if necessary
    document.getElementById("wordGuess").innerHTML = "";

    item = Math.floor(Math.random() * music.length);

    while (bandUsed.indexOf(item) >= 0) {
        // This will generate a randomly selected member of the music array.
        // The while loop prevents the re-use of the same 
        // band over and over by random chance.
        item = Math.floor(Math.random() * music.length);

        // Player has won more times than there are bands in the array.  Let them start over.
        if (bandUsed.length == music.length) {
            item = Math.floor(Math.random() * music.length);
            bandUsed = "";
            break;
        }

    }

    bandUsed = bandUsed + item;

    console.log("bandUsed = " + bandUsed);
    console.log("Band name = " + music[item][0]);
    // set how many keys the user gets to hit
    guessTries = 12;

    // reset the guess counter 
    guesses = 0;

    // Create an array with Dashed line and spaces to duplicate the band's name (i.e. fill in the blank)
    for (i = 0; i < music[item][0].length; i++) {

        if (music[item][0].charAt(i) == " ") {
            document.getElementById("wordGuess").innerHTML = document.getElementById("wordGuess").innerHTML + " ";
        } else {
            document.getElementById("wordGuess").innerHTML = document.getElementById("wordGuess").innerHTML + "-";
        }

    }
    //console.log("Doc wordGuess =" + document.getElementById("wordGuess").innerHTML);

    // play the song of the band to provide player with a hint
    //play music[item][1];
    document.getElementById("currentSong").src = "assets/media/" + music[item][1] + ".mp3";

}
