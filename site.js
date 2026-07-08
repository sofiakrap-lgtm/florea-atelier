/* =====================================================================
   Floréa Atelier · site.js
   KESKITETTY SISÄLTÖ. Tämä on ainoa tiedosto, jota tavallisesti
   muokataan: tuotteet, kategoriat, kurssit, tekstit, yhteystiedot.
   main.js renderöi nämä sivuille. style.css hoitaa ilmeen.
   ===================================================================== */

window.FLOREA = (function () {
  const IMG = "assets/images/";
  const LOGO = "assets/logos/";

  /* ---------- Yleinen ---------- */
  const site = {
    name: "Floréa Atelier",
    tagline: "Villikukka-ateljee · Helsinki",
    demoNotice: "esimerkki sivustosta, kuvat ja tekstit vaihdetaan asiakkaan omiin.",
    logoNav: LOGO + "logo-paa-wide.svg",
    logoMark: LOGO + "logo-iso-simple.svg",
    logoMain: LOGO + "logo-paa.svg",
    logoLight: LOGO + "logo-iso-vaalea.svg",
    email: "hei@florea-atelier.demo",
    phone: "+358 40 123 4567",
    address: "Niittylänpolku 4, 00200 Helsinki",
    hours: [
      { d: "Ma–Pe", h: "10–18" },
      { d: "La", h: "10–16" },
      { d: "Su", h: "Suljettu" },
    ],
    social: { instagram: "#", facebook: "#", uutiskirje: "#" },
  };

  /* ---------- Navigaatio ---------- */
  const nav = [
    { label: "Etusivu", href: "index.html" },
    { label: "Kukkakimput", href: "tuotteet.html" },
    { label: "Palvelut", href: "palvelut.html" },
    { label: "Kurssit", href: "tapahtumat.html" },
    { label: "Galleria", href: "galleria.html" },
    { label: "Meistä", href: "meista.html" },
    { label: "Myymälä", href: "myymala.html" },
    { label: "Yhteystiedot", href: "yhteystiedot.html" },
  ];

  /* ---------- Suodatinakselit (verkkokauppa) ---------- */
  const filters = {
    occasion: { label: "Tilaisuus", options: [
      { id: "haat", label: "Häät" },
      { id: "syntymapaivat", label: "Syntymäpäivät" },
      { id: "valmistujaiset", label: "Valmistujaiset" },
      { id: "hautajaiset", label: "Hautajaiset" },
      { id: "yritystapahtumat", label: "Yritystapahtumat" },
    ]},
    style: { label: "Tyyli", options: [
      { id: "moderni", label: "Moderni" },
      { id: "romanttinen", label: "Romanttinen" },
      { id: "minimalistinen", label: "Minimalistinen" },
      { id: "luonnonlaheinen", label: "Luonnonläheinen" },
      { id: "varikas", label: "Värikäs" },
    ]},
    color: { label: "Värimaailma", options: [
      { id: "valkoinen", label: "Valkoinen" },
      { id: "pastelli", label: "Pastelli" },
      { id: "vaaleanpunainen", label: "Vaaleanpunainen" },
      { id: "punainen", label: "Punainen" },
      { id: "monivarinen", label: "Monivärinen" },
    ]},
    size: { label: "Koko", options: [
      { id: "pieni", label: "Pieni" },
      { id: "keskikokoinen", label: "Keskikokoinen" },
      { id: "suuri", label: "Suuri" },
    ]},
    price: { label: "Hinta", options: [
      { id: "alle30", label: "Alle 30 €" },
      { id: "30-50", label: "30–50 €" },
      { id: "50-100", label: "50–100 €" },
      { id: "yli100", label: "Yli 100 €" },
    ]},
  };

  function priceBucket(p) {
    if (p < 30) return "alle30";
    if (p <= 50) return "30-50";
    if (p <= 100) return "50-100";
    return "yli100";
  }

  /* ---------- Tuotteet (kukkakimput) ----------
     Muokkaa vapaasti: nimi, hinta, kuvaus, tagit.
     tags: occasion[], style, color, size, käytetään suodatukseen. */
  const products = [
    { id: "aamutuuli", name: "Aamutuuli", price: 49, img: IMG + "kimppu-01-pinkki.jpg",
      desc: "Mimosaa, leijonankitaa ja malvaa, kevyt aamuinen kimppu paperiin käärittynä.",
      occasion: ["syntymapaivat", "valmistujaiset"], style: "luonnonlaheinen", color: "pastelli", size: "keskikokoinen" },

    { id: "leinikki", name: "Leinikki & Lempeys", price: 39, img: IMG + "kimppu-02-leinikki.jpg",
      desc: "Pehmeät leinikit ja vaaleanpunaiset sävyt. Pieni mutta runollinen.",
      occasion: ["syntymapaivat"], style: "romanttinen", color: "vaaleanpunainen", size: "pieni" },

    { id: "karnevaali", name: "Karnevaali", price: 59, img: IMG + "kimppu-03-varikas.jpg",
      desc: "Reilu, väriä pursuava asetelma, joka täyttää huoneen ilolla.",
      occasion: ["yritystapahtumat", "syntymapaivat"], style: "varikas", color: "monivarinen", size: "suuri" },

    { id: "eleganssi", name: "Eleganssi", price: 79, img: IMG + "kimppu-04-elegantti.jpg",
      desc: "Hillityt pastellit ja korkeat varret, juhlava ja ajaton.",
      occasion: ["haat"], style: "romanttinen", color: "pastelli", size: "suuri" },

    { id: "peltokukat", name: "Peltokukat", price: 35, img: IMG + "kimppu-05-peltokukat.jpg",
      desc: "Kuin niityltä poimittu. Villi, rento ja kauden mukainen.",
      occasion: ["syntymapaivat"], style: "luonnonlaheinen", color: "monivarinen", size: "keskikokoinen" },

    { id: "haaaamu", name: "Hääaamu", price: 119, img: IMG + "kimppu-06-haakukat.jpg",
      desc: "Valkoinen morsiuskimppu hennoin viherustein. Ateljeen signatuuri.",
      occasion: ["haat"], style: "romanttinen", color: "valkoinen", size: "suuri" },

    { id: "tulppaaniaalto", name: "Tulppaaniaalto", price: 29, img: IMG + "kimppu-07-tulppaani.jpg",
      desc: "Pelkistetty tulppaanikimppu, selkeä ele, joka piristää arjen.",
      occasion: ["syntymapaivat", "valmistujaiset"], style: "minimalistinen", color: "vaaleanpunainen", size: "pieni" },

    { id: "tropiikki", name: "Tropiikki", price: 69, img: IMG + "kimppu-08-tropiikki.jpg",
      desc: "Rohkeat muodot ja syvät sävyt. Näyttävä valinta tilaan kuin tilaan.",
      occasion: ["yritystapahtumat"], style: "varikas", color: "monivarinen", size: "suuri" },

    { id: "liljametsa", name: "Liljametsä", price: 65, img: IMG + "kimppu-09-lilja.jpg",
      desc: "Tuoksuvia liljoja ja väririkkautta, runsas ja juhlava.",
      occasion: ["valmistujaiset"], style: "varikas", color: "monivarinen", size: "keskikokoinen" },

    { id: "glacier-fennel", name: "Glacier & Fennel", price: 45, img: IMG + "kimppu-10-keltainen-sininen.jpg",
      desc: "Keltaisen ja sinisen graafinen kontrasti. Moderni ja raikas.",
      occasion: ["yritystapahtumat"], style: "moderni", color: "monivarinen", size: "keskikokoinen" },

    { id: "villi-niitty", name: "Villi Niitty", price: 55, img: IMG + "kimppu-11-varikas.jpg",
      desc: "Runsas villikukka-asetelma kauden parhaista varsista.",
      occasion: ["haat", "syntymapaivat"], style: "luonnonlaheinen", color: "monivarinen", size: "keskikokoinen" },

    { id: "punainen-hetki", name: "Punainen Hetki", price: 49, img: IMG + "kimppu-punainen.jpg",
      desc: "Syvänpunainen, arvokas asetelma muistamisen hetkiin.",
      occasion: ["hautajaiset"], style: "romanttinen", color: "punainen", size: "keskikokoinen" },
  ].map(p => ({ ...p, priceRange: priceBucket(p.price) }));

  /* ---------- Palvelut / erikoissidonnat ---------- */
  const GFX = "assets/graphics/";
  const services = [
    { num: "01", icon: GFX + "palvelu-viikonkimppu.svg", title: "Viikon kimppu", text: "Kauden parhaat varret paperiin käärittynä. Nouto ateljeesta tai pyörälähetillä keskustaan." },
    { num: "02", icon: GFX + "palvelu-haat.svg", title: "Häät & juhlat", text: "Morsiuskimput, kukkakaaret ja pöytäasetelmat. Suunnittelemme kokonaisuuden tunnelman mukaan." },
    { num: "03", icon: GFX + "palvelu-yritys.svg", title: "Yritystilaisuudet", text: "Toistuvat toimistokukat ja tapahtumakoristelut sopimuksella, aina kauden mukaan." },
    { num: "04", icon: GFX + "palvelu-hautajaiset.svg", title: "Hautajaiset", text: "Surusidonnat ja muistamiset hienovaraisella kädellä, lyhyelläkin varoitusajalla." },
    { num: "05", icon: GFX + "palvelu-juhlakoristelu.svg", title: "Juhlakoristelut", text: "Synttärit, valmistujaiset ja kausijuhlat, tilan kukitus avaimet käteen." },
    { num: "06", icon: GFX + "palvelu-sidontakurssit.svg", title: "Sidontakurssit", text: "Pienryhmäworkshopit, joissa opit kokoamaan oman villikimpun." },
  ];

  /* ---------- Erikoistilaukset (referenssit) ---------- */
  const specials = [
    { title: "Häät", img: IMG + "kimppu-06-haakukat.jpg", text: "Morsiuskimpusta juhlapaikan kukitukseen." },
    { title: "Yritystilaisuudet", img: IMG + "kimppu-08-tropiikki.jpg", text: "Näyttävät asetelmat tapahtumiin ja tiloihin." },
    { title: "Hautajaiset", img: IMG + "kimppu-punainen.jpg", text: "Surusidonnat hienovaraisella kädellä." },
    { title: "Juhlakoristelut", img: IMG + "kimppu-03-varikas.jpg", text: "Synttärit, valmistujaiset ja kausijuhlat." },
  ];

  /* ---------- Workshopit / kurssit ---------- */
  const workshops = [
    { day: "21", mon: "Kesä", title: "Villikimpun perusteet", time: "klo 17–19", price: 65, spots: "6 paikkaa", desc: "Opi kauden kukat ja paperikäärinnän taito." },
    { day: "05", mon: "Heinä", title: "Hääkukat itse", time: "klo 12–15", price: 95, spots: "4 paikkaa", desc: "Morsiuskimppu ja rintakukat omaan suureen päivään." },
    { day: "19", mon: "Heinä", title: "Kuivakukka-asetelma", time: "klo 17–19", price: 55, spots: "8 paikkaa", desc: "Pitkäikäinen asetelma kuivatuista kukista." },
    { day: "16", mon: "Elo", title: "Syksyn sadonkorjuu", time: "klo 17–19.30", price: 70, spots: "6 paikkaa", desc: "Runsas syyskimppu daalioista ja viljoista." },
  ];

  /* ---------- Kimpun rakentajan kukkalajit ---------- */
  const flowers = [
    { id: "mimosa", name: "Mimosa", price: 6, img: IMG + "kimppu-01-pinkki.jpg" },
    { id: "leinikki", name: "Leinikki", price: 7, img: IMG + "kimppu-02-leinikki.jpg" },
    { id: "lilja", name: "Lilja", price: 8, img: IMG + "kimppu-09-lilja.jpg" },
    { id: "tulppaani", name: "Tulppaani", price: 4, img: IMG + "kimppu-07-tulppaani.jpg" },
    { id: "peltokukka", name: "Peltokukat", price: 5, img: IMG + "kimppu-05-peltokukat.jpg" },
    { id: "ruusu", name: "Ruusu", price: 6, img: IMG + "kimppu-punainen.jpg" },
    { id: "gladiolus", name: "Gladiolus", price: 7, img: IMG + "kimppu-04-elegantti.jpg" },
    { id: "vihrea", name: "Viherustat", price: 3, img: IMG + "kimppu-11-varikas.jpg" },
  ];

  /* ---------- Hintalaskurin parametrit ---------- */
  const calc = {
    base: 25,
    occasion: { label: "Tilaisuus", multiplier: true, options: [
      { id: "arki", label: "Arki", value: 1.0 },
      { id: "juhla", label: "Juhla", value: 1.2 },
      { id: "haat", label: "Häät", value: 1.6 },
      { id: "yritys", label: "Yritys", value: 1.4 },
    ]},
    size: { label: "Koko", add: true, options: [
      { id: "pieni", label: "Pieni", value: 0 },
      { id: "keski", label: "Keskikokoinen", value: 20 },
      { id: "suuri", label: "Suuri", value: 45 },
      { id: "jattimainen", label: "Jättimäinen", value: 90 },
    ]},
    flowers: { label: "Kukkalajien määrä", add: true, options: [
      { id: "1-2", label: "1–2 lajia", value: 0 },
      { id: "3-4", label: "3–4 lajia", value: 15 },
      { id: "5+", label: "5+ lajia", value: 35 },
    ]},
    extras: { label: "Lisät", add: true, multi: true, options: [
      { id: "paperikääre", label: "Premium-paperikääre", value: 6 },
      { id: "maljakko", label: "Lasimaljakko", value: 18 },
      { id: "kortti", label: "Käsinkirjoitettu kortti", value: 4 },
      { id: "kotiinkuljetus", label: "Kotiinkuljetus", value: 12 },
    ]},
  };

  /* ---------- Asiakaspalautteet (karuselli) ---------- */
  const testimonials = [
    { stars: 5, quote: "Kaunein kimppu, jonka olemme saaneet. Vieraat kyselivät, mistä se oli.", who: "Anni & Joonas, häät" },
    { stars: 5, quote: "Palvelu oli rauhallista ja henkilökohtaista. Lopputulos ylitti toiveemme.", who: "Maria, 50-vuotisjuhlat" },
    { stars: 5, quote: "Juuri sellainen villi ja elävä asetelma kuin toivoin, ei yhtään geneerinen.", who: "Petri, perhejuhla" },
    { stars: 5, quote: "Tilasin suruksi valkoisen kimpun. Hienovarainen ja kaunis, juuri oikea.", who: "Leena" },
    { stars: 5, quote: "Toimiston viikkokukat piristävät koko porukkaa. Aina kauden mukaan.", who: "Sofia, yritystilaus" },
  ];

  /* ---------- Meistä ---------- */
  const about = {
    heroImg: IMG + "referenssi-meista.jpg",
    teamImg: IMG + "referenssi-mies.jpg",
    storyTitle: "Kukkia, jotka kasvoivat villinä.",
    story: [
      "Floréa syntyi halusta antaa villikukkien näyttää siltä, mitä ne ovat, epäsymmetrisiltä, elossa, hieman arvaamattomilta. Emme suorista vartta, joka haluaa kaartua.",
      "Jokainen kimppu kootaan käsin kauden ehdoilla. Suosimme lähituottajien ja luomuviljelijöiden kukkia, ja käärimme ne kierrätyspaperiin, ei muovia.",
    ],
    values: [
      { title: "Kausi edellä", text: "Vain sitä, mitä juuri nyt kukkii." },
      { title: "Käsityö", text: "Jokainen varsi asetellaan käsin." },
      { title: "Vastuullisuus", text: "Lähituotanto ja paperikääre, ei muovia." },
    ],
  };

  return { site, nav, filters, products, services, specials, workshops, flowers, calc, about, testimonials, priceBucket };
})();
