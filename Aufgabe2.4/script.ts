
namespace aufgabe2_4 {
    
  
    // ------ Interface in dem Ausgewählte elemente Gespeichert Werden -----//
    interface BurgerZutatenSpeicher {
        burgerBoden: Broetche;
        zutat1: Patt;
        zutat2: Zuta;
        burgerDeckel: Broetche;
    }
    
    let burgerKomplett: BurgerZutatenSpeicher = {burgerBoden: undefined, zutat1: undefined, zutat2: undefined, burgerDeckel: undefined};
    if (sessionStorage.getItem("burgerKomplett")) {
        burgerKomplett = JSON.parse(sessionStorage.getItem("burgerKomplett"));
        console.log(burgerKomplett);
        
    }
    //-- > burgerKomplett wird nach nund nach aufgefüllt.
    
    let speicherOpt: Data = undefined;

    
    function datenEinlese(): void {
        speicherOpt = JSON.parse(daten); 
    }
    datenEinlese();

    let zutatenAuswahl: HTMLDivElement = <HTMLDivElement> document.querySelector(".Zutatenauswahl"); //--> anzeigefeld wo alle zutaten angezeigt werden
    let checkboxListe: HTMLInputElement[] = []; //--> hier werden die checkboxen in selber reihenfolge wie die zutaten gespeichert
    
    let aktuelleSeite: SEITE = undefined; //--> hiermit wird die speicherung und anzeige der zutaten gesteuert
   
    let aktuellePatty: Patt = undefined;
    let aktuelleBroetchen: Broetche = undefined;
    let aktuelleZutat: Zuta = undefined;
    let aktuelleZutatenLaenge: number = undefined;
    
    enum SEITE {
        BURGER_BODEN, ZUTAT_1, ZUTAT_2, BURGER_DECKEL, RESULTAT
    }
    
