const msg = new SpeechSynthesisUtterance(); // Creates a new speech synthesis utterance
let voices = []; // List to hold all available voices

const voicesDropdown = document.querySelector('[name="voice"]'); // Voice selection dropdown
const options = document.querySelectorAll('[type="range"], [name="text"]'); // Rate, Pitch sliders & Text area
const speakButton = document.querySelector('#speak'); // Speak button
const stopButton = document.querySelector('#stop'); // Stop button

// Populate the dropdown with available voices
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set the selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
}

// Start speaking
function startSpeech() {
  // Prevent starting speech with no text
  if (!msg.text.trim()) return;

  speechSynthesis.cancel(); // Cancel ongoing speech, if any
  speechSynthesis.speak(msg); // Start speaking
}

// Stop speaking
function stopSpeech() {
  speechSynthesis.cancel(); // Stops the speech immediately
}

// Set text, rate, or pitch when they change
function setOption() {
  msg[this.name] = this.value;
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices); // Populate voices when available
voicesDropdown.addEventListener('change', setVoice); // Change voice
options.forEach(option => option.addEventListener('change', setOption)); // Update rate, pitch, or text
speakButton.addEventListener('click', startSpeech); // Start speech on button click
stopButton.addEventListener('click', stopSpeech); // Stop speech on button click

// Initialize default text
msg.text = document.querySelector('[name="text"]').value;
