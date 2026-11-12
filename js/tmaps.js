/* Tematické mapy s rozklikávacími prvky. Prvky: line (řeka, pohoří, osa), pt (bod), lab (popisek oblasti). */
(function () {
  const P = (k, t, d, extra) => Object.assign({ k: k, t: t, d: d }, extra || {});
  const R = (t, pts, d, o) => P("line", t, d, Object.assign({ c: "river", pts: pts }, o));
  const M = (t, pts, d, o) => P("line", t, d, Object.assign({ c: "range", pts: pts }, o));
  const PT = (t, at, c, d, pos) => P("pt", t, d, { at: at, c: c, pos: pos || "r" });
  const LB = (t, at, d, cls, s) => P("lab", t, d, { at: at, cls: cls || "", s: s || 1 });
  const F = Atlas.F;
  const group = m => { const f = {}; for (const k in m) m[k].split(" ").forEach(s => { f[(s.length === 2 ? "US_" : "") + s] = k; }); return f; };
  const dens = id => { const s = REGION_STATS[id]; return s && s.pop && s.area ? s.pop / s.area : null; };
  const fmt = (v, d) => v.toLocaleString("cs-CZ", { maximumFractionDigits: d === undefined ? 1 : d });

  const RIV = {
    missouri: [[-111.5, 45.9], [-111.3, 47.5], [-106.5, 48], [-100.8, 46.8], [-100.35, 44.37], [-96.4, 42.5], [-95.9, 41.25], [-94.6, 39.1], [-90.2, 38.8]],
    ohio: [[-80, 40.44], [-80.7, 40.07], [-82.4, 38.4], [-84.5, 39.1], [-85.76, 38.25], [-87.57, 37.97], [-89.18, 37.0]],
    tennessee: [[-83.9, 35.96], [-85.3, 35.05], [-86.6, 34.6], [-87.7, 34.8], [-88.2, 36.0], [-88.6, 37.07]],
    arkansas: [[-106.3, 39.25], [-104.6, 38.27], [-100, 37.75], [-97.3, 37.7], [-96, 36.15], [-94.4, 35.4], [-92.3, 34.75], [-91.1, 33.8]],
    colorado: [[-105.8, 40.4], [-108.55, 39.07], [-109.55, 38.57], [-111.5, 36.9], [-112.5, 36.1], [-114.7, 36.0], [-114.6, 32.7], [-114.8, 31.8]],
    columbia: [[-115.9, 50.2], [-118.2, 52.1], [-118.2, 51.0], [-117.6, 49.3], [-119, 47.95], [-119.1, 46.2], [-121.2, 45.6], [-122.8, 45.7], [-123.8, 46.2]],
    riogrande: [[-106.9, 37.7], [-106.65, 35.1], [-106.5, 31.75], [-103.2, 29.2], [-99.5, 27.5], [-97.15, 25.95]],
    nelson: [[-97.9, 53.8], [-96, 55], [-94, 56.3], [-92.5, 57.1]],
    saskatchewan: [[-113.5, 53.55], [-108.3, 52.8], [-105.75, 53.2], [-101.25, 53.8], [-99.3, 53.2]],
    fraser: [[-119, 53], [-122.75, 53.9], [-122.5, 53], [-121.9, 50.7], [-121.4, 49.4], [-123.1, 49.1]],
    alaskaRange: [[-153, 61.3], [-151, 63], [-146, 63.4], [-142, 62.5]],
    brooks: [[-162, 68], [-155, 68.2], [-148, 68.3], [-141, 69]],
    coast: [[-135.5, 59.5], [-131, 56], [-127, 52.5], [-123.5, 50]],
    mackenzieMts: [[-133, 64.5], [-129, 63], [-125, 61.5]]
  };

  const MAPS = {
    relief: {
      t: "Povrch", view: "all",
      p: "Severní Amerika má jednoduchou stavbu: na západě mladé a vysoké Kordillery, uprostřed rozsáhlé nížiny a planiny, na východě staré a nízké Apalače a na severu prastarý Kanadský štít.",
      tips: ["Pohoří vedou od severu k jihu, proto studený arktický i teplý vzduch proudí vnitrozemím bez překážek (tornáda, mrazy až na jihu).", "Kordillery jsou mladé vrásové hory, Apalače jsou staré a zarovnané.", "Kanadský štít je nejstarší část kontinentu, ledovce na něm vyhloubily tisíce jezer.", "Nejvyšší horou je Denali (6 190 m) na Aljašce, v Kanadě Mount Logan (5 959 m)."],
      areas: [F.shield],
      f: [
        M("Skalnaté hory", F.rockies, "Hlavní pásmo Kordiller, táhne se od Kanady po Nové Mexiko. Nejvyšší vrchol Mount Elbert (4 401 m) v Coloradu. Vede jimi hlavní rozvodí kontinentu: řeky na západě tečou do Pacifiku, na východě do Atlantiku a Mexického zálivu.", { lab: [-104.2, 46.2] }),
        M("Kaskádové pohoří", F.cascades, "Sopečné pohoří na severozápadě USA, nad oceánskou deskou zanořující se pod kontinent. Mount Rainier, Mount St. Helens (výbuch 1980).", { lab: [-125.3, 45.2] }),
        M("Sierra Nevada", F.sierra, "Žulové pohoří v Kalifornii s Mount Whitney (4 421 m), nejvyšší horou USA mimo Aljašku. Národní park Yosemite.", { lab: [-122.3, 38.4] }),
        M("Aljašské pohoří", RIV.alaskaRange, "Pohoří s Denali (6 190 m), nejvyšší horou Severní Ameriky.", { lab: [-145.5, 61.4] }),
        M("Brooksovo pohoří", RIV.brooks, "Nejsevernější pohoří Kordiller na Aljašce. Severně od něj leží ropné pole Prudhoe Bay.", { lab: [-153, 69.4] }),
        M("Pobřežní hory", RIV.coast, "Pohoří podél pobřeží Britské Kolumbie s fjordy a mírným deštným lesem.", { lab: [-127.5, 55.5] }),
        M("Mackenzieho hory", RIV.mackenzieMts, "Pohoří na hranici Yukonu a Severozápadních teritorií.", { lab: [-127.5, 64.2] }),
        M("Apalače", F.appalachiansUS, "Staré, zarovnané pohoří na východě USA. Nejvyšší Mount Mitchell (2 037 m). Velká ložiska černého uhlí, dříve základ těžkého průmyslu.", { lab: [-76.5, 37.5] }),
        M("Apalače v Kanadě", F.appalachiansCA, "Severní pokračování Apalačí v Québecu, Novém Brunšviku a na Newfoundlandu.", { lab: [-64, 48.4] }),
        LB("Velké planiny", [-101, 39.6], "Suché travnaté plošiny východně od Skalnatých hor, mírně klesají k východu. Pšenice, chov skotu, ložiska ropy. Ve 30. letech je postihly prachové bouře a eroze půdy (Dust Bowl)."),
        LB("Centrální nížiny", [-87, 42.5], "Úrodná rovina kolem Mississippi a Velkých jezer s černozemí, oblast Corn Beltu."),
        LB("Velká pánev", [-116.6, 42.2], "Bezodtoká suchá oblast mezi Sierrou Nevadou a Skalnatými horami. Řeky nedotečou do moře, končí ve slaných jezerech."),
        LB("Koloradská plošina", [-110, 37], "Vysoko položená plošina rozřezaná kaňony, nejznámější je Grand Canyon."),
        LB("Pobřežní nížina", [-86, 31], "Nížina podél Mexického zálivu a Atlantiku, močály, delty, ropa a plyn."),
        LB("Kanadský štít", [-103, 62.5], "Prahorní jádro kontinentu z hornin starých přes 2,5 miliardy let. Málo půdy, mnoho jezer, bohaté rudy (nikl, zlato, železo, uran), řídké osídlení.", "t-dark"),
        LB("Hudsonův záliv", [-86, 58.5], "Mělké vnitrozemské moře, většinu roku zamrzlé. Přístav Churchill v Manitobě."),
        LB("Arktické souostroví", [-98, 74], "Ostrovy kanadské Arktidy. Mezi nimi vede Severozápadní průjezd."),
        PT("Denali", [-151, 63.07], "c2", "6 190 m, nejvyšší hora Severní Ameriky (Aljašské pohoří).", "l"),
        PT("Mount Logan", [-140.4, 60.57], "c2", "5 959 m, nejvyšší hora Kanady (Yukon, pohoří sv. Eliáše).", "b"),
        PT("Mount Whitney", [-118.29, 36.58], "c2", "4 421 m, nejvyšší hora USA mimo Aljašku.", "l"),
        PT("Mount Mitchell", [-82.27, 35.76], "c2", "2 037 m, nejvyšší hora Apalačí.", "b"),
        PT("Údolí smrti", [-116.9, 36.25], "c4", "86 m pod mořem, nejnižší místo Severní Ameriky, jedno z nejteplejších míst na Zemi.", "b")
      ]
    },
    voda: {
      t: "Vodstvo", view: "all",
      p: "Většina vody z vnitrozemí USA odtéká Mississippi do Mexického zálivu. Kanada odvodňuje velkou část území do Hudsonova zálivu a Severního ledového oceánu, Velká jezera ústí řekou sv. Vavřince do Atlantiku.",
      tips: ["Missouri je nejdelší řekou USA, Mississippi spolu s Missouri tvoří jeden z nejdelších říčních systémů světa.", "Velká jezera jsou největší sladkovodní jezerní soustavou světa, Hořejší jezero je plochou největší sladkovodní jezero.", "Řeky západu (Colorado, Columbia) mají přehrady pro elektřinu a zavlažování.", "Kanadské řeky Nelson a La Grande vyrábějí hodně elektřiny z vody."],
      f: [
        R("Mississippi", F.mississippi, "Asi 3 770 km. Pramení v Minnesotě a ústí deltou u New Orleans do Mexického zálivu. Nejdůležitější vodní cesta USA, přeprava obilí a uhlí. Hrozí povodně.", { lab: [-91.8, 33.5] }),
        R("Missouri", RIV.missouri, "Asi 3 770 km, nejdelší řeka USA. Pramení ve Skalnatých horách v Montaně a u St. Louis se vlévá do Mississippi.", { lab: [-100, 45.6] }),
        R("Ohio", RIV.ohio, "Asi 1 580 km. Teče z Pittsburghu k Mississippi, vodní cesta průmyslového severovýchodu.", { lab: [-84, 38.3] }),
        R("Tennessee", RIV.tennessee, "Přítok Ohia. Ve 30. letech zde Tennessee Valley Authority postavila soustavu přehrad a elektráren.", { lab: [-86.5, 34.2] }),
        R("Arkansas", RIV.arkansas, "Přítok Mississippi z Colorada přes Kansas a Oklahomu.", { lab: [-98, 37.1] }),
        R("Colorado", RIV.colorado, "Asi 2 330 km. Vyhloubila Grand Canyon. Hooverova přehrada vytváří jezero Mead. Vodu z ní čerpá sedm států a Mexiko, k moři dnes často nedoteče.", { lab: [-110.5, 37.9] }),
        R("Columbia", RIV.columbia, "Asi 2 000 km, pramení v Kanadě. Největší vodní elektrárny USA (Grand Coulee). Ústí do Pacifiku.", { lab: [-120.5, 46.3] }),
        R("Rio Grande", RIV.riogrande, "Asi 3 050 km. Od El Pasa tvoří hranici USA a Mexika.", { lab: [-101.8, 28.4] }),
        R("Řeka sv. Vavřince", F.stlawrence, "Asi 1 200 km, spojuje Velká jezera s Atlantikem. Seaway (1959) umožňuje lodím plout až do Chicaga. Leží na ní Montréal a Québec.", { lab: [-70.5, 48.7] }),
        R("Mackenzie", F.mackenzie, "Nejdelší řeka Kanady, z Velkého Otročího jezera teče do Severního ledového oceánu. Velkou část roku zamrzlá.", { lab: [-125, 66] }),
        R("Yukon", F.yukon, "Teče z Kanady přes Aljašku do Beringova moře. Na přítoku Klondike vypukla v roce 1896 zlatá horečka.", { lab: [-150, 66.3] }),
        R("Nelson", RIV.nelson, "Odvádí vodu z jezera Winnipeg do Hudsonova zálivu, vodní elektrárny v Manitobě.", { lab: [-94.5, 55.4] }),
        R("Saskatchewan", RIV.saskatchewan, "Teče z Alberty přes prérie do jezera Winnipeg.", { lab: [-106, 54] }),
        R("Fraser", RIV.fraser, "Hlavní řeka Britské Kolumbie, ústí u Vancouveru. Tahy lososů.", { lab: [-124.3, 52] }),
        PT("Hořejší jezero", [-87.5, 47.7], "c3", "Největší a nejhlubší z Velkých jezer, plochou největší sladkovodní jezero světa (asi 82 000 km²).", "t"),
        PT("Michiganské jezero", [-87, 44], "c3", "Jediné z Velkých jezer celé na území USA. Na jeho břehu leží Chicago.", "l"),
        PT("Huronské jezero", [-82.4, 44.8], "c3", "Druhé největší z Velkých jezer, s Michiganským je spojeno průlivem Mackinac.", "t"),
        PT("Erijské jezero", [-81.2, 42.2], "c3", "Nejmělčí z Velkých jezer. Odtéká řekou Niagara přes Niagarské vodopády.", "b"),
        PT("Ontarijské jezero", [-77.9, 43.7], "c3", "Nejmenší z Velkých jezer, vytéká z něj řeka sv. Vavřince. Na břehu Toronto.", "t"),
        PT("Niagarské vodopády", [-79.07, 43.08], "c2", "Na řece Niagara mezi Erijským a Ontarijským jezerem, na hranici USA a Kanady. Turistika a vodní elektrárny.", "r"),
        PT("Velké Medvědí jezero", [-121, 66], "c3", "Největší jezero ležící celé v Kanadě.", "r"),
        PT("Velké Otročí jezero", [-114, 61.7], "c3", "Nejhlubší jezero Severní Ameriky (614 m). Vytéká z něj Mackenzie.", "r"),
        PT("Jezero Winnipeg", [-97.5, 52.5], "c3", "Velké jezero v Manitobě, zbytek pravěkého ledovcového jezera Agassiz.", "r"),
        PT("Velké solné jezero", [-112.5, 41.1], "c3", "Bezodtoké slané jezero v Utahu, pozůstatek pravěkého jezera Bonneville.", "l"),
        PT("Hooverova přehrada", [-114.74, 36.02], "c5", "Přehrada na řece Colorado (1936), vytváří jezero Mead, zásobuje vodou a elektřinou jihozápad.", "l")
      ]
    },
    podnebi: {
      t: "Podnebí", view: "all",
      p: "Zjednodušeně: každý stát a provincie má barvu podle převládajícího typu podnebí. Ve velkých celcích se podnebí uvnitř liší, například západ Texasu je suchý a sever Québecu subarktický.",
      tips: ["Od severu k jihu se střídá polární, subarktické, mírné a subtropické podnebí, Havaj a jih Floridy jsou tropické.", "Západní pobřeží ohřívá a zvlhčuje Pacifik, za horami ve srážkovém stínu jsou pouště.", "Vnitrozemí má velké rozdíly teplot mezi létem a zimou (kontinentalita).", "Hrozby: hurikány na jihovýchodě, tornáda na planinách, blizardy na severu, sucha a požáry na západě."],
      fills: group({ c5: "AK CA_YT CA_NT CA_NU CA_NL", c1: "ME NH VT MA RI CT NY PA NJ OH MI IN IL WI MN IA ND SD NE CA_ON CA_QC CA_NB CA_NS CA_PE CA_MB CA_SK CA_AB", c4: "MT WY CO UT NV AZ NM ID", c2: "WA OR CA CA_BC", c3: "DE MD DC VA WV KY TN NC SC GA AL MS LA AR MO OK TX KS FL HI" }),
      legend: [
        ["c5", "polární a subarktické", "Dlouhé mrazivé zimy, krátká chladná léta, permafrost. Tundra a tajga. Aljaška, kanadský sever."],
        ["c1", "vlhké kontinentální", "Teplá léta a studené zimy se sněhem, srážky po celý rok. Severovýchod a Středozápad USA, jih Kanady, kde žije většina Kanaďanů."],
        ["c4", "suché a horské", "Málo srážek, ve srážkovém stínu Kordiller. Pouště Mojave, Sonora a Chihuahua, stepi, v horách chladněji."],
        ["c2", "pacifické", "Na severu oceánské, mírné a velmi deštivé (Seattle, Vancouver). V Kalifornii středomořské se suchým létem a vlhkou zimou."],
        ["c3", "vlhké subtropické a tropické", "Horká vlhká léta, mírné zimy. Hurikány na pobřeží Mexického zálivu a Atlantiku. Havaj a jih Floridy jsou tropické."]
      ],
      f: [
        LB("Tornado Alley", [-98.5, 37.5], "Oblast nejčastějších tornád na planinách (Texas, Oklahoma, Kansas, Nebraska). Vznikají při střetu studeného vzduchu ze severu s teplým vlhkým vzduchem od Mexického zálivu.", "t-range"),
        LB("hurikány", [-80, 28.5], "Tropické cyklony vznikající nad teplým Atlantikem a Mexickým zálivem, hlavně od června do listopadu. Hurikán Katrina zničil v roce 2005 New Orleans.", "t-range"),
        LB("poušť Mojave", [-116, 35.2], "Nejsušší poušť USA s Údolím smrti."),
        LB("chinook", [-114.5, 51], "Teplý suchý vítr na východním úpatí Skalnatých hor (Alberta, Montana), v zimě rychle zvedne teplotu.", "t-range"),
        LB("permafrost", [-110, 67], "Trvale zmrzlá půda, pokrývá velkou část kanadského severu a Aljašky. Tání ničí stavby a silnice.")
      ]
    },
    zemedelstvi: {
      t: "Zemědělství", view: "lower",
      p: "Zemědělství USA a Kanady je velkovýrobní a vysoce mechanizované, pracuje v něm jen kolem 1–2 % lidí, a přesto patří k největším vývozcům potravin na světě. Specializace podle podnebí a půdy dala vzniknout tzv. pásům (belts).",
      tips: ["Corn Belt: kukuřice, sója a chov prasat, kukuřice slouží i na krmivo a etanol.", "Wheat Belt: na sušších planinách pšenice, na jihu ozimá, na severu a v Kanadě jarní.", "Kalifornie: zavlažované ovoce, zelenina, ořechy a víno v Centrálním údolí.", "Kanadské prérie: pšenice a řepka, Kanada je velkým vývozcem obou."],
      fills: group({ c2: "IA IL IN NE OH", c1: "KS ND OK MT SD CA_SK CA_AB CA_MB", c4: "TX GA MS AR AL", c3: "WI MN NY VT", c5: "WY NM" }),
      legend: [
        ["c2", "Corn Belt", "Kukuřičný pás na úrodných černozemích Středozápadu. Kukuřice, sója, chov prasat a skotu na výkrm. Iowa je největším producentem kukuřice."],
        ["c1", "Wheat Belt", "Pšeničný pás na sušších Velkých planinách a v kanadských prériích. Kansas (ozimá pšenice), Severní Dakota a Saskatchewan (jarní pšenice)."],
        ["c4", "Cotton Belt", "Bavlníkový pás na jihu, dnes hlavně Texas. Pěstuje se i rýže (Arkansas), arašídy (Georgie) a chová drůbež."],
        ["c3", "Dairy Belt", "Chov mléčného skotu v chladnějším a vlhčím severovýchodě, kde se obilí tolik nedaří. Wisconsin je známý sýry."],
        ["c5", "pastevectví", "Extenzivní chov skotu na suchých pastvinách západu (ranče). Skot se chová i v Texasu a na planinách."]
      ],
      f: [
        LB("Centrální údolí", [-120.3, 37.2], "Zavlažované údolí v Kalifornii, ovoce, zelenina, mandle a víno. Kalifornie je zemědělsky nejvýnosnějším státem USA.", "t-range"),
        LB("Florida: citrusy", [-81.5, 27.8], "Pomeranče a grapefruity, cukrová třtina u Everglades.", "t-range"),
        LB("Idaho: brambory", [-114.5, 43.4], "Idaho je známé pěstováním brambor.", "t-range")
      ]
    },
    suroviny: {
      t: "Suroviny a energie", view: "all",
      p: "USA jsou největším producentem ropy a zemního plynu na světě, hlavně díky těžbě z břidlic. Kanada má obrovské zásoby v ropných píscích a většinu ropy vyváží do USA. Kanadský štít je bohatý na kovy.",
      tips: ["Ropa: Texas (Permská pánev), Severní Dakota (Bakken), Aljaška, Mexický záliv, Alberta (ropné písky).", "Uhlí: Wyoming je největším producentem, dále Apalače.", "Kovy: železo v Minnesotě, měď v Arizoně, zlato v Nevadě, nikl v Sudbury.", "Kanada vyrábí asi 60 % elektřiny ve vodních elektrárnách."],
      legend: [["c4", "ropa a plyn"], ["c5", "uhlí"], ["c2", "kovy"], ["c1", "ostatní suroviny"], ["c3", "vodní elektrárny"]],
      f: [
        PT("Permská pánev", [-102.5, 31.8], "c4", "Západní Texas a Nové Mexiko, nejvýznamnější ropná oblast USA. Těžba z břidlic hydraulickým štěpením.", "r"),
        PT("Bakken", [-103, 48], "c4", "Břidlicová ropa v Severní Dakotě, boom po roce 2008.", "t"),
        PT("Prudhoe Bay", [-148.4, 70.2], "c4", "Největší ropné pole USA na severu Aljašky. Ropa vede Transaljašským ropovodem do přístavu Valdez.", "r"),
        PT("ropné písky Athabasca", [-111.4, 57], "c4", "Alberta. Díky ropným pískům má Kanada třetí největší zásoby ropy na světě. Těžba bitumenu je drahá a zatěžuje přírodu.", "l"),
        PT("Mexický záliv", [-90, 27.6], "c4", "Těžba ropy a plynu z moře, rafinerie a petrochemie v Houstonu a Louisianě. V roce 2010 havárie plošiny Deepwater Horizon.", "b"),
        PT("Marcellus", [-77.5, 41.5], "c4", "Břidlicový plyn v Pensylvánii a Západní Virginii.", "t"),
        PT("Hibernia", [-48.8, 46.75], "c4", "Ropné pole v moři u Newfoundlandu.", "l"),
        PT("uhlí Powder River", [-105.5, 44], "c5", "Wyoming, největší uhelná pánev USA. Povrchová těžba hnědého a černého uhlí.", "r"),
        PT("uhlí Apalače", [-81.5, 37.8], "c5", "Západní Virginie a Kentucky, černé uhlí, tradiční hornický region v útlumu.", "r"),
        PT("železo Mesabi", [-92.5, 47.5], "c2", "Minnesota, železná ruda pro ocelárny u Velkých jezer.", "b"),
        PT("měď Arizona", [-110.8, 33.2], "c2", "Arizona je největším producentem mědi v USA.", "r"),
        PT("zlato Nevada", [-116.1, 40.7], "c2", "Nevada těží většinu amerického zlata.", "l"),
        PT("nikl Sudbury", [-81, 46.5], "c2", "Ontario, ložisko niklu a mědi v kráteru po dopadu meteoritu.", "r"),
        PT("potaš Saskatchewan", [-106.6, 52.1], "c1", "Draselné soli na hnojiva, Kanada je největším producentem na světě.", "l"),
        PT("uran Athabasca", [-105, 58], "c1", "Saskatchewan, jedna z nejbohatších uranových oblastí světa.", "r"),
        PT("diamanty", [-110.6, 64.7], "c1", "Doly v Severozápadních teritoriích.", "r"),
        PT("James Bay", [-77.5, 53.8], "c3", "Soustava vodních elektráren na řece La Grande v Québecu, elektřina se vyváží i do USA.", "r"),
        PT("Churchill Falls", [-64, 53.5], "c3", "Velká vodní elektrárna v Labradoru.", "r"),
        PT("Grand Coulee", [-119, 48], "c3", "Největší vodní elektrárna USA na řece Columbia.", "l"),
        PT("Hooverova přehrada", [-114.7, 36], "c3", "Přehrada na řece Colorado.", "l")
      ]
    },
    hustota: {
      t: "Hustota zalidnění", view: "all",
      p: "Obyvatel na km² podle sčítání (USA 2020, Kanada 2021). Klikni na stát nebo provincii a uvidíš přesná čísla.",
      tips: ["Nejhustěji je osídlen severovýchod USA (New Jersey, Rhode Island, Massachusetts), megalopolis BosWash.", "Prázdný je západ USA mimo pobřeží, Aljaška a sever Kanady.", "Většina Kanaďanů žije na jihu země, blízko hranice s USA.", "Washington, D.C. má přes 4 000 obyvatel na km², na mapě je to nepatrná ploška mezi Marylandem a Virginií."],
      fills: Object.fromEntries(GEO.regions.map(r => { const d = dens(r.id); return [r.id, d == null ? "" : d < 2 ? "s1" : d < 20 ? "s2" : d < 50 ? "s3" : d < 150 ? "s4" : "s5"]; })),
      legend: [["s1", "pod 2", "Téměř neobydlená území: kanadská teritoria, Aljaška."], ["s2", "2–20", "Řídce osídlené: prérie, hory západu."], ["s3", "20–50", "Středně osídlené vnitrozemí."], ["s4", "50–150", "Hustě osídlené státy jihovýchodu a Středozápadu."], ["s5", "nad 150", "Nejhustěji osídlený severovýchod USA."]]
    },
    mesta: {
      t: "Hospodářství a města", view: "all",
      p: "Ekonomika obou zemí je soustředěna do několika center. Na severovýchodě USA leží megalopolis BosWash, v Kanadě koridor Windsor–Québec, kde žije většina obyvatel a průmyslu.",
      tips: ["Rust Belt u Velkých jezer: upadající těžký průmysl a hutnictví.", "Sun Belt na jihu a jihozápadě: rychlý růst obyvatel, high-tech, letectví a energetika.", "Pacifické pobřeží: technologie, film a obchod s Asií.", "Kanada: Toronto finance, Montréal letectví, Vancouver přístav, Calgary ropa."],
      areas: [[[-93.5, 41.5], [-87.5, 41.2], [-80, 40.8], [-75.5, 42], [-73.8, 43], [-79, 43.6], [-83, 43], [-88, 43.5], [-93, 43]]],
      f: [
        P("line", "BosWash", "Megalopolis od Bostonu přes New York, Filadelfii a Baltimore po Washington. Žije zde přes 50 milionů lidí, centrum financí, politiky a vzdělání.", { c: "mega", pts: [[-71.06, 42.36], [-72.9, 41.3], [-74.0, 40.71], [-75.16, 39.95], [-76.61, 39.29], [-77.04, 38.9]], lab: [-69.5, 40.3] }),
        P("line", "Koridor Windsor–Québec", "Nejlidnatější a nejprůmyslovější oblast Kanady podél Velkých jezer a řeky sv. Vavřince, žije zde zhruba polovina Kanaďanů.", { c: "mega", pts: [[-83.0, 42.3], [-79.38, 43.65], [-75.7, 45.42], [-73.57, 45.5], [-71.21, 46.81]], lab: [-73.5, 47.9] }),
        P("line", "SanSan", "Megalopolis v Kalifornii od San Franciska po San Diego.", { c: "mega", pts: [[-122.42, 37.77], [-121.9, 37.34], [-119.7, 34.42], [-118.24, 34.05], [-117.16, 32.72]], lab: [-123.5, 35.2] }),
        LB("Rust Belt", [-84.5, 40.2], "Rezavý pás: oblast od Pittsburghu po Chicago, kde upadl ocelářský a automobilový průmysl. Úbytek obyvatel, např. Detroit.", "t-range"),
        LB("Sun Belt", [-97, 32.5], "Sluneční pás od Kalifornie po Floridu. Rychle roste díky teplému podnebí, nižším nákladům a stěhování firem a lidí ze severu.", "t-range"),
        PT("New York", [-74, 40.71], "c2", "Největší město USA, světové finanční centrum (Wall Street), sídlo OSN, největší přístav východního pobřeží.", "r"),
        PT("Washington", [-77.04, 38.9], "c2", "Hlavní město USA, Bílý dům, Kongres, Pentagon.", "b"),
        PT("Los Angeles", [-118.24, 34.05], "c2", "Druhé největší město USA, Hollywood, letecký průmysl, přístavy Los Angeles a Long Beach.", "l"),
        PT("Chicago", [-87.63, 41.88], "c2", "Třetí největší město USA, dopravní uzel Středozápadu, komoditní burza.", "l"),
        PT("Houston", [-95.37, 29.76], "c2", "Ropa, petrochemie, řídicí středisko NASA.", "b"),
        PT("San Francisco", [-122.42, 37.77], "c2", "Vedle Silicon Valley, centrum technologických firem (Apple, Google).", "l"),
        PT("Seattle", [-122.33, 47.61], "c2", "Microsoft, Amazon, Boeing, obchod s Asií.", "l"),
        PT("Detroit", [-83.05, 42.33], "c2", "Centrum automobilového průmyslu (Ford, General Motors, Stellantis), symbol Rust Beltu.", "t"),
        PT("Atlanta", [-84.39, 33.75], "c2", "Centrum jihu, jedno z nejvytíženějších letišť světa, Coca-Cola, CNN.", "b"),
        PT("Miami", [-80.19, 25.76], "c2", "Brána do Latinské Ameriky, cestovní ruch, hispánské obyvatelstvo.", "r"),
        PT("Toronto", [-79.38, 43.65], "c3", "Největší město Kanady, finance a burza, multikulturní metropole.", "b"),
        PT("Montréal", [-73.57, 45.5], "c3", "Největší město Québecu, frankofonní centrum, letecký průmysl.", "t"),
        PT("Ottawa", [-75.7, 45.42], "c3", "Hlavní město Kanady na hranici Ontaria a Québecu.", "l"),
        PT("Vancouver", [-123.12, 49.28], "c3", "Největší přístav Kanady, obchod s Asií, film.", "l"),
        PT("Calgary", [-114.07, 51.05], "c3", "Ropné a plynárenské centrum Alberty.", "r")
      ],
      legend: [["c2", "města USA"], ["c3", "města Kanady"]]
    }
  };

  function regionInfo(m, id) {
    const s = REGION_STATS[id] || {}, nm = BLIND_NAMES[id] ? BLIND_NAMES[id][0] : id;
    let h = `<h3>${Atlas.esc(nm)}</h3>`;
    if (m === MAPS.hustota) { const d = dens(id); h += d == null ? "" : `<p><b>${fmt(d)}</b> obyvatel na km²</p><p>Počet obyvatel: ${fmt(s.pop, 0)}<br>Rozloha: ${fmt(s.area, 0)} km²</p>`; }
    else if (m.legend && m.fills && m.fills[id]) { const l = m.legend.find(x => x[0] === m.fills[id]); if (l) h += `<p class="cat"><i class="sw ${l[0]}"></i>${Atlas.esc(l[1])}</p><p>${Atlas.esc(l[2] || "")}</p>`; }
    else if (s.pop) h += `<p>Hlavní město: ${Atlas.esc(id === "CA_QC" ? "Québec" : BLIND_NAMES[id][1])}<br>Počet obyvatel: ${fmt(s.pop, 0)}<br>Rozloha: ${fmt(s.area, 0)} km²</p>`;
    return h + `<p><a href="mapa.html#${id}">Podrobnosti na interaktivní mapě</a></p>`;
  }

  window.renderMaps = function (c, sel, show, hide) {
    sel = MAPS[sel] ? sel : "relief";
    const m = MAPS[sel], A = Atlas;
    let view = m.view;
    c.innerHTML = `<div class="filters light" id="mf">${Object.entries(MAPS).map(([k, x]) => `<button data-m="${k}" aria-pressed="${k === sel}">${x.t}</button>`).join("")}</div>
<div class="tmwrap"><div><div class="tmtools"><span>Výřez:</span><button data-v="all">Celá oblast</button><button data-v="lower">USA</button><button data-v="canada">Kanada</button></div><div class="tmap" id="tm"></div></div>
<aside class="tmpanel" id="tp"></aside></div>`;
    const el = document.getElementById("tm"), tp = document.getElementById("tp");
    const intro = () => { tp.innerHTML = `<h2>${m.t}</h2><p>${m.p}</p><h4>Co si zapamatovat</h4><ul>${m.tips.map(t => `<li>${t}</li>`).join("")}</ul><p class="muted small">Klikni na stát, řeku, horu nebo bod na mapě, nebo na položku legendy.</p>`; };
    const info = (t, d, cls) => { tp.innerHTML = `<button class="back" id="bk">← Zpět na popis mapy</button><h3>${cls ? `<i class="sw ${cls}"></i>` : ""}${A.esc(t)}</h3><p>${A.esc(d)}</p>`; document.getElementById("bk").onclick = () => { clear(); intro(); }; };
    const feats = m.f || [];
    function draw() {
      A.draw(el, { view: view, fills: m.fills || null, areas: m.areas, hit: true, names: Object.fromEntries(GEO.regions.map(r => [r.id, BLIND_NAMES[r.id] ? BLIND_NAMES[r.id][0] : r.n])), title: m.t, inset: view !== "canada" });
      const svg = el.querySelector("svg"), vb = svg.viewBox.baseVal, fs = Math.max(vb.width, vb.height * 1.05) / 38, sw = vb.width / 640;
      const P_ = ll => A.project(ll[0], ll[1]), inView = p => p[0] > vb.x && p[0] < vb.x + vb.width && p[1] > vb.y && p[1] < vb.y + vb.height;
      let s = "", t = "";
      feats.forEach((f, i) => {
        if (f.k === "line") {
          const d = "M" + f.pts.map(p => P_(p).map(v => v.toFixed(1)).join(",")).join(" ");
          s += `<path class="ln ${f.c}" d="${d}"/><path class="fhit" data-f="${i}" d="${d}" style="stroke-width:${(14 * sw).toFixed(2)}"/>`;
          if (f.lab) { const p = P_(f.lab); if (inView(p)) t += `<text class="flab ${f.c === "river" ? "t-river" : f.c === "range" ? "t-range" : ""}" data-f="${i}" x="${p[0].toFixed(1)}" y="${p[1].toFixed(1)}" font-size="${(fs * .8).toFixed(2)}" text-anchor="middle">${A.esc(f.t)}</text>`; }
        } else if (f.k === "pt") {
          const p = P_(f.at), r = fs * .36, g = r + fs * .25, pos = f.pos;
          if (!inView(p)) return;
          const dx = pos === "r" ? g : pos === "l" ? -g : 0, dy = pos === "t" ? -g : pos === "b" ? g + fs * .6 : fs * .3;
          s += `<circle class="mk fpt ${f.c}" data-f="${i}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${r.toFixed(2)}" style="stroke-width:${(fs * .12).toFixed(2)}"/>`;
          t += `<text class="flab" data-f="${i}" x="${(p[0] + dx).toFixed(1)}" y="${(p[1] + dy).toFixed(1)}" font-size="${(fs * .72).toFixed(2)}" text-anchor="${pos === "r" ? "start" : pos === "l" ? "end" : "middle"}">${A.esc(f.t)}</text>`;
        } else {
          const p = P_(f.at); if (!inView(p)) return;
          t += `<text class="flab ${f.cls}" data-f="${i}" x="${p[0].toFixed(1)}" y="${p[1].toFixed(1)}" font-size="${(fs * .85 * f.s).toFixed(2)}" text-anchor="middle">${A.esc(f.t)}</text>`;
        }
      });
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.innerHTML = s + `<g style="stroke-width:${(fs * .26).toFixed(2)}">${t}</g>`;
      svg.appendChild(g);
      if (m.legend) el.insertAdjacentHTML("beforeend", `<div class="legend clickable">${m.legend.map((l, i) => `<button class="${l[0]}" data-l="${i}"><i></i>${A.esc(l[1])}</button>`).join("")}</div>`);
    }
    function clear() { el.querySelectorAll(".off,.sel,.on").forEach(x => x.classList.remove("off", "sel", "on")); el.querySelectorAll(".legend button").forEach(b => b.removeAttribute("aria-pressed")); }
    function legendPick(i) {
      clear(); const l = m.legend[i];
      el.querySelector(`[data-l="${i}"]`).setAttribute("aria-pressed", "true");
      if (m.fills) el.querySelectorAll(".rg").forEach(r => { if (m.fills[r.dataset.id] !== l[0]) r.classList.add("off"); });
      else el.querySelectorAll(".fpt").forEach(p => { if (!p.classList.contains(l[0])) p.classList.add("off"); });
      const list = feats.filter(f => f.k === "pt" && f.c === l[0]);
      tp.innerHTML = `<button class="back" id="bk">← Zpět na popis mapy</button><h3><i class="sw ${l[0]}"></i>${A.esc(l[1])}</h3>${l[2] ? `<p>${A.esc(l[2])}</p>` : ""}${!m.fills && list.length ? `<ul>${list.map(f => `<li><b>${A.esc(f.t)}:</b> ${A.esc(f.d)}</li>`).join("")}</ul>` : ""}${m.fills && m.fills !== null ? `<p class="muted small">${Object.entries(m.fills).filter(e => e[1] === l[0]).map(e => BLIND_NAMES[e[0]] ? BLIND_NAMES[e[0]][0] : "").filter(Boolean).sort((a, b) => a.localeCompare(b, "cs")).join(", ")}</p>` : ""}`;
      document.getElementById("bk").onclick = () => { clear(); intro(); };
    }
    el.onclick = e => {
      const lb = e.target.closest("[data-l]"); if (lb) return legendPick(+lb.dataset.l);
      const fe = e.target.closest("[data-f]");
      if (fe) { clear(); const f = feats[fe.dataset.f]; el.querySelectorAll(`[data-f="${fe.dataset.f}"]`).forEach(x => { x.classList.add("on"); if (x.classList.contains("fhit")) x.previousElementSibling.classList.add("on"); }); return info(f.t, f.d, f.k === "pt" ? f.c : ""); }
      const id = e.target.dataset && e.target.dataset.id;
      if (id) { clear(); e.target.classList.add("sel"); tp.innerHTML = `<button class="back" id="bk">← Zpět na popis mapy</button>` + regionInfo(m, id); document.getElementById("bk").onclick = () => { clear(); intro(); }; }
    };
    el.onmousemove = e => {
      const fe = e.target.closest && e.target.closest("[data-f]");
      if (fe) return show(e, `<b>${A.esc(feats[fe.dataset.f].t)}</b><br><span class="muted">klikni pro popis</span>`);
      const id = e.target.dataset && e.target.dataset.id; if (!id) return hide();
      const d = dens(id);
      show(e, `<b>${A.esc(BLIND_NAMES[id] ? BLIND_NAMES[id][0] : id)}</b>${sel === "hustota" && d != null ? "<br>" + fmt(d) + " obyv./km²" : ""}`);
    };
    el.onmouseleave = hide;
    const tools = c.querySelector(".tmtools");
    const setView = v => { view = v; tools.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === v)); draw(); intro(); };
    tools.onclick = e => { if (e.target.dataset.v) setView(e.target.dataset.v); };
    document.getElementById("mf").onclick = e => { if (e.target.dataset.m) { window.renderMaps(c, e.target.dataset.m, show, hide); history.replaceState(null, "", "#mapy-" + e.target.dataset.m); } };
    setView(view);
  };
})();
