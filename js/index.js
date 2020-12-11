




/*
document.addEventListener('DOMContentLoaded', function() {
  askMeubles();
});
const divMeubles = document.getElementById("divMeubles");
const divResult = document.getElementById("result");



const displayMeubles = (listeMeubles) => {
  const items = document.createElement("div");
  items.setAttribute("id", "divMeubles");
  //items.innerHTML='<strong>test</strong>';
  for (meuble of listeMeubles) {

    const item = document.createElement("div");
    item.setAttribute("class", "divMeuble");
    item.innerHTML = meuble._id + ' , ' + meuble.name + ' , ' + meuble.price + '<br>' + meuble.description + '<br><br>';

    const divImgMeuble = document.createElement("div");
    divImgMeuble.setAttribute("class","divImgMeuble");

    const lienImg = document.createElement("a");
    //lienImg.setAttribute("href", "./products/produit.html?id="+meuble._id);
    lienImg.setAttribute("href", "./products/produit.html");
    lienImg.setAttribute("class","lienImg");
    lienImg.setAttribute("id", meuble._id);
    //créer un objet contenant la référence du meuble et l'exporter ?
    lienImg.addEventListener('click', function(event) {
      //askMeuble(meuble._id);
      event.preventDefault();
      askMeuble(meuble._id);
      //alert('toto');
    });

    const fitImg = document.createElement("img");
    fitImg.setAttribute("src", meuble.imageUrl);
    fitImg.setAttribute("class","fitImg");

    divImgMeuble.appendChild(lienImg);
    divImgMeuble.appendChild(fitImg);

    item.appendChild(divImgMeuble);
    divMeubles.appendChild(item);
  };
}

const btnAskMeubles = document.getElementById("ask-meubles");
btnAskMeubles.addEventListener('click', function() {
  //alert('test');
  askMeubles();
});





const askMeuble = (idMeuble) => {
  var apiUrl="http://localhost:3000/api/furniture/"+idMeuble;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      response = JSON.parse(this.responseText);
      //divMeubles.innerHTML = response + '<br><br>';
      //windows.location.href = './products/produit.html';
    }
  };
  request.open("GET", apiUrl);
  request.send();
}



/*document.addEventListener('DOMContentLoaded', function() {
  alert('tata');
});*/



