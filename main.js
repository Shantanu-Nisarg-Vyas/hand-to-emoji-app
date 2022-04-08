Webcam.set({
    width: 420,
    height: 320,
    img_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function capture() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version: ", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LPxCVD-wH/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And The second prediction is " + prediction_2;
    var utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utter_this);
}

function predict() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results)
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_hand1").innerHTML = prediction_1;
        document.getElementById("result_hand2").innerHTML = prediction_2;
        document.getElementById("accuracy_1").innerHTML = (results[0].confidence * 100).toFixed(2);
        document.getElementById("accuracy_2").innerHTML = (results[1].confidence * 100).toFixed(2);
        speak();
        if (results[0].label == "Normal Hand") {
            document.getElementById("Hand_1").innerHTML = "&#9995";
        } else if (results[0].label == "Folded Hand") {
            document.getElementById("Hand_1").innerHTML = "&#128591";
        } else if (results[0].label == "Victory Hand") {
            document.getElementById("Hand_1").innerHTML = "&#9996";
        } else if (results[0].label == "Thumbs Up") {
            document.getElementById("Hand_1").innerHTML = "&#128077";
        } else if (results[0].label == "Thumbs Down") {
            document.getElementById("Hand_1").innerHTML = "&#128078";
        } else {
            document.getElementById("Hand_1").innerHTML = "&#128694";
        }
        if (results[1].label == "Normal Hand") {
            document.getElementById("Hand_2").innerHTML = "&#9995";
        } else if (results[1].label == "Folded Hand") {
            document.getElementById("Hand_2").innerHTML = "&#128591";
        } else if (results[1].label == "Victory Hand") {
            document.getElementById("Hand_2").innerHTML = "&#9996";
        } else if (results[1].label == "Thumbs Up") {
            document.getElementById("Hand_2").innerHTML = "&#128077";
        } else if (results[0].label == "Thumbs Down") {
            document.getElementById("Hand_2").innerHTML = "&#128078";
        } else {
            document.getElementById("Hand_2").innerHTML = "&#128694";
        }
    }
}