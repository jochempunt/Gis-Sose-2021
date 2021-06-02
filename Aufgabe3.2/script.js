"use strict";
var aufgabe3_2;
(function (aufgabe3_2) {
    document.getElementById("button").addEventListener("click", getData);
    document.getElementById("button2").addEventListener("click", getData);
    async function getData(e) {
        let formData = new FormData(document.forms[0]);
        let button = e.target;
        for (let entry of formData) {
            if (entry[1] == "") {
                alert(entry[0] + " ist leer, bitte füllen sie das feld aus...");
                return;
            }
        }
        if (formData.get("gschlecht") != null) {
            let kData = { vorname: formData.get("Vname").toString(),
                nachname: formData.get("Nachname").toString(),
                geschlecht: formData.get("gschlecht").toString(),
                gburtsDatum: formData.get("gburtsdatum").toString(),
                kreditkartenNummer: formData.get("creditN").toString(),
                pin: formData.get("ccpin").toString()
            };
            let url = "http://localhost:8100";
            if (button.id == "button") {
                url += "/JSON";
            }
            else if (button.id == "button2") {
                url += "/html";
                console.log("hallo");
            }
            let query = new URLSearchParams(kData);
            url = url + "?" + query.toString();
            //console.log(url);
            let resp = await fetch(url);
            if (button.id == "button") {
                let antwort = await resp.json();
                console.log(kData);
                console.log(antwort);
            }
            else if (button.id == "button2") {
                let anzeige = document.getElementById("anzeige");
                let antwort = await resp.text();
                anzeige.innerHTML = antwort;
            }
        }
        else {
            alert("Sie haben kein Geschlecht ausgewählt");
        }
    }
})(aufgabe3_2 || (aufgabe3_2 = {}));
//# sourceMappingURL=script.js.map