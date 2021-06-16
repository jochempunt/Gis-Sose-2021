import * as Mongo from "mongodb";
import * as Http from "http";
//import { url } from "inspector";
import { ParsedUrlQuery } from "querystring";

import * as Url from "url";



export namespace server3_4 {
    
    
    
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
    
    
    
    let students: Mongo.Collection = null;
    let uri: string = "mongodb+srv://josh:bigpp@test.48otg.mongodb.net/test?retryWrites=true&w=majority";
    //let uri2:string = "mongodb://localhost:27017";
    connectToDB(uri);
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        
        let urlI: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        
        switch (urlI.pathname) {
            case "/refresh":
            let studenten: Student[] = await getEntryDb();
            _response.write(JSON.stringify(studenten));  
            
            break;
            case "/insert":
            let data: ParsedUrlQuery = urlI.query;
            let st: Student = {name: data["name"].toString(), firstname: data["firstname"].toString(), registration: Number( data["registration"].toString()) };
            console.log(data);
            insertStudent(st);
            
            
            break;
            case "/delete":
            
            let dataD: ParsedUrlQuery = urlI.query;
            let idDelete: string = dataD["_id"].toString();
            let objDel: Mongo.ObjectId = new Mongo.ObjectId(idDelete);
            students.findOneAndDelete({_id: objDel} );
            console.log(objDel.toHexString());
            
            break;        
        }
        
        
        
        
        
        
        
        
        _response.end();
    }
    
    
    function insertStudent(_student: Student): void {
        students.insertOne(_student);
    }
    
    function deleteStudent(_sId: string): void {
        students.deleteOne({_id: _sId});
    }
    async function getEntryDb(searchRegistration?: string): Promise<Student[]> {
        let cursor: Mongo.Cursor = null;
        if (searchRegistration) {
            cursor = students.find({registration: Number(searchRegistration)});
        } else {
            cursor = students.find();  
        }
        
        let result: Student[] = await cursor.toArray();
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
    
    
    async function connectToDB(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        students = mongoClient.db("test").collection("Students");
        /* let students: Mongo.Collection = mongoClient.db("test").collection("Students");
        
        
        
        let cursor: Mongo.Cursor = students.find();
        
        
        let result: Student[] = await cursor.toArray();
        console.log(result);
        
        */
    }
    
    
    
    
    
    interface Student {
        name: string;
        firstname: string;
        registration: number;
    }
}