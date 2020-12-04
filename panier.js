class Panier {
    constructor() {
        this.arrayFurnitures = [];
        this.arrayCameras = [];
        this.arrayTeddies = [];
        //this.arrayProducts = [];
        //sessionStorage.removeItem('furnitures');
    }

    createFurnituresArray() {
        var furnitures = sessionStorage.getItem("furnitures");
        console.log(furnitures);
        if (furnitures === null) {
            //sessionStorage.setItem('furnitures',JSON.stringify(this.arrayFurnitures));
            //console.log(JSON.parse(sessionStorage.getItem('furnitures')));
            console.log('panier vide');
        } else {
            console.log(furnitures);
            //sessionStorage.setItem('furnitures','police');
            this.arrayFurnitures = JSON.parse(furnitures);
            //this.arrayFurnitures.push(sessionStorage.getItem("furnitures"));
            console.log(this.arrayFurnitures);
        } 
    } 

    appendFurniture(furniture) {
        this.arrayFurnitures.push(furniture);
        console.log(this.arrayFurnitures);
        sessionStorage.removeItem('furnitures');
        sessionStorage.setItem('furnitures', JSON.stringify(this.arrayFurnitures));
        console.log(`meubles : ${this.arrayFurnitures}`);
        console.log(JSON.parse(sessionStorage.getItem('furnitures')));
    }

    quantiteOfAFurniture(id) {
        let qte= 0;
        for (let furniture of this.arrayFurnitures) {
            console.log(furniture.id);
            if (furniture.id == id) {
                qte ++;
            }
        }
        return qte;
    }

    removeFurniture(furniture) {
        //
    }

}