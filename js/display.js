class Display {
    constructor() {
        this.divMeubles = document.getElementById("divMeubles");
        this.divDetailMeuble = document.getElementById("divDetailMeuble");
        this.divOrder = document.getElementById("divOrder");
        this.divPanier = document.getElementById("divPanier");
        this.divTotalPanier = document.getElementById("divTotalPanier");
        this.divMiniPanier = document.getElementById('divMiniPanier');
        this.objetPanierMeubles = {};
        this.arrayPanierMeubles = [];
        this.panier = new Panier();
        this.panier.createFurnituresArray();
        this.contact = new Contact();   
    }
  
    async displayMeubles() {

        try {
            let apiUrl = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' )? "http://localhost:3000/api/furniture/": "https://bckend.herokuapp.com/api/furniture";
            //console.log(apiUrl);
            var listeMeubles = await Ajax.get(apiUrl);
            //var listeMeubles = await Ajax.get("http://localhost:3000/api/furniture/");
        }
        catch(e) {
            console.log('dans display : ' +e);
            //this.divDetailMeuble.innerHTML = alert('Le site rencontre un problème. Veuillez nous excuser de la gène occasionnée');
            window.location.href = '../warning.html';
            return;
        }
        //console.log(this.panier.arrayFurnitures);
        var moduloZeroOuUn = 0;
        if (listeMeubles.length % 2 === 1) {
            moduloZeroOuUn = 1;
        }
        //console.log('zeroOuUn : '+moduloZeroOuUn)
        
        /* créer les div de lignes (row bootstrap) : 1 row pour 2 cols (= 2 cards, = 2 meubles) */
        var nombreDeDivsRow = 0;
        for (let rowsCount = listeMeubles.length; rowsCount > 0; rowsCount--) {
            /* 1 fois sur 2 on passe ds le if pr creer la div row*/
            if (rowsCount % 2 === moduloZeroOuUn) {
                let divRow = document.createElement("div");
                divRow.setAttribute('id', 'divRow'+rowsCount);
                divRow.setAttribute('class', 'divRow text-center mb-md-5');
                this.divMeubles.appendChild(divRow);
                nombreDeDivsRow ++;
            }
        }

        //console.log(nombreDeDivsRow);
        var rowsCount = listeMeubles.length;
        //console.log(rowsCount);

        var row = this.divMeubles.querySelector('#divRow'+rowsCount);

        for (let meuble of listeMeubles) {
            
            /* 1 fois sur 2 on passe ds le if pour changer de div row*/
            if (rowsCount % 2 === moduloZeroOuUn) {
                row = this.divMeubles.querySelector('#divRow'+rowsCount);
            }
            //console.log(row);
            const item = document.createElement("div");
            item.setAttribute("class", "divMeuble col-12 col-md-6");

            const card = document.createElement("div");
            card.setAttribute('class','card mx-auto');
            item.appendChild(card);

            const divDescMeuble = document.createElement("div");
            divDescMeuble.setAttribute("class", "card-body");
            divDescMeuble.innerHTML = "<h3 class='card-title'>" + meuble.name + ' </h3><p class="card-text"> ' + meuble.description + '</p><strong>'  + this.convertToEuros(meuble.price) + '</strong>';
        
            const divImgMeuble = document.createElement("div");
            divImgMeuble.setAttribute("class","divImgMeuble card-img-top");
        
            const lienImg = document.createElement("a");
            lienImg.setAttribute("href", "./products/produit.html?id="+meuble._id);
            lienImg.setAttribute("class","lienImg mx-auto");
            lienImg.setAttribute("draggable","true");
    
            const fitImg = document.createElement("img");
            fitImg.setAttribute("src", meuble.imageUrl);
            fitImg.setAttribute("class","fitImg");
        
            divImgMeuble.appendChild(lienImg);
            divImgMeuble.appendChild(fitImg);
        
            card.appendChild(divImgMeuble);
            card.appendChild(divDescMeuble);

            row.appendChild(item);
            rowsCount --;
        };
    }

    ajouterMeuble(id, meuble) {
        const divMeubleOptions = document.getElementById("meubleOptions");
        let furniture = {
            id:`${id}`,
            varnish: divMeubleOptions.options[divMeubleOptions.selectedIndex].value,
            name: `${meuble.name}`,
            price: `${meuble.price}`,
            description: `${meuble.description}`,
            imageUrl: `${meuble.imageUrl}`
        };
        //console.log(furniture);
        this.arrayPanierMeubles.push(furniture);
        this.panier.appendFurniture(furniture);
        //console.log(this.panier.arrayFurnitures);
        this.afficherQteInCart(id);
        this.divMiniPanier.innerHTML= '';
        this.afficheMiniPanier(id, meuble);
    }

    retirerMeuble(id, meuble) {
        //console.log(this.panier.arrayFurnitures.length);
        this.panier.rmFurniture(meuble);
        //console.log(this.panier.arrayFurnitures.length);
        this.afficherQteInCart(id);
        this.divMiniPanier.innerHTML ='';
        this.afficheMiniPanier(id, meuble);
    }

    afficherQteInCart(id) {
        let qteInCart = this.panier.quantiteOfAFurniture(id);
        let spanQte = document.getElementById("spanQte");
        if (qteInCart.qte > 0) {
            spanQte.textContent = qteInCart.qte;
        }
        else {
            spanQte.textContent = 0;
        }
    }

    async displayMeuble(id) {

        //console.log(this.panier.arrayFurnitures);
        try {
            let apiUrl = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' )? "http://localhost:3000/api/furniture/"+id: "https://bckend.herokuapp.com/api/furniture/"+id;
            //console.log(apiUrl);
            var detailMeuble = await Ajax.get(apiUrl);
            //var detailMeuble = await Ajax.get("http://localhost:3000/api/furniture/"+id);
        }
        catch(e) {
            //console.log('dans display : ' +e);
            //this.divDetailMeuble.innerHTML = alert('Le site rencontre un problème. Veuillez nous excuser de la gène occasionnée');
            window.location.href = '../warning.html';
            return;
        }
        
        /* variante de code ok :
        let detailMeuble = await Ajax.get("http://localhost:3000/api/furniture/"+id).catch(
            (e) => console.log('dans display : ' +e)
        );
        */

        //console.log(detailMeuble);
        var item = document.createElement("div");
        item.setAttribute("class", "divMeuble row card mx-auto");

        const divTxtMeuble = document.createElement('div');
        divTxtMeuble.setAttribute('class', "divTxtMeuble text-center col-12");

        divTxtMeuble.innerHTML = '<h3 class="card-title text-center col-12">' +detailMeuble.name + '</h3><strong>' + this.convertToEuros(detailMeuble.price) + '</strong><br><br><div class="card-text text-center mx-auto"><p class="mb-4 text-center">' + detailMeuble.description + '</p></div>';
        
        const divImgMeuble = document.createElement("div");
        divImgMeuble.setAttribute("class","divImgMeuble2 text-center col-12 mx-auto");
        
        const lienImg = document.createElement("a");
        lienImg.setAttribute("href", "./produit.html?id="+detailMeuble._id);
        lienImg.setAttribute("class","lienImg");
    
        const fitImg = document.createElement("img");
        fitImg.setAttribute("src", detailMeuble.imageUrl);
        fitImg.setAttribute("class","fitImag");
        
        divImgMeuble.appendChild(lienImg);
        divImgMeuble.appendChild(fitImg);
        
        item.appendChild(divImgMeuble);
        item.appendChild(divTxtMeuble);

        // afficher les vernis
        if (detailMeuble.varnish.length > 0) {
            var divOptions = document.createElement('div');
            divOptions.setAttribute('class', 'text-center col-12');
            
            const divMeubleOptions = document.createElement("select");
            divMeubleOptions.setAttribute("id","meubleOptions");
            divMeubleOptions.setAttribute("name","meubleOptions");
            divMeubleOptions.setAttribute("class","divOptions text-center col-12 mb-3");
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
            //console.log(divMeubleOptions.options[divMeubleOptions.selectedIndex].value); 
            divOptions.appendChild(divMeubleOptions);
            item.appendChild(divOptions);
        }

        this.divDetailMeuble.appendChild(item);

        var divAjout = document.createElement('div');
        divAjout.setAttribute('class', 'divMeuble row mt-5');

        const divAdd = document.createElement('div');
        divAdd.setAttribute('class', 'text-center col-12');

        divAjout.appendChild(divAdd);

        const btnAjout = document.createElement("button");
        btnAjout.setAttribute('id', 'btnAjout');
        btnAjout.innerHTML = 'Ajouter au panier';
        btnAjout.addEventListener('click', function(event) {
            event.preventDefault();
            this.ajouterMeuble(detailMeuble._id, detailMeuble);
        }.bind(this))
        divAdd.appendChild(btnAjout);
        const divBr = document.createElement('div');
        divAdd.appendChild(divBr);
    
        const spanPlus = document.createElement("span");
        spanPlus.setAttribute("id","spanPlus");
        spanPlus.textContent=' +';
        spanPlus.addEventListener('click', function(event) {
            event.preventDefault();
            this.ajouterMeuble(detailMeuble._id, detailMeuble);
        }.bind(this))
        divAdd.appendChild(spanPlus);

        const spanQte = document.createElement("span");
        spanQte.setAttribute("id","spanQte");
        divAdd.appendChild(spanQte);

        //si ce meuble est déjà au panier on affiche combien d'article sont présents au panier
        let qteInCart = this.panier.quantiteOfAFurniture(detailMeuble._id);
        if (qteInCart.qte > 0) {
            spanQte.textContent = qteInCart.qte;
        }
        else {
            spanQte.textContent = 0;
        }

        const spanMoins = document.createElement("span");
        spanMoins.setAttribute("id","spanMoins");
        spanMoins.textContent = '-';
        spanMoins.addEventListener('click',function(ev) {
            ev.preventDefault();
            this.retirerMeuble(detailMeuble._id, detailMeuble);
        }.bind(this))
        divAdd.appendChild(spanMoins);

        this.divDetailMeuble.appendChild(divAjout);
    
        this.afficheMiniPanier(id,detailMeuble);
    }

    afficheMiniPanier(id, meuble) {
        /* mini panier de la page produit.html*/ 
        let ceMeuble = meuble;
        const furnitureToDisplay = this.panier.furnitureList(id);
        //console.log(furnitureToDisplay);
    
        if (furnitureToDisplay !== false) {
            let i=0;
            for (let item of furnitureToDisplay) {
                i++;
                let content = '<div> 1 ' + ceMeuble.name +
                ' ' + item.varnish + ', ' + this.convertToEuros(ceMeuble.price) + '&#9;</div>';
                //console.log(content);
                const divSuppr = document.createElement("div");
                let currentDivId = 'divSuppr_'+i;
                let spanSte = document.getElementById('spanQte');
                divSuppr.setAttribute('id',currentDivId);
                divSuppr.setAttribute('class', 'col-12 mx-auto mb-4');
                divSuppr.innerHTML= content;
                const btnSuppr = document.createElement("button");
                btnSuppr.setAttribute('class', 'btnSuppr');
                btnSuppr.textContent = 'supprimer';
                btnSuppr.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.panier.rmFurniture(item);
                    let currentDivSuppr = document.getElementById(currentDivId);
                    //console.log(currentDivSuppr);
                    this.divMiniPanier.removeChild(currentDivSuppr);
                    spanQte.textContent -= 1;
                }.bind(this));
                divSuppr.appendChild(btnSuppr);
                this.divMiniPanier.appendChild(divSuppr);
            }
        }      
    }

    displayPanier() {
        this.divOrder.innerHTML='';
        const furnituresToDisplay = this.panier.furnituresList(); // sert pour la ligne de synthese (qté et prix) d'un modele de meuble au panier
        //console.log(furnituresToDisplay);
        const furnituresToDisplayOptions = this.panier.furnituresList(); // sert pour afficher chaque unité du modèle choisi, avec son option définie
        var distinctFurnitures = new Set();
        var montantTotal = 0;
        var content = '';

        // création de l'ensemble d'Ids des produits distincts présents au panier
        for (let item of furnituresToDisplay) {
            if (!distinctFurnitures.has(item.id)) {
                distinctFurnitures.add(item.id);
            }
        }

        var j = 0 //compteur pour les lignes calculées - synthese qté-prix - (divPartDeCeProduitAuPanier)
        var i = 0; //compteur pour les lignes unitaires du panier - supprimables (divSuppr)
        for (let item of furnituresToDisplay) {
            let qte = 0;
            if (distinctFurnitures.has(item.id)) {
                j++;
                let divPartDeCeProduitAuPanier = document.createElement("div");
                let currentDivPart='product_'+j;
                divPartDeCeProduitAuPanier.setAttribute('id',currentDivPart);
                divPartDeCeProduitAuPanier.setAttribute('class', 'product-line');

                //this.displayTotalProduit(divPartDeCeProduitAuPanier, item.id, j);

                let result= this.panier.quantiteOfAFurniture(item.id);
                qte = result.qte;
                let divResult = document.createElement("div");
                let currentResult='result_'+j;
                divResult.setAttribute('id', currentResult);
                divResult.setAttribute('class', 'resultLine');

                let divVignette = document.createElement('div');
                divVignette.setAttribute('class', 'divVignette');
                divVignette.innerHTML = `<a href='../products/produit.html?id=${item.id}'><img src='${item.imageUrl}' class='imgLine'></a>`;
                divResult.appendChild(divVignette);

                let divLignesTxt = document.createElement('div');
                divLignesTxt.setAttribute('class', 'lignesTxt');

                content = `<div class='lineTitle'>${item.name} Qté : ${qte} Prix unitaire : `+ this.convertToEuros(item.price) + ` Total : ` + this.convertToEuros(qte*item.price) +'</div>';
                montantTotal += qte*item.price;
                divLignesTxt.innerHTML = content;
                divResult.appendChild(divLignesTxt);
                divPartDeCeProduitAuPanier.appendChild(divResult);
                // affichage détaillé - unitaire
                for (let unite of furnituresToDisplayOptions) {
                    i++;
                    const divSuppr = document.createElement("div");
                    let currentDivId = 'divSuppr_'+i;
                    divSuppr.setAttribute('id', currentDivId);
                    divSuppr.setAttribute('class', 'product-line-detail');
                    if (unite.id === item.id) {

                        content = `1 ${unite.name}, vernis ${unite.varnish} &nbsp &nbsp`;
                        divSuppr.innerHTML = content;
                        const btnSuppr = document.createElement("button");
                        btnSuppr.setAttribute('class', 'btnSuppr');
                        btnSuppr.textContent = 'supprimer';

                        btnSuppr.addEventListener('click', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        montantTotal -= item.price;
                        this.panier.rmFurniture(unite);
                        let currentDivSuppr = document.getElementById(currentDivId);
                        //console.log(currentDivSuppr);
                        divLignesTxt.removeChild(currentDivSuppr);
                        if (divLignesTxt.childNodes.length > 1) {
                            //mettre à jour la ligne de synthèse

                            //console.log(divResult.childNodes);
                            let content = this.createResult(item);
                            divLignesTxt.firstChild.innerHTML = content;

                        } else {
                            divResult.parentNode.removeChild(divResult);
                        }
                        
                        this.displayMontantTotal();
                        this.hideContactForm();
                        }.bind(this));
                        
                        divSuppr.appendChild(btnSuppr);
                        //divResult.appendChild(divSuppr);
                        divLignesTxt.appendChild(divSuppr);
                        this.divOrder.appendChild(divPartDeCeProduitAuPanier);
                    }
                }
                distinctFurnitures.delete(item.id); // on supprime ce produit affiché de l'ensemble (le Set)
            }
        }
        //console.log(j);
        this.displayMontantTotal();
        //console.log(furnituresToDisplay);
        this.hideContactForm();

        // paramétrer les champs input du formulaire contact
        this.contact.inputSet('firstName');
        this.contact.inputSet('lastName');
        this.contact.inputSet('address');
        this.contact.inputSet('city');
        this.contact.inputSet('email');
    }

    /*displayPanier_save() {
        this.divOrder.innerHTML='';
        const furnituresToDisplay = this.panier.furnituresList();
        console.log(furnituresToDisplay);
        const furnituresToDisplayOptions = this.panier.furnituresList();
        var distinctFurnitures = new Set();
        var montantTotal = 0;
        var content = '';

        // création de l'ensemble d'Ids des produits distincts présents au panier
        for (let item of furnituresToDisplay) {
            if (!distinctFurnitures.has(item.id)) {
                distinctFurnitures.add(item.id);
            }
        }


        var j = 0 //compteur pour les lignes du panier calculées (divPartDeCeProduitAuPanier)
        var i = 0; //compteur pour les lignes du panier supprimables (divSuppr)
        for (let item of furnituresToDisplay) {
            let qte = 0;
            if (distinctFurnitures.has(item.id)) {
                j++;
                let divPartDeCeProduitAuPanier = document.createElement("div");
                let currentDivPart='product_'+j;
                divPartDeCeProduitAuPanier.setAttribute('id',currentDivPart);
                divPartDeCeProduitAuPanier.setAttribute('class', 'product-line');

                //this.displayTotalProduit(divPartDeCeProduitAuPanier, item.id, j);

                let result= this.panier.quantiteOfAFurniture(item.id);
                qte = result.qte;
                let divResult = document.createElement("div");
                let currentResult='result_'+j;
                divResult.setAttribute('id', currentResult);
                divResult.setAttribute('class', 'resultLine');
                content = `<img src='${item.imageUrl}' class='imgLine'> ${item.name}
                Qté : ${qte} prix unitaire : `+ this.convertToEuros(item.price) + `total : ` + this.convertToEuros(qte*item.price) +'<br>';
                montantTotal += qte*item.price;
                divResult.innerHTML = content;
                divPartDeCeProduitAuPanier.appendChild(divResult);
                // affichage détaillé
                for (let unite of furnituresToDisplayOptions) {
                    i++;
                    const divSuppr = document.createElement("div");
                    let currentDivId = 'divSuppr_'+i;
                    divSuppr.setAttribute('id', currentDivId);
                    divSuppr.setAttribute('class', 'product-line-detail');
                    if (unite.id === item.id) {

                        //content += `1 ${unite.name}, vernis ${unite.varnish} <br>`;
                        content = `1 ${unite.name}, vernis ${unite.varnish} &nbsp &nbsp`;
                        divSuppr.innerHTML = content;
                        const btnSuppr = document.createElement("button");
                        btnSuppr.setAttribute('class', 'btnSuppr');
                        btnSuppr.textContent = 'supprimer';
                        btnSuppr.addEventListener('click', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        montantTotal -= item.price;
                        this.panier.rmFurniture(unite);
                        let currentDivSuppr = document.getElementById(currentDivId);
                        console.log(currentDivSuppr);
                        divPartDeCeProduitAuPanier.removeChild(currentDivSuppr);
                        if (divPartDeCeProduitAuPanier.childNodes.length > 1) {
                            //mettre à jour 
                            console.log(divPartDeCeProduitAuPanier.childNodes);
                            let content = this.createResult(item);
                            divPartDeCeProduitAuPanier.firstChild.innerHTML = content;

                        } else {
                            divPartDeCeProduitAuPanier.parentNode.removeChild(divPartDeCeProduitAuPanier);
                        }
                        
                        this.displayMontantTotal();
                        this.hideContactForm();
                        }.bind(this));
                        
                        divSuppr.appendChild(btnSuppr);
                        //divResult.appendChild(divSuppr);
                        divPartDeCeProduitAuPanier.appendChild(divSuppr);
                        this.divOrder.appendChild(divPartDeCeProduitAuPanier);
                    }
                }
                distinctFurnitures.delete(item.id); // on supprime ce produit affiché de l'ensemble
                
            }
        }
        console.log(j);
        this.displayMontantTotal();
        console.log(furnituresToDisplay);
        this.hideContactForm();
    }*/
    
    hideContactForm() {
        let divForm = document.querySelector("#contact > form");
        //console.log(divForm);
        if (this.panier.arrayFurnitures.length === 0 && divForm !== null) {
            divForm.setAttribute('id','frmContactNone');
            this.contact.supprimerMessages();
        } else if (divForm !== null) {
            divForm.setAttribute('id','frmContact');
        }
        /* afficher message panier vide */
        if (divForm.getAttribute('id') === 'frmContactNone') {
            let divMessage = document.getElementById('divTotalPanier');
            divMessage.textContent= 'Le panier est vide';
        }
    }

    createResult(item) {
        let result = this.panier.quantiteOfAFurniture(item.id);
        let qte = result.qte;
        let content = `${item.name}
                Qté : ${qte} prix unitaire : ` + this.convertToEuros(item.price) + ` total : ` + this.convertToEuros(qte*item.price) +'<br>';
        return content;
    }

    displayMontantTotal() {
        let montantTotal = this.panier.calculMontantTotal();
        
        if (montantTotal !== 0) {
        this.divTotalPanier.innerHTML = 
            '<span>Montant à régler : ' + this.convertToEuros(montantTotal) + ' </span><br><br>' +
            '<button onclick="display.viderPanier()" class="btnVider">Vider le panier</button>';
        }
        else {
            this.divTotalPanier.innerHTML = '';
        }

    }

    viderPanier() {
        this.contact.supprimerMessages();
        this.panier.viderPanier();
        this.displayPanier();
    }

    viderStoragePanier() {
        this.panier.viderPanier();
    }

    order() {
        let client = this.contact.verifyContact();
        var products = [];
        var objContact = {};
        if (client) {
            objContact = this.contact.formatContact();
            //console.log(objContact);
        }
        //console.log(client);
        //console.log(objContact);
        if (client) {
        products = this.panier.prepareFurnituresOrder();
        //console.log(products);
        }
        
        let order = {
            "contact": objContact,
            "products": products
        }
        //console.log(order);
        this.displayOrder(order);
    }

    async displayOrder(order) {
        try {
            let apiUrl = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' )? "http://localhost:3000/api/furniture/order": "https://bckend.herokuapp.com/api/furniture/order";
            //console.log(apiUrl);
            var ordered = await Ajax.post(apiUrl, order);
        }  
        catch(e) {
            //console.log('dans display : ' +e);
            //this.divDetailMeuble.innerHTML = alert('Le site rencontre un problème. Veuillez nous excuser de la gène occasionnée');
            window.location.href = '../warning.html';
            return;
        }
        //console.log(ordered);

        //ajouter la date avant d'enregistrer la commande
        let today = new Date();
        let nousSommesLe = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        //console.log('nous sommes le : '+nousSommesLe);
        ordered.date = nousSommesLe;

        let resumeDeCommande = this.resume();
        ordered.resume = resumeDeCommande;

        let commande = new Order();
        commande.createOrdersArray(); 
        commande.appendOrder(ordered);
        document.location.href="./confirmation.html";   
    }

    resume() {

        const furnituresToDisplay = this.panier.furnituresList();
        const furnituresToDisplayOptions = this.panier.furnituresList();
        var distinctFurnitures = new Set();
        var montantTotal = 0;
        var content = "";

        for (let item of furnituresToDisplay) {
            if (!distinctFurnitures.has(item.id)) {
                distinctFurnitures.add(item.id);
            }
        }

        for (let item of furnituresToDisplay) {
            let qte = 0;
            if (distinctFurnitures.has(item.id)) {
                let result= this.panier.quantiteOfAFurniture(item.id);
                qte = result.qte;
                content += `<div class='wrapper'><div class='vignette'><img src='${item.imageUrl}' class='imgVignette'></div><div><strong> ${item.name}
                Qté : ${qte} prix unitaire : ` + this.convertToEuros(item.price) +` total : ` + this.convertToEuros(qte*item.price) +'</strong><br>';
                montantTotal += qte*item.price;
                // affichage détaillé
                for (let unite of furnituresToDisplayOptions) {
                    if (unite.id === item.id) {
                        content += `1 ${unite.name}, vernis ${unite.varnish} <br>`;
                    }
                }
                content +='</div></div><br><br>'
                distinctFurnitures.delete(item.id);
            }
        }
        if (content !== '') {
            content += '<strong>Montant à régler : ' + this.convertToEuros(montantTotal) + '<br><br>';
        }

        return content;
    }

    displayConfirmation() {
        let confirmation = new Order();
        confirmation.createOrdersArray();
        let lastOrder = confirmation.returnArrayOrdersLastRecord();
        //console.log(lastOrder);
        const divConfirmation = document.getElementById("divConfirmation");

        let enTete = `<h4>Confirmation de la commande n°: <span class='font-weight-bold'> ${lastOrder.orderId}</span> du ${lastOrder.date.substr(0,11)}</h4><br>`;
        enTete += `<span class='font-weight-bold'>${lastOrder.contact.firstName}`;
        enTete += ` ${lastOrder.contact.lastName} </span><br>`;
        enTete += ` ${lastOrder.contact.address} <br>`;
        enTete += ` ${lastOrder.contact.city} <br><br>`;
        divConfirmation.innerHTML = enTete;

        const divResume = document.getElementById("divResume");

        let content = `${lastOrder.resume}`;

        divResume.innerHTML = content;
        this.viderStoragePanier();

    }

    convertToEuros(centimes) {
        return(new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(centimes/100));
    }

    displayHistorique() {
        let orderHistory = Order.returnOrdersTable();
        console.log(orderHistory);
        var content = '';
        if (orderHistory) {
            for (let order of orderHistory) {
                content += `<h4 class='font-size-xlarge'><u>Commande n° <strong><a href='#'> ${order.orderId}</a></strong> du ${order.date}</u></h4><br>`;
                content += order.resume;
            }
        } else { 
            content = 'Aucune commande enregistrée';
        }
        let divOrders = document.getElementById('divOrders');
        divOrders.innerHTML = content;
    }

  }

  

 