"use strict";
var Aufgabe2_2;
(function (Aufgabe2_2) {
    //#region Aufgabe 1 
    //--- a ---//
    function min(..._inputs) {
        let min = _inputs[0];
        for (let i = 1; i < _inputs.length; i++) {
            min = Number(min < _inputs[i]) * min + Number(min > _inputs[i]) * _inputs[i];
        }
        return min;
    }
    //--- b ---//
    function isEven(_n) {
        _n = Math.abs(_n);
        if (_n == 0) {
            return true;
        }
        else if (_n == 1) {
            return false;
        }
        else {
            return isEven(_n - 2);
        }
    }
    //--- c--- ///
    let SUBJECT_COURSE;
    (function (SUBJECT_COURSE) {
        SUBJECT_COURSE["MIB"] = "MIB";
        SUBJECT_COURSE["OMB"] = "OMB";
        SUBJECT_COURSE["MKB"] = "MKB";
    })(SUBJECT_COURSE || (SUBJECT_COURSE = {}));
    function showInfo(_st) {
        console.log("name: " + _st.name + " immatrikulationsnummer: " + _st.i_number + " Studienfach: " + _st.studieCourse);
    }
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
    let markus = { name: "markus", i_number: 46671, studieCourse: SUBJECT_COURSE.MIB };
    let angela = { name: "angela", i_number: 46621, studieCourse: SUBJECT_COURSE.OMB };
    let olaf = { name: "Olaf", i_number: 47661, studieCourse: SUBJECT_COURSE.OMB };
    let studentss = [markus, angela, olaf, { name: "anna", i_number: 75542, studieCourse: SUBJECT_COURSE.OMB }];
    let holger = new Student("holger", 46671, SUBJECT_COURSE.MIB);
    console.log(min(1, 3, 5, -2, 6));
    console.log(isEven(50));
    console.log(isEven(75));
    console.log(isEven(-1)); // ohne Math.abs(solute) == stack overflow
    console.log(studentss[0].name + " " + studentss[0].studieCourse.toString());
    for (let i = 0; i < studentss.length; i++) {
        showInfo(studentss[i]);
    }
    holger.showInfo();
    //#endregion   
    //#region aufgabe 2
    function reverse(_numberArray) {
        let result = [];
        let ii = 0; // "ii" ist manchmal passender als einfach nur "j"
        for (let i = _numberArray.length - 1; i >= 0; i--) {
            result[ii] = _numberArray[i];
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
            let i = 0; // [ja das ist ein special extra index]
            for (index1; index1 <= index2; index1++) {
                resultA[i] = _array[index1];
                i++;
            }
            return resultA;
        }
        else {
            console.log(" error with indeces"); // könnte auch theoretisch n error throwen aber dann stoppt ja wahrsch. mein ganzes programm
            return undefined;
        }
    }
    let arr = [5, 42, 17, 2018, -10, 60, -10010];
    let arrBack = reverse(arr);
    console.log(arr);
    console.log(arrBack);
    console.log(join(arr, [15, 9001, -440]));
    console.log(join([123, 666, -911], arr, [15, 9001, -440, 1024])); // Bonus b)
    arr = split(arr, 0, 4);
    console.log(arr);
    console.log(split(arr, 1, 2));
    console.log(split(arr, 2, 0)); // Bonus c)  //habe hier einfach eingeführt das die reihenfolge in welchen die indizes angegeben worden sind egal wären
    console.log(split(arr, -1, 2)); // Bonus c)
    console.log(split(arr, 0, 7)); // Bonus c)
    //#endregion
    //#region aufgabe 3
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
    context.beginPath(); // das hier ist das dach
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
    // ja ich hätte es ,mit arc oder bezier curven lösen können.
    //aber das hier funktioniert ja auch -- entschuldigt die vielen magic numbers [die Funktion ist magisch]
    // die funktion funktioniert auserdem nur von einer _size ab 15 und wenns zu groß wird.
    // aber sonst ist die funktion echt super.
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
    let minheightRect = 10;
    let minWidthRect = 10;
    function getRandomNumber(_min, _max) {
        return Math.floor(Math.random() * (_max - _min)) + _min;
    }
    class Rectangle {
        constructor() {
            this.posX = getRandomNumber(0, maxWidth - minWidthRect);
            this.posY = getRandomNumber(0, maxHeight - minheightRect);
            this.height = getRandomNumber(minheightRect, (maxHeight - this.posY));
            this.width = getRandomNumber(minWidthRect, (maxWidth - this.posX));
        }
        drawRectangle(color) {
            context2.fillStyle = color;
            context2.fillRect(this.posX, this.posY, this.width, this.height);
        }
    }
    let rectangles = [new Rectangle(), new Rectangle(), new Rectangle(), new Rectangle(), new Rectangle];
    let colors = ["red", "blue", "green", "cyan", "orange", "purple"]; // sorry hierfür. Bissl unangenehm anzuschauen. aber ohne die animation also nur neuladen isses ganz schön eig
    let widthXx = 0; // xX und yY sind die werte um den die eigentlichen werte verändert werden
    let heightYy = 0;
    let forBack = true; // vorwärts/ rückwärts variable
    function deLetus() {
        context2.clearRect(0, 0, maxWidth, maxHeight);
    }
    function drawRectangles_repeat() {
        deLetus(); // canvas wird gecleared
        if (widthXx >= (maxWidth / 20)) { // durch 20 hat hier am besten visuell funktioniert. 
            // ich habe das zuerst auch mit position gemacht, mir gefiel das aber besser
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
            let randomColor = getRandomNumber(0, colors.length);
            rectangles[i].height = rectangles[i].height + widthXx;
            rectangles[i].width = rectangles[i].width + heightYy;
            rectangles[i].drawRectangle(colors[randomColor]);
        }
    }
    setInterval(drawRectangles_repeat, 50); // Ich hätte setTimeout() in eine for schleife machen können
    //dann wäre es nur halt nicht durchgänging 
    //#endregion
})(Aufgabe2_2 || (Aufgabe2_2 = {}));
//# sourceMappingURL=script.js.map