function Letter (letter, guessed){

    this.letter = letter.toLowerCase();
    this.guessed = guessed;
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

    this.guessLetter = function(guessed_letter){

        var guess = guessed_letter.toLowerCase();

        if(guess === this.letter){

            this.guessed = true;

        }
    };
};

module.exports = Letter;