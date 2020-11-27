import response from './../index.js';

const divDetailMeuble = document.getElementById('divDetailMeuble');
function askMeuble() {
    divDetailMeuble.textContent = response;
}

document.addEventListener('DOMContentLoaded', function() {
    askMeuble();
  });