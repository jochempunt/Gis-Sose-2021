"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_2Server = void 0;
const Http = require("http");
const Url = require("url");
var P_3_2Server;
(function (P_3_2Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT); //heruko setzt den port --> speichern den port in eine variable
    if (!port) // falls ein port gesetzt ist (heruko) solle er nicht den port auf 8100 setzen
        port = 8100;
    let server = Http.createServer(); // erstellt ein httpserverobjekt
    server.addListener("request", handleRequest); // welchem (event)listener hinzugefügt werden
    server.addListener("listening", handleListen); // welche für requests und das "listening" bzw "warten auf etwas" zuständig sind
    server.listen(port); // den port setzen auf dem  er hören soll
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        let url1 = Url.parse(_request.url, true);
        let data = url1.query;
        _response.setHeader("Access-Control-Allow-Origin", "*"); // dafür da wer alles zugriff/access hat
        switch (url1.pathname) {
            case "/html":
                _response.setHeader("content-type", "text/html; charset=utf-8");
                let respHTML = "";
                for (let key in data) {
                    respHTML += "<div>" + key + " = " + data[key];
                }
                _response.write(respHTML);
                break;
            case "/JSON":
                let kd = JSON.stringify(data);
                console.log(kd);
                _response.setHeader("content-type", "application/json; charset=utf-8"); // header (meta informationen) wird gesetzt mit werten wie das die zeichen aus "utf-8"  verwendet wird
                _response.write(kd);
                break;
            case "/3_1": // damit die verbesserung von aufgabe 3.1 auch noch aufm server läuft
                _response.setHeader("content-type", "application/json; charset=utf-8");
                let antwort = { nachricht: "alles geklappt zahlung hat funkrioniert", error: undefined, url: _request.url };
                _response.write(antwort);
            default: //simpler url bounce/echo
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log(_request.url);
                _response.write(_request.url);
                break;
        }
        _response.end(); // stelle response fertig / "beende" die response
        // gibt die request in der response aus 
    }
})(P_3_2Server = exports.P_3_2Server || (exports.P_3_2Server = {}));
//# sourceMappingURL=servScript.js.map