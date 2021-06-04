"use strict";
// über localhost -- -- -- -- -- -- -- -- -- -- -- --- -- -- -
var aufgabe3_1;
(function (aufgabe3_1) {
    document.getElementById("button").addEventListener("click", getData);
    async function getData() {
        let formData = new FormData(document.forms[0]);
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
                pin: formData.get("creditN").toString()
            };
            let url = "http://localhost:8100/";
            let query = new URLSearchParams(kData);
            url = url + "?" + query.toString();
            console.log(url);
            let resp = await fetch(url);
            let antwort = await resp.json();
            console.log(antwort);
        }
        else {
            alert("Sie haben kein Geschlecht ausgewählt");
        }
    }
})(aufgabe3_1 || (aufgabe3_1 = {}));
//# sourceMappingURL=script.js.map