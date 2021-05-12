"use strict";
var test1;
(function (test1) {
    class Person {
        constructor(_name, _age) {
            this.age = _age;
            this.name = _name;
        }
    }
    let bool = (localStorage.getItem("bool") == "true");
    let personJson = "";
    console.log(bool);
    //console.log(personBack);
    if (document.URL.includes("Test1")) {
        let button1 = document.getElementById("Button1");
        if (bool == true) {
            button1.style.backgroundColor = "green";
        }
        else {
            button1.style.backgroundColor = "red";
        }
        document.getElementById("Button1").addEventListener("click", handleclick);
        if (localStorage.getItem("person1")) {
            let personInter = JSON.parse(localStorage.getItem("person1"));
            let newPersonObj = new Person(personInter.name, personInter.age);
            document.body.appendChild(document.createElement("p"));
            document.querySelector("p").innerText = "name: " + newPersonObj.name + " alter: " + newPersonObj.age;
        }
    }
    else if (document.URL.includes("Test2")) {
        document.body.appendChild(document.createElement("h1"));
        document.querySelector("h1").innerText = localStorage.getItem("bool");
        //let personInt: PersonInterface = JSON.parse(personJson);
        //let personBack: Person = new Person(personInt.name, personInt.age);
        document.getElementById("Button2").addEventListener("click", handleclick2);
        document.getElementById("Button3").addEventListener("click", handleclick2);
    }
    function handleclick(_event) {
        let button1 = document.getElementById("Button1");
        if (bool) {
            bool = false;
            button1.style.backgroundColor = "red";
        }
        else {
            bool = true;
            button1.style.backgroundColor = "green";
        }
        localStorage.setItem("bool", String(bool));
    }
    function handleclick2(_event) {
        let button = _event.target;
        let person = new Person(button.className, 15);
        personJson = JSON.stringify(person);
        console.log(personJson);
        localStorage.setItem("person1", personJson);
    }
})(test1 || (test1 = {}));
//# sourceMappingURL=testscript.js.map