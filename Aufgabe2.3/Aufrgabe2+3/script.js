"use strict";
///script.ts
var aufgabe2_33;
(function (aufgabe2_33) {
    class Zutat {
        constructor(_name, _preis, _darstellung) {
            this.name = _name;
            this.preis = _preis;
            this.darstellung = _darstellung;
        }
    }
    class Broetchen extends Zutat {
        constructor(_name, _preis, _darstellung, _mitKoernern) {
            super(_name, _preis, _darstellung);
            this.mitKoernern = _mitKoernern;
        }
    }
    class Patty extends Zutat {
        constructor(_name, _preis, _darstellung, _veggie) {
            super(_name, _preis, _darstellung);
            this.vegetarisch = _veggie;
        }
    }
    /*  interface BurgerZutatenSpeicher {
         burgerBoden: Broetchen;
         zutat1: Zutat;
         zutat2: Zutat;
         burgerDeckel: Broetchen;
     }*/
    let burgerBroetchenAuswahl = [];
    let zutatenListe = [];
    let pattyListe = [];
    function datenEinlese() {
        for (let i = 0; i < aufgabe2_33.daten.length; i++) {
            let stringArray = aufgabe2_33.daten[i].split(",");
            switch (stringArray[0]) {
                case "BROETCHEN":
                    if (stringArray.length == 5) {
                        let broetchen = new Broetchen(stringArray[1], Number(stringArray[2]), stringArray[3], Boolean(stringArray[4]));
                        burgerBroetchenAuswahl[burgerBroetchenAuswahl.length] = broetchen;
                    }
                    break;
                case "PATTY":
                    if (stringArray.length == 5) {
                        let patty = new Patty(stringArray[1], Number(stringArray[2]), stringArray[3], Boolean(stringArray[4]));
                        pattyListe[pattyListe.length] = patty;
                    }
                    break;
                case "ZUTAT":
                    if (stringArray.length == 4) {
                        let zutat = new Zutat(stringArray[1], Number(stringArray[2]), stringArray[3]);
                        zutatenListe[zutatenListe.length] = zutat;
                    }
                    break;
            }
        }
    }
    datenEinlese();
    let zutatenAuswahl = document.querySelector(".Zutatenauswahl");
    let seitenSpezifischeZutaten = [];
    let checkboxListe = [];
    if (document.URL.includes("Index")) {
        seitenSpezifischeZutaten = burgerBroetchenAuswahl;
    }
    erzeugeZutatenAnsicht(seitenSpezifischeZutaten);
    function erzeugeZutatenAnsicht(_zutatenliste) {
        for (let index = 0; index < zutatenListe.length; index++) {
            let checkbox = document.createElement("input");
            checkbox.setAttribute("id", "checkbox" + index);
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("class", "hidden");
            checkbox.addEventListener("change", handleAuswahl);
            zutatenAuswahl.appendChild(checkbox);
            checkboxListe[checkboxListe.length] = checkbox;
            let label = document.createElement("label");
            label.setAttribute("id", "label_" + index);
            label.setAttribute("for", "checkbox" + index);
            zutatenAuswahl.appendChild(label);
            console.log(index);
            let image = document.createElement("img");
            image.setAttribute("src", _zutatenliste[index].darstellung);
            image.setAttribute("alt", _zutatenliste[index].name);
            image.setAttribute("title", _zutatenliste[index].name);
            label.appendChild(image);
        }
    }
    function handleAuswahl(_event) {
        let title = document.getElementById("bezeichnung");
        let preis = document.getElementById("preis");
        let currentCheckb = _event.target;
        let isNewlyChecked = false;
        let vorschaubild = document.getElementById("vorschaubild");
        if (currentCheckb.checked) {
            isNewlyChecked = true;
        }
        for (let i = 0; i < checkboxListe.length; i++) {
            if (checkboxListe[i].isEqualNode(currentCheckb) && isNewlyChecked) {
                title.innerText = seitenSpezifischeZutaten[i].name;
                preis.innerText = seitenSpezifischeZutaten[i].preis + "€";
                vorschaubild.setAttribute("src", seitenSpezifischeZutaten[i].darstellung);
                vorschaubild.setAttribute("alt", "vorschaubild von " + seitenSpezifischeZutaten[i].name);
            }
            else {
                checkboxListe[i].checked = false;
            }
        }
        if (!isNewlyChecked) {
            title.innerText = "nichts Ausgewählt";
            preis.innerText = "0.0 €";
            vorschaubild.setAttribute("src", "");
            vorschaubild.setAttribute("alt", "nichts ausgewählt");
        }
    }
})(aufgabe2_33 || (aufgabe2_33 = {}));
//# sourceMappingURL=script.js.map