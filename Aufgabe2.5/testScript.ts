interface Text {
    text: string;
    zweiterText: string;
    gruss: string;
}




async function communicate(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    console.log("Response", response);
    let responseText: Text =   await response.json();
    if (responseText) {
    console.log(responseText);
    }
    
  }
console.log("Start");
  
communicate("https://hs-furtwangen.github.io/GIS-SoSe-2021/content/2-chapter/L2.5/test.txt");
communicate("https://hs-furtwangen.github.io/GIS-SoSe-2021/content/2-chapter/L2.5/testjson.json");

console.log("End");
