///script.ts
namespace aufgabe2_33 {
    
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
        mitKoernern: boolean;
        constructor(_name: string, _preis: number, _darstellung: string, _mitKoernern: boolean) {
            super(_name, _preis, _darstellung);
            this.mitKoernern = _mitKoernern;
        }
        
        
        
    }
    
    class Patty extends Zutat {
        vegetarisch: Boolean;
        constructor(_name: string, _preis: number, _darstellung: string, _veggie: boolean) {
            super(_name, _preis, _darstellung);
            this.vegetarisch = _veggie;
        }
    }
    
    
    interface BurgerZutatenSpeicher {
        burgerBoden: Broetchen;
        zutat1: Zutat;
        zutat2: Zutat;
        burgerDeckel: Broetchen;
    }
    
    
    
    let burgerKomplett: BurgerZutatenSpeicher = {burgerBoden: undefined, zutat1: undefined, zutat2: undefined, burgerDeckel: undefined};

    let burgerBroetchenAuswahl: Broetchen[] = [];
    let zutatenListe: Zutat[] = [];
    let pattyListe: Zutat[] = [];
    
    function datenEinlese(): void {
        for (let i: number = 0; i < daten.length; i++ ) {
            let stringArray: string[] = daten[i].split(",");
            
            switch (stringArray[0]) {
                case "BROETCHEN":
                if (stringArray.length == 5) {
                    let broetchen: Broetchen = new Broetchen(stringArray[1], Number(stringArray[2]) , stringArray[3], Boolean(stringArray[4]));
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
    
    
    
    let zutatenAuswahl: HTMLDivElement = <HTMLDivElement> document.querySelector(".Zutatenauswahl");
    
    let seitenSpezifischeZutaten: Zutat[] = []; 
    
    let checkboxListe: HTMLInputElement[] = [];

    let aktuelleSeite: SEITE = undefined;

    enum SEITE {
        BURGER_BODEN, ZUTAT_1, ZUTAT_2, BURGER_DECKEL
    }
    
    if (document.URL.includes("Index")) {
        seitenSpezifischeZutaten = burgerBroetchenAuswahl;
        aktuelleSeite = SEITE.BURGER_BODEN;
    }
    
    
    
    erzeugeZutatenAnsicht(seitenSpezifischeZutaten);
    document.getElementById("bestaetigen").addEventListener("click", handleBestaetigung);
    
    function erzeugeZutatenAnsicht(_zutatenliste: Zutat[]): void {
        for (let index: number = 0; index < zutatenListe.length; index++) {
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
            console.log(index);
            let image: HTMLImageElement = <HTMLImageElement> document.createElement("img");
            image.setAttribute("src", _zutatenliste[index].darstellung);
            image.setAttribute("alt", _zutatenliste[index].name);
            image.setAttribute("title", _zutatenliste[index].name);
            label.appendChild(image);   
        }
        
    }
    
    
    
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
                title.innerText = seitenSpezifischeZutaten[i].name; 
                preis.innerText = seitenSpezifischeZutaten[i].preis + "€";
                vorschaubild.setAttribute("src", seitenSpezifischeZutaten[i].darstellung);
                vorschaubild.setAttribute("alt", "vorschaubild von " + seitenSpezifischeZutaten[i].name);
                
            } else {
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
    
    
    function handleBestaetigung(): void {
        let etwasAusgewählt: boolean = false;
        for (let i: number = 0; i < checkboxListe.length; i++) {
            if (checkboxListe[i].checked) {
                console.log(seitenSpezifischeZutaten[i]);
                switch (aktuelleSeite) {
                    case SEITE.BURGER_BODEN:
                        burgerKomplett.burgerBoden = <Broetchen> seitenSpezifischeZutaten[i];
                        break;
                    case SEITE.ZUTAT_1:
                        burgerKomplett.zutat1 = seitenSpezifischeZutaten[i];
                        break;
                    case SEITE.ZUTAT_2:
                        burgerKomplett.zutat2 = seitenSpezifischeZutaten[i];
                        break;
                    case SEITE.BURGER_DECKEL:
                        burgerKomplett.burgerDeckel = <Broetchen>seitenSpezifischeZutaten[i];
                        break;        
                }
                console.log(burgerKomplett);
                etwasAusgewählt = true;
                break;
            }
        }

        if (!etwasAusgewählt) {
            //console.log("es wurde nichts ausgewählt, wählen sie etwas aus");
            alert("es wurde nichts ausgewählt, wählen sie etwas aus");
        }
    }
    
    
    
    
    
    
    
    
    
    
    
}