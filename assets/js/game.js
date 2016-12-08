var upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var music = [
    ["CRACKER", "KEROSENE HAT"],
    ["JOHNNY CASH", "HURT"],
    ["ETTA JAMES", "AT LAST"],
    ["QUEEN", "BOHEMIAN RHAPSODY"],
    ["INGRID MICHAELSON", "THE WAY I AM (LIVE ON WERS)"],
    ["GORILLAZ", "NOVEMBER HAS COME"],
    ["FUGEES", "KILLING ME SOFTLY WITH HIS SONG"],
    ["ISRAEL KAMAKAWIWO OLE", "SOMEWHERE OVER THE RAINBOW _ WHAT"],
    ["JACKSON BROWNE", "DOCTOR MY EYES"],
    ["GANGSTAGRASS", "LONG HARD TIMES TO COME (FROM _JU"]
];

var guesses = 0;
var guessTries = 12;
var wins = 0;
var item = 0;
var isLetter = true;
var bandUsed = "";

function initGame() {

    // only reach for the objects the one time

    // var objWordguess = document.getElementById("wordGuess");
    // var objGuessedLetters = document.getElementById("guessedLetters");
    // var objCharGuess = document.getElementById("charGuess");
    // var objGuessCount = document.getElementById("guessCount");
    var objWordguess = $("#wordGuess");
    var objGuessedLetters = $("#guessedLetters");
    var objCharGuess = $("#charGuess");
    var objGuessCount = $("#guessCount");


    objCharGuess.html("");
    objGuessedLetters.html("");
    objGuessCount.html(guessTries);
    // Clear it out from the last game
    objWordguess.html("");

    // This will generate a randomly selected member of the music array.
    // The while loop prevents the re-use of the same 
    // band over and over by random chance.
    if (bandUsed == "") {
        item = Math.floor(Math.random() * music.length);
    }
    while (bandUsed.indexOf(item) >= 0) {
        item = Math.floor(Math.random() * music.length);

        // Player has won more times than there are bands in the array.  Let them start over.
        if (bandUsed.length == music.length) {
            item = Math.floor(Math.random() * music.length);
            bandUsed = "";
            break;
        }

    }
    bandUsed = bandUsed + item;

    // console.log("bandUsed = " + bandUsed);
    // console.log("Band name = " + music[item][0]);
    // set how many keys the user gets to hit
    guessTries = 12;

    // reset the guess counter 
    guesses = 0;

    // Create an array with Dashed line and spaces to duplicate the band's name (i.e. fill in the blank)
    for (i = 0; i < music[item][0].length; i++) {

        if (music[item][0].charAt(i) == " ") {
            objWordguess.html(objWordguess.html() + " ");
        } else {
            objWordguess.html(objWordguess.html() + "-");
        }

    }
    //console.log("Doc wordGuess =" + document.getElementById("wordGuess").innerHTML);

    // play the song of the band to provide player with a hint
    document.getElementById("currentSong").src = "assets/media/" + music[item][1] + ".mp3";

}

