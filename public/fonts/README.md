# Self-hosted typography

Only the Latin subsets used by the English site are hosted. Text outside their character coverage falls back to the platform sans-serif family. No visitor requests are sent to Google Fonts.

- **Barlow Condensed Bold (700, normal)**: `BarlowCondensed-Bold-latin.woff2`, fetched from https://fonts.gstatic.com/s/barlowcondensed/v13/HTxwL3I-JCGChYJ8VI-L6OO_au7B46r2z3bWuYMBYro.woff2. License: `BarlowCondensed-OFL.txt`, https://github.com/google/fonts/tree/main/ofl/barlowcondensed.
- **Source Sans 3 (400–700 variable, normal)**: `SourceSans3-Variable-latin.woff2`, fetched from https://fonts.gstatic.com/s/sourcesans3/v20/nwpStKy2OAdR1K-IwhWudF-R3w8aZejf5Hc.woff2. License: `SourceSans3-OFL.txt`, https://github.com/google/fonts/tree/main/ofl/sourcesans3.

Retrieved 2026-10-25 through the Google Fonts CSS API. Both families use the SIL Open Font License 1.1; keep the license files with redistributed fonts. Font files are unmodified. Native system monospace is used for code.

## Nocturne interface — Instrument Sans

Acquisition explicitly approved on 2026-11-05. Instrument Sans replaces Source Sans 3 in non-hero UI; the Barlow hero face and archived Source Sans 3 files remain unchanged. Both new faces are unmodified Google Fonts WOFF2 Latin distributions, width fixed at 100%, variable weight 400–700, with genuine normal/italic styles and `font-display: swap`. Only the normal UI face is preloaded; italic loads when used. No visitor request goes to Google Fonts.

- **Normal**: `InstrumentSans-Variable-latin.woff2`; 29,904 bytes; SHA-256 `6219bc4bfdfc5d9b2201dcdf046218b122a758f932e25ed5f168f929b7ca2311`; source https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1ZuWi3g.woff2.
- **Italic**: `InstrumentSans-Italic-Variable-latin.woff2`; 31,788 bytes; SHA-256 `d228ca3e0dab07c775322956926b1981275a0cdc79f894b3f979087d085e556c`; source https://fonts.gstatic.com/s/instrumentsans/v4/pxitypc9vsFDm051Uf6KVwgkfoSbSnNPooZAN0lInHGpCWNu15GRqXp6pQ.woff2.
- **License/copyright**: `InstrumentSans-OFL.txt`, unmodified from https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentsans/OFL.txt; SHA-256 `9e27a72ed30eb49a08678f6a5d6ed98ec7ba5368f541637ee0683ec9134ef966`. Copyright 2022 The Instrument Sans Project Authors (https://github.com/Instrument/instrument-sans).

Combined WOFF2 payload is **61,692 bytes**, below the 100,000-byte budget. URLs were selected from the official Google Fonts CSS response for `Instrument Sans:ital,wght@0,400..700;1,400..700`, requested with a modern browser user agent. The installed Astro dependency `fontace` inspected both binaries as Instrument Sans, WOFF2, variable 400–700, with the corresponding true normal/italic style.

Both faces contain ASCII, Latin-1 letters/diacritics (including É, à and Ö), Œ/œ, common typographic punctuation and several combining accents. Their actual cmap covers `U+20–7E`, selected Latin-1 symbols, `U+BF–FF`, `U+0102`, `U+0131`, `U+0152–0153`, selected combining accents, punctuation, arrows and mathematical minus. Latin Extended characters outside that distribution (for example Č/Ł), non-Latin names and Unicode check/cross glyphs use the declared system/native monospace fallback. No required English-site text coverage was removed and no subsetting/conversion tool was installed.
