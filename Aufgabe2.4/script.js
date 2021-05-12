"use strict";
var aufgabe2_4;
(function (aufgabe2_4) {
    let burgerKomplett = { burgerBoden: undefined, zutat1: undefined, zutat2: undefined, burgerDeckel: undefined };
    //-- > burgerKomplett wird nach nund nach aufgefüllt.
    let speicherOpt = undefined;
    function datenEinlese() {
        console.log(aufgabe2_4.daten);
        speicherOpt = JSON.parse(aufgabe2_4.daten);
    }
    datenEinlese();
    let zutatenAuswahl = document.querySelector(".Zutatenauswahl"); //--> anzeigefeld wo alle zutaten angezeigt werden
    let checkboxListe = []; //--> hier werden die checkboxen in selber reihenfolge wie die zutaten gespeichert
    let aktuelleSeite = undefined; //--> hiermit wird die speicherung und anzeige der zutaten gesteuert
    let aktuellePatty = undefined;
    let aktuelleBroetchen = undefined;
    let aktuelleZutat = undefined;
    let aktuelleZutatenLaenge = undefined;
    let SEITE;
    (function (SEITE) {
        SEITE[SEITE["BURGER_BODEN"] = 0] = "BURGER_BODEN";
        SEITE[SEITE["ZUTAT_1"] = 1] = "ZUTAT_1";
        SEITE[SEITE["ZUTAT_2"] = 2] = "ZUTAT_2";
        SEITE[SEITE["BURGER_DECKEL"] = 3] = "BURGER_DECKEL";
    })(SEITE || (SEITE = {}));
    if (document.URL.includes("Index")) {
        //aktuelleSeite = SEITE.BURGER_DECKEL; --> hier würde die 2te darstellung des burgerbrötchen dargestellt werden
        aktuelleSeite = SEITE.BURGER_BODEN;
        aktuelleZutatenLaenge = speicherOpt.broetchen.length;
    }
    else if (document.URL.includes("zutat1")) {
        aktuelleSeite = SEITE.ZUTAT_1;
        aktuelleZutatenLaenge = speicherOpt.pattys.length;
    }
    else if (document.URL.includes("zutat2")) {
        aktuelleSeite = SEITE.ZUTAT_2;
        aktuelleZutatenLaenge = speicherOpt.zutaten.length;
    }
    else if (document.URL.includes("Dach")) {
        aktuelleSeite = SEITE.BURGER_DECKEL;
        aktuelleZutatenLaenge = speicherOpt.broetchen.length;
    }
    erzeugeZutatenAnsicht();
    // hier werden die darstellung und DIVs nach den daten erstellt und angezeigt.
    function erzeugeZutatenAnsicht() {
        for (let index = 0; index < aktuelleZutatenLaenge; index++) {
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
            function setImg(_name, _darstellung) {
                image.setAttribute("src", _darstellung);
                image.setAttribute("alt", _name);
                image.setAttribute("title", _name);
            }
            switch (aktuelleSeite) {
                case SEITE.BURGER_BODEN:
                    let burgerBoden = speicherOpt.broetchen[index];
                    setImg(burgerBoden.name, burgerBoden.darstellung);
                    break;
                case SEITE.BURGER_DECKEL:
                    let burgerDeckel = speicherOpt.broetchen[index];
                    setImg(burgerDeckel.name, burgerDeckel.darstellung2);
                    break;
                case SEITE.ZUTAT_1:
                    let zutat1 = speicherOpt.pattys[index];
                    setImg(zutat1.name, zutat1.darstellung);
                    break;
                case SEITE.ZUTAT_2:
                    let zutat2 = speicherOpt.zutaten[index];
                    setImg(zutat2.name, zutat2.darstellung);
            }
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
                switch (aktuelleSeite) {
                    case SEITE.BURGER_BODEN:
                        let burgerBoden = speicherOpt.broetchen[i];
                        setVorschaubild(burgerBoden.name, burgerBoden.darstellung, burgerBoden.preis);
                        aktuelleBroetchen = burgerBoden;
                        break;
                    case SEITE.BURGER_DECKEL:
                        let burgerDeckel = speicherOpt.broetchen[i];
                        setVorschaubild(burgerDeckel.name, burgerDeckel.darstellung2, burgerDeckel.preis);
                        aktuelleBroetchen = burgerDeckel;
                        break;
                    case SEITE.ZUTAT_1:
                        let patty = speicherOpt.pattys[i];
                        setVorschaubild(patty.name, patty.darstellung, patty.preis);
                        aktuellePatty = patty;
                        break;
                    case SEITE.ZUTAT_2:
                        let zutat = speicherOpt.zutaten[i];
                        setVorschaubild(zutat.name, zutat.darstellung, zutat.preis);
                        aktuelleZutat = zutat;
                        break;
                }
                function setVorschaubild(_name, _darstellung, _preis) {
                    if (title.hasChildNodes) {
                        title.removeChild(title.lastChild);
                    }
                    title.appendChild(document.createTextNode(_name));
                    if (preis.hasChildNodes) {
                        preis.removeChild(preis.lastChild);
                    }
                    preis.appendChild(document.createTextNode(_preis + "€"));
                    vorschaubild.setAttribute("src", _darstellung);
                    vorschaubild.setAttribute("alt", "vorschaubild von " + _name);
                }
            }
            //--> Anzeige Des Titels und des preises und Darstellung des "ausgewählten" produkte     
            else {
                checkboxListe[i].checked = false;
            }
        }
        if (!isNewlyChecked) {
            title.innerText = "nichts Ausgewählt";
            preis.innerText = "0.0 €";
            vorschaubild.setAttribute("src", "");
            vorschaubild.setAttribute("alt", "nichts ausgewählt");
            aktuelleBroetchen = undefined;
            aktuellePatty = undefined;
            aktuelleZutat = undefined;
        }
    }
    //--> hier wird die auswahl in einem der 4 Kategorien des Burgers Gespeichert 
    function handleBestaetigung() {
        switch (aktuelleSeite) {
            case SEITE.BURGER_BODEN:
                burgerKomplett.burgerBoden = aktuelleBroetchen;
                if (!aktuelleBroetchen) {
                    alert("es wurde nichts ausgewählt, wählen sie etwas aus");
                }
                else {
                    console.log(burgerKomplett);
                    window.location.href = "zutat1.html";
                }
                break;
            case SEITE.ZUTAT_1:
                burgerKomplett.zutat1 = aktuellePatty;
                if (!aktuellePatty) {
                    alert("es wurde nichts ausgewählt, wählen sie etwas aus");
                }
                else {
                    console.log(burgerKomplett);
                    window.location.href = "zutat2.html";
                }
                break;
            case SEITE.ZUTAT_2:
                burgerKomplett.zutat2 = aktuelleZutat;
                if (!aktuelleZutat) {
                    alert("es wurde nichts ausgewählt, wählen sie etwas aus");
                }
                else {
                    console.log(burgerKomplett);
                    window.location.href = "burgerDach.html";
                }
                break;
            case SEITE.BURGER_DECKEL:
                burgerKomplett.burgerDeckel = aktuelleBroetchen;
                if (!aktuelleBroetchen) {
                    alert("es wurde nichts ausgewählt, wählen sie etwas aus");
                }
                else {
                    console.log(burgerKomplett);
                }
                break;
        }
    }
})(aufgabe2_4 || (aufgabe2_4 = {}));
//# sourceMappingURL=script.js.map