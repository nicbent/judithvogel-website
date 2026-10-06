# judithvogel.de

Website von Judith Vogel, Heilpraktikerin für Psychotherapie in Hamburg.
Nachbau der früheren Squarespace-Seite als statische [Astro](https://astro.build)-Seite, gehostet auf Netlify.

## Loslegen

```bash
npm install
npm run fetch-images   # einmalig: Bilder vom Squarespace-CDN holen (danach committen!)
npm run dev            # http://localhost:4321
```

`npm run build` erzeugt die fertige Seite in `dist/`. Netlify baut automatisch bei jedem Push auf `main`.

## Wo steht was?

| Was | Datei |
| --- | --- |
| Startseite | `src/pages/index.astro` |
| Philosophie, Über mich | `src/pages/philosophie.astro`, `src/pages/ueber-mich.astro` |
| Angebot inkl. Preise | `src/pages/angebot.astro` |
| Kontakt + Formular | `src/pages/kontakt/index.astro` (Danke-Seite: `kontakt/danke.astro`) |
| Vogelperspektiven (Blog) | ein Beitrag = eine Datei in `src/content/vogelperspektiven/` |
| Impressum, Datenschutz | `src/pages/impressum.astro`, `src/pages/datenschutz.astro` |
| Menü, Footer, Kopfzeile | `src/layouts/Base.astro` |
| Abschnitt „Überschrift links, Bild rechts“ | `src/components/Split.astro` |
| Farben, Schrift, Abstände | `src/styles/global.css` (Variablen oben) |
| Bilder | `public/images/` |
| Weiterleitungen alter URLs | `netlify.toml` |

### Neuen Blogbeitrag anlegen

Neue Datei `src/content/vogelperspektiven/mein-beitrag.md` (Dateiname = URL):

```md
---
title: "Titel des Beitrags"
date: 2026-10-06
image: /images/mein-bild.jpg
---

Text des Beitrags …
```

## Kontaktformular

Läuft über **Netlify Forms** (Formular `kontakt`). Einsendungen erscheinen im Netlify-Dashboard unter *Forms*.
E-Mail-Benachrichtigung einrichten: *Site configuration → Notifications → Form submission notifications*.

## Schrift

Die Seite nutzt **Optima** über den Systemschrift-Stack (auf Mac/iPhone vorinstalliert, ohne Lizenzkosten).
Windows zeigt Candara bzw. Segoe UI. Für Optima auf allen Geräten: Weblizenz kaufen, Dateien nach
`public/fonts/` legen und per `@font-face` in `global.css` einbinden.
