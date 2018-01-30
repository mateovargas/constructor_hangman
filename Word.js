const Letter = require('./Letter.js');
var colors = require('colors');


function Word (word_string){

    this.guesses = 10;
    this.guessed = false;
    
    this.convertString = function (word_string){

        var word_array = word_string.split('');
        var letters = [];

        for (var i = 0; i < word_array.length; i++) {

            var current_letter = new Letter(word_array[i], false);
            letters.push(current_letter);

        };

        return letters;
    };

    this.letter_array = this.convertString(word_string);

    this.displayWord = function(){

        var displayed_word = [];

        for(var k = 0; k < this.letter_array.length; k++){

            displayed_word.push(this.letter_array[k].displayLetter());

        }
        
        if(displayed_word.indexOf('_') === -1){

            this.guessed = true;

        }

        displayed_word = displayed_word.reduce((prev, curr) => prev + ' ' + curr);

        console.log(displayed_word);

    };

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

        }

    }


};

module.exports = Word;