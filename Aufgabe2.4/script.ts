
namespace aufgabe2_4 {
    
  
    // ------ Interface in dem Ausgewählte elemente Gespeichert Werden -----//
    interface BurgerZutatenSpeicher {
        burgerBoden: Broetche;
        zutat1: Patt;
        zutat2: Zuta;
        burgerDeckel: Broetche;
    }
    
    let burgerKomplett: BurgerZutatenSpeicher = {burgerBoden: undefined, zutat1: undefined, zutat2: undefined, burgerDeckel: undefined};
    //-- > burgerKomplett wird nach nund nach aufgefüllt.
    
    let speicherOpt: Data = undefined;

    
    function datenEinlese(): void {
        console.log(daten);
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
        BURGER_BODEN, ZUTAT_1, ZUTAT_2, BURGER_DECKEL
    }
    
    if (document.URL.includes("Index")) { 
        //aktuelleSeite = SEITE.BURGER_DECKEL; --> hier würde die 2te darstellung des burgerbrötchen dargestellt werden
        aktuelleSeite = SEITE.BURGER_BODEN;
        aktuelleZutatenLaenge = speicherOpt.broetchen.length;
    } else if (document.URL.includes("zutat1")) {
        aktuelleSeite = SEITE.ZUTAT_1;
        aktuelleZutatenLaenge = speicherOpt.pattys.length;
    } else if ( document.URL.includes("zutat2")){
        aktuelleSeite = SEITE.ZUTAT_2;
        aktuelleZutatenLaenge = speicherOpt.zutaten.length;
    } else if( document.URL.includes("Dach")){
        aktuelleSeite = SEITE.BURGER_DECKEL;
        aktuelleZutatenLaenge = speicherOpt.broetchen.length;
    }
    
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
        switch (aktuelleSeite) {
            case SEITE.BURGER_BODEN:
            burgerKomplett.burgerBoden = aktuelleBroetchen;
            if (!aktuelleBroetchen) {
                alert("es wurde nichts ausgewählt, wählen sie etwas aus");
            } else {
                console.log(burgerKomplett);
                window.location.href = "zutat1.html";
            }
            break;
            case SEITE.ZUTAT_1:
            burgerKomplett.zutat1 = aktuellePatty;
            if (!aktuellePatty) {
                alert("es wurde nichts ausgewählt, wählen sie etwas aus");
            } else {
                console.log(burgerKomplett);
                window.location.href = "zutat2.html";
            }
            break;
            case SEITE.ZUTAT_2:
                burgerKomplett.zutat2 = aktuelleZutat; 
                if (!aktuelleZutat) {
                    alert("es wurde nichts ausgewählt, wählen sie etwas aus");
                } else {
                    console.log(burgerKomplett);
                    window.location.href = "burgerDach.html";
                }    
           
                break;
            case SEITE.BURGER_DECKEL:
            burgerKomplett.burgerDeckel = aktuelleBroetchen;
            if (!aktuelleBroetchen) {
                alert("es wurde nichts ausgewählt, wählen sie etwas aus");
            } else {
                console.log(burgerKomplett);
            }
            break;        
        }
    } 
}