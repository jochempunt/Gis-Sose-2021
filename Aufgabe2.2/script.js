"use strict";
var Aufgabe2_2;
(function (Aufgabe2_2) {
    //--- a ---//
    function min(...inputs) {
        let min = inputs[0];
        for (let i = 1; i < inputs.length; i++) {
            min = Number(min < inputs[i]) * min + Number(min > inputs[i]) * inputs[i];
        }
        return min;
    }
    //--- b ---//
    function isEven(n) {
        n = Math.abs(n);
        if (n == 0) {
            return true;
        }
        else if (n == 1) {
            return false;
        }
        else {
            return isEven(n - 2);
        }
    }
    //--- c--- ///
    let studySubject;
    (function (studySubject) {
        studySubject["MIB"] = "MIB";
        studySubject["OMB"] = "OMB";
        studySubject["MKB"] = "MKB";
    })(studySubject || (studySubject = {}));
    class Student {
        constructor(_name, _immanr, _subj) {
            this.name = _name;
            this.immatrikulationsnr = _immanr;
            this.subj = _subj;
        }
        showInfo() {
            console.log("name: " + this.name + " immatrikulationsnummer: " + this.immatrikulationsnr + " Studienfach: " + this.subj);
        }
    }
    function showInfo(student) {
        console.log("name: " + student.name + " immatrikulationsnummer: " + student.i_number + " Studienfach: " + student.studienF.toString());
    }
    let markus = { name: "markus", i_number: 46671, studienF: studySubject.MIB };
    let angela = { name: "angela", i_number: 46621, studienF: studySubject.OMB };
    let olaf = { name: "Olaf", i_number: 47661, studienF: studySubject.OMB };
    let studentss = [markus, angela, olaf, { name: "anna", i_number: 75542, studienF: studySubject.OMB }];
    let holger = new Student("holger", 46671, studySubject.MIB);
    console.log(min(1, 3, 5, -2, 6));
    console.log(isEven(50));
    console.log(isEven(75));
    console.log(isEven(-1));
    console.log(studentss[0].name + " " + studentss[0].studienF.toString());
    showInfo(studentss[0]);
    holger.showInfo();
    ///---- Aufgabe 2 ---///
    function reverse(numberArray) {
        let result = [];
        let ii = 0;
        for (let i = numberArray.length - 1; i >= 0; i--) {
            result[ii] = numberArray[i];
            ii++;
        }
        return result;
    }
    function join(..._arrays) {
        let resultArray = [];
        let arrayIndex = 0;
        for (let i = 0; i < _arrays.length; i++) {
            for (let ii = 0; ii < _arrays[0].length; ii++) {
                resultArray[arrayIndex] = _arrays[i][ii];
                arrayIndex++;
            }
        }
        return resultArray;
    }
    function split(_array, _index1, _index2) {
        if (_index1 >= 0 && _index1 < _array.length && _index2 >= 0 && _index2 < _array.length) {
            let resultA = [];
            let index1 = Number(_index1 < _index2) * _index1 + Number(_index1 > _index2) * _index2;
            let index2 = Number(_index2 > _index1) * _index2 + Number(_index2 < _index1) * _index1;
            let i = 0;
            for (index1; index1 <= index2; index1++) {
                resultA[i] = _array[index1];
                i++;
            }
            return resultA;
        }
        else {
            console.log(" error with indeces");
            return undefined;
        }
    }
    function arrayToString(_array) {
        let arrayString = "(";
        for (let i = 0; i < _array.length; i++) {
            arrayString += _array[i];
            if (i != _array.length - 1) {
                arrayString += ",";
            }
        }
        arrayString += ")";
        return arrayString;
    }
    let numberrs = [1, 2, 3, 4];
    let numberrss = [4, 5, 6, 7];
    let numberrsss = [7, 8, 9, 10];
    let numberrssss = [11, 12, 13, 14];
    let testReverse = reverse(numberrssss);
    let testArrayJoined = join(numberrs, numberrss, numberrsss, numberrssss);
    let testArraySplitted = split(testArrayJoined, 1, 5);
    console.log(arrayToString(testReverse));
    console.log(arrayToString(testArrayJoined));
    console.log(arrayToString(testArraySplitted));
    // --- Aufgabe 3 ---//
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    context.lineWidth = 2.0;
    context.strokeStyle = "black";
    context.lineCap = "round";
    context.moveTo(0, 0);
    context.fillStyle = "green";
    context.fillRect(0, 250, 500, 150);
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 500, 250);
    drawCloud(50, 50, 15, "white");
    drawCloud(150, 150, 25, "white");
    drawCloud(350, 100, 15, "white");
    context.fillStyle = "orange";
    context.fillRect(270, 180, 70, 70);
    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(270, 180);
    context.lineTo(305, 145);
    context.lineTo(340, 180);
    context.closePath();
    //context.stroke();
    context.fillStyle = "red";
    context.fill();
    context.fillStyle = "brown";
    context.fillRect(30, 240, 30, 100);
    drawCloud(2, 230, 20, "darkgreen");
    function drawCloud(_positionx, _positiony, _size, _color) {
        context.beginPath();
        context.arc(_positionx, _positiony, _size, 0, 2 * Math.PI, false);
        context.moveTo(_positionx + _size, _positiony + _size);
        context.arc(_positionx + _size, _positiony + _size, _size, 0, 2 * Math.PI, false);
        context.moveTo(_positionx + _size * 2 + 5, _positiony + _size);
        context.arc(_positionx + _size * 2 + 5, _positiony + _size, _size + _size / 3, 0, 2 * Math.PI, false);
        context.moveTo(_positionx + _size * 3 + 10, _positiony + _size);
        context.arc(_positionx + _size * 3 + 10, _positiony + _size, _size + 1, 0, 2 * Math.PI, false);
        context.moveTo(_positionx + _size * 4 + 15, _positiony);
        context.arc(_positionx + _size * 4 + 15, _positiony, _size + (_size / 3), 0, 2 * Math.PI, false);
        context.moveTo(_positionx + _size * 3 + 10, _positiony - 20);
        context.arc(_positionx + _size * 3 + 10, _positiony - 20, _size + _size / 3, 0, 2 * Math.PI, false);
        context.moveTo(_positionx + _size * 2 + 5, _positiony - 25);
        context.arc(_positionx + _size * 2 + 5, _positiony - 25, _size + 11, 0, 2 * Math.PI, false);
        context.moveTo(_positionx + _size, _positiony - _size);
        context.arc(_positionx + _size, _positiony - _size, _size + _size / 3, 0, 2 * Math.PI, false);
        context.fillStyle = _color;
        context.fill();
    }
    let canvas2 = document.getElementById("Canvas2");
    let context2 = canvas2.getContext("2d");
    let maxWidth = 500;
    let maxHeight = 500;
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    class Rectangle {
        constructor() {
            this.posX = getRandomNumber(0, 490);
            this.posY = getRandomNumber(0, 490);
            this.height = getRandomNumber(10, (maxHeight - this.posY));
            this.width = getRandomNumber(10, (maxWidth - this.posX));
            console.log(maxHeight);
        }
        drawRectangle(color) {
            console.log(this.posX);
            console.log(this.width);
            context2.fillStyle = color;
            context2.fillRect(this.posX, this.posY, this.width, this.height);
        }
    }
    let rectangles = [new Rectangle(), new Rectangle(), new Rectangle(), new Rectangle(), new Rectangle];
    let colors = ["red", "blue", "green", "cyan", "orange", "purple"];
    let widthXx = 0;
    let heightYy = 0;
    let forBack = true;
    function drawRectangles_repeat() {
        deLetus();
        if (widthXx >= (maxWidth / 20)) {
            forBack = false;
            widthXx = 0;
            heightYy = 0;
        }
        else if (widthXx <= (-maxWidth / 20)) {
            forBack = true;
            widthXx = 0;
            heightYy = 0;
        }
        if (forBack) {
            widthXx++;
            heightYy--;
        }
        else {
            widthXx--;
            heightYy++;
        }
        for (let i = 0; i < rectangles.length; i++) {
            let randomColor = getRandomNumber(0, colors.length - 1);
            rectangles[i].height = rectangles[i].height + widthXx;
            rectangles[i].width = rectangles[i].width + heightYy;
            rectangles[i].drawRectangle(colors[randomColor]);
        }
    }
    setInterval(drawRectangles_repeat, 50);
    function deLetus() {
        context2.clearRect(0, 0, 500, 500);
    }
})(Aufgabe2_2 || (Aufgabe2_2 = {}));
//# sourceMappingURL=script.js.map