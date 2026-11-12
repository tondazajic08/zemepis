(function () {
  const POJMY = [
    ["Federace", "Stát složený z členských celků s vlastní samosprávou, např. USA a Kanada."],
    ["Konstituční monarchie", "Monarchie, kde moc panovníka omezuje ústava. Příkladem je Kanada."],
    ["Kordillery", "Mohutný horský systém na západě Severní Ameriky."],
    ["Kanadský štít", "Prahorní jádro kontinentu kolem Hudsonova zálivu, bohaté na suroviny."],
    ["Megalopolis", "Souvislá urbanizovaná oblast více velkoměst, např. BosWash."],
    ["Urbanizace", "Proces růstu měst a zvyšování podílu městského obyvatelstva."],
    ["Corn Belt", "Kukuřičný pás ve Středozápadě USA."],
    ["Wheat Belt", "Pšeničný pás na Velkých planinách."],
    ["Cotton Belt", "Bavlníkový pás na jihu USA."],
    ["Silicon Valley", "Centrum informačních technologií v Kalifornii."],
    ["Ropné písky", "Směs písku, vody a bitumenu, z níž se získává ropa, typicky v Albertě."],
    ["NORAD", "Společné velení USA a Kanady pro obranu vzdušného prostoru."],
    ["NAFTA", "Severoamerická dohoda o volném obchodu, platná od roku 1994 do roku 2020."],
    ["USMCA", "Nástupce NAFTA, platný od 1. července 2020."],
    ["Zóna volného obchodu", "Členové mezi sebou odstraňují cla, vůči nečlenům si je určují sami."]
  ];
  const SLOV = [
    ["Aglomerace", "Město se svým propojeným okolím."],["Bitumen", "Velmi hustá forma ropy."],["Brain drain", "Odliv vzdělaných lidí do zahraničí."],["Clo", "Poplatek při dovozu nebo vývozu zboží."],["Dodavatelský řetězec", "Návaznost firem od surovin po hotový výrobek."],["Federální distrikt", "Území spravované federací, mimo členské státy."],["First Nations", "Původní obyvatelé Kanady mimo Inuity a Métis."],["Generální guvernér", "Zástupce panovníka v Kanadě."],["Hispánci", "Obyvatelé USA s kořeny ve španělsky mluvících zemích."],["Horká skvrna", "Místo výstupu magmatu, díky němuž vznikly Havajské ostrovy."],["Hurikán", "Silná tropická cyklona v oblasti Atlantiku a východního Pacifiku."],["Hydroenergetika", "Výroba elektřiny z energie vody."],["Inuité", "Původní obyvatelé arktických oblastí."],["Kvartérní sektor", "Věda, výzkum, vzdělání a informační služby."],["Maquiladoras", "Mexické montážní závody vyrábějící pro export."],["Mechanizace", "Nahrazování lidské práce stroji."],["Métis", "Kanadští potomci původních obyvatel a Evropanů."],["Permafrost", "Trvale zmrzlá půda."],["Prérie", "Travnaté oblasti ve vnitrozemí Severní Ameriky."],["Rust Belt", "Oblast upadajícího těžkého průmyslu u Velkých jezer."],["Sun Belt", "Rychle rostoucí jih a jihozápad USA."],["Tajga", "Severský jehličnatý les."],["Terciární sektor", "Služby."],["Tornádo", "Silný vír spojující oblak se zemí."],["Tundra", "Bezlesá krajina arktických oblastí."],
    ["Apalače", "Staré, zarovnané pohoří na východě USA a Kanady, bohaté na uhlí."],["Velké planiny", "Suché travnaté plošiny východně od Skalnatých hor, pšenice a chov skotu."],["Centrální nížiny", "Úrodná oblast kolem Mississippi a Velkých jezer, Corn Belt."],["Velká pánev", "Bezodtoká suchá oblast mezi Sierrou Nevadou a Wasatchem (Nevada, Utah)."],["Bezodtoká oblast", "Území, z něhož voda neodtéká do moře, např. Velká pánev a Velké solné jezero."],["Zlom svatého Ondřeje", "Zlom v Kalifornii na styku Pacifické a Severoamerické desky, příčina zemětřesení."],["Gejzír", "Horký pramen, který pravidelně vystřikuje vodu a páru, např. Old Faithful v Yellowstonu."],["Kaňon", "Hluboké úzké údolí vyhloubené řekou, např. Grand Canyon."],["Ledovcová jezera", "Jezera v prohlubních po pevninském ledovci, Velká jezera a jezera Kanadského štítu."],["Chinook", "Teplý suchý padavý vítr na východní straně Skalnatých hor, obdoba fénu."],["Blizard", "Silná sněhová bouře s mrazem a větrem."],["Tornado Alley", "Pás Velkých planin s nejčastějším výskytem tornád."],["Severozápadní průjezd", "Námořní cesta mezi Atlantikem a Pacifikem přes kanadskou Arktidu."],["BosWash", "Megalopolis od Bostonu po Washington."],["ChiPitts", "Megalopolis u Velkých jezer od Chicaga po Pittsburgh."],["SanSan", "Megalopolis v Kalifornii od San Franciska po San Diego."],["Suburbanizace", "Stěhování obyvatel z center měst do předměstí."],["Gentrifikace", "Proměna chudší čtvrti na dražší, kam se stěhují bohatší obyvatelé."],["Melting pot", "Představa USA jako tavicího kotle, kde přistěhovalci splynou v jeden národ."],["Salad bowl", "Představa společnosti, kde si skupiny zachovávají vlastní kulturu, typická pro Kanadu."],["Multikulturalismus", "Politika uznávající rovnocennost kultur, Kanada ji oficiálně přijala v roce 1971."],["Rezervace", "Území vyhrazené původním obyvatelům v USA (v Kanadě reserves)."],["Inuktitut", "Jazyk Inuitů, jeden z úředních jazyků Nunavutu."],["Frankofonie", "Francouzsky mluvící obyvatelstvo, v Kanadě hlavně Québec a Nový Brunšvik."],["Commonwealth", "Společenství států převážně bývalého Britského impéria, Kanada je jeho členem."],["Prezidentská republika", "Prezident je hlavou státu i vlády, např. USA."],["Sbor volitelů", "Orgán, který volí prezidenta USA podle výsledků ve státech."],["Monokultura", "Pěstování jedné plodiny na velké ploše."],["Agrobyznys", "Propojení zemědělství s průmyslem, obchodem a službami do velkých firem."],["Hydraulické štěpení", "Těžba ropy a plynu z břidlic rozrušením hornin kapalinou pod tlakem (fracking)."],["Břidlicová ropa", "Ropa uzavřená v nepropustných horninách, v USA zdroj ropného boomu."],["Technopolis", "Centrum výzkumu a vyspělých technologií, např. Silicon Valley."],["Celní unie", "Zóna volného obchodu se společným clem vůči nečlenům, např. EU. NAFTA celní unií nebyla."],["Pravidla původu", "Určují, jaký podíl výrobku musí pocházet z regionu, aby se na něj nevztahovalo clo."],["Protekcionismus", "Ochrana domácí výroby cly a jinými překážkami dovozu."],["Nearshoring", "Přesun výroby do blízké země, např. z Asie do Mexika."],["Outsourcing", "Svěření části výroby nebo služeb jiné firmě, často do zahraničí."],["Integrace", "Hospodářské propojování států, od zóny volného obchodu po hospodářskou unii."]
  ];
  const OTAZKY = [
    ["Charakterizujte přírodní podmínky USA.", "Popiš členění od západu k východu: Kordillery, Velké planiny, Centrální nížiny, Apalače. Doplň Aljašku, Havaj, podnebí, řeky a přírodní hrozby."],
    ["Popište politický systém USA.", "Federace 50 států, prezidentská republika, dělba moci, Kongres se dvěma komorami, Nejvyšší soud, dominance dvou stran."],
    ["Co ovlivňuje rozmístění obyvatel v USA?", "Historie osídlení z východu, přistěhovalectví, pobřeží, průmyslová centra, přesun do Sun Beltu. Uveď BosWash a hlavní aglomerace."],
    ["Charakterizujte hospodářství USA.", "Největší ekonomika světa, převaha služeb a výzkumu, klíčové průmyslové oblasti, Silicon Valley, Wall Street, zemědělské pásy a suroviny."],
    ["Vysvětlete princip zemědělských pásů v USA.", "Specializace podle podnebí a půd: Corn Belt, Wheat Belt, Cotton Belt, Dairy Belt. Velkovýroba a mechanizace."],
    ["Porovnejte USA a Kanadu.", "Rozloha podobná, Kanada má asi osminu obyvatel. USA prezidentská republika, Kanada konstituční monarchie. Odlišná hustota zalidnění a struktura ekonomiky."],
    ["Charakterizujte přírodní podmínky Kanady.", "Kanadský štít, Kordillery, Apalače, tundra a tajga, permafrost, jezera a řeky, podnebí od mírného po polární."],
    ["Vysvětlete jazykovou situaci v Kanadě.", "Angličtina a francouzština jsou úřední, Québec jako francouzské centrum, historie, zákon č. 101, referenda 1980 a 1995."],
    ["Čím je Kanada významná jako producent surovin?", "Ropné písky v Albertě, nikl, uran, zlato, železná ruda, dřevo, vodní energie. Vývoz především do USA."],
    ["Jaké jsou vzájemné vztahy USA a Kanady?", "Společná hranice 8 891 km, intenzivní obchod, energie, automobilový průmysl, NORAD, NATO."],
    ["Co byla NAFTA a jaké měla dopady?", "Zóna volného obchodu od roku 1994. Růst obchodu a investic, propojení výroby, ale přesun výroby, ztráta některých míst a nerovnoměrné výhody."],
    ["V čem se USMCA liší od NAFTA?", "75 % hodnoty auta z regionu, mzdové pravidlo, ochrana práce a životního prostředí přímo v dohodě, digitální obchod, přezkum po 6 letech."]
  ];
  const SHRNUTI = [
    ["USA: základní charakteristika", "Federativní prezidentská republika s 50 státy. Světová velmoc, člen OSN, NATO, G7 a G20."],
    ["Přírodní podmínky USA", "Hory na západě a východě, planiny uprostřed. Podnebí od polárního po subtropické, časté přírodní katastrofy."],
    ["Obyvatelstvo USA", "Multikulturní a vysoce urbanizovaná společnost, nejhustší osídlení na severovýchodě a pobřeží, megalopolis BosWash."],
    ["Hospodářství USA", "Největší ekonomika podle nominálního HDP. Dominují služby, výzkum a technologie, zemědělství je mechanizované."],
    ["Kanada", "Federace 10 provincií a 3 teritorií, konstituční monarchie, dvojjazyčný stát s centrem francouzštiny v Québecu."],
    ["Přírodní podmínky Kanady", "Kanadský štít, Kordillery, tundra, tajga a jezera. Většina lidí žije na jihu."],
    ["Obyvatelstvo a hospodářství Kanady", "Nízká hustota, multikulturní společnost. Suroviny, ropa z Alberty, lesnictví a vodní energie."],
    ["Hospodářské oblasti", "USA: Severovýchod, Velká jezera, Kalifornie, Texas, Středozápad. Kanada: Ontario, Québec, Alberta, Britská Kolumbie, prérie."],
    ["Vzájemné vztahy", "Dlouhá hranice, silné obchodní vazby, propojený automobilový průmysl a společná obrana NORAD."],
    ["NAFTA", "Zóna volného obchodu USA, Kanady a Mexika z roku 1994, propojila výrobu tří států."],
    ["Důsledky NAFTA", "Růst obchodu a investic na straně jedné, přesun výroby a ztráta některých míst na straně druhé."],
    ["USMCA", "Nástupce NAFTA od 1. 7. 2020 s přísnějšími pravidly pro auta, ochranou práce a digitálním obchodem."]
  ];
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const terms = l => `<dl class="terms">${l.map(t => `<div><dt>${esc(t[0])}</dt><dd>${esc(t[1])}</dd></div>`).join("")}</dl>`;
  const c = document.getElementById("content"), tabs = document.getElementById("tabs");
  const TABS = {
    pojmy: ["Nejdůležitější pojmy", () => { c.innerHTML = terms(POJMY); }],
    slovnik: ["Slovníček", () => {
      c.innerHTML = '<input class="search" id="s" type="search" placeholder="Hledat pojem" aria-label="Hledat pojem"><div id="l"></div>';
      const r = q => { document.getElementById("l").innerHTML = terms(SLOV.filter(t => (t[0] + t[1]).toLowerCase().includes(q.toLowerCase()))); };
      document.getElementById("s").oninput = e => r(e.target.value); r("");
    }],
    otazky: ["Maturitní otázky", () => { c.innerHTML = OTAZKY.map(o => `<details><summary>${esc(o[0])}</summary><div>${esc(o[1])}</div></details>`).join(""); }],
    shrnuti: ["Shrnutí kapitol", () => { c.innerHTML = `<div class="cards">${SHRNUTI.map((s, i) => `<div class="card"><span class="n">Kapitola ${i + 1}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></div>`).join("")}</div>`; }],
    karty: ["Kartičky", cards]
  };
  const BN = window.BLIND_NAMES || {};
  const DECKS = {
    pojmy: ["Pojmy a slovníček", () => POJMY.concat(SLOV)],
    usc: ["Hlavní města USA", () => Object.keys(BN).filter(k => k.startsWith("US_") && k !== "US_DC").map(k => [BN[k][0], BN[k][1]])],
    cac: ["Hlavní města Kanady", () => Object.keys(BN).filter(k => k.startsWith("CA_")).map(k => [BN[k][0], k === "CA_QC" ? "Québec" : BN[k][1]])],
    roky: ["Letopočty", () => (window.TIMELINE || []).map(e => [e[3], e[1] + " · " + e[4]])]
  };
  const store = { get(k) { try { return JSON.parse(localStorage.getItem("karty-" + k) || "[]"); } catch (e) { return []; } }, set(k, v) { try { localStorage.setItem("karty-" + k, JSON.stringify(v)); } catch (e) { } } };
  function cards(dk) {
    dk = DECKS[dk] ? dk : "pojmy";
    const all = DECKS[dk][1](), knownSet = new Set(store.get(dk).filter(q => all.some(t => t[0] === q)));
    let deck = shuffle(all.filter(t => !knownSet.has(t[0]))), i = 0, side = false;
    const pick = `<div class="filters light" id="dks">${Object.entries(DECKS).map(([k, d]) => `<button data-d="${k}" aria-pressed="${k === dk}">${d[0]}</button>`).join("")}<button data-side="1" aria-pressed="false">Otočit otázku a odpověď</button></div>`;
    function draw() {
      const head = pick + `<div class="fstat">Umíš ${knownSet.size} z ${all.length} · zbývá ${deck.length} · postup se ukládá v tomto prohlížeči</div>`;
      if (!deck.length) { c.innerHTML = head + `<div class="result"><h2>Máš hotovo</h2><p>Všech ${all.length} kartiček v balíčku umíš.</p><button class="btn dark" id="r">Začít znovu</button></div>`; bind(); document.getElementById("r").onclick = () => { store.set(dk, []); cards(dk); }; return; }
      i = i % deck.length;
      const t = deck[i], a = side ? t[1] : t[0], b = side ? t[0] : t[1];
      c.innerHTML = head + `<div class="flash" id="fl"><button class="face-w" aria-label="Otočit kartičku"><span class="in"><span class="f f1">${esc(a)}</span><span class="f f2">${esc(b)}</span></span></button></div><div class="fctl"><button class="btn ghost" id="p">Předchozí</button><button class="btn ghost" id="n">Ještě neumím</button><button class="btn dark" id="k">Umím</button><button class="btn ghost" id="m">Zamíchat</button><button class="btn ghost" id="x">Vynulovat postup</button></div>`;
      bind();
      const fl = document.getElementById("fl");
      fl.querySelector("button").onclick = () => fl.classList.toggle("flip");
      document.getElementById("p").onclick = () => { i = (i - 1 + deck.length) % deck.length; draw(); };
      document.getElementById("n").onclick = () => { const x = deck.splice(i, 1)[0]; deck.splice(Math.min(deck.length, i + 3), 0, x); i++; draw(); };
      document.getElementById("k").onclick = () => { knownSet.add(deck[i][0]); deck.splice(i, 1); store.set(dk, [...knownSet]); draw(); };
      document.getElementById("m").onclick = () => { deck = shuffle(deck); i = 0; draw(); };
      document.getElementById("x").onclick = () => { store.set(dk, []); cards(dk); };
    }
    function bind() { document.getElementById("dks").onclick = e => { const b = e.target.closest("button"); if (!b) return; if (b.dataset.side) { side = !side; draw(); document.querySelector("[data-side]").setAttribute("aria-pressed", side); } else cards(b.dataset.d); }; if (side) document.querySelector("[data-side]").setAttribute("aria-pressed", "true"); }
    draw();
  }
  tabs.innerHTML = Object.entries(TABS).map(([k, v]) => `<button role="tab" data-t="${k}">${v[0]}</button>`).join("");
  function open(k) {
    if (!TABS[k]) k = "pojmy";
    tabs.querySelectorAll("button").forEach(b => b.setAttribute("aria-selected", b.dataset.t === k));
    TABS[k][1]();
    history.replaceState(null, "", "#" + k);
  }
  tabs.onclick = e => { if (e.target.dataset.t) open(e.target.dataset.t); };
  open(location.hash.slice(1));
})();
