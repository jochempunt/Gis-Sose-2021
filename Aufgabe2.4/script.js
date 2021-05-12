"use strict";
var aufgabe2_4;
(function (aufgabe2_4) {
    let burgerKomplett = { burgerBoden: undefined, zutat1: undefined, zutat2: undefined, burgerDeckel: undefined };
    if (sessionStorage.getItem("burgerKomplett")) {
        burgerKomplett = JSON.parse(sessionStorage.getItem("burgerKomplett"));
        console.log(burgerKomplett);
    }
    //-- > burgerKomplett wird nach nund nach aufgefüllt.
    let speicherOpt = undefined;
    function datenEinlese() {
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
        SEITE[SEITE["RESULTAT"] = 4] = "RESULTAT";
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
    else if (document.URL.includes("result")) {
        aktuelleSeite = SEITE.RESULTAT;
        aktuelleZutatenLaenge = null;
    }
    if (aktuelleSeite != SEITE.RESULTAT) {
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
            let href = "";
            let etwasAusgewählt = false;
            switch (aktuelleSeite) {
                case SEITE.BURGER_BODEN:
                    burgerKomplett.burgerBoden = aktuelleBroetchen;
                    if (aktuelleBroetchen) {
                        etwasAusgewählt = true;
                        href = "zutat1.html";
                    }
                    break;
                case SEITE.ZUTAT_1:
                    burgerKomplett.zutat1 = aktuellePatty;
                    if (aktuellePatty) {
                        etwasAusgewählt = true;
                        href = "zutat2.html";
                    }
                    break;
                case SEITE.ZUTAT_2:
                    burgerKomplett.zutat2 = aktuelleZutat;
                    if (aktuelleZutat) {
                        etwasAusgewählt = true;
                        href = "burgerDach.html";
                    }
                    break;
                case SEITE.BURGER_DECKEL:
                    burgerKomplett.burgerDeckel = aktuelleBroetchen;
                    if (aktuelleBroetchen) {
                        etwasAusgewählt = true;
                        href = "result.html";
                    }
                    break;
            }
            if (etwasAusgewählt) {
                sessionStorage.setItem("burgerKomplett", JSON.stringify(burgerKomplett));
                window.location.href = href;
            }
            else {
                alert("es wurde nichts ausgewählt, wählen sie etwas aus");
            }
        }
    }
    else {
        let preis = 0;
        document.getElementById("bTop").innerText = burgerKomplett.burgerDeckel.name + " = " + burgerKomplett.burgerDeckel.preis + "€";
        preis += burgerKomplett.burgerDeckel.preis;
        document.getElementById("bZutat2").innerText = burgerKomplett.zutat2.name + " = " + burgerKomplett.zutat2.preis + "€";
        preis += burgerKomplett.zutat2.preis;
        document.getElementById("bZutat1").innerText = burgerKomplett.zutat1.name + " = " + burgerKomplett.zutat1.preis + "€";
        preis += burgerKomplett.zutat1.preis;
        document.getElementById("bBoden").innerText = burgerKomplett.burgerBoden.name + " = " + burgerKomplett.burgerBoden.preis + "€";
        preis += burgerKomplett.burgerBoden.preis;
        preis = (Math.round(preis * 100) / 100);
        document.getElementById("endPreis").innerText = "Preis: " + preis.toString() + "€";
        let burgerAnzeige = document.querySelector(".resultatAnzeige");
        let topImg = document.createElement("img");
        topImg.setAttribute("src", burgerKomplett.burgerDeckel.darstellung2);
        topImg.setAttribute("alt", burgerKomplett.burgerDeckel.name);
        burgerAnzeige.appendChild(topImg);
        let zutat2Img = document.createElement("img");
        zutat2Img.setAttribute("src", burgerKomplett.zutat2.darstellung);
        zutat2Img.setAttribute("alt", burgerKomplett.zutat2.name);
        burgerAnzeige.appendChild(zutat2Img);
        let zutat1Img = document.createElement("img");
        zutat1Img.setAttribute("src", burgerKomplett.zutat1.darstellung);
        zutat1Img.setAttribute("alt", burgerKomplett.zutat1.name);
        burgerAnzeige.appendChild(zutat1Img);
        let bottomImg = document.createElement("img");
        bottomImg.setAttribute("src", burgerKomplett.burgerBoden.darstellung);
        bottomImg.setAttribute("alt", burgerKomplett.burgerBoden.name);
        burgerAnzeige.appendChild(bottomImg);
        document.getElementById("bestellen").addEventListener("click", handleBestellung);
        function handleBestellung(_event) {
            console.log(JSON.stringify(burgerKomplett) + " Time: " + Date.now());
            console.log("hello");
            let closeTimer = document.createElement("h2");
            closeTimer.setAttribute("id", "closeTimer");
            document.body.appendChild(closeTimer);
            closeTimer.innerText = "closing in 5 seconds";
            setTimeout(function () {
                sessionStorage.clear();
                window.location.href = "Index.html";
            }, 5000);
        }
    }
})(aufgabe2_4 || (aufgabe2_4 = {}));
//# sourceMappingURL=script.js.map