    if (document.URL.includes("Index")) { 
        //aktuelleSeite = SEITE.BURGER_DECKEL; --> hier würde die 2te darstellung des burgerbrötchen dargestellt werden
        aktuelleSeite = SEITE.BURGER_BODEN;
        aktuelleZutatenLaenge = speicherOpt.broetchen.length;
    } else if (document.URL.includes("zutat1")) {
        aktuelleSeite = SEITE.ZUTAT_1;
        aktuelleZutatenLaenge = speicherOpt.pattys.length;
    } else if ( document.URL.includes("zutat2")) {
        aktuelleSeite = SEITE.ZUTAT_2;
        aktuelleZutatenLaenge = speicherOpt.zutaten.length;
    } else if ( document.URL.includes("Dach")) {
        aktuelleSeite = SEITE.BURGER_DECKEL;
        aktuelleZutatenLaenge = speicherOpt.broetchen.length;
    } else if (document.URL.includes("result")) {
        aktuelleSeite = SEITE.RESULTAT;
        aktuelleZutatenLaenge = null;
    }
    if (aktuelleSeite != SEITE.RESULTAT) {
    erzeugeZutatenAnsicht();
  
    // hier werden die darstellung und DIVs nach den daten erstellt und angezeigt.
    
    function erzeugeZutatenAnsicht(): void {
        for (let index: number = 0; index < aktuelleZutatenLaenge; index++) {
            let checkbox: HTMLInputElement = <HTMLInputElement> document.createElement("input");
            checkbox.setAttribute("id", "checkbox" + index);
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("class", "hidden");
            checkbox.addEventListener("change", handleAuswahl);
            zutatenAuswahl.appendChild(checkbox);
            checkboxListe[checkboxListe.length] = checkbox;
            let label: HTMLLabelElement = <HTMLLabelElement> document.createElement("label");
            label.setAttribute("id", "label_" + index);
            label.setAttribute("for", "checkbox" + index);
            
            zutatenAuswahl.appendChild(label);
            let image: HTMLImageElement = <HTMLImageElement> document.createElement("img");
            function setImg(_name: string, _darstellung: string): void {
                image.setAttribute("src", _darstellung);
                image.setAttribute("alt", _name);
                image.setAttribute("title", _name);
        
            }
            switch (aktuelleSeite) {
                case SEITE.BURGER_BODEN:
                    let burgerBoden: Broetche = speicherOpt.broetchen[index];
                    setImg(burgerBoden.name, burgerBoden.darstellung);
                    break;
                case SEITE.BURGER_DECKEL:
                    let burgerDeckel: Broetche =  speicherOpt.broetchen[index];
                    setImg(burgerDeckel.name, burgerDeckel.darstellung2);
                    break;
                case SEITE.ZUTAT_1:
                    let zutat1: Patt = speicherOpt.pattys[index];
                    setImg(zutat1.name, zutat1.darstellung);
                    break;
                case SEITE.ZUTAT_2:
                    let zutat2: Zuta = speicherOpt.zutaten[index];
                    setImg(zutat2.name, zutat2.darstellung);    
            }
            label.appendChild(image);   
        }
        
    }
    document.getElementById("bestaetigen").addEventListener("click", handleBestaetigung);
    
    function handleAuswahl(_event: Event): void {
        let title: HTMLHeadingElement = <HTMLHeadingElement>  document.getElementById("bezeichnung");
        let preis: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("preis");
        let currentCheckb: HTMLInputElement = <HTMLInputElement>   _event.target;
        let isNewlyChecked: boolean = false;
        let vorschaubild: HTMLImageElement = <HTMLImageElement> document.getElementById("vorschaubild");
        if (currentCheckb.checked) {
            isNewlyChecked = true;
        }
        
        for (let i: number = 0; i < checkboxListe.length; i++) {
            if (checkboxListe[i].isEqualNode(currentCheckb) && isNewlyChecked) {
            
                switch (aktuelleSeite) {
                    case SEITE.BURGER_BODEN:
                        let burgerBoden: Broetche = speicherOpt.broetchen[i];
                        setVorschaubild(burgerBoden.name, burgerBoden.darstellung, burgerBoden.preis);
                        aktuelleBroetchen = burgerBoden;
                        break;
                    case SEITE.BURGER_DECKEL:
                        let burgerDeckel: Broetche = speicherOpt.broetchen[i];
                        setVorschaubild(burgerDeckel.name, burgerDeckel.darstellung2, burgerDeckel.preis);
                        aktuelleBroetchen = burgerDeckel;
                        break;
                    case SEITE.ZUTAT_1:
                        let patty: Patt = speicherOpt.pattys[i];
                        setVorschaubild(patty.name, patty.darstellung, patty.preis);
                        aktuellePatty = patty;
                        break;
                    case SEITE.ZUTAT_2:
                        let zutat: Zuta = speicherOpt.zutaten[i];
                        setVorschaubild(zutat.name, zutat.darstellung, zutat.preis);
                        aktuelleZutat = zutat;
                        break;
                }
                function setVorschaubild(_name: string , _darstellung: string, _preis: number): void {
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
    function handleBestaetigung(): void {
        let href: string = "";
        let etwasAusgewählt: boolean = false;
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
        } else {
            alert("es wurde nichts ausgewählt, wählen sie etwas aus");
        }
       
    } 
    } else {
        let preis: number = 0;
        document.getElementById("bTop").innerText = burgerKomplett.burgerDeckel.name + " = " + burgerKomplett.burgerDeckel.preis + "€" ;
        preis += burgerKomplett.burgerDeckel.preis;
        document.getElementById("bZutat2").innerText = burgerKomplett.zutat2.name + " = " + burgerKomplett.zutat2.preis + "€";
        preis += burgerKomplett.zutat2.preis;
        document.getElementById("bZutat1").innerText = burgerKomplett.zutat1.name + " = " + burgerKomplett.zutat1.preis + "€";
        preis += burgerKomplett.zutat1.preis;
        document.getElementById("bBoden").innerText = burgerKomplett.burgerBoden.name + " = " + burgerKomplett.burgerBoden.preis + "€";
        preis += burgerKomplett.burgerBoden.preis;
        preis =  (Math.round(preis * 100) / 100);
        document.getElementById("endPreis").innerText = "Preis: " + preis.toString() + "€";



        let burgerAnzeige: HTMLDivElement = <HTMLDivElement> document.querySelector(".resultatAnzeige");
        let topImg: HTMLImageElement = <HTMLImageElement> document.createElement("img");
        topImg.setAttribute("src", burgerKomplett.burgerDeckel.darstellung2);
        topImg.setAttribute("alt", burgerKomplett.burgerDeckel.name);
        burgerAnzeige.appendChild(topImg);

        let zutat2Img: HTMLImageElement = <HTMLImageElement> document.createElement("img");
        zutat2Img.setAttribute("src", burgerKomplett.zutat2.darstellung);
        zutat2Img.setAttribute("alt", burgerKomplett.zutat2.name);
        burgerAnzeige.appendChild(zutat2Img);

        let zutat1Img: HTMLImageElement = <HTMLImageElement> document.createElement("img");
        zutat1Img.setAttribute("src", burgerKomplett.zutat1.darstellung);
        zutat1Img.setAttribute("alt", burgerKomplett.zutat1.name);
        burgerAnzeige.appendChild(zutat1Img);

        let bottomImg: HTMLImageElement = <HTMLImageElement> document.createElement("img");
        bottomImg.setAttribute("src", burgerKomplett.burgerBoden.darstellung);
        bottomImg.setAttribute("alt", burgerKomplett.burgerBoden.name);
        burgerAnzeige.appendChild(bottomImg);


        if (burgerKomplett.zutat1.vegetarisch) {
            let vegetarischImage: HTMLImageElement = <HTMLImageElement> document.createElement("img");
            vegetarischImage.setAttribute("src", "darstellungen/Vegetarisch.png");
            vegetarischImage.setAttribute("alt", "vegetarisch kennzeichnung");
            vegetarischImage.setAttribute("class", "vegetarisch");
            document.body.appendChild(vegetarischImage);
        }
        
        document.getElementById("bestellen").addEventListener("click", handleBestellung);


        function handleBestellung(_event: Event): void {
            console.log(JSON.stringify(burgerKomplett) + " Time: "  + Date.now());
            console.log("hello");
            

            let closeTimer: HTMLHeadingElement = <HTMLHeadingElement> document.createElement("h2");
            closeTimer.setAttribute("id", "closeTimer");
            document.body.appendChild(closeTimer);

            closeTimer.innerText = "closing in 5 seconds";
            setTimeout(function(): void {
                sessionStorage.clear();
                window.location.href = "Index.html";
             } ,       5000 );
            

            
            
        }
       


    }
}