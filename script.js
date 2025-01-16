const resultElement = document.getElementById("result");
let recognition;

function startConverting() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        setupRecognition(recognition);
        recognition.start();
    } else {
        alert("التعرف على الصوت غير مدعوم في هذا المتصفح.");
    }
}

function setupRecognition(recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ar-SA"; // Arabic language

    recognition.onresult = function (event) {
        const { finalTranscript, interTranscript } = processResult(event.results);
        resultElement.innerHTML = finalTranscript + interTranscript;
    };

    recognition.onerror = function(event) {
        console.error("خطأ في التعرف على الصوت: ", event.error);
        alert("حدث خطأ في التعرف على الصوت. يرجى المحاولة مرة أخرى.");
    };

    recognition.onend = function() {
        console.log("خدمة التعرف على الصوت توقفت.");
    };
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

function copyToClipboard() {
    const text = resultElement.innerText;
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('تم نسخ النص إلى الحافظة!');
        }).catch((err) => {
            alert('فشل في نسخ النص إلى الحافظة: ' + err);
        });
    } else {
        alert("لا يوجد نص لنسخه!");
    }
}
