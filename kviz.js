let otazky = [
    {
        otazka: "Co je ikonická hračka z 80.let?",
        foto: "obrazky/moncicak.jpg",
        odpovedi: ["Kočičák", "Mončičák", "Opičák"],
        indexSpravne: 1
    },
    {
        otazka: "Jaké je Matějovo nejoblíbenější ovoce?",
        foto: "obrazky/ovoce.jpg",
        odpovedi: ["Kokos", "Melounek", "Jahoda", "Ani jedna z možností"],
        indexSpravne: 2

    },
    {
        otazka: "Pro úspěšné absolvování kurzu je potřeba...",
        foto: "obrazky/pivo.jpg",
        odpovedi: ["Umět JavaScript", "Chodit po kurzu do hospody"],
        indexSpravne: 0
    },
];

const odpovedi = document.querySelector("#odpovedi");
const pocetOtazek = otazky.length;
let indexOtazky = 0;
let zvoleneOdpovedi = [];
let pocetSpravnych = 0;


function vypisOtazku() {
    document.querySelector('#poradi').innerText = "Otázka " + (indexOtazky + 1) + "/" + otazky.length;
    document.querySelector('#otazka').innerHTML = otazky[indexOtazky].otazka;
    document.querySelector('#obrazek').src = otazky[indexOtazky].foto;

    pocetOdpovedi = otazky[indexOtazky].odpovedi.length;

    for (i = 0; i < pocetOdpovedi; i++) {

        let polozka = document.createElement("li")
        polozka.dataset.odpoved = i;
        polozka.innerHTML = otazky[indexOtazky].odpovedi[i];
        odpovedi.appendChild(polozka);

        polozka.addEventListener("click", function() {
            zvoleneOdpovedi.push(this.dataset.odpoved);
            odpovedi.innerHTML = "";
            if (indexOtazky < pocetOtazek) {
                vypisOtazku()
            } else {
                document.querySelector(".kviz").style.display = "none";
                let vysledky = document.querySelector(".vysledek")
                vysledky.style.display = "block";

                for (i = 0; i < pocetOtazek; i++) {
                    let polozka = document.createElement("div");
                    polozka.classList.add("vysledekOtazky");
                    let otazkaPolozky = document.createElement("h3")
                    otazkaPolozky.innerHTML = (i + 1) + ". " + otazky[i].otazka;
                    let zvolenaOdpoved = document.createElement("p");
                    zvolenaOdpoved.innerHTML = "Tvoje odpověď: " + otazky[i].odpovedi[zvoleneOdpovedi[i]]
                    let spravnaOdpoved = document.createElement("p");
                    if (zvoleneOdpovedi[i] == otazky[i].indexSpravne) {
                        spravnaOdpoved.innerHTML = "Toto je SPRÁVNĚ.";
                        pocetSpravnych += 1;
                    } else {
                        spravnaOdpoved.innerHTML = "Správná odpověď: " + otazky[i].odpovedi[otazky[i].indexSpravne];
                    }
                    vysledky.appendChild(polozka);
                    polozka.appendChild(otazkaPolozky);
                    polozka.appendChild(zvolenaOdpoved);
                    polozka.appendChild(spravnaOdpoved);
                }

                let uspesnost = document.createElement("h2");
                let procentoUspechu = ((pocetSpravnych * 100) / pocetOtazek);
                uspesnost.innerHTML = "Správně " + pocetSpravnych + " ze " + pocetOtazek + " otázek. Úspěšnost " + Math.floor(procentoUspechu) + "%."
                vysledky.appendChild(uspesnost);
            }
        })
    }

    indexOtazky += 1;
}


vypisOtazku()