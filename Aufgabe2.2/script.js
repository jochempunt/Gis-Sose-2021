"use strict";
var Aufgabe2;
(function (Aufgabe2) {
    Aufgabe2.x = 3;
    function min(...inputs) {
        let min = inputs[0];
        for (let i = 1; i < inputs.length; i++) {
            min = Number(min < inputs[i]) * min + Number(min > inputs[i]) * inputs[i];
        }
        return min;
    }
    Aufgabe2.min = min;
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
    Aufgabe2.isEven = isEven;
    let studienfach;
    (function (studienfach) {
        studienfach["MIB"] = "MIB";
        studienfach["OMB"] = "OMB";
        studienfach["MKB"] = "MKB";
    })(studienfach = Aufgabe2.studienfach || (Aufgabe2.studienfach = {}));
    function showInfo(student) {
        console.log("name: " + student.name + " immatrikulationsnummer: " + student.immatrikulationsnummer + " Studienfach: " + student.studienF);
    }
    Aufgabe2.showInfo = showInfo;
    let markus = { name: "markus", immatrikulationsnummer: 46671, studienF: studienfach.MIB };
    let angela = { name: "angela", immatrikulationsnummer: 46621, studienF: studienfach.OMB };
    let olaf = { name: "Olaf", immatrikulationsnummer: 47661, studienF: studienfach.OMB };
    Aufgabe2.studierende = [markus, angela, olaf, { name: "anna", immatrikulationsnummer: 75542, studienF: studienfach.OMB }];
})(Aufgabe2 || (Aufgabe2 = {}));
var studis = Aufgabe2.studierende;
console.log(Aufgabe2.min(1, 3, 5, -2, 6));
console.log(Aufgabe2.isEven(50));
console.log(Aufgabe2.isEven(75));
console.log(Aufgabe2.isEven(-1));
console.log(studis[0].name + " " + studis[0].studienF.toLocaleString);
Aufgabe2.showInfo(studis[0]);
//# sourceMappingURL=script.js.map