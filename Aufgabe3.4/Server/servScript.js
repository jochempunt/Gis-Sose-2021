"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server3_4 = void 0;
const Mongo = require("mongodb");
const Http = require("http");
const Url = require("url");
var server3_4;
(function (server3_4) {
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
    let students = null;
    let uri = "mongodb+srv://josh:bigpp@test.48otg.mongodb.net/test?retryWrites=true&w=majority";
    //let uri2:string = "mongodb://localhost:27017";
    connectToDB(uri);
    async function handleRequest(_request, _response) {
        let urlI = Url.parse(_request.url, true);
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "application/json; charset=utf-8");
        switch (urlI.pathname) {
            case "/refresh":
                let studenten = await getEntryDb();
                _response.write(JSON.stringify(studenten));
                break;
            case "/insert":
                let data = urlI.query;
                let st = { name: data["name"].toString(), firstname: data["firstname"].toString(), registration: Number(data["registration"].toString()) };
                console.log(data);
                insertStudent(st);
                break;
            case "/delete":
                let dataD = urlI.query;
                let idDelete = dataD["_id"].toString();
                let objDel = new Mongo.ObjectId(idDelete);
                students.findOneAndDelete({ _id: objDel });
                console.log(objDel.toHexString());
                break;
        }
        _response.end();
    }
    function insertStudent(_student) {
        students.insertOne(_student);
    }
    /*function deleteStudent(_sId: string): void {
        students.deleteOne({_id: _sId});
    }*/
    async function getEntryDb(searchRegistration) {
        let cursor = null;
        if (searchRegistration) {
            cursor = students.find({ registration: Number(searchRegistration) });
        }
        else {
            cursor = students.find();
        }
        let result = await cursor.toArray();
        return result;
    }
    /*
    async function updateAllStudents(): Promise<string> {
        let studentlistTemp: Student[] = await getEntryDb();
        let resultString: string =  "";
        for (let student1 of studentlistTemp) {
            resultString += "<div class='student'><p>" + student1.name + "<p>" + "<p>" + student1.firstname + "</p>" + "<p>" + student1.registration + "</p></div>";
        }
        
        return resultString;
    }*/
    async function connectToDB(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        students = mongoClient.db("test").collection("Students");
        /* let students: Mongo.Collection = mongoClient.db("test").collection("Students");
        
        
        
        let cursor: Mongo.Cursor = students.find();
        
        
        let result: Student[] = await cursor.toArray();
        console.log(result);
        
        */
    }
})(server3_4 = exports.server3_4 || (exports.server3_4 = {}));
//# sourceMappingURL=servScript.js.map