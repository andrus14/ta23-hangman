const wordDiv = document.getElementById('word');
const scoreDiv = document.getElementById('score');
const messageDiv = document.getElementById('message');
const alphabetDiv = document.getElementById('alphabet');

let score = 10;
const alphabet = 'abdefghijklmnoprsšzžtuvõäöü'.split('');
let guessedLetters = [];
let word = await getRandomWord();
let guess = word.replace(/[ABDEFGHIJKLMNOPRSŠZŽTUVÕÄÖÜ]/g, "_");

alphabet.forEach( c => {
    const letterDiv = document.createElement('div');
    letterDiv.setAttribute('id', c);
    letterDiv.classList.add('letter');
    letterDiv.innerText = c.toUpperCase();

    letterDiv.addEventListener('click', e => {
        testLetter(c);
    });

    alphabetDiv.appendChild(letterDiv);
});

wordDiv.innerText = guess;
scoreDiv.innerText = score;

document.addEventListener('keydown', e => {
    testLetter(e.key);
});

function testLetter ( letter ) {

    if ( alphabet.includes(letter) && !guessedLetters.includes(letter) && score ) {

        guessedLetters.push(letter);

        const guessedLetterDiv = document.getElementById(letter);

        if ( word.includes(letter.toUpperCase()) ) {

            let i = -1;
            let guessArray = guess.split('');
            do {
                i = word.indexOf(letter.toUpperCase(), i + 1);
                guessArray[i] = letter.toUpperCase();
            } while ( i != -1 );
            guess = guessArray.join('');
            wordDiv.innerText = guess;

            if ( !guess.includes('_') ) {
                messageDiv.innerText = 'Arvasid ära!';
            }

            guessedLetterDiv.classList.add('correct-letter');
            
        } else {
            
            score--;
            scoreDiv.innerText = score;
            
            if ( !score ) {
                messageDiv.innerHTML = 'Mäng läbi!<br>Õige sõna oli ' + word;
            }
            
            guessedLetterDiv.classList.add('wrong-letter');

        }

    } 
}

async function getRandomWord () {

    const response = await fetch('hangman.txt');
    let words = await response.text();

    words = words.split('\n');
    const word = words[Math.floor(Math.random() * words.length)];

    return word.toUpperCase();

}