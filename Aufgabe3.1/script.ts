

namespace aufgabe3_1 {

let formData: FormData = new FormData(document.forms[0]);



document.getElementById("button").addEventListener("click", getData);


async function datenEinlesen(_url: string): Promise<void> {
    let response: Response = await fetch(_url);
    console.log("jetz response da");
    console.log(await response.text());
    

}
datenEinlesen("https://jochems-gis-server.herokuapp.com");

async function sendData(url: string): Promise<void> {
    
    let query1:URLSearchParams = new URLSearchParams("heyy");
    url = url + "?" + query1.toString();
    let response: Response = await fetch(url);
    let ssio: string = await response.text();
    console.log(ssio);
}


sendData("https://jochems-gis-server.herokuapp.com");




function getData(): void {
    for (let entry of formData) {
        console.log(entry);
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
    }
    
}



}