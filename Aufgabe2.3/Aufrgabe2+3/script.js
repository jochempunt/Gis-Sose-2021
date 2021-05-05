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
})(aufgabe2_33 || (aufgabe2_33 = {}));
//# sourceMappingURL=script.js.map