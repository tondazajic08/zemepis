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
    ["Aglomerace", "Město se svým propojeným okolím."],["Bitumen", "Velmi hustá forma ropy."],["Brain drain", "Odliv vzdělaných lidí do zahraničí."],["Clo", "Poplatek při dovozu nebo vývozu zboží."],["Dodavatelský řetězec", "Návaznost firem od surovin po hotový výrobek."],["Federální distrikt", "Území spravované federací, mimo členské státy."],["First Nations", "Původní obyvatelé Kanady mimo Inuity a Métis."],["Generální guvernér", "Zástupce panovníka v Kanadě."],["Hispánci", "Obyvatelé USA s kořeny ve španělsky mluvících zemích."],["Horká skvrna", "Místo výstupu magmatu, díky němuž vznikly Havajské ostrovy."],["Hurikán", "Silná tropická cyklona v oblasti Atlantiku a východního Pacifiku."],["Hydroenergetika", "Výroba elektřiny z energie vody."],["Inuité", "Původní obyvatelé arktických oblastí."],["Kvartérní sektor", "Věda, výzkum, vzdělání a informační služby."],["Maquiladoras", "Mexické montážní závody vyrábějící pro export."],["Mechanizace", "Nahrazování lidské práce stroji."],["Métis", "Kanadští potomci původních obyvatel a Evropanů."],["Permafrost", "Trvale zmrzlá půda."],["Prérie", "Travnaté oblasti ve vnitrozemí Severní Ameriky."],["Rust Belt", "Oblast upadajícího těžkého průmyslu u Velkých jezer."],["Sun Belt", "Rychle rostoucí jih a jihozápad USA."],["Tajga", "Severský jehličnatý les."],["Terciární sektor", "Služby."],["Tornádo", "Silný vír spojující oblak se zemí."],["Tundra", "Bezlesá krajina arktických oblastí."]
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
  function cards() {
    const all = POJMY.concat(SLOV);
    let deck = shuffle(all), i = 0, known = 0;
    function draw() {
      if (!deck.length) { c.innerHTML = `<div class="result"><h2>Máš hotovo</h2><p>Všech ${all.length} kartiček je označeno jako naučené.</p><button class="btn dark" id="r">Začít znovu</button></div>`; document.getElementById("r").onclick = cards; return; }
      i = i % deck.length;
      const t = deck[i];
      c.innerHTML = `<div class="fstat">Naučeno ${known} z ${all.length} · zbývá ${deck.length}</div><div class="flash" id="fl"><button class="face-w" aria-label="Otočit kartičku"><span class="in"><span class="f f1">${esc(t[0])}</span><span class="f f2">${esc(t[1])}</span></span></button></div><div class="fctl"><button class="btn ghost" id="p">Předchozí</button><button class="btn ghost" id="n">Ještě neumím</button><button class="btn dark" id="k">Umím</button><button class="btn ghost" id="m">Zamíchat</button></div>`;
      const fl = document.getElementById("fl");
      fl.querySelector("button").onclick = () => fl.classList.toggle("flip");
      document.getElementById("p").onclick = () => { i = (i - 1 + deck.length) % deck.length; draw(); };
      document.getElementById("n").onclick = () => { i++; draw(); };
      document.getElementById("k").onclick = () => { deck.splice(i, 1); known++; draw(); };
      document.getElementById("m").onclick = () => { deck = shuffle(deck); i = 0; draw(); };
    }
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
