const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const ballon = document.getElementById('ballon');
const ballonText = document.getElementById('ballon-text');

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// hidden ballon
function hiddenBallon() {
  ballon.hidden = true
}

// Print in Screen text
function printText(joke) {
    ballon.hidden = false
    ballonText.textContent = joke
}

// VoiceRSS Speech Function
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');
  printText(joke)
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    key: 'f285febc01dd47deb2f0d339a6db4401',
    src: jokeString,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Passing Joke to VoiceRSS API
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Error Here
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
audioElement.addEventListener('ended', hiddenBallon);