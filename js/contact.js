class Contact {
    constructor() {

    }

    firstNameOk() {
        let prenom = document.getElementById("firstName");
        return true;
    }
    lastNameOk() {
        let nom = document.getElementById("lastName");
        return true;
    }
    addressOk() {
        let adresse = document.getElementById("address")
        return true;
    }
    cityOk() {
        let ville = document.getElementById("city");
        return true;
    }
    mailOk() {
        let mail = document.getElementById("email");
        return true;
    }

    verifyContact() {
        let p = this.firstNameOk();
        let n = this.lastNameOk();
        let a = this.addressOk();
        let c = this.cityOk();
        let m = this.mailOk();
        if (p && n && a && c && m) {
            return true;
        } else { return false;}
    }

    formatContact() {
        let objContact = {
            "firstName": document.getElementById("firstName").value,
            "lastName": document.getElementById("lastName").value,
            "address": document.getElementById("address").value,
            "city": document.getElementById("city").value,
            "email": document.getElementById("email").value
        }
        return (objContact);
    }

}