"use strict";
var aufgabe3_1;
(function (aufgabe3_1) {
    let formData = new FormData(document.forms[0]);
    document.getElementById("button").addEventListener("click", getData);
    function getData() {
        for (let entry of formData) {
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        }
    }
})(aufgabe3_1 || (aufgabe3_1 = {}));
//# sourceMappingURL=script.js.map