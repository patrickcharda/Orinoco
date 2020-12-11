class Ajax {

    static get(url) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    //console.log(response);
                    resolve(response);
                } else if (this.readyState == XMLHttpRequest.DONE && this.status == 0) {
                    //console.log(this.status);
                    //console.log('requete order hs');
                    reject('KO');
                }
            };
            request.open("GET", url);
            request.send();
        });
    }

    static post(url, order) {
        //console.log(url);
        //console.log(params[0]);
        //console.log(params[1]);
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && (this.status == 200 || this.status == 201)) {
                    var response = JSON.parse(this.responseText);
                    //alert('echo');
                    console.log(response);
                    resolve(response);
                } else if (this.readyState == XMLHttpRequest.DONE && this.status == 0) {
                    //console.log(this.status);
                    //console.log('requete order hs');
                    reject('KO');
                }
            };
            //console.log(params[0] + ' param0');
            console.log(order);
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(order));
        });
    }
}
