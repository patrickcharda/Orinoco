import response from '../js/index.js';

const divDetailMeuble = document.getElementById('divDetailMeuble');
function askMeuble() {
    divDetailMeuble.textContent = response;
}

document.addEventListener('DOMContentLoaded', function() {
    askMeuble();
  });