function gotKeystroke(keyCode) {
    var x = String.fromCharCode(keyCode);
    var result = "";
    var message = "";

    // only reach for the objects the one time
    // var objWordguess = document.getElementById("wordGuess");
    // var objGuessedLetters = document.getElementById("guessedLetters");
    // var objWinLose = document.getElementById("winLose");
    // var objWinCount = document.getElementById("winCount");
    // var objCharGuess = document.getElementById("charGuess");
    // var objGuessCount = document.getElementById("guessCount");
    var objWordguess = $("#wordGuess");
    var objGuessedLetters = $("#guessedLetters");
    var objWinLose = $("#winLose");
    var objWinCount = $("#winCount");
    var objCharGuess = $("#charGuess");
    var objGuessCount = $("#guessCount");

    if (upperLetters.includes(x)) {
        if (isLetter == false) {
            //clear out the error message
            objWinLose.html("");
            objWinLose.css({ display: "none" });
            isLetter = true;
        }
        var charFound = false;
        var arrWordGuess = objWordguess.html().split("");
        if ((objGuessedLetters.html().indexOf(x) >= 0) ||
            (objWordguess.html().indexOf(x) >= 0)) {
            // user has aleady guessed this letter, do nothing with counts and exit
        } else {
            objCharGuess.html(x);
            if (guesses == 0) {
                objGuessedLetters.append(x);
                // Clear out the messages upon start of new game
                objWinLose.html("");
                objWinLose.css({ display: "none" });
            } else {
                objGuessedLetters.append(", " + x);
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
                objGuessCount.html(guessTries - guesses);
                if (guesses == guessTries) {
                    message = "Too bad! You\'ve LOST!  The Correct Answer was " + music[item][0] + ". Try again.";
                    result = message.bold();
                    objWinLose.html(result);
                    objWinLose.focus();
                    doRedoAnimate(false);
                    // Too many guesses! You lose!!  reinit the game
                    initGame();
                }
            } else {
                objWordguess.html(arrWordGuess.join(""));
            }
            if (objWordguess.html().indexOf("-") < 0) {
                // they won!!
                var numCount = Number(objWinCount.html());
                objWinCount.html(++numCount);
                message = "Congratulations!! You\'ve WON! The Answer was " + music[item][0] + ". Try Again.";
                result = message.italics();
                objWinLose.html(result);
                doRedoAnimate(true);
                initGame();
            }
        }
    } else {
        // The player entered a non letter character.  Inform them and let them try again.
        objWinLose.html("You must enter letters only. Try Again.");
        isLetter = false;
    }
    objCharGuess.val("");
}

// If the player wins or loses, let's animate that text
function doRedoAnimate(i) {
    // player has won
    if (i) {
        $("#winLose").css("display", "block");
        $("#winLose").animate({
            fontSize: "+=20px",
            color: "green"
        }, 2000);
    } else {
        // looser!
        $("#winLose").css("display", "block");
        $("#winLose").animate({
            fontSize: "+=20px",
            color: "red"
        }, 2000);
    }
    $('#winLose').goTo();
    // will this set it back to its defaults?
    restore();
}


    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
    }
// put the h3 tag back to its defaults
function restore() {
    $("#winLose").each(function() {
        var orig = $.data(this, 'css');
        $(this).animate({
            fontSize: orig.fontSize,
            color: orig.color
        }, 2000);
    });
}

// do this once on page load
$(document).ready(function() {
    $("#winLose").each(function() {
        var $this = $(this);
        $.data(this, 'css', {
            fontSize: $this.css('fontSize'),
            color: $this.css('color')
        });
        $this.css("display", "none");
    });

    $(window).resize(function() {
        ReSize();
    });

    function ReSize() {
        if ($(this).width() <= '480') {
            $(".resized-left").attr("class", "resized-left col-sm-10 col-offset-sm-2");
            $(".resized-right").attr("class", "resized-right col-sm-10 col-offset-sm-2");
            $(".pic").css({
                "width": "50%",
                "height": "auto",
                "verticalAlign": "textBottom"
            });
        } else if ($(this).width() <= '768') {
            $(".resized-left").attr("class", "resized-left col-md-5 col-offset-md-1");
            $(".resized-right").attr("class", "resized-right col-md-5 col-offset-md-1");
            $(".pic").css({
                "width": "80%",
                "height": "auto",
                "verticalAlign": "textBottom"
            });
        } else if ($(this).width() <= '980') {
            $(".resized-left").attr("class", "resized-left col-lg-5 col-offset-lg-1");
            $(".resized-right").attr("class", "resized-right col-lg-5 col-offset-lg-1");
            $(".pic").css({
                "width": "100%",
                "height": "auto",
                "verticalAlign": "textBottom"
            });
        }
    }
    ReSize();
});
