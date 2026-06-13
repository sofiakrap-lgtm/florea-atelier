# Floréa Atelier — assets

Brändimateriaalit. Pidä kaikki visuaalit identiteetin sisällä (ks. juuren `CLAUDE.md`).

## Rakenne
| Kansio | Sisältö | Formaatti |
|--------|---------|-----------|
| `logos/` | Logot ja liikemerkit | `.svg` (ensisijainen) |
| `graphics/` | Botaaniset viivaornamentit, kukkamotiivit, jakajat, ikonit | `.svg` |
| `images/` | Valokuvat — kimput, ateljee, studio + katu | `.jpg` |

## Nimeämiskäytäntö
Pienet kirjaimet, väliviiva erottimena, kuvaava nimi:

```
logos/florea-logo-mosswood.svg
logos/florea-merkki-golden.svg
graphics/ornament-villikukka.svg
graphics/divider-botaaninen.svg
images/kimppu-paperikaare-01.jpg
images/ateljee-luonnonvalo.jpg
```

## Värit (HEX)
Almond Cream `#F0EAD8` · Mosswood `#4B4B30` · Cedar Bark `#6F4128` ·
Golden Fennel `#AFA857` · Glacier Mist `#AEC7E0`

## Vinkit
- **SVG:** suosi `currentColor`-täyttöä, niin värin voi vaihtaa CSS:llä.
- **JPG:** filmirae, luonnonvalo, paperikääre — ei lavastettua "stock"-tunnelmaa.
- Liitä tiedostot suoraan oikeaan kansioon; `.gitkeep` pitää tyhjät kansiot mukana repossa.

## Käyttö sivulla
```html
<img src="assets/images/kimppu-paperikaare-01.jpg" alt="Villikukkakimppu paperikääreessä" />
<img src="assets/logos/florea-logo-mosswood.svg" alt="Floréa Atelier" />
```
