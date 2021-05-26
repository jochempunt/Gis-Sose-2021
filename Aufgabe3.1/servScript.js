"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port) // falls ein port gesetzt ist (heruko) solle er nicht den port auf 8100 setzen
        port = 8100;
    let server = Http.createServer(); // erstellt ein httpserverobjekt
    server.addListener("request", handleRequest); // dem listener hinzugefügt werden
    server.addListener("listening", handleListen); // welche für requests und das "listening" bzw "warten auf etwas" zuständig sind
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log(_request.url);
        _response.setHeader("content-type", "text/html; charset=utf-8"); // header (meta informationen) wird gesetzt mit werten wie das die zeichen aus "utf-8"  verwendet wird
        _response.setHeader("Access-Control-Allow-Origin", "*"); // dafür da wer alles zugriff/access hat
        _response.write(_request.url); // gibt die request in der response aus 
        _response.end(); // stelle response fertig / "beende" die response
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=servScript.js.map