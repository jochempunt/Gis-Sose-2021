


namespace aufgabe2_3 {


function getRandomNumber(_min: number, _max: number): number {
        return Math.floor(Math.random() * (_max - _min) ) + _min;
}

let body: HTMLBodyElement = document.querySelector("body");
let maxWidth: number = body.clientWidth;

let maxHeight: number = body.clientHeight;
let minRect: number = 20;

let button1: HTMLButtonElement = <HTMLButtonElement> document.getElementById("button1");


class Rectangle {

    x: number;
    y: number;
    height: number;
    width: number;

    constructor() {
        this.x = getRandomNumber(0, maxWidth - minRect);
        this.y = getRandomNumber(0, maxHeight - minRect);
        this.height = getRandomNumber(minRect, maxHeight);
        this.width = getRandomNumber(minRect, maxWidth);
    }


    
}

let colors: string[] = ["red", "blue", "green", "cyan", "orange", "purple"]; 

function createRec(_event: Event): void {
    let rec: Rectangle = new Rectangle();
    let div1: HTMLDivElement = <HTMLDivElement> document.createElement("div");
    div1.setAttribute("style", "height:" + rec.height + "px;width:" + rec.width + "px;top:" + rec.y + "px;left:" + rec.x + "px;background-color:" + colors[getRandomNumber(0, colors.length)] + ";");
    body.appendChild(div1);
    
}

function clearBody(): void {
    let pelements: HTMLCollectionOf<HTMLDivElement> =   body.getElementsByTagName("div");
    pelements[0].remove();

    while (pelements[0]) {
        pelements[0].remove();
    }
}

button1.addEventListener("click", createRec );

let button2: HTMLButtonElement = <HTMLButtonElement>   document.getElementById("button2");

button2.addEventListener("click", clearBody );












}