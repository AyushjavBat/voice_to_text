let recognition;
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resultDiv = document.getElementById('result');

// Check if Web Speech API is supported
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening until stopped
    recognition.interimResults = false; // Final results only
    recognition.lang = 'en-US'; // Set language (change as needed)

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        resultDiv.textContent = transcript;
    };

    recognition.onerror = (event) => {
        resultDiv.textContent = `Error occurred: ${event.error}`;
        stopRecognition();
    };

    // Handle recognition end (e.g., user stops speaking)
    recognition.onend = () => {
        if (!startBtn.disabled) stopRecognition();
    };
} else {
    resultDiv.textContent = 'Speech Recognition not supported in this browser.';
}

// Start recognition
startBtn.addEventListener('click', () => {
    if (recognition) {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resultDiv.textContent = 'Listening...';
    }
});

// Stop recognition
stopBtn.addEventListener('click', () => {
    stopRecognition();
});

function stopRecognition() {
    if (recognition) {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resultDiv.textContent += ' (Stopped)';
    }
}