namespace aufgabe3_4 {
    
    let button: HTMLButtonElement = <HTMLButtonElement> document.getElementById("bestaetigen");
    let getButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getData");
    button.addEventListener("click", sendDataDb);
    getButton.addEventListener("click",  updateList);
    
    
    
    interface Student {
        _id: string;
        name: string;
        firstname: string;
        registration: number;
    }
    
    
    
    async function sendDataDb(_event: Event): Promise<void> {
        console.log("hallo");
        
        let formData: FormData = new FormData(document.forms[0]);
        
        for (let entry of formData) {
            if (entry[1] == "") {
                alert(entry[0] + " enthält einen falschen wert, bitte füllen sie das erneut feld aus...");
                return;
            }
        }
        
        
        let studentSt: Student = {name: formData.get("Vname").toString(), firstname: formData.get("Nachname").toString(), registration: Number (formData.get("MatrikelNummer").toString()), _id: undefined };
        
        let url: string = "https://jochems-gis-server.herokuapp.com/insert";
        
        let query: URLSearchParams = new URLSearchParams(<any>studentSt);
        url = url + "?" + query.toString();
        console.log(url);
        
        await fetch(url);

        let form1: HTMLFormElement = <HTMLFormElement> document.getElementById("form1");
        form1.reset();
       
        
    }
    
    async function deleteData(_event: Event): Promise<void> {
        
        let url: string = "https://jochems-gis-server.herokuapp.com/delete";
        let clickedB: HTMLButtonElement = <HTMLButtonElement> _event.target;
        let id: string = clickedB.dataset.id;
        let deleteData: string = "_id=" + id ;
        //let query: URLSearchParams = new URLSearchParams(deleteData);
        url = url + "?" + deleteData;
        await fetch(url);
        console.log("deleted student: " + id );
        updateList();
        
        
    }


    
    async function updateList(): Promise<void> {
        let url: string = "https://jochems-gis-server.herokuapp.com/refresh";
        let resp: Response = await fetch(url);
        let studListe: HTMLDivElement = <HTMLDivElement> document.getElementById("studentenListe");
        let antwort: Student[] = await resp.json();
       
        studListe.innerHTML = "";

        for (let student1 of antwort) {
            let divS: HTMLDivElement =  document.createElement("div");
            divS.className = "student";
            let pName: HTMLParagraphElement = document.createElement("p");
            pName.innerText = student1.name;
            let pFirstName: HTMLParagraphElement = document.createElement("p");
            pFirstName.innerText = student1.firstname;
            let pRegistration: HTMLParagraphElement = document.createElement("p");
            pRegistration.innerText =  student1.registration.toString();
            divS.appendChild(pName);
            divS.appendChild(pFirstName);
            divS.appendChild(pRegistration);
          
            
            let deleteButton: HTMLButtonElement = document.createElement("button");
            deleteButton.dataset.id = student1._id;
            deleteButton.addEventListener("click", deleteData);
            deleteButton.innerText = "löschen";
            divS.appendChild(deleteButton);
            

            studListe.appendChild(divS);
        }
        
        
        console.log(antwort );	
        
    }
    
    
    
    
    
    
    
    
    
    
}



