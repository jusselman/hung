const word = document.getElementById('word');
const wrongLetter = document.getElementById('wrong-letters');
const resetBtn = document.getElementById('btn-play');
const modal = document.getElementById('modal-container');
const alerts = document.getElementById('alert-container');
const finalMsg = document.getElementById('end-message');
const bodyId = document.getElementById('bodyId');
const figure = document.getElementById('figure');
const gameover = document.getElementById('gameover');

const bodyParts = document.querySelectorAll('.body-part');
const faded = document.getElementsByClassName('fade');
const letter = document.getElementsByClassName('letter');

const vocab = ['bike', 'dogs', 'tacos', 'cold', 'brain', 'shoes', 'bagel', 'kitten'];

let chosenWord = vocab[Math.floor(Math.random() * vocab.length)];

const correctLets = [];
const wrongLets = [];

let playable = true;


function displayText() {
    word.innerHTML = `
            ${chosenWord
            .split('')
            .map(
                letter => `
                  <span class="letter">
                    ${correctLets.includes(letter) ? letter : ''}
                  </span>
                `
            )
            .join('')}
          `;

    const innerWord = word.innerText.replace(/[ \n]/g, '');

    if (innerWord === chosenWord) {
        finalMsg.innerText = 'You saved Hungy';
        modal.style.display = 'flex';
        playable = false;
    }
}



// Update Wrong Letters //
function updateWrongLets() {
    wrongLetter.innerHTML = `
        ${wrongLets.length > 0 ? '<p>Wrong Letter</p>' : ''}
        ${wrongLets.map(letter => `<span class="wrong-span">${letter}</span>`)}
    `;

    bodyParts.forEach((part, index) => {
        const errors = wrongLets.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = '';
        }
    });

    if (wrongLets.length === bodyParts.length) {

        // finalMsg.innerText = 'Game Over';
        // modal.style.display = 'flex';
        playable = false;
        bodyId.style.backgroundColor = 'crimson';
        figure.style.stroke = 'black';
        figure.style.transform = 'rotate(360deg)';
        faded[0].style.color = 'transparent';
        faded[1].style.color = 'transparent';
        faded[2].style.color = 'transparent';
        faded[3].style.color = 'transparent';
        letter[0].style.borderBottom = '2px solid transparent';
        letter[1].style.borderBottom = '2px solid transparent';
        letter[2].style.borderBottom = '2px solid transparent';
        letter[3].style.borderBottom = '2px solid transparent';
        letter[4].style.borderBottom = '2px solid transparent';
        letter[5].style.borderBottom = '2px solid transparent';

        gameover.innerHTML = "Paragraph changed!";
    }
}

//Show Notification //
function showModal() {
    alerts.classList.add('visible');

    setTimeout(() => {
        alerts.classList.remove('visible')
    }, 1000);
}


window.addEventListener('keydown', e => {
    if (playable) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = e.key.toLowerCase();

            if (chosenWord.includes(letter)) {
                if (!correctLets.includes(letter)) {
                    correctLets.push(letter);

                    displayText();
                } else {
                    showModal();
                }
            } else {
                if (!wrongLets.includes(letter)) {
                    wrongLets.push(letter);

                    updateWrongLets();
                } else {
                    showModal();
                }
            }
        }
    }
});

// Reset Game //
resetBtn.addEventListener('click', () => {
    // Empty arrays //
    correctLets.splice(0);

    wrongLets.splice(0);

    chosenWord = vocab[Math.floor(Math.random() * vocab.length)];
    updateWrongLets();
    displayText();

    modal.style.display = 'none';
    playable = true;
});

displayText();





