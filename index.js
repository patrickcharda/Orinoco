const divMeubles = document.getElementById("meubles-result");
const askMeubles = () => {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      var response = JSON.parse(this.responseText);
      //divMeubles.innerHTML = response + '<br><br>';
      displayMeubles(response);
    }
  };
  request.open("GET", "http://localhost:3000/api/furniture");
  request.send();
}
const displayMeubles = (listeMeubles) => {
    for (meuble of listeMeubles) {
        const item=document.createElement("div");
        item.innerHTML = meuble._id + ' , ' + meuble.name + ' , ' + meuble.price + '<br>' + meuble.description + '<br><br>';
        const imgItem = document.createElement("img");
        imgItem.setAttribute("src", meuble.imageUrl);
        imgItem.setAttribute("class","fitImage");
        item.appendChild(imgItem);
        divMeubles.appendChild(item);
    }
}
const btnMeteo = document.getElementById("ask-meubles");
btnMeteo.addEventListener('click', function() {
  askMeubles();
});