const resultElement = document.getElementById("result")
let recognition;


function startConverting() {
 if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    setupRecognition(recognition);
    recognition.start();
} else {
    alert("Speech Recognition is not supported in this browser.");
}


}
function setupRecognition(recognition) {
    recognition.continuous = true;

    recognition.interimResults = true;
    //listening the speech,convert in to the text,display in the screen

    recognition.lang = "en-US";

    recognition.onresult = function (event) {

        const { finalTranscript, interTranscript } = processResult(event.results);
        //upcoming text going to be process by this function

        resultElement.innerHTML = finalTranscript + interTranscript;
    }

}
function processResult(results) {

    let finalTranscript = '';
    let interTranscript = '';

    for (let i = 0; i < results.length; i++) {
        let transcript = results[i][0].transcript;
        transcript = transcript.replace("\n", "<br>");
        
        if (results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interTranscript += transcript;
        }
    }
    return { finalTranscript, interTranscript };
    

}






function stopConverting() {
    if (recognition) {
        recognition.stop();
    }
}

