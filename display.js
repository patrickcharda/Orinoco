class Display {
    constructor() {
        this.divMeubles = document.getElementById("divMeubles");
        this.divDetailMeuble = document.getElementById("divDetailMeuble");
        this.divOrder = document.getElementById("divOrder");
        this.divPanier = document.getElementById("divPanier");
    }
    
    // Static properties shared by all instances
    static arrayPanierProducts =[];
    static objetPanierProducts = {};

    /*static staticMethod() {
    console.log(this.staticPanierProducts);
    }*/
  
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
            lienImg.setAttribute("draggable","true");
    
            const fitImg = document.createElement("img");
            fitImg.setAttribute("src", meuble.imageUrl);
            fitImg.setAttribute("class","fitImg");
        
            divImgMeuble.appendChild(lienImg);
            divImgMeuble.appendChild(fitImg);
        
            item.appendChild(divImgMeuble);
            this.divMeubles.appendChild(item);
        };
    }

    static ajouterProduit(id) {
        //sessionStorage.setItem("product",id);
        //alert("test");
        
        console.log(id);
        //Display.arrayPanierProducts.push(id);
        if (Display.objetPanierProducts[`${id}`] == null) {
            Display.objetPanierProducts[`${id}`]=1;
            sessionStorage.setItem([`${id}`],1);
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            quantite ++;
            alert(quantite);
            console.log('id : ' + `${id}`);
            console.log('storage : ' + sessionStorage.getItem(`${id}`));
            spanQte.textContent = quantite;
        
        } else {
            Display.objetPanierProducts[`${id}`]+=1;
            let qteInStorage = sessionStorage.getItem(`${id}`);
            qteInStorage++;
            sessionStorage.setItem(`${id}`,qteInStorage);
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            quantite ++;
            alert(quantite);
            console.log('id : ' + `${id}`);
            console.log('storage : ' + sessionStorage.getItem(`${id}`));
            spanQte.textContent = quantite;

        }
        console.log('panier :' + Display.objetPanierProducts[id]);
        //console.log('panier :' + Display.arrayPanierProducts);
        //afficher nombre d'éléments de l'objet 
        var longueur =0;
        for(let key in Display.objetPanierProducts) {
            longueur+=1;
        }
        console.log(longueur);
        //afficher l'object sous forme de tableau
        const tab = Object.entries(Display.objetPanierProducts);
        console.log(tab);
    }

    static retirerProduit(id) {
        //sessionStorage.setItem("product",id);
        //alert("test");
        console.log(id);

        if (Display.objetPanierProducts[`${id}`] == null) {
            // on met à jour la span
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            alert(quantite);
            //console.log('res : ' + `${id}`);
            spanQte.textContent = quantite;
        
        } else if (Display.objetPanierProducts[`${id}`] == 1) {
            //on remet à null cette clé;
            Display.objetPanierProducts = [];
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            if (quantite > 0) {
                quantite --;
            }
            alert(quantite);
            spanQte.textContent = quantite;
        } else {
            Display.objetPanierProducts[`${id}`] --;
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            if (quantite > 0) {
                quantite --;
            }
            alert(quantite);
            spanQte.textContent = quantite;
        }
        console.log('panier :' + Display.objetPanierProducts[id]);
        //console.log('panier :' + Display.arrayPanierProducts);
        //afficher nombre d'éléments de l'objet 
        var longueur =0;
        for(let key in Display.objetPanierProducts) {
            longueur+=1;
        }
        console.log(longueur);
        //afficher l'object sous forme de tableau
        const tab = Object.entries(Display.objetPanierProducts);
        console.log(tab);
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
        lienImg.setAttribute("href", "./produit.html?id="+detailMeuble._id);
        lienImg.setAttribute("class","lienImg");
    
        const fitImg = document.createElement("img");
        fitImg.setAttribute("src", detailMeuble.imageUrl);
        fitImg.setAttribute("class","fitImg");
        
        divImgMeuble.appendChild(lienImg);
        divImgMeuble.appendChild(fitImg);
        
        item.appendChild(divImgMeuble);
        this.divDetailMeuble.appendChild(item);

        if (detailMeuble.varnish.length > 0) {
            const divProductOptions = document.createElement("select");
            divProductOptions.setAttribute("class","productOptions");
            divProductOptions.setAttribute("name","productOptions");
            var option='';
            for (let i=0;i<detailMeuble.varnish.length;i++) {
                option += '<option>' + detailMeuble.varnish[i];
            }
            divProductOptions.innerHTML = option;
            this.divDetailMeuble.appendChild(divProductOptions);        
        }

        const btnAjout = document.createElement("button");
        btnAjout.innerHTML = 'Ajouter au panier';
        btnAjout.addEventListener('click', function(event) {
            event.preventDefault();
            Display.ajouterProduit(detailMeuble._id);
        })
        this.divDetailMeuble.appendChild(btnAjout);

        const spanPlus = document.createElement("span");
        spanPlus.setAttribute("id","spanPlus");
        spanPlus.textContent='+';
        spanPlus.addEventListener('click', function(event) {
            event.preventDefault();
            Display.ajouterProduit(detailMeuble._id);
        })
        this.divDetailMeuble.appendChild(spanPlus);

        const spanQte = document.createElement("span");
        spanQte.setAttribute("id","spanQte");
        spanQte.textContent=0;
        this.divDetailMeuble.appendChild(spanQte);

        const spanMoins = document.createElement("span");
        spanMoins.setAttribute("id","spanMoins");
        spanMoins.textContent = '-';
        spanMoins.addEventListener('click',function(ev) {
            ev.preventDefault();
            Display.retirerProduit(detailMeuble._id);
        })
        this.divDetailMeuble.appendChild(spanMoins);
        
    }

    async getMeuble(id) {
        let detailMeuble = await Ajax.get("http://localhost:3000/api/furniture/"+id);
        console.log(detailMeuble);
        var meuble = {
            "varnish": ["Dark Oak","Mahogany"],
            "_id": detailMeuble._id,
            "name": detailMeuble.name,
            "price": detailMeuble.price,
            "description": detailMeuble.description,
            "imageURL": detailMeuble.imageUrl
        };
        console.log(meuble);
        return meuble;
    }


    async displayOrder(contact, products) {
        const params=[contact, products];
        console.log(params);
        var detailOrder = await Ajax.post("http://localhost:3000/api/furniture/order", contact, products);
        console.log(detailOrder);
    }

    /*async returnAFurnitureObject(id) {
        let detailMeuble = await Ajax.get("http://localhost:3000/api/furniture/"+id);
        //console.log(detailMeuble);
        return detailMeuble.description;
    }*/

  }