

namespace aufgabe3_1 {
    
    let formData: FormData = new FormData(document.forms[0]);
    
    
    
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
        
        formData.getAll("gschlecht");



        let kData: KreditDaten = {  vorname: formData.get("Vname").toString(), 
                                    nachname: formData.get("Nachname").toString(), 
                                    geschlecht: formData.getAll("gschlecht").toString(), 
                                    gburtsDatum: new Date(formData.get("gburtsdatum").toString()), 
                                    kreditkartenNummer: Number( formData.get("creditN")),
                                    pin: formData.get("creditN").toString()
        };
    
    
        let url: string = "https://jochems-gis-server.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>kData);
        url = url + "?" + query.toString();
        console.log(url);
    
    
        let resp: Response = await fetch(url);
        //let kdd: string = JSON.parse(await resp.json());
        console.log(resp);
    
}



}