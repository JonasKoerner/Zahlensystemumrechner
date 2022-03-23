// Abbildung von Ziffern des Binärsystems in entsprechende Werte
let vonBin = {"0":0, "1":1};
// Abbildung von Ziffern des Hexadezimalsystems in entsprechende Werte
let vonHex = {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "A":10, "B":11,
    "C":12, "D":13, "E":14, "F":15};
// Abbildung der Werte in entsprechende Ziffern des Binärsystems
let nachBin = {0:"0", 1:"1"};
// Abbildung der Werte in entsprechende Ziffern des Hexadezimalsystems
let nachHex = {0:"0", 1:"1", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", 10:"A", 11:"B",
    12:"C", 13:"D", 14:"E", 15:"F"};

function tfAuslesen () {
    // Lese das Ausgangszahlensystem des Dokuments aus
    let basis = document.getElementById("basiswahl").value;

    // Lese Eingabewert im Textfeld aus
    let number = document.getElementById("tf1").value;

    // Überprüfe, ob der Eingabewert zum Zahlensystem passt
    for (let i = 0; i < number.length; i++) {
        // Bekomme die nächste Ziffer der Zahl
        let ziffer = number.charAt(i);
        // Überpüfe, ob die Ziffer im Zahlensystem enthalten ist
        if (basis == 2) {
            if (ziffer == "0" || ziffer == "1") {
                /*Ziffer ist in Ordnung*/
            } else {
                // Falls die Zahl nicht im Zahlensystem enthalten ist, kommt eine Fehlermeldung
                document.getElementById("fehler").innerHTML = "Eingabe passt nicht zum " +
                    "gewählten Zahlensystem";
                // Wenn ein Fehler vorliegt, wird die gesamte Umwandlung abgebrochen
                return;
            }
        } else if (basis == 10) {
            if (ziffer == "0" || ziffer == "1" || ziffer == "2" || ziffer == "3" || ziffer == "4"
                || ziffer == "5" || ziffer == "6" || ziffer == "7" || ziffer == "8" || ziffer == "9") {
                /*Ziffer ist in Ordnung*/
            } else {
                // Falls die Zahl nicht im Zahlensystem enthalten ist, kommt eine Fehlermeldung
                document.getElementById("fehler").innerHTML = "Eingabe passt nicht zum " +
                    "gewählten Zahlensystem";
                // Wenn ein Fehler vorliegt, wird die gesamte Umwandlung abgebrochen
                return;
            }
        } else {
            if (ziffer == "0" || ziffer == "1" || ziffer == "2" || ziffer == "3" || ziffer == "4"
                || ziffer == "5" || ziffer == "6" || ziffer == "7" || ziffer == "8" || ziffer == "9"
                || ziffer == "A" || ziffer == "B" || ziffer == "C" || ziffer == "D" || ziffer == "E"
                || ziffer == "F") {
                /*Ziffer ist in Ordnung*/
            } else {
                // Falls die Zahl nicht im Zahlensystem enthalten ist, kommt eine Fehlermeldung
                document.getElementById("fehler").innerHTML = "Eingabe passt nicht zum " +
                    "gewählten Zahlensystem";
                // Wenn ein Fehler vorliegt, wird die gesamte Umwandlung abgebrochen
                return;
            }
        }
    }
    let binErgebnis, dezErgebnis, hexErgebnis;
    if (basis == 10){
        binErgebnis = vonDezInAnderesZahlensystemUmwandeln(2, number);
        dezErgebnis = number;
        hexErgebnis = vonDezInAnderesZahlensystemUmwandeln(16, number);
    }else {
        dezErgebnis = inDezUmwandeln(basis, number);
        if (basis == 2) {
            binErgebnis = number;
            hexErgebnis = vonDezInAnderesZahlensystemUmwandeln(16, dezErgebnis);
        }else{
            binErgebnis = vonDezInAnderesZahlensystemUmwandeln(2, dezErgebnis);
            hexErgebnis = number;
        }
    }
    // Ausgabe auf Webseite anzeigen
    document.getElementById("ausgabe1").innerHTML = binErgebnis;
    document.getElementById("ausgabe2").innerHTML = dezErgebnis;
    document.getElementById("ausgabe3").innerHTML = hexErgebnis;
}

// Zahl in Dezimalsystem umwandeln
function inDezUmwandeln (basis, zahl) {
    // Ergebnis auf 0 initialisieren, um anschließend den Algorithmus anzuwenden
    let ergebnis = 0
    // Jede Ziffer abarbeiten
    for (let i = 0; i < zahl.length; i++) {
        // Ziffer von hinten beginnend auswählen
        let ziffer = zahl.charAt(zahl.length-1-i);
        if (basis == 2) {
            /*Algorithmus für binäre Zahlen anwenden, indem die Basis (2) mit der Stelle der Ziffer
            in der Zahl (von rechts beginnend) potenziert und mit der Ziffer selbst multipliziert wird*/
            ergebnis = ergebnis + Math.pow(2, i) * vonBin[ziffer];
        }else if (basis == 16){
            /*Algorithmus für hexadezimale Zahlen anwenden, indem die Basis (16) mit der Stelle der Ziffer
            in der Zahl (von rechts beginnend) potenziert und mit der Ziffer selbst multipliziert wird*/
            ergebnis = ergebnis + Math.pow(16, i) * vonHex[ziffer];
        }else{
            return zahl;
        }
        }
    // Ergebnis zurückgeben
    return ergebnis;
}
// Dezimalzahl in anderes Zahlensystem umwandeln
function vonDezInAnderesZahlensystemUmwandeln (zielbasis, zahl) {
    let q = zahl;
    let ergebnis = "";
    while (q != 0) {
        let rest = q % zielbasis;
        q = (q - rest) / zielbasis;
        if (zielbasis == 2) {
            ergebnis = nachBin[rest] + ergebnis;
        } else if (zielbasis == 16) {
            ergebnis = nachHex[rest] + ergebnis;
        } else {
            return zahl;
        }
    }
    return ergebnis;
}