class Display {
    constructor() {
        this.divMeubles = document.getElementById("divMeubles");
        this.divDetailMeuble = document.getElementById("divDetailMeuble");
        this.divOrder = document.getElementById("divOrder");
    }
  
    async displayMeubles() {
        let listeMeubles = await Ajax.get("http://localhost:3000/api/furniture/");
        console.log(listeMeubles);
        //const items = document.createElement("div");
        //items.setAttribute("id", "divListeMeubles");

        for (let meuble of listeMeubles) {
    
            const item = document.createElement("div");
            item.setAttribute("class", "divMeuble");
            item.innerHTML = meuble._id + ' , ' + meuble.name + ' , ' + meuble.price + '<br>' + meuble.description + '<br><br>';
        
            const divImgMeuble = document.createElement("div");
            divImgMeuble.setAttribute("class","divImgMeuble");
        
            const lienImg = document.createElement("a");
            lienImg.setAttribute("href", "./products/produit.html?id="+meuble._id);
            lienImg.setAttribute("class","lienImg");
    
            const fitImg = document.createElement("img");
            fitImg.setAttribute("src", meuble.imageUrl);
            fitImg.setAttribute("class","fitImg");
        
            divImgMeuble.appendChild(lienImg);
            divImgMeuble.appendChild(fitImg);
        
            item.appendChild(divImgMeuble);
            this.divMeubles.appendChild(item);
        };
    }

    async displayMeuble(id) {

        let detailMeuble = await Ajax.get("http://localhost:3000/api/furniture/"+id);
        console.log(detailMeuble);
        //this.divDetailMeuble.textContent = detailMeuble;
        const item = document.createElement("div");
        item.setAttribute("class", "divMeuble");
        item.innerHTML = detailMeuble._id + ' , ' + detailMeuble.name + ' , ' + detailMeuble.price + '<br>' + detailMeuble.description + '<br><br>';
        
        const divImgMeuble = document.createElement("div");
        divImgMeuble.setAttribute("class","divImgMeuble");
        
        const lienImg = document.createElement("a");
        lienImg.setAttribute("href", "./products/produit.html?id="+detailMeuble._id);
        lienImg.setAttribute("class","lienImg");
    
        const fitImg = document.createElement("img");
        fitImg.setAttribute("src", detailMeuble.imageUrl);
        fitImg.setAttribute("class","fitImg");
        
        divImgMeuble.appendChild(lienImg);
        divImgMeuble.appendChild(fitImg);
        
        item.appendChild(divImgMeuble);
        this.divDetailMeuble.appendChild(item);
        
    }

    async displayOrder(contact, products) {
        const params=[contact, products];
        console.log(params);
        var detailOrder = await Ajax.post("http://localhost:3000/api/furniture/order", params);
        console.log(detailOrder);
    }

  }