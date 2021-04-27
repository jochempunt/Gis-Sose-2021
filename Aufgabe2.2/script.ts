namespace Aufgabe2 {
  export let x: number = 3;


  export function min (...inputs: number[]): number {
    
    let min: number = inputs[0];

    for (let  i: number = 1; i < inputs.length; i++) {
      min = Number(min < inputs[i]) * min + Number(min > inputs[i]) * inputs[i]; 
    }
    return min;
  }


  export function isEven (n: number): boolean {
    n = Math.abs(n);
    if ( n == 0) {
      return true;
    } else if ( n == 1) {
      return false;
    } else {
      return isEven(n - 2);
    }

  }
  
  export enum studienfach {
    MIB= "MIB", OMB= "OMB", MKB= "MKB"
  }

  export interface Studierender { 
    name: string;

    immatrikulationsnummer: number;

    studienF: studienfach;



  }
  export function showInfo (student: Studierender): void {
        console.log("name: " + student.name + " immatrikulationsnummer: " + student.immatrikulationsnummer + " Studienfach: " + student.studienF);        
  }

  let markus: Studierender = { name: "markus", immatrikulationsnummer: 46671, studienF: studienfach.MIB};

  let angela: Studierender = { name: "angela", immatrikulationsnummer: 46621, studienF: studienfach.OMB};

  let olaf: Studierender = { name: "Olaf", immatrikulationsnummer: 47661, studienF: studienfach.OMB};

  export let studierende: Studierender[] = [markus, angela, olaf, {name: "anna", immatrikulationsnummer: 75542, studienF: studienfach.OMB}];






}


import studis = Aufgabe2.studierende;


console.log(Aufgabe2.min(1, 3, 5, -2, 6 ));
console.log(Aufgabe2.isEven(50));
console.log(Aufgabe2.isEven(75));
console.log(Aufgabe2.isEven(-1));

console.log(studis[0].name + " " + studis[0].studienF.toLocaleString);

Aufgabe2.showInfo(studis[0]);


