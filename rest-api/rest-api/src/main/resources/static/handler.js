const baseUrl = "http://localhost:8080/equations";

/**
 * pobieranie współczynników
 */

function oblicz() {
    let a = document.getElementById("wsp_a").value;
    let b = document.getElementById("wsp_b").value;
    let c = document.getElementById("wsp_c").value;
    if (validate(a ,b ,c)) {
        let abc = "" + a + "," + b + "," + c;
        if (!a || !b || !c) {
            alert("Podaj wszystkie współczynniki");
        } else {
            let url = baseUrl + "/oblicz/" + abc;
            let http = new XMLHttpRequest();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let tab = this.responseText.toString().split(",");
                    let delta = tab[0]
                    let x1 = tab[1];
                    let x2 = tab[2];
                    let historia = document.getElementById("historia");

                    let wynik = document.createTextNode("Wynik równania " + getEquation(a, b, c));

                    if (delta > 0) {
                        delta = "\u0394 = " + delta;
                        x1 = "x\u2081 = " + x1;
                        x2 = "x\u2082 = " + x2;
                    } else if (delta == 0) {
                        delta = "\u0394 = " + delta;
                        x1 = "x = " + x1;
                    } else {
                        delta = "\u0394 = " + delta;
                        x1 = "Brak rozwiązań";
                    }

                    let ul = document.createElement("ul");

                    let li = document.createElement("li");
                    let liText = document.createTextNode(delta);
                    li.appendChild(liText);
                    ul.appendChild(li);

                    let li2 = document.createElement("li");
                    let liText2 = document.createTextNode(x1);
                    li2.appendChild(liText2);
                    ul.appendChild(li2);

                    historia.appendChild(wynik);
                    historia.appendChild(ul);

                    if (x2) {
                        let li3 = document.createElement("li");
                        let liText3 = document.createTextNode(x2);

                        li3.appendChild(liText3);
                        ul.appendChild(li3);
                    }
                }
            };
            http.open("GET", url, true);
            http.send();
        }
    } else {
        alert("Podano nieprawidłowe dane!");
    }
}

/**
 * równanie
 */
function getEquation(a, b, c) {
    let wynik = a + "x\u00B2";
    if (b > 0) {
        wynik = wynik + "+" + b + "x";
    } else if (b < 0) {
        wynik = wynik + "-" + (-1)*b + "x";
    }

    if (c > 0) {
        wynik = wynik + "+" + c;
    } else if (c < 0) {
        wynik = wynik + "-" + (-1)*c;
    }

    wynik = wynik + "=0";
    return wynik;
}

/**
 * Czyszczenie hisotrii
 */

function clean() {

    let historia = document.getElementById("historia");

    if (historia.hasChildNodes()) {
        while (historia.firstChild) {
            historia.removeChild(historia.firstChild);
        }
    }
}

/**
 * sprawdzanie parametrów
 */

function validate(a, b, c) {
    if (a == 'NaN' || a == null || a == 0 || !a)
        return false
    if (b == 'NaN' || b == null || !b)
        return false;
    if (c == 'NaN' || c == null || !c)
        return false;

    return true;
}