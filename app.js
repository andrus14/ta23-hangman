const wordDiv = document.getElementById('word');
const scoreDiv = document.getElementById('score');
const messageDiv = document.getElementById('message');
const alphabetDiv = document.getElementById('alphabet');

let score = 10;
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let guessedLetters = [];
let word = 'KURESSAARE AMETIKOOL';
let guess = word.replace(/[a-zA-Z]/g, "_");

alphabet.forEach( c => {
    const letterDiv = document.createElement('div');
    letterDiv.setAttribute('id', c);
    letterDiv.classList.add('letter');
    letterDiv.innerText = c.toUpperCase();

    alphabetDiv.appendChild(letterDiv);
});

wordDiv.innerText = guess;
scoreDiv.innerText = score;

document.addEventListener('keydown', e => {
    let letter = e.key;
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
                messageDiv.innerText = 'Mäng läbi!';
            }
            
            guessedLetterDiv.classList.add('wrong-letter');

        }

    } 
});