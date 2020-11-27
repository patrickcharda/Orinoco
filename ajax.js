class Ajax {

    static get(url) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    //console.log(response);
                    resolve(response);
                }
            };
            request.open("GET", url);
            request.send();
        });
    }

    static post(url, params) {
        console.log(url);
        console.log(params[0]);
        console.log(params[1]);
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    //alert('echo');
                    //console.log(response);
                    resolve(response);
                }
            };
            console.log(params[0] + ' param0');
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(params[0],params[1]);
        });
    }
}
