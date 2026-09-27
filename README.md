# Dr Thanish · Medical Oncologist

Personal website for Dr Thanish, MBBS, MD, DM (Medical Oncology).
Plain HTML, CSS and JavaScript with no build step and no dependencies.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page content and structure |
| `styles.css` | Minimalist pastel theme. Every colour is a token at the top of the file |
| `script.js` | Mobile menu, active-section highlighting, copy-email button, appointment form |

## Preview locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Before publishing, fill in

Search `index.html` for `EDIT:` comments.

1. **Contact details** in the Contact section: email, phone (both the `tel:` link and the visible number), clinic name and city, consulting hours. The appointment form sends to whatever email address is shown there.
2. **Qualifications**: uncomment the `cred-meta` line under each degree and add the institution and year.
3. **Cancers treated**: trim or extend the list of chips in the Care section.
4. Optionally add a medical council registration number, hospital affiliations or a photo.

## How the appointment form works

The site has no server, so the form checks the fields and then opens the visitor's email app with a pre-filled message addressed to the clinic email. Nothing is stored or sent by the website itself.

## Publishing

Any static host works. For GitHub Pages: repository **Settings → Pages → Deploy from a branch**, choose the branch and the root folder.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--lavender` | `#E9E3F8` | Primary pastel. Lavender is the awareness ribbon colour for all cancers |
| `--mint` | `#DDF1E7` | Cards, steps |
| `--sky` | `#DEEAF8` | Cards, steps |
| `--peach` | `#FDE7DA` | Cards, urgent-symptoms note |
| `--blush` | `#F9E0E8` | Cards, steps |
| `--butter` | `#FBF3D7` | Cards, steps |
| `--ink` | `#2A2638` | Text and primary buttons |

Typefaces: Young Serif for headings and Figtree for body text, both from Google Fonts.
