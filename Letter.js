
/**
 * Class that defines a single letter. Displays an
 * underscore if not guessed and the letter if
 * guessed.
 * @param {*} letter 
 * @param {*} guessed 
 */
function Letter (letter, guessed){

    //The char that the letter object represents
    this.letter = letter.toLowerCase();

    //whether the letter has been correctly guessed
    this.guessed = guessed;

    //Function that displays the letter if guessed
    //or an underscore if not.
    this.displayLetter = function(){

        if(this.guessed === false && this.letter !== ' '){

            return '_';

        }
        else if(this.letter === ' '){
            
            return this.letter;

        }
        else{

            return this.letter;

        }
    };

    //Function that checks if the guess matches
    //the letter and sets guessed to true if so.
    this.guessLetter = function(guessed_letter){

        var guess = guessed_letter.toLowerCase();

        if(guess === this.letter){

            this.guessed = true;

        }
    };
};

module.exports = Letter;