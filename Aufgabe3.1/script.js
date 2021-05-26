"use strict";
var aufgabe3_1;
(function (aufgabe3_1) {
    let formData = new FormData(document.forms[0]);
    document.getElementById("button").addEventListener("click", getData);
    async function datenEinlesen(_url) {
        let response = await fetch(_url);
        console.log("jetz response da");
        console.log(await response.text());
    }
    datenEinlesen("https://jochems-gis-server.herokuapp.com");
    function getData() {
        for (let entry of formData) {
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        }
    }
})(aufgabe3_1 || (aufgabe3_1 = {}));
//# sourceMappingURL=script.js.map