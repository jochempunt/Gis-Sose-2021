import * as Http from "http";

export namespace P_3_1Server {
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
        let ant: Antwort = {nachricht: "alles geklappt", error: undefined, url: _request.url};
        console.log(_request.url);
        console.log(JSON.stringify(ant));
        
        _response.setHeader("content-type", "application/json; charset=utf-8"); // header (meta informationen) wird gesetzt mit werten wie das die zeichen aus "utf-8"  verwendet wird
        _response.setHeader("Access-Control-Allow-Origin", "*"); // dafür da wer alles zugriff/access hat
        _response.write(JSON.stringify(ant) ) ; // gibt die request in der response aus 
        _response.end(); // stelle response fertig / "beende" die response
    }
}
