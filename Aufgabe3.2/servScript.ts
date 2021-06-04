import * as Http from "http";
//import { url } from "inspector";
import { ParsedUrlQuery } from "querystring";

import * as Url from "url";

export namespace P_3_2Server {
    console.log("Starting server");
    let port: number = Number(process.env.PORT); //heruko setzt den port --> speichern den port in eine variable
    if (!port) // falls ein port gesetzt ist (heruko) solle er nicht den port auf 8100 setzen
       port = 8100;

    let server: Http.Server = Http.createServer(); // erstellt ein httpserverobjekt
    server.addListener("request", handleRequest); // welchem (event)listener hinzugefügt werden
    server.addListener("listening", handleListen); // welche für requests und das "listening" bzw "warten auf etwas" zuständig sind
    server.listen(port); // den port setzen auf dem  er hören soll

    function handleListen(): void { // wenn er anfängz zu listenen soll er  auf der serverkonsole "listening" ausgeben
        console.log("Listening");
    }



   


    interface Antwort {
        nachricht: string;
        error: string;
        url: string;

    }
    

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void { //funktion für das handlen von requests -- > bekommt antwort und anfrage als parameter
       
        
        
        let url1: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

        let data: ParsedUrlQuery =    url1.query;
        
        _response.setHeader("Access-Control-Allow-Origin", "*"); // dafür da wer alles zugriff/access hat
        
        switch (url1.pathname) {
            case"/html":
                _response.setHeader("content-type", "text/html; charset=utf-8");
                let respHTML: string = "";
                for ( let key in data) {
                    respHTML += "<div>" + key + " = " + data[key] + "</div>";
                }
                _response.write(respHTML);

                break;
            case"/JSON":
                let kd: string = JSON.stringify(data);
                console.log(kd);
                _response.setHeader("content-type", "application/json; charset=utf-8"); // header (meta informationen) wird gesetzt mit werten wie das die zeichen aus "utf-8"  verwendet wird
                _response.write(kd);
                break;
            case "/3_1": // damit die verbesserung von aufgabe 3.1 auch noch aufm server läuft
                _response.setHeader("content-type", "application/json; charset=utf-8");
                let antwort: Antwort = {nachricht: "alles geklappt zahlung hat funkrioniert", error: undefined, url: _request.url};
                _response.write(JSON.stringify(antwort));

            default: //simpler url bounce/echo
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log(_request.url);
                _response.write(_request.url);
                break;        
        }
        _response.end(); // stelle response fertig / "beende" die response
    
      
        
        
        
    
        
        
         // gibt die request in der response aus 
    
    }
}
