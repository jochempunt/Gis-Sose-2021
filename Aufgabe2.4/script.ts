
namespace aufgabe2_4 {
    // ------ Klassen für die Zutaten des Burgers -----//
    class Zutat {
        name: string;
        preis: number;
        darstellung: string;
        
        constructor( _name: string, _preis: number, _darstellung: string) {
            this.name = _name;
            this.preis = _preis;
            this.darstellung = _darstellung;
        }
    }
    
    
    class Broetchen extends Zutat {
        darstellung2: string;
        constructor(_name: string, _preis: number, _darstellung: string, _darstellung2: string) {
            super(_name, _preis, _darstellung);
            this.darstellung2 = _darstellung2;
        }
        
        
        
    }
    
    class Patty extends Zutat {
        vegetarisch: Boolean;
        constructor(_name: string, _preis: number, _darstellung: string, _veggie: boolean) {
            super(_name, _preis, _darstellung);
            this.vegetarisch = _veggie;
        }
    }
    
    // ------ Interface in dem Ausgewählte elemente Gespeichert Werden -----//
    interface BurgerZutatenSpeicher {
        burgerBoden: Broetchen;
        zutat1: Zutat;
        zutat2: Zutat;
        burgerDeckel: Broetchen;
    }
    
    
    let burgerKomplett: BurgerZutatenSpeicher = {burgerBoden: undefined, zutat1: undefined, zutat2: undefined, burgerDeckel: undefined};
    //-- > burgerKomplett wird nach nund nach aufgefüllt.
    
    let burgerBroetchenAuswahl: Broetchen[] = [];
    let zutatenListe: Zutat[] = [];
    let pattyListe: Zutat[] = [];
    // --> hier werden alle auswahlMöglichkeiten Gespeichert 
    
    function datenEinlese(): void {
        for (let i: number = 0; i < daten.length; i++ ) {
            let stringArray: string[] = daten[i].split(",");
            
            switch (stringArray[0]) {
                case "BROETCHEN":
                if (stringArray.length == 5) {
                    let broetchen: Broetchen = new Broetchen(stringArray[1], Number(stringArray[2]) , stringArray[3], stringArray[4]);
                    burgerBroetchenAuswahl[burgerBroetchenAuswahl.length] = broetchen;
                }    
                break;
                case "PATTY":
                if (stringArray.length == 5) {
                    let patty: Patty = new Patty(stringArray[1], Number(stringArray[2]), stringArray[3], Boolean( stringArray[4] ));
                    pattyListe[pattyListe.length]  = patty;
                }
                break;
                case "ZUTAT":
                if (stringArray.length == 4) {
                    let zutat: Zutat = new Zutat(stringArray[1], Number(stringArray[2]), stringArray[3]);
                    zutatenListe[zutatenListe.length] = zutat;
                }    
                break;        
            }
            
        }
    }
    
    datenEinlese();
    
    
    
    let zutatenAuswahl: HTMLDivElement = <HTMLDivElement> document.querySelector(".Zutatenauswahl"); //--> anzeigefeld wo alle zutaten angezeigt werden
    
    let seitenSpezifischeZutaten: Zutat[] = []; 
    
    let checkboxListe: HTMLInputElement[] = []; //--> hier werden die checkboxen in selber reihenfolge wie die zutaten gespeichert
    
    let aktuelleSeite: SEITE = undefined; //--> hiermit wird die speicherung und anzeige der zutaten gesteuert
    
    let aktuelleAuswahl: Zutat = undefined; 
    
    enum SEITE {
        BURGER_BODEN, ZUTAT_1, ZUTAT_2, BURGER_DECKEL
    }
    
    if (document.URL.includes("Index")) { // dafür da zu erkennen auf welcher seite wir sind (für später)
        seitenSpezifischeZutaten = burgerBroetchenAuswahl;
        //aktuelleSeite = SEITE.BURGER_DECKEL; --> hier würde die 2te darstellung des burgerbrötchen dargestellt werden
        aktuelleSeite = SEITE.BURGER_BODEN;
    }
    
    
   
    erzeugeZutatenAnsicht();
  
    // hier werden die darstellung und DIVs nach den daten erstellt und angezeigt.
    
    
    function erzeugeZutatenAnsicht(): void {
        for (let index: number = 0; index < seitenSpezifischeZutaten.length; index++) {
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
            if (( seitenSpezifischeZutaten[index] instanceof Broetchen) && (aktuelleSeite == SEITE.BURGER_DECKEL) ) {
                let burgerDeckel: Broetchen = <Broetchen> seitenSpezifischeZutaten[index];
                image.setAttribute("src",  burgerDeckel.darstellung2);
            } else {
                image.setAttribute("src", seitenSpezifischeZutaten[index].darstellung);
            }
            
            
            image.setAttribute("alt", seitenSpezifischeZutaten[index].name);
            image.setAttribute("title", seitenSpezifischeZutaten[index].name);
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
                if (( aktuelleAuswahl instanceof Broetchen) && (aktuelleSeite == SEITE.BURGER_DECKEL)) {
                    
                    let burgerDeckel: Broetchen = <Broetchen> aktuelleAuswahl;
                    vorschaubild.setAttribute("src", burgerDeckel.darstellung2);
                    
                } else {
                    vorschaubild.setAttribute("src", aktuelleAuswahl.darstellung);
                }
                
                vorschaubild.setAttribute("alt", "vorschaubild von " + aktuelleAuswahl.name);
                
            } else {
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
    function handleBestaetigung(): void {
        
        
        console.log(aktuelleAuswahl);
        switch (aktuelleSeite) {
            case SEITE.BURGER_BODEN:
            burgerKomplett.burgerBoden = <Broetchen> aktuelleAuswahl;
            break;
            case SEITE.ZUTAT_1:
            burgerKomplett.zutat1 = aktuelleAuswahl;
            break;
            case SEITE.ZUTAT_2:
            burgerKomplett.zutat2 = aktuelleAuswahl;
            break;
            case SEITE.BURGER_DECKEL:
            burgerKomplett.burgerDeckel = <Broetchen> aktuelleAuswahl;
            break;        
        }
        
        
        if (!aktuelleAuswahl) {
            alert("es wurde nichts ausgewählt, wählen sie etwas aus");
        } else {
            console.log(burgerKomplett);
        }
        
    }
}