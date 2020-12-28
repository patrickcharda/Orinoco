class Contact {
    constructor() {

    }

    firstNameOk() {
        let prenom = document.getElementById("firstName");
        console.log(prenom.value);
        let prenomRegex = /^[éèêôâïöA-Za-z- ]{2,24}$/i;
        if (prenomRegex.test(prenom.value)) {
            return true;
        } else {
            console.log('OUPS prenom');
        }
    }
    lastNameOk() {
        let nom = document.getElementById("lastName");
        let nomRegex = /^[éèêôâïöA-Za-z- ]{2,24}$/i;
        if (nomRegex.test(nom.value)) {
            return true;
        } else {
            console.log('OUPS nom');
        }
    }
    addressOk() {
        let adresse = document.getElementById("address");
        let addressRegex = /^[éèêôâïöA-Za-z0-9-,./ ]{2,49}$/;
        if (addressRegex.test(adresse.value)) {
            return true;
        } else {
            console.log('OUPS adresse');
        }
    }
    cityOk() {
        let ville = document.getElementById("city");
        let villeRegex = /^[éèêôâïöA-Za-z-0-9/ ]{2,49}$/i;
        if (villeRegex.test(ville.value)) {
            return true;
        } else {
            console.log('OUPS ville');
        }
    }
    mailOk() {
        let mail = document.getElementById("email");
        let mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
        if (mailRegex.test(mail.value)) {
            return true;
        } else {
            console.log('OUPS mail');
        }
    }

    verifyContact() {
        let p = this.firstNameOk();
        let n = this.lastNameOk();
        let a = this.addressOk();
        let c = this.cityOk();
        let m = this.mailOk();
        if (p && n && a && c && m) {
            return true;
        } else {
            let divFormIsNotOk = document.getElementById('formIsNotOk');
            let inputsNotOk ='';
            if (!p) {
                inputsNotOk +='<p>Le champ prénom est obligatoire. Il ne peut comporter que des caractères alphabétiques, des tirets, et des espaces. </p>';
            }
            if (!n) {
                inputsNotOk +='<p>Le champ nom est obligatoire. Il ne peut comporter que des caractères alphabétiques, des tirets, et des espaces.</p>';
            }
            if (!a) {
                inputsNotOk +='<p>Le champ adresse est obligatoire. </p>';
            }
            if (!c) {
                inputsNotOk +='<p>Le champ ville est obligatoire. Il ne peut comporter que des caractères alphabétiques, des tirets, et des espaces. </p>';
            }
            if (!m) {
                inputsNotOk +='<p>Le champ email est obligatoire. Il doit correspondre à une adresse de messagerie correctement écrite.</p>';
            }
            divFormIsNotOk.innerHTML = inputsNotOk;
        }
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

    supprimerMessages() {
        const divMessages = document.querySelector('#formIsNotOk');
        divMessages.innerHTML='';
    }

}