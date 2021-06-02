

namespace aufgabe3_1 {
    
    
    
    
    
    
    
    document.getElementById("button").addEventListener("click", getData);
    
    
    
    
    interface KreditDaten {
        vorname: string;
        
        nachname: string;
        
        geschlecht: string;
        
        gburtsDatum: Date;
        
        kreditkartenNummer: number;
        
        pin: string;
        
        
    }
    
    
    
    
    
    async function getData(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
       
       
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
            gburtsDatum: new Date(formData.get("gburtsdatum").toString()), 
            kreditkartenNummer: Number( formData.get("creditN")),
            pin: formData.get("creditN").toString()
        };
        
        
            interface Antwort {
            nachricht: string;
            error: string;
            url: string;
        }
        
        
            let url: string = "https://jochems-gis-server.herokuapp.com";
            let query: URLSearchParams = new URLSearchParams(<any>kData);
            url = url + "?" + query.toString();
        //console.log(url);
        
        
        
        
            let resp: Response = await fetch(url);
        
        
        
            let antwort: Antwort = await resp.json();
            console.log(antwort);
        
    } else{
        alert("Sie haben kein Geschlecht ausgewählt");
    }
    
    
    
}



}