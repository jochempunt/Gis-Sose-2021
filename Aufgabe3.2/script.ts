

namespace aufgabe3_2 {
    
    
    
    
    
    
    
    document.getElementById("button").addEventListener("click", getData);
    document.getElementById("button2").addEventListener("click", getData);
    
    
    
    
    interface KreditDaten {
        vorname: string;
        
        nachname: string;
        
        geschlecht: string;
        
        gburtsDatum: string;
        
        kreditkartenNummer: string;
        
        pin: string;
        
        
    }
    
    
    
    
    
    async function getData(e: Event): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let button: HTMLButtonElement = <HTMLButtonElement>   e.target;
        

        

        for (let entry of formData) {
            if (entry[1] == "") {
                alert(entry[0] + " ist leer, bitte füllen sie das feld aus...");
                return;
            }
        }
        
        if ( formData.get("gschlecht") != null) {
            let kData: KreditDaten = {  vorname: formData.get("Vname").toString(), 
            nachname: formData.get("Nachname").toString(), 
            geschlecht: formData.get("gschlecht").toString(), 
            gburtsDatum: formData.get("gburtsdatum").toString(), 
            kreditkartenNummer:  formData.get("creditN").toString(),
            pin: formData.get("ccpin").toString()
        };
        
            let url: string = "https://jochems-gis-server.herokuapp.com";
            
            if ( button.id == "button") { 
                url += "/JSON";
            } else if (button.id == "button2") {
                url += "/html";
                console.log("hallo");
            }
        
           
            let query: URLSearchParams = new URLSearchParams(<any>kData);
            url = url + "?" + query.toString();
            //console.log(url);
        
        
        
        
            let resp: Response = await fetch(url);
        
            if ( button.id == "button") { 
                let antwort: KreditDaten = await resp.json();
                console.log(kData);
                console.log(antwort);
            } else if (button.id == "button2") {
                let anzeige: HTMLDivElement = <HTMLDivElement> document.getElementById("anzeige");
                let antwort: string = await resp.text();
                anzeige.innerHTML = antwort;
            }
        
            
        
    } else {
        alert("Sie haben kein Geschlecht ausgewählt");
    }
    
    
    
}



}