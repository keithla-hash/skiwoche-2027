# Skiwoche 2027

Statische Vergleichs-App (DE/EN/RO) für Ski-Unterkünfte, gehostet über GitHub Pages aus `docs/`.

- Daten: `docs/data.js`, Texte und Renderer: `docs/render.js`, Verhalten: `docs/app.js`, Stil: `docs/styles.css` (Hallmark-Thema Piste).
- Nach jeder Änderung `node build.mjs` ausführen: rendert die deutsche Fassung vor (Lesbarkeit ohne JavaScript) aus `index.src.html` nach `docs/index.html`.
- Keine personenbezogenen Daten ins Repo, keine Adresse der Privatunterkunft.

## Bewertungen (Google-Login)
- `docs/group.js` lädt Firebase 13.1.0 von gstatic, nur wenn `docs/firebase-config.js` eine Konfiguration exportiert; sonst zeigt die App "noch nicht freigeschaltet".
- Firestore `ratings/<unterkunft>_<uid>`: angemeldete Personen lesen alles, schreiben nur ihre eigene Bewertung (1 bis 5 Sterne, Kommentar bis 400 Zeichen). Regeln und Einrichtung liegen im gitignorten Ordner `firebase/` (privates Google-Konto, Spark, eur3).
- Einrichten: `cd firebase && node setup.mjs` (Testlauf), dann `node setup.mjs --commit`; das schreibt `docs/firebase-config.js` (öffentliche Web-Konfiguration, kein Geheimnis).
