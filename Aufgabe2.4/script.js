"use strict";
var aufgabe2_4;
(function (aufgabe2_4) {
    // ------ Klassen für die Zutaten des Burgers -----//
    class Zutat {
        constructor(_name, _preis, _darstellung) {
            this.name = _name;
            this.preis = _preis;
            this.darstellung = _darstellung;
        }
    }
    class Broetchen extends Zutat {
        constructor(_name, _preis, _darstellung, _darstellung2) {
            super(_name, _preis, _darstellung);
            this.darstellung2 = _darstellung2;
        }
    }
    class Patty extends Zutat {
        constructor(_name, _preis, _darstellung, _veggie) {
            super(_name, _preis, _darstellung);
            this.vegetarisch = _veggie;
        }
    }
    let burgerKomplett = { burgerBoden: undefined, zutat1: undefined, zutat2: undefined, burgerDeckel: undefined };
    //-- > burgerKomplett wird nach nund nach aufgefüllt.
    let burgerBroetchenAuswahl = [];
    let zutatenListe = [];
    let pattyListe = [];
    // --> hier werden alle auswahlMöglichkeiten Gespeichert 
    function datenEinlese() {
        for (let i = 0; i < daten.length; i++) {
            let stringArray = daten[i].split(",");
            switch (stringArray[0]) {
                case "BROETCHEN":
                    if (stringArray.length == 5) {
                        let broetchen = new Broetchen(stringArray[1], Number(stringArray[2]), stringArray[3], stringArray[4]);
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
    let zutatenAuswahl = document.querySelector(".Zutatenauswahl"); //--> anzeigefeld wo alle zutaten angezeigt werden
    let seitenSpezifischeZutaten = [];
    let checkboxListe = []; //--> hier werden die checkboxen in selber reihenfolge wie die zutaten gespeichert
    let aktuelleSeite = undefined; //--> hiermit wird die speicherung und anzeige der zutaten gesteuert
    let aktuelleAuswahl = undefined;
    let SEITE;
    (function (SEITE) {
        SEITE[SEITE["BURGER_BODEN"] = 0] = "BURGER_BODEN";
        SEITE[SEITE["ZUTAT_1"] = 1] = "ZUTAT_1";
        SEITE[SEITE["ZUTAT_2"] = 2] = "ZUTAT_2";
        SEITE[SEITE["BURGER_DECKEL"] = 3] = "BURGER_DECKEL";
    })(SEITE || (SEITE = {}));
    if (document.URL.includes("Index")) { // dafür da zu erkennen auf welcher seite wir sind (für später)
        seitenSpezifischeZutaten = burgerBroetchenAuswahl;
        //aktuelleSeite = SEITE.BURGER_DECKEL; --> hier würde die 2te darstellung des burgerbrötchen dargestellt werden
        aktuelleSeite = SEITE.BURGER_BODEN;
    }
    erzeugeZutatenAnsicht();
    // hier werden die darstellung und DIVs nach den daten erstellt und angezeigt.
    function erzeugeZutatenAnsicht() {
        for (let index = 0; index < seitenSpezifischeZutaten.length; index++) {
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
            let image = document.createElement("img");
            if ((seitenSpezifischeZutaten[index] instanceof Broetchen) && (aktuelleSeite == SEITE.BURGER_DECKEL)) {
                let burgerDeckel = seitenSpezifischeZutaten[index];
                image.setAttribute("src", burgerDeckel.darstellung2);
            }
            else {
                image.setAttribute("src", seitenSpezifischeZutaten[index].darstellung);
            }
            image.setAttribute("alt", seitenSpezifischeZutaten[index].name);
            image.setAttribute("title", seitenSpezifischeZutaten[index].name);
            label.appendChild(image);
        }
    }
    document.getElementById("bestaetigen").addEventListener("click", handleBestaetigung);
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
                aktuelleAuswahl = seitenSpezifischeZutaten[i];
                //--> Anzeige Des Titels und des preises und Darstellung des "ausgewählten" produktes
                //--> hier bin ich innerText umgangen kp ob das besser ist
                if (title.hasChildNodes) {
                    title.removeChild(title.lastChild);
                }
                title.appendChild(document.createTextNode(aktuelleAuswahl.name));
                if (preis.hasChildNodes) {
                    preis.removeChild(preis.lastChild);
                }
                preis.appendChild(document.createTextNode(aktuelleAuswahl.preis + "€"));
                if ((aktuelleAuswahl instanceof Broetchen) && (aktuelleSeite == SEITE.BURGER_DECKEL)) {
                    let burgerDeckel = aktuelleAuswahl;
                    vorschaubild.setAttribute("src", burgerDeckel.darstellung2);
                }
                else {
                    vorschaubild.setAttribute("src", aktuelleAuswahl.darstellung);
                }
                vorschaubild.setAttribute("alt", "vorschaubild von " + aktuelleAuswahl.name);
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
            aktuelleAuswahl = undefined;
        }
    }
    //--> hier wird die auswahl in einem der 4 Kategorien des Burgers Gespeichert 
    function handleBestaetigung() {
        console.log(aktuelleAuswahl);
        switch (aktuelleSeite) {
            case SEITE.BURGER_BODEN:
                burgerKomplett.burgerBoden = aktuelleAuswahl;
                break;
            case SEITE.ZUTAT_1:
                burgerKomplett.zutat1 = aktuelleAuswahl;
                break;
            case SEITE.ZUTAT_2:
                burgerKomplett.zutat2 = aktuelleAuswahl;
                break;
            case SEITE.BURGER_DECKEL:
                burgerKomplett.burgerDeckel = aktuelleAuswahl;
                break;
        }
        if (!aktuelleAuswahl) {
            alert("es wurde nichts ausgewählt, wählen sie etwas aus");
        }
        else {
            console.log(burgerKomplett);
        }
    }
})(aufgabe2_4 || (aufgabe2_4 = {}));
//# sourceMappingURL=script.js.map