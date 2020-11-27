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
}
