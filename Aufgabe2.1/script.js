"use strict";
/* ---------- Aufgabe 1 ---------*/
/* a) variablennamen die mit einer zahl beginnen, die ein - oder + oder anderen operator in sich hat,
außerdem sind variblennamen wie "let"  "void" nicht erlaubt, und tslint verbietet einem eine andere schreibweise
außer camelCase oder ALL_CAPS */
/*
b) bis zu func1 werden alle funktionen/mehtoden in der Reihenfolge (oben nach unten) ausgeführt, bei func1() springt das
programm zur declaration der function und führt diese aus, bei beendung der func1() springt der prorgammpointer
wieder in a1()zurück und führt console.log("Logo!") aus
*/
//C)
/* function a1(): void {
    let name: string = "Alles";
    console.log(name);
    func1();
    console.log(name);
    func2();
    console.log(name);
    func3();
 
}

a1();

function func1(): void {
    console.log("Klar?");
}

function func2(): void {
    console.log("Gute!");
}

function func3(): void {
    console.log("Logo!");
}
 */
/*------ Aufgabe 2 ------*/
/*
function a2(): void {
    let i: number = 9;

    do {
        console.log(i);
        i = i - 1;
    } while( i > 0);
}

a2(); */
/* a) auf der konsole werden die zahlen von 9-1 ausgegeben, bei jedem durchlauf der dowhile schleife
wird i um 1 decrementiert*/
/*-------- Aufgabe 3 ---------*/
/*
function a2() { // expected call signature : a2 to have a typedef (kein typ definiert zb Void)
    let i: string = 9; // type number is not assignable to string

    do {
        console.log(i);
        i = i - 1;
    } while ( i = 0); //assignments in conditional expressions are forbidden -- keine zuweisungen in conditions == statt =
}

a2();
 */
/*---- Aufgabe 4 ---- */
let x = "Hallo";
console.log(x);
func1(x);
console.log(x);
func2();
func3();
console.log(x);
function func1(y) {
    y = "Bla";
    console.log(y);
}
function func2() {
    let x = "Blubb";
    console.log(x);
}
function func3() {
    x = "Test";
}
//# sourceMappingURL=script.js.map