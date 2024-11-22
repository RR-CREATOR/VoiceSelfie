var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();


document.getElementById("canvas").style.display = "none";

function start(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run(event) {

    console.log(event);

    var Content = event.results[0][0].transcript;
    console.log(Content);
    
    document.getElementById("textbox").innerHTML = Content;
    if(Content == "take my selfie"){
        console.log("will speak in 1 second");
        setTimeout(() => {  console.log("speaking"); }, 1000);
        var utterance = new SpeechSynthesisUtterance("Your selfie will be taken in 3 seconds");
        utterance.rate = 1;
        speechSynthesis.speak(utterance)
        setTimeout(() => {  console.log("spoken"); }, 1000);

        utterance.addEventListener('end', (ev) => {
            
            setTimeout(() => { 
                takepicture();
                ev.preventDefault(); 
            }, 3000);            
        })
}
if(Content == "take my picture"){
    console.log("will speak in 1 second");
    setTimeout(() => {  console.log("speaking"); }, 1000);
    var utterance = new SpeechSynthesisUtterance("Your selfie will be taken in 3 seconds");
    utterance.rate = 1;
    speechSynthesis.speak(utterance)
    setTimeout(() => {  console.log("spoken"); }, 1000);

    utterance.addEventListener('end', (ev) => {
        
        setTimeout(() => { 
            takepicture();
            ev.preventDefault(); 
        }, 3000);            
    })
}
}


recognition.onspeechend = function(){
     recognition.stop();
}

var width = 320; 
        var height = 0; 

        var streaming = false;

        var video = null;
        var canvas = null;
        var photo = null;
        var Storager = document.getElementById("textbox").value;

        function startup() {
            video = document.getElementById('video');
            canvas = document.getElementById('canvas');
            photo = document.getElementById('photo');

            navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                })
                .then(function(stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function(err) {
                    console.log("An error occurred: " + err);
                });

            video.addEventListener('canplay', function(ev) {
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth / width);

                    if (isNaN(height)) {
                        height = width / (4 / 3);
                    }

                    video.setAttribute('width', width);
                    video.setAttribute('height', height);
                    canvas.setAttribute('width', width);
                    canvas.setAttribute('height', height);
                    streaming = true;
                }
            }, false);

            clearphoto();
        }

        function clearphoto() {
            var context = canvas.getContext('2d');
            context.fillStyle = "#AAA";
            context.fillRect(0, 0, canvas.width, canvas.height);
        
            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }

        function takepicture() {
            var context = canvas.getContext('2d');
            if (width && height) {
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);
        
                var data = canvas.toDataURL('image/png');
                photo.setAttribute('src', data);

            } else {
                clearphoto();
            }
        }

        window.addEventListener('load', startup, false);

        function download(){
            console.log("download function called");
            console.log(photo.getAttribute('src'));
            var test = photo.getAttribute('src');
            console.log(test);
            saveAs(test, "myselfie.png");
        }
        