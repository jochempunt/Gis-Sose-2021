"use strict";
var aufgabe3_4;
(function (aufgabe3_4) {
    let button = document.getElementById("bestaetigen");
    let getButton = document.getElementById("getData");
    button.addEventListener("click", sendDataDb);
    getButton.addEventListener("click", updateList);
    async function sendDataDb(_event) {
        console.log("hallo");
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            if (entry[1] == "") {
                alert(entry[0] + " enthält einen falschen wert, bitte füllen sie das erneut feld aus...");
                return;
            }
        }
        let studentSt = { name: formData.get("Vname").toString(), firstname: formData.get("Nachname").toString(), registration: Number(formData.get("MatrikelNummer").toString()), _id: undefined };
        let url = "https://jochems-gis-server.herokuapp.com/insert";
        let query = new URLSearchParams(studentSt);
        url = url + "?" + query.toString();
        console.log(url);
        await fetch(url);
    }
    async function deleteData(_event) {
        let url = "https://jochems-gis-server.herokuapp.com/delete";
        let clickedB = _event.target;
        let id = clickedB.dataset.id;
        let deleteData = "_id=" + id;
        //let query: URLSearchParams = new URLSearchParams(deleteData);
        url = url + "?" + deleteData;
        await fetch(url);
        console.log("deleted student: " + id);
        updateList();
    }
    async function updateList() {
        let url = "https://jochems-gis-server.herokuapp.com/refresh";
        let resp = await fetch(url);
        let studListe = document.getElementById("studentenListe");
        let antwort = await resp.json();
        studListe.innerHTML = "";
        for (let student1 of antwort) {
            let divS = document.createElement("div");
            divS.className = "student";
            let pName = document.createElement("p");
            pName.innerText = student1.name;
            let pFirstName = document.createElement("p");
            pFirstName.innerText = student1.firstname;
            let pRegistration = document.createElement("p");
            pRegistration.innerText = student1.registration.toString();
            divS.appendChild(pName);
            divS.appendChild(pFirstName);
            divS.appendChild(pRegistration);
            let deleteButton = document.createElement("button");
            deleteButton.dataset.id = student1._id;
            deleteButton.addEventListener("click", deleteData);
            deleteButton.innerText = "löschen";
            divS.appendChild(deleteButton);
            studListe.appendChild(divS);
        }
        console.log(antwort);
    }
})(aufgabe3_4 || (aufgabe3_4 = {}));
//# sourceMappingURL=script.js.map