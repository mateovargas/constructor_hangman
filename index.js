/**
 * Dependencies.
 */
const Letter = require('./Letter.js');
const Word = require('./Word.js');
const inquirer = require('inquirer');
const fs = require('fs');

//Array of the available words to use.
var words = [];
//The word
var word = '';
//Initialized value for guesses.
var guesses_left = 0;

//Function that allows players to add word when
//the game is won.
var addWord = function(){

    inquirer.prompt([
        {
            type: 'input',
            message: 'Please add a word to play with in the future!',
            name: 'added_word'
        }
    ]).then(function(inquirerResponse){

        var word_to_append = ', ' + inquirerResponse.added_word
        fs.appendFile('words.txt', word_to_append, function(err){

            if(err){
                console.log(err);
            }

            console.log('Thank you for playing!');
            playAgain();
        });
    });

};

//Main game engine.
var run = function(game_word) {

    guesses_left = game_word.guesses;

    console.log('You have ' + guesses_left.toString() + ' guesses left!' + '\n');
    game_word.displayWord();
    console.log('\n');

    if (game_word.guessed === true) {
        console.log('You won!');
        addWord();
        return;
        
    }
    else if (guesses_left === 0) {

        console.log('The word was: ' + word);
        console.log('You Lost! Thanks for playing!');
        playAgain();
        return;

    }

    inquirer.prompt([
    {
        type: 'input',
        message: 'Please guess a letter!',
        name: 'guess'

    }
     ]).then(function (inquirerResponse) {


        game_word.guess(inquirerResponse.guess);

        console.log('\n');

        if (guesses_left > 0 && game_word.guessed === false) {

            run(game_word);

        }
    });
}

//Function that sets the game up and then calls the first run().
var setUp = function(){
    fs.readFile('words.txt', 'utf8', function(error, data){

        if(error){

            return console.log(error);

        }

        words = [...data.split(', ')];

        console.log('Welcome to Node Hangman!');

        var word_index = Math.floor(Math.random() * words.length);

        word = words[word_index];

        var game_word = new Word(word);

        run(game_word);

    });
};

var playAgain = function(){

    inquirer.prompt([
        {
            type: 'input',
            message: 'Would you like to play again? (y/n)',
            name: 'continue'
        }
    ]).then(function(inquirerResponse){

        if(inquirerResponse.continue.toLowerCase() === 'y' ||
           inquirerResponse.continue.toLowerCase() === 'yes'){

            setUp();

        }
        else{
            console.log('Shutting down...Thank you for playing!');
        }
    });

};

setUp();



