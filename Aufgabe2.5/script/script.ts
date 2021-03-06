namespace aufgabe2_5 {
    /* ------------- Hinweise: ---------------

    Für das einfachere finden vom Aufgabenrelevanten Code 
    hier die wichtigen Stellen:

    AUFGABE B):  ab zeile 150

    AUFGABE C):  ab zeile 526

    der Code ist außerdem noch etwas gewachsen, da ich einen darkmode eingeführt habe
    ( was doch komplexer war als gedacht) 



    */

    interface Zuta {
        name: string;
        preis: number;
        darstellung: string;
    } 
   

    interface Broetche {
        name: string;
        preis: number;
        darstellung: string;
        darstellung2: string;
    }
    
    interface Patt {
        name: string;
        preis: number;
        darstellung: string;
        vegetarisch: boolean;
    }
    
    
    
    interface Data {
        broetchen: Broetche[];
        zutaten: Zuta[];
        pattys: Patt[];
    }
    
    interface BurgerZutatenSpeicher {
        burgerBoden: Broetche;
        zutat1: Patt;
        zutat2: Zuta;
        burgerDeckel: Broetche;
    }
    
    
    let light: boolean = (localStorage.getItem("bool" ) == "true");
    
    
    
    enum SEITE {
        BURGER_BODEN, ZUTAT_1, ZUTAT_2, BURGER_DECKEL, RESULTAT
    }
    let aktuelleSeite: SEITE = undefined;
    
    
    
    
    
    if (document.URL.includes("Index")) { 
        aktuelleSeite = SEITE.BURGER_BODEN;
        
    } else if (document.URL.includes("zutat1")) {
        aktuelleSeite = SEITE.ZUTAT_1;
        
    } else if ( document.URL.includes("zutat2")) {
        aktuelleSeite = SEITE.ZUTAT_2;
        
    } else if ( document.URL.includes("Dach")) {
        aktuelleSeite = SEITE.BURGER_DECKEL;
        
    } else if (document.URL.includes("result")) {
        aktuelleSeite = SEITE.RESULTAT;
        
    }
    
    
    // ------------------------- darkmode Code ------------------------- //
    document.getElementById("light_dark").addEventListener("click", setDarkLight);
    
    if (aktuelleSeite != SEITE.RESULTAT) {
        if (light) {
            document.getElementById("bestaetigen").setAttribute("class", "bestaetigen");
            document.getElementById("bestaetigen2").setAttribute("class", "neon-button hidden");
            document.getElementById("zutatAnzeige").setAttribute("class", "ZutatAnzeige");
        } else {
            document.getElementById("bestaetigen").setAttribute("class", "bestaetigen hidden");
            document.getElementById("bestaetigen2").setAttribute("class", "neon-button");
            document.getElementById("zutatAnzeige").setAttribute("class", "ZutatAnzeige neon-Rand");
        }
        
        
    } else {
        if (!light) {
            document.querySelector(".resultatAnzeige").setAttribute("style", "box-shadow: 0 0 1em blueviolet,inset 0 0 1em blueviolet;border-color:rgb(255, 255, 255);");
            document.querySelector("#bestellen").setAttribute("class", document.querySelector(".bluebutton").classList.toString() + " bla");
            document.querySelector("#retry").setAttribute("class", document.querySelector(".bluebutton").classList.toString() + " bla");
        } else {
            document.querySelector(".resultatAnzeige").setAttribute("style", "");
            document.querySelector("#bestellen").setAttribute("class", "bluebutton");
            document.querySelector("#retry").setAttribute("class", "bluebutton");
        }
        
    }
    
    
    function setDarkLight(): void {
        if (light) {
            light = false;
            document.documentElement.setAttribute("data-theme", "dark");
            if (aktuelleSeite != SEITE.RESULTAT) {
                document.getElementById("bestaetigen").setAttribute("class", "bestaetigen hidden");
                document.getElementById("bestaetigen2").setAttribute("class", "neon-button");
                document.getElementById("zutatAnzeige").setAttribute("class", "ZutatAnzeige neon-Rand");
            } else {
                document.querySelector(".resultatAnzeige").setAttribute("style", "box-shadow: 0 0 1em blueviolet,inset 0 0 1em blueviolet;border-color:rgb(255, 255, 255);");
                document.querySelector("#bestellen").setAttribute("class", document.querySelector(".bluebutton").classList.toString() + " bla");
                document.querySelector("#retry").setAttribute("class", document.querySelector(".bluebutton").classList.toString() + " bla");
            }
        } else {
            light = true;
            document.documentElement.setAttribute("data-theme", "light");
            if (aktuelleSeite != SEITE.RESULTAT) {
                document.getElementById("bestaetigen").setAttribute("class", "bestaetigen");
                document.getElementById("bestaetigen2").setAttribute("class", "neon-button hidden");
                document.getElementById("zutatAnzeige").setAttribute("class", "ZutatAnzeige");
            } else {
                document.querySelector(".resultatAnzeige").setAttribute("style", "");
                document.querySelector("#bestellen").setAttribute("class", "bluebutton");
                document.querySelector("#retry").setAttribute("class", "bluebutton");
            }
            
        }
        localStorage.setItem("bool", light + "");
    }
    
    
    // ------------------ darkmode Code Ende ------------- //
    
    
    
    // -----------------  Daten von Online Einlesen ------- ///
    let speicherOpt: Data = undefined;
    console.log("start");
    
    async function datenEinlesenUndLaden(_url: string): Promise<void> {
        let response: Response = await fetch(_url);
        console.log("jetz response da");
        speicherOpt = await response.json();
        hauptProgramm();
        
    }
    
    
    datenEinlesenUndLaden("https://jochempunt.github.io/Gis-Sose-2021/Aufgabe2.5/data.json");
    
    
    
    //--------- Daten Online Einlesen Ende -----------//
    
    
    
    let burgerKomplett: BurgerZutatenSpeicher = {burgerBoden: undefined, zutat1: undefined, zutat2: undefined, burgerDeckel: undefined};
    if (sessionStorage.getItem("burgerKomplett")) {
        burgerKomplett = JSON.parse(sessionStorage.getItem("burgerKomplett"));
        console.log(burgerKomplett);
        //  console.log(speicherOpt);
        
    }
    
    
    
    function linkFreigabe(): void {
        let navlistli: HTMLLIElement = undefined;
        function setLink(_id: string, _page: string): void {
            navlistli = <HTMLLIElement> document.getElementById(_id);
            let innerText: string = navlistli.innerText;
            navlistli.innerText = "";
            let linknll: HTMLAnchorElement = <HTMLAnchorElement> document.createElement("a");
            linknll.href = _page;
            linknll.innerText = innerText;
            navlistli.appendChild(linknll);
        }
        
        if (burgerKomplett.burgerBoden) {
            setLink("nav1", "Index.html");
        }
        
        if (burgerKomplett.zutat1) {
            setLink("nav2", "zutat1.html");
        }
        
        if (burgerKomplett.zutat2) {
            setLink("nav3", "zutat2.html");
        }
        
        if (burgerKomplett.burgerDeckel) {
            setLink("nav4", "burgerDach.html");
            
        }
        
        if (burgerKomplett.burgerDeckel && burgerKomplett.zutat1 && burgerKomplett.zutat2 && burgerKomplett.burgerDeckel) {
            setLink("nav5", "result.html");
        }
        
        
    }
    
    linkFreigabe();
    //-- > burgerKomplett wird nach nund nach aufgefüllt.
    
    
    
    
    
    
    
    let zutatenAuswahl: HTMLDivElement = <HTMLDivElement> document.querySelector(".Zutatenauswahl"); //--> anzeigefeld wo alle zutaten angezeigt werden
    let checkboxListe: HTMLInputElement[] = []; //--> hier werden die checkboxen in selber reihenfolge wie die zutaten gespeichert
    
    //--> hiermit wird die speicherung und anzeige der zutaten gesteuert
    
    let aktuellePatty: Patt = undefined;
    let aktuelleBroetchen: Broetche = undefined;
    let aktuelleZutat: Zuta = undefined;
    let aktuelleZutatenLaenge: number = undefined;
    
    
    
    
    // ------------ HauptProgramm ---------------- //
    
    
    function hauptProgramm(): void {
        document.body.style.cursor = "wait";    
        
        switch (aktuelleSeite) {
            case SEITE.BURGER_BODEN:
            aktuelleZutatenLaenge = speicherOpt.broetchen.length;
            break;
            case SEITE.ZUTAT_1:
            aktuelleZutatenLaenge = speicherOpt.pattys.length;
            break;
            case SEITE.ZUTAT_2:
            aktuelleZutatenLaenge = speicherOpt.zutaten.length;
            break;
            case SEITE.ZUTAT_2:
            break;
            case SEITE.BURGER_DECKEL:
            aktuelleZutatenLaenge = speicherOpt.broetchen.length;
            break;
            
        }
        
        
        if (aktuelleSeite != SEITE.RESULTAT) {
            
            erzeugeZutatenAnsicht();
            
            // hier werden die darstellung und DIVs nach den daten erstellt und angezeigt.
            
            function erzeugeZutatenAnsicht(): void {
                for (let index: number = 0; index < aktuelleZutatenLaenge; index++) {
                    let label: HTMLLabelElement = undefined;
                    let image: HTMLImageElement = undefined;
                    
                    
                    function setImg(_name: string, _darstellung: string): void {
                        let checkbox: HTMLInputElement = <HTMLInputElement> document.createElement("input");
                        checkbox.setAttribute("id", "checkbox" + _name);
                        checkbox.setAttribute("type", "checkbox");
                        checkbox.setAttribute("class", "hidden");
                        checkbox.addEventListener("change", handleAuswahl);
                        
                        
                        
                        
                        zutatenAuswahl.appendChild(checkbox);
                        checkboxListe[checkboxListe.length] = checkbox;
                        label = <HTMLLabelElement> document.createElement("label");
                        label.setAttribute("id", "label_" + _name);
                        label.setAttribute("for", "checkbox" + _name);
                        
                        zutatenAuswahl.appendChild(label);
                        
                        
                        image = <HTMLImageElement> document.createElement("img");
                        image.setAttribute("src", _darstellung);
                        image.setAttribute("alt", _name);
                        image.setAttribute("title", _name);
                        
                        if ( index == 0) {
                            label.click();
                            console.log("hey");
                        }
                        
                    }
                    switch (aktuelleSeite) {
                        case SEITE.BURGER_BODEN:
                        let burgerBoden: Broetche = speicherOpt.broetchen[index];
                        setImg(burgerBoden.name, burgerBoden.darstellung);
                        label.appendChild(image); 
                        break;
                        case SEITE.BURGER_DECKEL:
                        let burgerDeckel: Broetche =  speicherOpt.broetchen[index];
                        setImg(burgerDeckel.name, burgerDeckel.darstellung2);
                        label.appendChild(image); 
                        break;
                        case SEITE.ZUTAT_1:
                        let zutat1: Patt = speicherOpt.pattys[index];
                        setImg(zutat1.name, zutat1.darstellung);
                        label.appendChild(image); 
                        break;
                        case SEITE.ZUTAT_2:
                        let zutat2: Zuta = speicherOpt.zutaten[index];
                        setImg(zutat2.name, zutat2.darstellung);   
                        label.appendChild(image);  
                    }
                    
                }
                
            }
            document.getElementById("bestaetigen").addEventListener("click", handleBestaetigung);
            document.getElementById("bestaetigen2").addEventListener("click", handleBestaetigung);
            
            ladeAusgewählt();
            
            
            
            function ladeAusgewählt(): void {
                switch (aktuelleSeite) {
                    case SEITE.BURGER_BODEN:
                    if (burgerKomplett.burgerBoden) {
                        let checkbox: HTMLInputElement = <HTMLInputElement> document.getElementById("checkbox" + burgerKomplett.burgerBoden.name);
                        checkbox.click();
                    }
                    break;
                    case SEITE.ZUTAT_1:
                    if (burgerKomplett.zutat1) {
                        let checkbox: HTMLInputElement = <HTMLInputElement> document.getElementById("checkbox" + burgerKomplett.zutat1.name);
                        checkbox.click();
                    }
                    break;
                    case SEITE.ZUTAT_2:
                    if (burgerKomplett.zutat2) {
                        let checkbox: HTMLInputElement = <HTMLInputElement> document.getElementById("checkbox" + burgerKomplett.zutat2.name);
                        checkbox.click();
                    }
                    break;
                    case SEITE.BURGER_DECKEL:
                    if (burgerKomplett.burgerDeckel) {
                        let checkbox: HTMLInputElement = <HTMLInputElement> document.getElementById("checkbox" + burgerKomplett.burgerDeckel.name);
                        checkbox.click();
                    }
                    break;
                }
            }
            
            
            function handleAuswahl(_event: Event): void {
                let title: HTMLHeadingElement = <HTMLHeadingElement>  document.getElementById("bezeichnung");
                let preis: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("preis");
                let currentCheckb: HTMLInputElement = <HTMLInputElement>   _event.target;
                let isNewlyChecked: boolean = false;
                let vorschaubild: HTMLImageElement = <HTMLImageElement> document.getElementById("vorschaubild");
                if (currentCheckb.checked == true) {
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
                vegetarischImage.setAttribute("src", "../darstellungen/Vegetarisch.png");
                vegetarischImage.setAttribute("alt", "vegetarisch kennzeichnung");
                vegetarischImage.setAttribute("class", "vegetarisch");
                document.body.appendChild(vegetarischImage);
            }
            
            document.getElementById("bestellen").addEventListener("click", handleBestellung);
            document.getElementById("retry").addEventListener("click", reset5seconds);
            
            
            //  ------------------ ServerCommunikation ----------------- //
            
            interface Respo {
                message: string;
                error: string;
            }
            
            
            async function handleBestellung(_event: Event): Promise<void> {
                console.log(JSON.stringify(burgerKomplett) + " Time: "  + Date.now());
                console.log("hello");
                
                let url: string = "https://gis-communication.herokuapp.com";
                
                let query1: URLSearchParams = new URLSearchParams(<any> burgerKomplett);
                url = url + "?" + query1.toString();
       
                
                
                
                let response: Response = await fetch(url);
               
                let ssio: Respo = await response.json();
                let p: HTMLHeadingElement = <HTMLHeadingElement> document.getElementById("responseText");
                 
                if (ssio.message) {
                    p.innerText = ssio.message;
                    p.className = "Message";
                    console.log("f");
                } else if (ssio.error) {
                    p.innerText = ssio.error;
                    p.className = "ErrorMessage";
                    console.log("d");
                } 
                
                
                
            }
            
            
            
            
            // ------ Reset Button ----- //
            
            function reset5seconds(): void {
                let closeTimer: HTMLHeadingElement = <HTMLHeadingElement> document.getElementById("closeMessage");
                
                
                closeTimer.innerText = "closing in 5 seconds";
                setTimeout(function(): void {
                    sessionStorage.clear();
                    window.location.href = "Index.html";
                } ,               
                           5000 );   
            }
            
            
            
            
            
            
            
            
            
            
        }
        
        document.body.style.cursor = "default";
        
        
    }
}







