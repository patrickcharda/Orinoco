class Display {
    constructor() {
        this.divMeubles = document.getElementById("divMeubles");
        this.divDetailMeuble = document.getElementById("divDetailMeuble");
        this.divOrder = document.getElementById("divOrder");
        this.divPanier = document.getElementById("divPanier");
    }
    
    // Static properties shared by all instances
    static arrayPanierTousMeubles =[];
    static objetPanierMeubles = {};
  
    async displayMeubles() {
        let listeMeubles = await Ajax.get("http://localhost:3000/api/furniture/");
        console.log(listeMeubles);
        //const items = document.createElement("div");
        //items.setAttribute("id", "divListeMeubles");

        for (let meuble of listeMeubles) {

            if (sessionStorage.getItem(meuble._id) == undefined) {
                //console.log('echo');
                sessionStorage.setItem(meuble._id,0);
                
                if (sessionStorage.getItem(meuble._id) == 0) {
                    console.log(`sessionStorage du meuble ${meuble.name} initialisée`);
                }
            }


    
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

    static ajouterMeuble(id) {
        //sessionStorage.setItem("product",id);
        //alert("test");
        
        console.log(id);
        //Display.arrayPanierProducts.push(id);
        if (Display.objetPanierMeubles[`${id}`] == null) {
            Display.objetPanierMeubles[`${id}`]= 1;
            const divMeubleOptions = document.getElementById("meubleOptions");
            Display.objetPanierMeubles['varnishes']= [];
            Display.objetPanierMeubles['varnishes'].push(divMeubleOptions.options[divMeubleOptions.selectedIndex].value);
            sessionStorage.setItem([`${id}`],1);
            sessionStorage.setItem(`${divMeubleOptions.options[divMeubleOptions.selectedIndex].value}`, 1);
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            quantite ++;
            alert(quantite);
            console.log('id : ' + `${id}`);
            console.log('storage : ' + sessionStorage.getItem(`${id}`) + ' ' + sessionStorage.getItem(`${divMeubleOptions.options[divMeubleOptions.selectedIndex].value}`));
            spanQte.textContent = quantite;
            console.log(Display.objetPanierMeubles);
        
        } else {
            Display.objetPanierMeubles[`${id}`]+=1;
            const divMeubleOptions = document.getElementById("meubleOptions");
            Display.objetPanierMeubles['varnishes'].push([divMeubleOptions.options[divMeubleOptions.selectedIndex].value]);
            let qteInStorage = sessionStorage.getItem(`${id}`);
            qteInStorage++;
            sessionStorage.setItem(`${id}`,qteInStorage);
            let qteSpecificVarnishInStorage = sessionStorage.getItem(`${divMeubleOptions.options[divMeubleOptions.selectedIndex].value}`);
            qteSpecificVarnishInStorage++;
            sessionStorage.setItem(`${divMeubleOptions.options[divMeubleOptions.selectedIndex].value}`,qteSpecificVarnishInStorage);
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            quantite ++;
            alert(quantite);
            console.log('id : ' + `${id}`);
            console.log('qte ce pdt ds le panier : ' + sessionStorage.getItem(`${id}`));
            console.log('qte ce vernis : ' + sessionStorage.getItem(`${divMeubleOptions.options[divMeubleOptions.selectedIndex].value}`));
            spanQte.textContent = quantite;
            //console.log(Display.objetPanierMeubles);

        }
        console.log('panier :' + Display.objetPanierMeubles[id]);
        //console.log('panier :' + Display.arrayPanierProducts);
        //afficher nombre d'éléments de l'objet 
        var longueur =0;
        for(let key in Display.objetPanierMeubles) {
            longueur+=1;
        }
        console.log(longueur);
        //afficher l'object sous forme de tableau
        const tab = Object.entries(Display.objetPanierMeubles);
        console.log(tab);
    }

    static retirerMeuble(id) {
        //sessionStorage.setItem("product",id);
        //alert("test");
        console.log(id);

        if (Display.objetPanierMeubles[`${id}`] == null) {
            // on met à jour la span
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            alert(quantite);
            //console.log('res : ' + `${id}`);
            spanQte.textContent = quantite;
        
        } else if (Display.objetPanierMeubles[`${id}`] == 1) {
            // nettoyer les storages
            sessionStorage.getItem(`${id}`);
            alert(Display.objetPanierMeubles[`${id}`]);
            //on remet à null cette clé;
            Display.objetPanierMeubles = [];
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            if (quantite > 0) {
                quantite --;
            }
            alert(quantite);
            spanQte.textContent = quantite;
        } else {
            Display.objetPanierMeubles[`${id}`] --;
            Display.objetPanierMeubles['varnishes'].pop();
            const spanQte = document.getElementById('spanQte');
            let quantite = parseInt(spanQte.textContent);
            if (quantite > 0) {
                quantite --;
            }
            alert(quantite);
            spanQte.textContent = quantite;
        }
        console.log('panier :' + Display.objetPanierMeubles[id]);
        //console.log('panier :' + Display.arrayPanierProducts);
        //afficher nombre d'éléments de l'objet 
        var longueur =0;
        for(let key in Display.objetPanierMeubles) {
            longueur+=1;
        }
        console.log(longueur);
        //afficher l'object sous forme de tableau
        const tab = Object.entries(Display.objetPanierMeubles);
        console.log(tab);
    }

    static majTableauDuPanier(id) {
        for (let i in Display.arrayPanierTousMeubles) {
            if (Display.arrayPanierTousMeubles[i] == id) {
                //faire qqchose
            }
        }
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
            Display.ajouterMeuble(detailMeuble._id);
        })
        this.divDetailMeuble.appendChild(btnAjout);

        const spanPlus = document.createElement("span");
        spanPlus.setAttribute("id","spanPlus");
        spanPlus.textContent='+';
        spanPlus.addEventListener('click', function(event) {
            event.preventDefault();
            Display.ajouterMeuble(detailMeuble._id);
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
            Display.retirerMeuble(detailMeuble._id);
        })
        this.divDetailMeuble.appendChild(spanMoins);

        Display.majTableauDuPanier(detailMeuble._id);
        
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