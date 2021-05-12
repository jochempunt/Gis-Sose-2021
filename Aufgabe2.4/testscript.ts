namespace test1 {




   class Person {
       name: string;
       age: number;

       constructor(_name: string, _age: number) {
        this.age = _age;
        this.name = _name;
       }
   } 


   interface PersonInterface {
       name: string;
       age: number;

   }

   let bool: boolean = (localStorage.getItem("bool" ) == "true");
   
  
   let personJson: string = "";
   console.log(bool);


  
   //console.log(personBack);
   
   if (document.URL.includes("Test1")) {
    
    let button1: HTMLButtonElement = <HTMLButtonElement>  document.getElementById("Button1");
    if (bool == true) {
        
        button1.style.backgroundColor = "green";
       } else  {
       
        button1.style.backgroundColor = "red";
        
       }

        
    
    document.getElementById("Button1").addEventListener("click", handleclick);



    if (localStorage.getItem("person1")) {
        let personInter: PersonInterface = JSON.parse(localStorage.getItem("person1"));
        let newPersonObj: Person = new Person(personInter.name, personInter.age);

        document.body.appendChild(document.createElement("p"));
        document.querySelector("p").innerText = "name: " + newPersonObj.name + " alter: " + newPersonObj.age; 
    }


    
   } else if (document.URL.includes("Test2")) {
     document.body.appendChild(document.createElement("h1"));
     document.querySelector("h1").innerText = localStorage.getItem("bool");
    
     //let personInt: PersonInterface = JSON.parse(personJson);
     //let personBack: Person = new Person(personInt.name, personInt.age);
    
     document.getElementById("Button2").addEventListener("click", handleclick2);
     document.getElementById("Button3").addEventListener("click", handleclick2);

   }

   function handleclick(_event: Event): void {
        let button1: HTMLButtonElement = <HTMLButtonElement>  document.getElementById("Button1");
        if (bool) {
        bool = false;
        button1.style.backgroundColor = "red";
       } else {
           bool = true;
           button1.style.backgroundColor = "green";
       }
        localStorage.setItem("bool", String(bool));
   }



   function handleclick2(_event: Event): void {
    let button: HTMLButtonElement = <HTMLButtonElement> _event.target;
    let person: Person = new Person(button.className, 15); 
    personJson = JSON.stringify(person);
    console.log(personJson);
    localStorage.setItem("person1", personJson);





   }

}