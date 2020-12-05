class Display {
    constructor() {
        this.divMeubles = document.getElementById("divMeubles");
        this.divDetailMeuble = document.getElementById("divDetailMeuble");
        this.divOrder = document.getElementById("divOrder");
        this.divPanier = document.getElementById("divPanier");
        this.objetPanierMeubles = {};
        this.arrayPanierMeubles = [];
        this.panier = new Panier();
        this.panier.createFurnituresArray();
    }
  
    async displayMeubles() {
        let listeMeubles = await Ajax.get("http://localhost:3000/api/furniture/");
        //console.log(listeMeubles);
        //const items = document.createElement("div");
        //items.setAttribute("id", "divListeMeubles");
        console.log(this.panier.arrayFurnitures);

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

    ajouterMeuble(id) {
        

        const divMeubleOptions = document.getElementById("meubleOptions");
        let furniture = {id:`${id}`,varnish: divMeubleOptions.options[divMeubleOptions.selectedIndex].value};
        console.log(furniture);
        this.arrayPanierMeubles.push(furniture);

        
        this.panier.appendFurniture(furniture);
        console.log(this.panier.arrayFurnitures);

        /* tests 
        console.log(this.arrayPanierMeubles);
        let jsonPanier = JSON.stringify(this.arrayPanierMeubles);
        console.log(jsonPanier);
        localStorage.setItem("panier", jsonPanier);*/
        
        
        if (this.objetPanierMeubles[`${id}`] == null) {
            this.objetPanierMeubles[`${id}`]= 1;
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            quantite ++;
            //alert(quantite);
            spanQte.textContent = quantite;
            console.log(this.objetPanierMeubles);
        
        } else {
            this.objetPanierMeubles[`${id}`]+=1;
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            quantite ++;
            //alert(quantite);

            spanQte.textContent = quantite;
            console.log(this.objetPanierMeubles);

        }
    }

    retirerMeuble(id) {
        //localStorage.setItem("product",id);
        //alert("test");
        console.log(this.panier.arrayFurnitures.length);
        this.panier.removeFurniture(id);
        console.log(this.panier.arrayFurnitures.length);

        if (this.arrayPanierMeubles.length > 0) {
            this.arrayPanierMeubles.pop();
            console.log(this.arrayPanierMeubles);
        }

        if (this.objetPanierMeubles[`${id}`] == null) {
            // on met à jour la span
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            //alert(quantite);
            //console.log('res : ' + `${id}`);
            spanQte.textContent = quantite;
        
        } else if (this.objetPanierMeubles[`${id}`] == 1) {
            // nettoyer les storages
            /*localStorage.getItem(`${id}`);
            alert(Display.objetPanierMeubles[`${id}`]);*/

            //on remet à null cette clé;
            this.objetPanierMeubles = [];
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            if (quantite > 0) {
                quantite --;
            }
            //alert(quantite);
            spanQte.textContent = quantite;
        } else {
            this.objetPanierMeubles[`${id}`] --;
            //Display.objetPanierMeubles['varnishes'].pop();
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            if (quantite > 0) {
                quantite --;
            }
            //alert(quantite);
            spanQte.textContent = quantite;
            console.log(this.objetPanierMeubles);
        }

    }

    async displayMeuble(id) {


        console.log(this.panier.arrayFurnitures);

        let detailMeuble = await Ajax.get("http://localhost:3000/api/furniture/"+id);

        console.log(detailMeuble);
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

        // aficher les vernis
        if (detailMeuble.varnish.length > 0) {
            const divMeubleOptions = document.createElement("select");
            divMeubleOptions.setAttribute("id","meubleOptions");
            divMeubleOptions.setAttribute("name","meubleOptions");
            var option='';
            for (let i=0;i<detailMeuble.varnish.length;i++) {
                if (i == 0) {
                    option += '<option selected>' + detailMeuble.varnish[i];
                }
                else {
                    option += '<option>' + detailMeuble.varnish[i];
                };
            }
            divMeubleOptions.innerHTML = option;
            console.log(divMeubleOptions.options[divMeubleOptions.selectedIndex].value);
            this.divDetailMeuble.appendChild(divMeubleOptions);        
        }

        const btnAjout = document.createElement("button");
        btnAjout.innerHTML = 'Ajouter au panier';
        btnAjout.addEventListener('click', function(event) {
            event.preventDefault();
            this.ajouterMeuble(detailMeuble._id);
        }.bind(this))
        this.divDetailMeuble.appendChild(btnAjout);

         //si ce meuble est déjà au panier on affiche combien d'article sont présents au panier
         let qteInCart = this.panier.quantiteOfAFurniture(detailMeuble._id);
         if (qteInCart > 0) {
             const divQteInCart = document.createElement("div");
             divQteInCart.textContent = `${qteInCart} unités de ce meuble déjà au panier`;
             btnAjout.insertAdjacentElement('afterend',divQteInCart);
         }
         

        const spanPlus = document.createElement("span");
        spanPlus.setAttribute("id","spanPlus");
        spanPlus.textContent='+';
        spanPlus.addEventListener('click', function(event) {
            event.preventDefault();
            this.ajouterMeuble(detailMeuble._id);
        }.bind(this))
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
            this.retirerMeuble(detailMeuble._id);
        }.bind(this))
        this.divDetailMeuble.appendChild(spanMoins);
        
    }

    /*async displayOrder(contact, products) {
        const params=[contact, products];
        console.log(params);
        var detailOrder = await Ajax.post("http://localhost:3000/api/furniture/order", contact, products);
        console.log(detailOrder);
    }*/

  }