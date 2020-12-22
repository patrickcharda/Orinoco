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
        //let listeMeubles = await Ajax.get("http://localhost:3000/api/furniture/");

        try {
            var listeMeubles = await Ajax.get("http://localhost:3000/api/furniture/");
        }
        catch(e) {
            console.log('dans display : ' +e);
            //this.divDetailMeuble.innerHTML = alert('Le site rencontre un problème. Veuillez nous excuser de la gène occasionnée');
            window.location.href = '../warning.html';
            return;
        }

        console.log(this.panier.arrayFurnitures);

        var moduloZeroOuUn = 0;
        if (listeMeubles.length % 2 === 1) {
            moduloZeroOuUn = 1;
        }
        console.log('zeroOuUn : '+moduloZeroOuUn)
        
        // créer les div de rows : 1 row pour 2 cols (= 2 cards, = 2 meubles)
        var nombreDeDivsRow = 0;
        for (let rowsCount = listeMeubles.length; rowsCount > 0; rowsCount--) {
            if (rowsCount % 2 === moduloZeroOuUn) {
                let divRow = document.createElement("div");
                divRow.setAttribute('id', 'divRow'+rowsCount);
                divRow.setAttribute('class', 'divRow text-center mb-md-5');
                this.divMeubles.appendChild(divRow);
                nombreDeDivsRow ++;
            }
        }

        console.log(nombreDeDivsRow);

        var rowsCount = listeMeubles.length;
        console.log(rowsCount);

        var row = this.divMeubles.querySelector('#divRow'+rowsCount);
        

        for (let meuble of listeMeubles) {
            
            if (rowsCount % 2 === moduloZeroOuUn) {
                row = this.divMeubles.querySelector('#divRow'+rowsCount);
            }
            console.log(row);
            const item = document.createElement("div");
            item.setAttribute("class", "divMeuble col-12 col-md-6");

            const card = document.createElement("div");
            card.setAttribute('class','card mx-auto');
            item.appendChild(card);

            const divDescMeuble = document.createElement("div");
            divDescMeuble.setAttribute("class", "card-body");
            divDescMeuble.innerHTML = "<h3 class='card-title'>" + meuble.name + ' </h3><p class="card-text"> ' + meuble.description + '</p><strong>'  + this.convertToEuros(meuble.price) + '</strong>';
        
            //item.innerHTML = meuble._id + ' , ' + meuble.name + ' , ' + this.convertToEuros(meuble.price) + '<br>' + meuble.description + '<br><br>';


            const divImgMeuble = document.createElement("div");
            divImgMeuble.setAttribute("class","divImgMeuble card-img-top");
            //divImgMeuble.setAttribute("class","card");
        
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
            //this.divMeubles.appendChild(item);

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
        console.log(furniture);
        this.arrayPanierMeubles.push(furniture);
        
        this.panier.appendFurniture(furniture);
        console.log(this.panier.arrayFurnitures);

        this.afficherQteInCart(id);
        this.divMiniPanier.innerHTML= '';
        this.afficheMiniPanier(id, meuble);
    }

    retirerMeuble(id, meuble) {
        //localStorage.setItem("product",id);
        //alert("test");
        console.log(this.panier.arrayFurnitures.length);
        //this.panier.removeFurniture(id);
        this.panier.rmFurniture(meuble);
        console.log(this.panier.arrayFurnitures.length);
        this.afficherQteInCart(id);
        //setTimeout(function(){this.afficheMiniPanier(id, meuble)}.bind(this),2000);
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

        console.log(this.panier.arrayFurnitures);
        //let detailMeuble = await Ajax.get("http://localhost:3000/api/furniture/"+id);

        try {
            var detailMeuble = await Ajax.get("http://localhost:3000/api/furniture/"+id);
        }
        catch(e) {
            console.log('dans display : ' +e);
            //this.divDetailMeuble.innerHTML = alert('Le site rencontre un problème. Veuillez nous excuser de la gène occasionnée');
            window.location.href = '../warning.html';
            return;
        }
        
        /* code exemple ok :
        let detailMeuble = await Ajax.get("http://localhost:3000/api/furniture/"+id).catch(
            (e) => console.log('dans display : ' +e)
        );
        */

        console.log(detailMeuble);
        var item = document.createElement("div");
        item.setAttribute("class", "divMeuble row");

        const divTxtMeuble = document.createElement('div');
        divTxtMeuble.setAttribute('class', "divTxtMeuble text-center col-12");

        divTxtMeuble.innerHTML = '<h3 class="card-title text-center col-12">' +detailMeuble.name + '</h3><strong>' + this.convertToEuros(detailMeuble.price) + '</strong><br><br><p class="card-text mb-3">' + detailMeuble.description + '</p>';
        
        const divImgMeuble = document.createElement("div");
        divImgMeuble.setAttribute("class","divImgMeuble2 text-center col-12");
        
        const lienImg = document.createElement("a");
        lienImg.setAttribute("href", "./produit.html?id="+detailMeuble._id);
        lienImg.setAttribute("class","lienImg");
    
        const fitImg = document.createElement("img");
        fitImg.setAttribute("src", detailMeuble.imageUrl);
        fitImg.setAttribute("class","fitImg");
        
        divImgMeuble.appendChild(lienImg);
        divImgMeuble.appendChild(fitImg);
        
        item.appendChild(divImgMeuble);
        item.appendChild(divTxtMeuble);
        //this.divDetailMeuble.appendChild(item);

        // afficher les vernis
        if (detailMeuble.varnish.length > 0) {
            var divOptions = document.createElement('div');
            divOptions.setAttribute('class', 'text-center col-12');
            
            const divMeubleOptions = document.createElement("select");
            divMeubleOptions.setAttribute("id","meubleOptions");
            divMeubleOptions.setAttribute("name","meubleOptions");
            divMeubleOptions.setAttribute("class","divOptions text-center col-12");
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
            //this.divDetailMeuble.appendChild(divMeubleOptions);  
            divOptions.appendChild(divMeubleOptions);
            item.appendChild(divOptions);
        }
        /*const br = document.createElement('div');
        br.innerHTML='<p></p>';
        item.appendChild(br);*/
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

        //si ce meuble est déjà au panier on affiche combien d'article sont présents au panier
        /*let qteInCart = this.panier.quantiteOfAFurniture(detailMeuble._id);
        if (qteInCart.qte > 0) {
            const divQteInCart = document.createElement("div");
            divQteInCart.textContent = (qteInCart.qte == 1) ? `${qteInCart.qte} unité de ce meuble déjà au panier` : `${qteInCart.qte} unités de ce meuble au panier`;
            btnAjout.insertAdjacentElement('afterend',divQteInCart);
        }*/
         
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
        //spanQte.textContent=0;
        divAdd.appendChild(spanQte);

        //si ce meuble est déjà au panier on affiche combien d'article sont présents au panier
        let qteInCart = this.panier.quantiteOfAFurniture(detailMeuble._id);
        if (qteInCart.qte > 0) {
            /*const divQteInCart = document.createElement("div");
            divQteInCart.textContent = (qteInCart.qte == 1) ? `${qteInCart.qte} unité de ce meuble déjà au panier` : `${qteInCart.qte} unités de ce meuble au panier`;
            btnAjout.insertAdjacentElement('afterend',divQteInCart);*/
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

        let ceMeuble = meuble;
        const furnitureToDisplay = this.panier.furnitureList(id);
        console.log(furnitureToDisplay);
        /*const divTmp = document.createElement("div");
        divTmp.setAttribute("id", 'divTmp');
        divTmp.textContent = JSON.stringify(furnitureToDisplay); 
        this.divMiniPanier.appendChild(divTmp);*/
        
        if (furnitureToDisplay !== false) {
            let i=0;
            for (let item of furnitureToDisplay) {
                i++;
                let content = '<div>' + ceMeuble.name +
                ' ' + item.varnish + ', ' + this.convertToEuros(ceMeuble.price) + '&#9;</div>';
                console.log(content);
                const divSuppr = document.createElement("div");
                let currentDivId = 'divSuppr_'+i;
                let spanSte = document.getElementById('spanQte');
                divSuppr.setAttribute('id',currentDivId);
                divSuppr.setAttribute('class', 'col-12 text-justify');
                divSuppr.innerHTML= content;
                const btnSuppr = document.createElement("button");
                btnSuppr.textContent = 'supprimer';
                btnSuppr.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.panier.rmFurniture(item);
                    let currentDivSuppr = document.getElementById(currentDivId);
                    console.log(currentDivSuppr);
                    this.divMiniPanier.removeChild(currentDivSuppr);
                    spanQte.textContent -= 1;
                    //this.divMiniPanier.innerHTML = '';
                    //this.afficheMiniPanier(id, ceMeuble);
                }.bind(this));
                divSuppr.appendChild(btnSuppr);
                this.divMiniPanier.appendChild(divSuppr);
                //document.body.append(this.divMiniPanier);
                
                /*content = content + meuble.name +
                ' ' + item.varnish + ', ' + meuble.price +' € <br>';*/
            }
        //this.divMiniPanier.innerHTML = content;
        }      
    }

    displayPanier() {
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

                //this.displayTotalProduit(divPartDeCeProduitAuPanier, item.id, j);

                let result= this.panier.quantiteOfAFurniture(item.id);
                qte = result.qte;
                let divResult = document.createElement("div");
                let currentResult='result_'+j;
                divResult.setAttribute('id', currentResult);
                content = `<img src='${item.imageUrl}' width='60px' height='70px'> ${item.name}
                Qté : ${qte} prix unitaire : `+ this.convertToEuros(item.price) + ` total : ` + this.convertToEuros(qte*item.price) +'<br>';
                montantTotal += qte*item.price;
                divResult.innerHTML = content;
                divPartDeCeProduitAuPanier.appendChild(divResult);
                // affichage détaillé
                for (let unite of furnituresToDisplayOptions) {
                    i++;
                    const divSuppr = document.createElement("div");
                    let currentDivId = 'divSuppr_'+i;
                    divSuppr.setAttribute('id', currentDivId);
                    if (unite.id === item.id) {

                        //content += `1 ${unite.name}, vernis ${unite.varnish} <br>`;
                        content = `1 ${unite.name}, vernis ${unite.varnish}`;
                        divSuppr.innerHTML = content;
    
                        const btnSuppr = document.createElement("button");
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
    }

    hideContactForm() {
        let divForm = document.querySelector("#contact > form");
        console.log(divForm);
        if (this.panier.arrayFurnitures.length === 0 && divForm !== null) {
            divForm.setAttribute('id','frmContactNone');
        } else if (divForm !== null) {
            divForm.setAttribute('id','frmContact');
        }
    
        // afficher message panier vide
        if (divForm.getAttribute('id') === 'frmContactNone') {
            let divMessage = document.getElementById('divTotalPanier');
            divMessage.textContent= 'Le panier est vide';
        }


        /*if (this.divOrder.textContent === '') {
            let divContact = document.getElementById('contact');
            console.log(divContact.firstChild.nextSibling);
            let divForm = document.querySelector("#contact > form");
            console.log(divForm);
            divContact.removeChild(divForm);
        }*/
    }

    createResult(item) {
        let result = this.panier.quantiteOfAFurniture(item.id);
        let qte = result.qte;
        let content = `<img src='${item.imageUrl}' width='60px' height='70px'> ${item.name}
                Qté : ${qte} prix unitaire : ` + this.convertToEuros(item.price) + ` total : ` + this.convertToEuros(qte*item.price) +'<br>';
        return content;
    }

    displayMontantTotal() {
        let montantTotal = this.panier.calculMontantTotal();
        
        if (montantTotal !== 0) {
        this.divTotalPanier.innerHTML = 
            '<span>Montant à régler : ' + this.convertToEuros(montantTotal) + ' € </span><br>' +
            '<button onclick="display.viderPanier()">Vider le panier</button>';
        }
        else {
            this.divTotalPanier.innerHTML = '';
        }

    }

    viderPanier() {
        this.panier.viderPanier();
        this.displayPanier();
    }

    order() {
        let client = this.contact.verifyContact();
        var products = [];
        var objContact = {};
        if (client) {
            objContact = this.contact.formatContact();
            console.log(objContact);
        }
        console.log(client);
        console.log(objContact);
        if (client) {
        products = this.panier.prepareFurnituresOrder();
        console.log(products);
        }
        
        let order = {
            "contact": objContact,
            "products": products
        }
        console.log(order);
        this.displayOrder(order);
    }

    async displayOrder(order) {
        try {
        var ordered = await Ajax.post("http://localhost:3000/api/furniture/order", order);
        }  
        catch(e) {
            console.log('dans display : ' +e);
            //this.divDetailMeuble.innerHTML = alert('Le site rencontre un problème. Veuillez nous excuser de la gène occasionnée');
            window.location.href = '../warning.html';
            return;
        }
        console.log(ordered);
        //ajouter la date avant d'enregistrer la commande
        let today = new Date();
        let nousSommesLe = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        console.log('nous sommes le : '+nousSommesLe);
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
        var content = '';

        for (let item of furnituresToDisplay) {
            if (!distinctFurnitures.has(item.id)) {
                distinctFurnitures.add(item.id);
            }
        }

        //var arrayDistinctFurnitures = Array.from(distinctFurnitures);

        for (let item of furnituresToDisplay) {
            let qte = 0;
            if (distinctFurnitures.has(item.id)) {
                let result= this.panier.quantiteOfAFurniture(item.id);
                qte = result.qte;
                content += `<img src='${item.imageUrl}' width='60px' height='70px'> ${item.name}
                Qté : ${qte} prix unitaire : ` + this.convertToEuros(item.price) +` total : ` + this.convertToEuros(qte*item.price) +'<br>';
                montantTotal += qte*item.price;
                // affichage détaillé
                for (let unite of furnituresToDisplayOptions) {
                    if (unite.id === item.id) {
                        content += `1 ${unite.name}, vernis ${unite.varnish} <br>`;
                    }
                }
                distinctFurnitures.delete(item.id);
            }
        }
        if (content !== '') {
            content += 'Montant à régler : ' + this.convertToEuros(montantTotal) + '<br>';
        }

        return content;
    }

    displayConfirmation() {
        let confirmation = new Order();
        confirmation.createOrdersArray();
        let lastOrder = confirmation.returnArrayOrdersLastRecord();
        console.log(lastOrder);
        const divConfirmation = document.getElementById("divConfirmation");

        let enTete = `<br>Confirmation de la commande n°: ${lastOrder.orderId} du ${lastOrder.date.substr(0,11)}<br><br>`;
        enTete += `${lastOrder.contact.firstName}`;
        enTete += ` ${lastOrder.contact.lastName} <br>`;
        enTete += ` ${lastOrder.contact.address} <br>`;
        enTete += ` ${lastOrder.contact.city} <br>`;
        divConfirmation.innerHTML = enTete;

        const divResume = document.getElementById("divResume");

        let content = `${lastOrder.resume}`;

        divResume.innerHTML = content;
        this.viderPanier();

    }

    convertToEuros(centimes) {
        //console.log(centimes/100.00);
        //return (centimes/100.00);
        return(new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(centimes/100));
    }

  }

 