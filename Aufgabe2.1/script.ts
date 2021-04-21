
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



function multiply (_a: number, _b: number): number {
 return _a * _b;
}

function max(_a: number, _b: number): number {
 return Number(_a > _b) * _a + Number(_a <= _b) * _b; // niemand braucht if abfragen... und branchless programming ist eine gute übung
}

function count100(): void {
 let i: number = 1;
 let result: number = 0;
 while (i <= 100) {
  result += i;
  i++;
 }
 console.log(result);
}

function rando(): void {
 for (let i: number = 0; i < 10; i++) {
  console.log(Math.floor(Math.random() * 100));
 }
}

function factorial(_n: number): number {
    
    let x: number = 1;
    for ( let i: number = 2; i <= _n; i++) {
        x *= i;
    }
    return x;
}
 // ------- 2 Varianten Von Leapyear;
function leapYear(): void {
 
    let date: Date = new Date();
    let thisYear: number = date.getFullYear();
    for ( let y: number = 1900; y <= thisYear; y++) {
        let sj: number = Number(y % 4 == 0) * Number(y % 100 != 0 ) * y + y * Number(y % 400 == 0);  
        if ( sj) {
            console.log(sj);
        }
        
    }
}

function leapYear3(): void {
 
    let date: Date = new Date();
    let thisYear: number = date.getFullYear();
    for ( let y: number = 1900; y <= thisYear; y++) {
        if (((y % 4 == 0) && ( y % 100 != 0)) || ( y % 400 == 0)) { 
            console.log(y);
        }
        
    }
}
/* console.log(multiply(5, 2));
console.log(max(5, 2));
count100();
rando();
console.log(factorial(2));
console.log(factorial(0));
console.log(factorial(3));
console.log(factorial(-3)); */
//leapYear();


// ----- Aufgabe 6 ----//


function hashDreieck(): void {
 
    let out: string = "";
    for (let i: number = 1; i <= 7; i++) {
        out = out + "#";
        console.log(out);
    }
    
}

function fizzB(): void {
    for (let i: number = 1; i <= 100; i++) {
        if (i % 3 == 0) {
            console.log("fizz");
        } else if (i % 5 == 0) {
            console.log("buzz");
            
        } else {
            console.log(i);
        }
    }
}


function fizzBuzz(): void {
    for (let i: number = 1; i <= 100; i++) {
        let p: string = "";
        if (i % 3 == 0) {
            p += "fizz";
        }  
        if (i % 5 == 0) {
            p += ("buzz");   
        }
        if (p) {
            console.log(p);
        } else {
            console.log(i);
        }   
    }
}


function checker1(): void {
    let cBoard: string = "";
    for (let i: number = 0; i < 64; i++) { // 1ne forschleife reicht :P
        if (i % 8 == 0) {
           cBoard += "\n";
           if (i % 16 != 0) {
            cBoard += " ";    
           }
        }
        if ((i + 1) % 2 == 0) {
         cBoard += " ";
       } else {
        cBoard += "#";
       }
    }
    console.log(cBoard);
}



function checker2(_length: number, _height: number): void {
    let cBoard: string = "";
    for (let i: number = 0; i < (_length * _height); i++) {
        if (i % _length == 0) {
           cBoard += "\n";
           if (i % (_length * 2) != 0) {
            cBoard += " ";
           }
       }
        if ((i + 1) % 2 == 0) {
         cBoard += " ";
       } else {
        cBoard += "#";
       }
    }
    console.log(cBoard);
}



//hashDreieck();
//fizzB();
//fizzBuzz();
//checker1();



checker2(8, 8);

    






