

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
    
    
    let kData: KreditDaten = {  vorname: formData.get("Vname").toString(), 
                                nachname: formData.get("Nachname").toString(), 
                                geschlecht: formData.get("gschlecht").toString(), 
                                gburtsDatum: new Date(formData.get("gburtsdatum").toString()), 
                                kreditkartenNummer: Number( formData.get("creditN")),
                                pin: formData.get("creditN").toString()
                            };


    let url: string = "https://jochems-gis-server.herokuapp.com/";
    let query: URLSearchParams = new URLSearchParams(<any>kData);
    url = url + "?" + query.toString();
    console.log(url);
    
  
    // await fetch(url);






    for (let entry of formData) {
        console.log(entry);
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
    }
    
} 



}