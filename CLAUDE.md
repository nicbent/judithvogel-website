# CLAUDE.md

Statische Astro-Seite für judithvogel.de (Nachbau der früheren Squarespace-Seite), Hosting auf Netlify.

- Sprache der Inhalte: Deutsch, Du-Ansprache (außer Impressum/Datenschutz: Sie).
- Design bewusst minimal: Hintergrund #fafafa, Schwarz, Optima. Werte stehen als CSS-Variablen in `src/styles/global.css`. Keine neuen Farben/Schriften ohne Rückfrage.
- Inhaltsseiten nutzen `src/components/Split.astro` (Überschrift links sticky, rechts Bild → Stichwort → Text → Button). Einleitungstext mit `class="lg"` (18.1px), Fließtext normal (16px).
- Blog: Markdown in `src/content/vogelperspektiven/`, geladen über `src/lib/posts.ts`. Dateiname = URL-Slug; bestehende Slugs nicht ändern (alte Squarespace-URLs).
- Bilder liegen in `public/images/` und werden per `<img>` eingebunden.
- Kontaktformular: Netlify Forms (`data-netlify`). Feldnamen nicht ändern, sonst gehen Einsendungen ins Leere.
- URLs müssen zur alten Seite passen; Weiterleitungen in `netlify.toml`.
- Vor dem Commit: `npm run build` muss fehlerfrei durchlaufen.
