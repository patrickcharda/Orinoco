class Panier {
    constructor() {
        this.arrayFurnitures = [];
        this.arrayCameras = [];
        this.arrayTeddies = [];
        //this.arrayProducts = [];
        //localStorage.removeItem('furnitures');
    }

    createFurnituresArray() {
        var furnitures = localStorage.getItem("furnitures");
        console.log(furnitures);
        if (furnitures === null) {
            //localStorage.setItem('furnitures',JSON.stringify(this.arrayFurnitures));
            //console.log(JSON.parse(localStorage.getItem('furnitures')));
            console.log('panier vide');
        } else {
            console.log(furnitures);
            //localStorage.setItem('furnitures','police');
            this.arrayFurnitures = JSON.parse(furnitures);
            //this.arrayFurnitures.push(localStorage.getItem("furnitures"));
            console.log(this.arrayFurnitures);
        } 
    } 

    appendFurniture(furniture) {
        this.arrayFurnitures.push(furniture);
        console.log(this.arrayFurnitures);
        localStorage.removeItem('furnitures');
        localStorage.setItem('furnitures', JSON.stringify(this.arrayFurnitures));
        console.log(`meubles : ${this.arrayFurnitures}`);
        console.log(JSON.parse(localStorage.getItem('furnitures')));
    }

    removeFurniture(id) {
        //var idf = id;
        console.log(id);
        //console.log(idf);
        //rechercher le meuble dans le panier
       if (this.arrayFurnitures.length > 0) {
           /*this.arrayFurnitures.pop();
           localStorage.removeItem('furnitures');
           localStorage.setItem('furnitures', JSON.stringify(this.arrayFurnitures));
           console.log('ok');*/
           
           const meubleIndex = this.arrayFurnitures.findIndex(meuble => meuble.id == id);
           console.log(`meubleIndex : ${meubleIndex}`);
           console.log(this.arrayFurnitures[meubleIndex]);
           let deleted = this.arrayFurnitures.splice(meubleIndex,1);
           console.log(deleted);
           localStorage.removeItem('furnitures');
           localStorage.setItem('furnitures', JSON.stringify(this.arrayFurnitures));
           
       }
       console.log('ok');
       console.log(localStorage.getItem('furnitures'));
       console.log(this.arrayFurnitures);
    }

    rmFurniture(meuble){
        console.log(meuble);
        if (this.arrayFurnitures.length > 0) {
            console.log('ça passe là');
            /*this.arrayFurnitures.pop();
            localStorage.removeItem('furnitures');
            localStorage.setItem('furnitures', JSON.stringify(this.arrayFurnitures));
            console.log('ok');*/
            
            const meubleIndex = this.arrayFurnitures.findIndex(furniture => 
            furniture.id == meuble.id && furniture.varnish == meuble.varnish);
            console.log(`meubleIndex : ${meubleIndex}`);
            console.log(this.arrayFurnitures[meubleIndex]);
            
            let deleted = this.arrayFurnitures.splice(meubleIndex,1); //supprime le 1er de la liste
            console.log(deleted);
            localStorage.removeItem('furnitures');
            localStorage.setItem('furnitures', JSON.stringify(this.arrayFurnitures));    
        }
    }

    viderPanier() {
        this.arrayFurnitures = [];
        localStorage.removeItem('furnitures');
        this.arrayCameras = [];
        localStorage.removeItem('cameras');
        this.arrayTeddies = [];
        localStorage.removeItem('teddies');
        console.log('ok');
    }

    inPanier(id) {
        let qte= 0;
        for (let furniture of this.arrayFurnitures) {
            console.log(furniture.id);
            if (furniture.id == id) {
                qte ++;
            }
        }
        if (qte > 0) {
            return true;
        }
        return false;
    }

    furnitureList(id) {
        if (this.inPanier(id)) {
            const furnitureArrayList =[];
            for (let furniture of this.arrayFurnitures) {
                if (furniture.id == id) {
                    furnitureArrayList.push(furniture);
                }
            }
            return furnitureArrayList;
        } else { return false;}
    }

    furnituresList() {
        console.log(this.arrayFurnitures);
        return this.arrayFurnitures;
    }

    quantiteOfAFurniture(id) {
        let qte= 0;
        const foundInCart = [];
        for (let furniture of this.arrayFurnitures) {
            console.log(furniture.id);
            if (furniture.id == id) {
                qte ++;
                foundInCart.push(furniture);
            }
        }
        const furnitureInCart = {
            'qte': qte,
            'foundInCart': foundInCart
        }
        return furnitureInCart;
    }

    prepareFurnituresOrder() {
        const listOfFurnituresIds = [];
        for (let furniture of this.arrayFurnitures) {
            console.log(furniture.id);
            listOfFurnituresIds.push(furniture.id);
        }
        return listOfFurnituresIds;
    }
}