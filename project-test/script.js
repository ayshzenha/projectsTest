 const resultElement=document.getElementById("result")
 let recognition;
 
 
 function startConverting(){
    if('webkitSpeechRecognition 'in window){
        recognition=new webkitSpeechRecognition
        setupRecognition(recognition)
        recognition.start()
        }

 }
function setupRecognition(recognition){
recognition.continuous=true;

recognition.interimResults=true;
//listening the speech,convert in to the text,display in the screen

recognition.lang="en-US";

recognition.onresult=function(event){

}



}
function processResult(results){

}







 function stopConverting(){

 }