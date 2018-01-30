const Letter = require('./Letter.js');
const colors = require('colors');

/**
 * Class that defines a Word, which is
 * made up of Letter objects.
 * @param {*} word_string 
 */
function Word (word_string){

    //represents the guesses left for this word.
    this.guesses = 10;
    //boolean that tells us whether the word has
    //been correctly guessed.
    this.guessed = false;
    //Array of incorrect guesses.
    this.wrong_guesses = [];
    
    //Function that converts the word from a string
    //to an array made of Letter objects.
    this.convertString = function (word_string){

        var word_array = word_string.split('');
        var letters = [];

        for (var i = 0; i < word_array.length; i++) {

            var current_letter = new Letter(word_array[i], false);
            letters.push(current_letter);

        };

        return letters;
    };

    //Array of letter Objects.
    this.letter_array = this.convertString(word_string);

    //Function that displays the word, calling displayLetter
    //on each letter object.
    this.displayWord = function(){

        var displayed_word = [];

        for(var k = 0; k < this.letter_array.length; k++){

            displayed_word.push(this.letter_array[k].displayLetter());

        }
        
        if(displayed_word.indexOf('_') === -1){

            this.guessed = true;

        }

        displayed_word = displayed_word.reduce((prev, curr) => prev + ' ' + curr);
        console.log('Wrong guesses: ' + this.wrong_guesses + '\n');
        console.log(displayed_word);

    };

    //Function that processes a guess for this word.
    //Skips over previously correctly guessed letters.
    //Displays when correct in green letters. When
    //incorrect, displays in red and pushes incorrect
    //letter to wrong_guesses.
    this.guess = function(guess){

        var guessed_letter = guess.toLowerCase();
        var correct = false;

        for(var j = 0; j < this.letter_array.length; j++){

            var current_letter = this.letter_array[j];

            if(current_letter.guessed === true || current_letter.letter === ' '){

                continue;

            }

            current_letter.guessLetter(guessed_letter);

            if(current_letter.guessed === true){

                console.log('Correct Guess!'.green);
                correct = true;

            }

        }
        
        if(correct === false){
            console.log('Incorrect Guess!'.red);
            this.guesses--;
            this.wrong_guesses.push(guessed_letter);

        }

    }


};

module.exports = Word;