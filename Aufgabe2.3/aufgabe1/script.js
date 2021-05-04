"use strict";
var aufgabe2_3;
(function (aufgabe2_3) {
    function getRandomNumber(_min, _max) {
        return Math.floor(Math.random() * (_max - _min)) + _min;
    }
    let body = document.querySelector("body");
    let maxWidth = body.clientWidth;
    let maxHeight = body.clientHeight;
    let minRect = 20;
    let button1 = document.getElementById("button1");
    class Rectangle {
        constructor() {
            this.x = getRandomNumber(0, maxWidth - minRect);
            this.y = getRandomNumber(0, maxHeight - minRect);
            this.height = getRandomNumber(minRect, maxHeight);
            this.width = getRandomNumber(minRect, maxWidth);
        }
    }
    let colors = ["red", "blue", "green", "cyan", "orange", "purple"];
    function createRec(_event) {
        let rec = new Rectangle();
        let div1 = document.createElement("div");
        div1.setAttribute("style", "height:" + rec.height + "px;width:" + rec.width + "px;top:" + rec.y + "px;left:" + rec.x + "px;background-color:" + colors[getRandomNumber(0, colors.length)] + ";");
        body.appendChild(div1);
    }
    function clearBody() {
        let pelements = body.getElementsByTagName("div");
        pelements[0].remove();
        while (pelements[0]) {
            pelements[0].remove();
        }
    }
    button1.addEventListener("click", createRec);
    let button2 = document.getElementById("button2");
    button2.addEventListener("click", clearBody);
})(aufgabe2_3 || (aufgabe2_3 = {}));
//# sourceMappingURL=script.js.map