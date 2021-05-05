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
    
    
   /*  interface BurgerZutatenSpeicher {
        burgerBoden: Broetchen;
        zutat1: Zutat;
        zutat2: Zutat;
        burgerDeckel: Broetchen;
    }*/
    
    
    
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

    
         
     

    
    
    
    
    
    
    
    
    
}