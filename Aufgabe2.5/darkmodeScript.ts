// --- darkmode / lightmode --- \\\
let light: boolean = (localStorage.getItem("bool" ) == "true");
console.log(light);
if (light) {
    document.documentElement.setAttribute("data-theme", "light");


 
} else {
    document.documentElement.setAttribute("data-theme", "dark");

}

