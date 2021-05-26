"use strict";
var aufgabe3_1;
(function (aufgabe3_1) {
    let formData = new FormData(document.forms[0]);
    document.getElementById("button").addEventListener("click", getData);
    async function getData() {
        let kData = { vorname: formData.get("Vname").toString(),
            nachname: formData.get("Nachname").toString(),
            geschlecht: formData.get("gschlecht").toString(),
            gburtsDatum: new Date(formData.get("gburtsdatum").toString()),
            kreditkartenNummer: Number(formData.get("creditN")),
            pin: formData.get("creditN").toString()
        };
        let url = "https://jochems-gis-server.herokuapp.com/";
        let query = new URLSearchParams(kData);
        url = url + "?" + query.toString();
        console.log(url);
        // await fetch(url);
        for (let entry of formData) {
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        }
    }
})(aufgabe3_1 || (aufgabe3_1 = {}));
//# sourceMappingURL=script.js.map