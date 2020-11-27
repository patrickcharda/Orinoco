class Display {
    constructor() {
      this.divMeubles = document.getElementById("divMeubles");
      this.divResult = document.getElementById("result");
    }
  
    async displayMeubles() {
      let listeMeubles = await Ajax.get("http://localhost:3000/api/furniture/");
      console.log(listeMeubles);
      const items = document.createElement("div");
      items.setAttribute("id", "divMeubles");

      for (let meuble of listeMeubles) {
    
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
        this.divMeubles.appendChild(item);
      };
    }
  
  }