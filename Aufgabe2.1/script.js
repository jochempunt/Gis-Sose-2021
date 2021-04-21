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
/* let x: string = "Hallo";

console.log(x);
func1(x);
console.log(x);
func2();
func3();
console.log(x);

function func1(y: string): void {
 y = "Bla";
 console.log(y);
}

function func2(): void {
 let x: string = "Blubb";
 console.log(x);
}

function func3(): void {
 x = "Test";
} */
/* a)
vermutete ausgabe :
"hallo" {globales x}
"bla" {lokales y wird lokal verändert}
"hallo" {x wurde nicht überschrieben da y lokal war}
"blubb" {es wird lokal ein neues X erstellt und ausgegeben}
"test" { func3 hat keine parameter, es nutzt hier also einfach das globale x}

*/
/*b)
globale variable --> überall im programm nutzbar;
lokale variable --> hat nur in einem bereich wirkung, hat keine wirkung auf globales
übergabeparameter --> eine lokale variable innerhalb einer funktion die von auserhalb einen wert nbekommt
AUßER : bei objekten, arrays etc wo in den variablen  eine referenz weitergegeben wird.


unterschied variablen & funktionen :  funktionen können auch unterhalb ihrer ausführung deklariert werden,
bei direkten aufrufen von variablen ist dies nicht möglich.

globalität und lokalität gelten aber ebenfalls für funktionen


*/
/*-------- Aufgabe 5 ----------*/
function multiply(_a, _b) {
    return _a * _b;
}
function max(_a, _b) {
    return Number(_a > _b) * _a + Number(_a <= _b) * _b;
}
function count100() {
    let i = 1;
    let result = 0;
    while (i <= 100) {
        result += i;
        i++;
    }
    console.log(result);
}
function rando() {
    for (let i = 0; i < 10; i++) {
        console.log(Math.floor(Math.random() * 100));
    }
}
console.log(multiply(5, 2));
console.log(max(5, 2));
count100();
rando();
//# sourceMappingURL=script.js.map