"use strict";
var aufgabe2_4;
(function (aufgabe2_4) {
    let data = { broetchen: [{ name: "Weißbroetchen", preis: 0.6, darstellung: "darstellungen/BurgerBodenHell.png", darstellung2: "darstellungen/BurgerDach.png" },
            { name: "Dinkelbroetchen", preis: 0.7, darstellung: "darstellungen/BurgerBodenMittel.png", darstellung2: "darstellungen/BurgerDachMittel.png" },
            { name: "Volkornbroetchen", preis: 0.8, darstellung: "darstellungen/BurgerBodenDunkel.png", darstellung2: "darstellungen/BurgerDachDunkel.png" }],
        zutaten: [{ name: "tomaten", preis: 0.45, darstellung: "darstellungen/Tomaten.png" },
            { name: "salat", preis: 0.4, darstellung: "darstellungen/Salat.png" },
            { name: "käse", preis: 0.65, darstellung: "darstellungen/Käse.png" }],
        pattys: [{ name: "RinderPatty", preis: 1.8, darstellung: "darstellungen/BurgerPattyRind.png", vegetarisch: false },
            { name: "HünchenPatty", preis: 1.5, darstellung: "darstellungen/BurgerPattyChicken.png", vegetarisch: false },
            { name: "VeggiePatty", preis: 1.7, darstellung: "darstellungen/BurgerPattyVeggy.png", vegetarisch: true }] };
    aufgabe2_4.daten = JSON.stringify(data);
})(aufgabe2_4 || (aufgabe2_4 = {}));
//# sourceMappingURL=data.js.map