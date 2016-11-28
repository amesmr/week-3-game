var lowerLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "z"];
var upperLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Z"];

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

function gotKeystroke(keyCode) {
    var x = String.fromCharCode(keyCode);
    var charFound = false;
    var arrWordGuess = document.getElementById("wordGuess").innerHTML.split("");
    if (guesses < guessTries) {
        if (document.getElementById("guessedLetters").innerHTML.indexOf(x) >= 0) {
            // user has aleady guessed this letter, do nothing with counts and exit
        } else {
            if (guesses == 0) {
                document.getElementById("guessedLetters").innerHTML = x;
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
            } else {
                document.getElementById("wordGuess").innerHTML = arrWordGuess.join("");
            }
            if (document.getElementById("wordGuess").innerHTML.indexOf("*") < 0) {
                // they won!!
                document.getElementById("winCount").innerHTML++;
            }
        }
        document.getElementById("charGuess").value = "";
    } else {
        // Too many guesses! You lose!!  reinit the game
        initGame();
    }
}

function initGame() {
    document.getElementById("winCount").innerHTML = "0";
    document.getElementById("charGuess").innerHTML = "";
    document.getElementById("guessedLetters").innerHTML = "";
    document.getElementById("guessCount").innerHTML = guessTries;

    // this will generate a randomly selected member of the bands array
    item = Math.floor(Math.random() * music.length);
    console.log("Band name =" + music[item][0]);
    // set how many keys the user gets to hit
    guessTries = 12;

    // reset the guess counter 
    guesses = 0;

    // Create an array with Dashed line and spaces to duplicate the band's name (i.e. fill in the blank)
    for (i = 0; i < music[item][0].length; i++) {

        if (music[item][0].charAt(i) == " ") {
            document.getElementById("wordGuess").innerHTML = document.getElementById("wordGuess").innerHTML + " ";
        } else {
            document.getElementById("wordGuess").innerHTML = document.getElementById("wordGuess").innerHTML + "*";
        }

    }
    console.log("Doc wordGuess =" + document.getElementById("wordGuess").innerHTML);

    // play the song of the band to provide player with a hint
    //play music[item][1];

}

function guessEntered() {

}
