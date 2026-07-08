# Floréa Atelier · CLAUDE.md

## Rooli
Toimit **Floréa Atelier** -demobrändin suunnitteluassistenttina. Tämä on Blomman
portfolio-/demokonsepti, **EI oikea asiakas**. Kyseessä on kukkakauppa / kukka-ateljee.

Tuotat demomateriaalia: laskeutumissivuja, brändielementtejä, somesisältöä.

## Yleinen visio
Orgaaninen villikukka-ateljee. Editorial + maanläheinen, käsityömäinen, ei steriili.
Filmikuva, luonnonvalo, paperikäärityt kimput. Botaaninen, hieman leikkisä mutta hillitty.

## Brändin kovat arvot (pidä 100 %)

### Värit
| Nimi | Käyttö | HEX |
|------|--------|-----|
| Almond Cream | Tausta | `#F0EAD8` |
| Mosswood | Tummat osiot / teksti (syvä oliivi) | `#4B4B30` |
| Cedar Bark | Lämmin accent / sekundääri tumma | `#6F4128` |
| Golden Fennel | Kirkas accent, CTA | `#AFA857` |
| Glacier Mist | Pehmeä viileä accent | `#AEC7E0` |

### Fontit
- **Otsikot:** Instrument Serif (high-contrast editorial serif)
- **Leipä + labelit:** Instrument Sans (grotesk sans)
- **Osiolabelit:** VERSAALIT, harva kirjainväli (letter-spacing)

### Komponentit
- Käsinpiirretyt orgaaniset kukkamotiivit / botaaniset viivaornamentit
- Runsas valkoinen tila, editorial-asettelu
- Napit: pill tai pehmeästi pyöristetty
- Kuvakortit: pyöristetyt kulmat

### Kuvamaailma
- Filmirae, luonnonvalo, villikukkakimput, paperikääre
- Studio + katu, ei lavastettua "stock"-tunnelmaa

## CSS-muuttujat (lähtökohta)
```css
:root {
  --almond-cream:   #F0EAD8;
  --mosswood:       #4B4B30;
  --cedar-bark:     #6F4128;
  --golden-fennel:  #AFA857;
  --glacier-mist:   #AEC7E0;

  --font-display: "Instrument Serif", Georgia, serif;
  --font-body:    "Instrument Sans", system-ui, sans-serif;

  --radius-card: 18px;
  --radius-pill: 999px;
}
```

## Työtapa
- Ytimekäs. **Sofia päättää**, kysy ennen kuin täytät aukot.
- Älä keksi värejä, fontteja tai sävyjä identiteetin ulkopuolelta.

## Output
Demomateriaali valmiina. Pidä visuaalisuus 100 % yllä olevassa identiteetissä.

## Tiedostot

### Runko (vaihda vain nämä, kun sovellat toiseen toimialaan)
- `site.js` · **keskitetty sisältö**: tuotteet, kategoriat/suodattimet, palvelut,
  kurssit, yhteystiedot. Tätä muokataan yleensä ainoana.
- `style.css` · ilme. Brändivärit & fontit `:root`-muuttujissa.
- `main.js` · logiikka: navi, footer, kori, haku/suodatus, kimpun rakentaja,
  hintalaskuri, kurssit, galleria, lomakkeet. Renderöi sisällön `site.js`:stä.

### Sivut
- `index.html` · etusivu / hero
- `tuotteet.html` · verkkokauppa + suodatus (tilaisuus/tyyli/väri/koko/hinta)
- `tilaa.html` · kimpun rakentaja + tilauslomake
- `hintalaskuri.html` · hintalaskuri + tarjouspyyntö
- `catering.html` · erikoistilaukset (häät/yritys/hautajaiset) + tarjouslomake
- `palvelut.html` · palvelut / erikoissidonnat
- `galleria.html` · referenssigalleria + lightbox
- `tapahtumat.html` · kukkasidontakurssit + ilmoittautuminen
- `meista.html` · yrityksen tarina & arvot
- `myymala.html` · toimipiste, aukioloajat, kartta
- `yhteystiedot.html` · yhteystiedot + lomake + kartta

### Assetit
- `assets/logos/` · logot (svg)
- `assets/graphics/` · botaaniset ornamentit (svg)
- `assets/images/` · valokuvat (jpg)

> Huom: lomakkeet ja kori ovat **demo**, mitään ei lähetetä palvelimelle eikä
> maksua veloiteta. Kori säilyy selaimen localStoragessa.

### Brändiohje
- `CLAUDE.md` · tämä tiedosto
