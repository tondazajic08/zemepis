/* Data a logika interaktivní mapy. */
(function () {
  const BASE = {
    US_AL:["Alabama","Montgomery"],US_AK:["Aljaška","Juneau"],US_AZ:["Arizona","Phoenix"],US_AR:["Arkansas","Little Rock"],US_CA:["Kalifornie","Sacramento"],US_CO:["Colorado","Denver"],US_CT:["Connecticut","Hartford"],US_DE:["Delaware","Dover"],US_DC:["District of Columbia","federální distrikt"],US_FL:["Florida","Tallahassee"],US_GA:["Georgie","Atlanta"],US_HI:["Havaj","Honolulu"],US_ID:["Idaho","Boise"],US_IL:["Illinois","Springfield"],US_IN:["Indiana","Indianapolis"],US_IA:["Iowa","Des Moines"],US_KS:["Kansas","Topeka"],US_KY:["Kentucky","Frankfort"],US_LA:["Louisiana","Baton Rouge"],US_ME:["Maine","Augusta"],US_MD:["Maryland","Annapolis"],US_MA:["Massachusetts","Boston"],US_MI:["Michigan","Lansing"],US_MN:["Minnesota","Saint Paul"],US_MS:["Mississippi","Jackson"],US_MO:["Missouri","Jefferson City"],US_MT:["Montana","Helena"],US_NE:["Nebraska","Lincoln"],US_NV:["Nevada","Carson City"],US_NH:["New Hampshire","Concord"],US_NJ:["New Jersey","Trenton"],US_NM:["Nové Mexiko","Santa Fe"],US_NY:["New York","Albany"],US_NC:["Severní Karolína","Raleigh"],US_ND:["Severní Dakota","Bismarck"],US_OH:["Ohio","Columbus"],US_OK:["Oklahoma","Oklahoma City"],US_OR:["Oregon","Salem"],US_PA:["Pensylvánie","Harrisburg"],US_RI:["Rhode Island","Providence"],US_SC:["Jižní Karolína","Columbia"],US_SD:["Jižní Dakota","Pierre"],US_TN:["Tennessee","Nashville"],US_TX:["Texas","Austin"],US_UT:["Utah","Salt Lake City"],US_VT:["Vermont","Montpelier"],US_VA:["Virginie","Richmond"],US_WA:["Washington","Olympia"],US_WV:["Západní Virginie","Charleston"],US_WI:["Wisconsin","Madison"],US_WY:["Wyoming","Cheyenne"],
    CA_AB:["Alberta","Edmonton"],CA_BC:["Britská Kolumbie","Victoria"],CA_MB:["Manitoba","Winnipeg"],CA_NB:["Nový Brunšvik","Fredericton"],CA_NL:["Newfoundland a Labrador","St. John's"],CA_NS:["Nové Skotsko","Halifax"],CA_NT:["Severozápadní teritoria","Yellowknife"],CA_NU:["Nunavut","Iqaluit"],CA_ON:["Ontario","Toronto"],CA_PE:["Ostrov prince Edvarda","Charlottetown"],CA_QC:["Québec","Québec"],CA_SK:["Saskatchewan","Regina"],CA_YT:["Yukon","Whitehorse"]
  };
  const T = { tech:["Technologie","c5"], en:["Energetika a těžba","c4"], ind:["Průmysl a finance","c1"], agr:["Zemědělství","c2"], nat:["Příroda","c3"] };
  const P = {
    US_CA:{th:"tech",tag:"Silicon Valley a technologie",ph:[["SV","Silicon Valley s městem San José"],["CA","Golden Gate a San Francisco"]],f:["Nejlidnatější stát USA, žije tu přibližně 39 milionů lidí.","Silicon Valley je sídlem firem jako Apple, Google a Nvidia.","Hollywood v Los Angeles je centrem filmového průmyslu.","Central Valley je jednou z nejproduktivnějších zemědělských oblastí světa."],x:"Kdyby byla Kalifornie samostatným státem, patřila by její ekonomika mezi pět největších na světě."},
    US_TX:{th:"en",tag:"Ropa a energetika",ph:[["TX","Ropné čerpadlo"]],f:["Největší producent ropy a zemního plynu v USA, klíčová je Permská pánev.","Houston je centrem petrochemie a energetických firem.","V Houstonu sídlí středisko NASA pro řízení letů.","Významný chov skotu a pěstování bavlny."],x:"Texas je rozlohou větší než celá Francie."},
    US_MI:{th:"ind",tag:"Automobilový průmysl",ph:[["MI","Panorama Detroitu z kanadské strany"]],f:["Detroit, zvaný Motor City, je historickým centrem automobilového průmyslu.","Sídlí tu Ford a General Motors.","Most a tunel mezi Detroitem a Windsorem patří k nejvytíženějším obchodním přechodům s Kanadou."],x:"Michigan se dotýká čtyř z pěti Velkých jezer."},
    US_NY:{th:"ind",tag:"Finance a světová metropole",ph:[["NY","Dolní Manhattan"]],f:["New York je největší město USA.","Na Wall Street sídlí Newyorská burza.","Město je sídlem Organizace spojených národů.","Severní část státu sahá k Niagarským vodopádům."],x:"Hlavním městem státu není New York, ale Albany."},
    US_DC:{th:"ind",tag:"Sídlo federální vlády",ph:[["DC","Kapitol, sídlo Kongresu"]],f:["Federální distrikt, který není součástí žádného státu.","Sídlí tu prezident, Kongres i Nejvyšší soud.","Jižní konec megalopole BosWash."],x:"Město bylo od začátku plánováno jako nové hlavní město USA."},
    US_FL:{th:"nat",tag:"Everglades, cestovní ruch a kosmonautika",ph:[["FL","Aligátor a volavka v Everglades"]],f:["Národní park Everglades chrání rozsáhlé mokřady.","Významné pěstování citrusů a cestovní ruch.","Z mysu Canaveral startují kosmické rakety.","Stát často zasahují hurikány."],x:"Everglades jsou jediným místem na světě, kde žijí aligátoři i krokodýli společně."},
    US_AK:{th:"nat",tag:"Největší stát USA",ph:[["AK","Národní park Denali"]],f:["Rozloha přibližně 1,7 milionu km².","Denali (6 190 m) je nejvyšší hora Severní Ameriky.","Ropa z Prudhoe Bay proudí Transaljašským ropovodem.","Žijí tu Inuité a další původní obyvatelé."],x:"USA koupily Aljašku od Ruska v roce 1867 za 7,2 milionu dolarů."},
    US_HI:{th:"nat",tag:"Sopečné souostroví",ph:[["HI","Proud lávy typu pahoehoe"]],f:["Padesátým státem USA se staly v roce 1959.","Ostrovy vznikly nad horkou skvrnou v Tichém oceánu.","Kīlauea patří k nejaktivnějším sopkám světa.","Ekonomika stojí na cestovním ruchu a vojenských základnách."],x:"Mauna Kea měří od základny na mořském dně přes 10 000 metrů."},
    US_WY:{th:"nat",tag:"Yellowstone a uhlí",ph:[["WY","Grand Prismatic Spring, Yellowstone"]],f:["Yellowstone byl v roce 1872 vyhlášen prvním národním parkem na světě.","Pánev Powder River činí z Wyomingu největšího producenta uhlí v USA.","Stát s nejmenším počtem obyvatel."],x:"Pod Yellowstonem se nachází obří sopečný systém, proto jsou zde gejzíry."},
    US_AZ:{th:"nat",tag:"Grand Canyon a měď",ph:[["AZ","Grand Canyon při západu slunce"]],f:["Řeka Colorado vyhloubila Grand Canyon dlouhý přibližně 446 km.","Největší producent mědi v USA.","Polopouštní a pouštní podnebí."],x:"Na dně kaňonu odhalují horniny stáří téměř dvou miliard let."},
    US_IA:{th:"agr",tag:"Srdce Corn Beltu",ph:[["IA","Kukuřičná pole v Iowě"]],f:["Největší producent kukuřice v USA.","Významné pěstování sóji a chov prasat.","Úrodné půdy a mechanizovaná velkovýroba."],x:"Velká část kukuřice končí jako krmivo nebo bioetanol, ne na talíři."},
    US_KS:{th:"agr",tag:"Wheat Belt",ph:[["KS","Historická sklizeň pšenice v Kansasu"]],f:["Jeden z největších producentů pšenice v USA.","Typická krajina Velkých planin.","Wichita je významným centrem leteckého průmyslu."],x:"Kansas leží v oblasti známé jako Tornado Alley."},
    US_WA:{th:"tech",tag:"Letectví a software",ph:[["WA","Seattle a hora Rainier"]],f:["V Seattlu a okolí sídlí Microsoft a Amazon.","Boeing tu má velké letecké výrobní závody.","Přehrada Grand Coulee na řece Columbia je největší vodní elektrárnou v USA."],x:"Stát Washington nesouvisí s hlavním městem, leží na opačném konci země."},
    CA_AB:{th:"en",tag:"Ropa a zemní plyn",ph:[["AB","Povrchový důl na ropné písky"]],f:["Athabasca patří k největším ložiskům ropných písků na světě.","Calgary je sídlem kanadských energetických firem.","Významný chov skotu.","Národní park Banff je nejstarším v Kanadě, vznikl v roce 1885."],x:"Ropné písky se těží povrchově i ohřevem ložiska párou, což má velké dopady na přírodu."},
    CA_QC:{th:"ind",tag:"Francouzsky mluvící oblast",ph:[["QC","Château Frontenac ve starém Québecu"]],f:["Jediná provincie, kde francouzština je jediným úředním jazykem.","Hydro-Québec vyrábí velké množství elektřiny z vodních elektráren.","Montréal je centrem leteckého průmyslu.","Referenda o odtržení v letech 1980 a 1995 neuspěla."],x:"V referendu roku 1995 proti odtržení hlasovalo jen 50,58 % voličů."},
    CA_ON:{th:"ind",tag:"Průmyslové centrum Kanady",ph:[["ON","Toronto s věží CN Tower"]],f:["Nejlidnatější provincie, žije tu téměř 40 % Kanaďanů.","Toronto je finančním centrem země.","Automobilový průmysl je propojen s Michiganem.","V Sudbury se těží nikl."],x:"Federální hlavní město Ottawa leží v Ontariu, na hranici s Québecem."},
    CA_BC:{th:"en",tag:"Lesnictví a brána do Asie",ph:[["BC","Vancouver a pobřežní hory"]],f:["Vancouver je největším přístavem Kanady.","Významné lesnictví a těžba.","Hustě zalesněné pobřeží a pohoří Kordiller."],x:"Hlavním městem není Vancouver, ale Victoria na ostrově Vancouver."},
    CA_SK:{th:"agr",tag:"Prérie, uran a potaš",ph:[["SK","Sýpka v saskatchewanské prérii"]],f:["Významná produkce pšenice a řepky.","Oblast Athabasca je bohatá na uran.","Kanada je díky Saskatchewanu největším světovým producentem potaše."],x:"Potaš je hlavní surovinou pro draselná hnojiva."},
    CA_MB:{th:"agr",tag:"Prérie a Hudsonův záliv",ph:[["MB","Záchytné zařízení pro lední medvědy v Churchillu"]],f:["Na jihu pěstování obilí a chov skotu.","Řeka Nelson je významná pro vodní energetiku.","Přístav Churchill leží na Hudsonově zálivu."],x:"V Churchillu dočasně zadržují lední medvědy, kteří se přiblíží ke městu."},
    CA_NU:{th:"nat",tag:"Území Inuitů",ph:[["NU","Iqaluit, hlavní město teritoria"]],f:["Vznikl v roce 1999 oddělením od Severozápadních teritorií.","Největší kanadská jednotka podle rozlohy.","Většinu obyvatel tvoří Inuité.","Převažuje tundra a permafrost."],x:"Do Iqaluitu nevede žádná silnice z jihu Kanady."},
    CA_NL:{th:"nat",tag:"Atlantik a stopy Vikingů",ph:[["NL","Národní park Gros Morne"]],f:["Gros Morne je zapsán na seznamu UNESCO.","Na moři se těží ropa, v Labradoru železná ruda.","Churchill Falls je velká vodní elektrárna."],x:"V L'Anse aux Meadows se dochovala osada Vikingů z doby kolem roku 1000."}
  };
  window.REGION_NAMES = Object.fromEntries(Object.entries(BASE).map(([k, v]) => [k, v[0]]));

  const panel = document.getElementById("panel");
  if (!panel) return;
  const esc = Atlas.esc;
  const fills = {}; for (const id in P) fills[id] = T[P[id].th][1];
  Atlas.draw(document.getElementById("map"), { view: "all", fills, hit: true, names: REGION_NAMES, fs: 1, title: "Interaktivní mapa USA a Kanady", legend: Object.values(T).map(t => [t[1], t[0]]) });

  const paths = [...document.querySelectorAll("#map .rg")];
  let sel = null;
  function intro() {
    panel.innerHTML = `<h2>Vyber oblast</h2><p class="tag">USA a Kanada na jedné mapě</p><p>Začni třeba těmito oblastmi:</p><div class="chips" id="q"></div>`;
    const s = ["US_CA", "US_TX", "US_MI", "CA_AB", "CA_QC", "CA_ON"];
    panel.querySelector("#q").innerHTML = s.map(id => `<button class="filters-b chip" data-go="${id}">${BASE[id][0]}</button>`).join("");
  }
  function show(id) {
    if (sel) sel.classList.remove("sel");
    sel = paths.find(x => x.dataset.id === id);
    if (sel) { sel.classList.add("sel"); sel.parentNode.appendChild(sel); }
    const b = BASE[id], d = P[id], kind = id.startsWith("US_") ? "USA" : "Kanada";
    const cap = id === "CA_QC" ? "Hlavní město: Québec (město)" : id === "US_DC" ? "Federální distrikt" : "Hlavní město: " + b[1];
    if (!d) { panel.innerHTML = `<h2>${esc(b[0])}</h2><p class="tag">${kind} · ${esc(cap)}</p><p>Tato oblast nemá podrobný profil. Vyzkoušej některou z barevných oblastí.</p>`; panel.scrollTop = 0; return; }
    const figs = d.ph.map(p => { const m = PHOTOS[p[0]]; return `<figure><img src="${m.src}" alt="${esc(p[1])}" loading="lazy"><figcaption>${esc(p[1])}. Foto: ${esc(m.a)}, <a href="${m.u}" target="_blank" rel="noopener">${esc(m.l)}</a></figcaption></figure>`; }).join("");
    panel.innerHTML = `<h2>${esc(b[0])}</h2><p class="tag">${kind} · ${esc(d.tag)} · ${esc(cap)}</p>${figs}<ul>${d.f.map(x => `<li>${esc(x)}</li>`).join("")}</ul><div class="fun"><b>Zajímavost</b>${esc(d.x)}</div>`;
    panel.scrollTop = 0;
    if (innerWidth <= 900) panel.scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("map").addEventListener("click", e => { const id = e.target.dataset && e.target.dataset.id; if (id) show(id); });
  document.getElementById("map").addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.dataset.id) { e.preventDefault(); show(e.target.dataset.id); } });
  panel.addEventListener("click", e => { const g = e.target.dataset && e.target.dataset.go; if (g) show(g); });

  const box = document.getElementById("filters");
  const opts = [["", "Vše"]].concat(Object.entries(T).map(([k, v]) => [k, v[0]]));
  box.innerHTML = opts.map(o => `<button data-f="${o[0]}" aria-pressed="${o[0] === ""}">${o[1]}</button>`).join("");
  box.addEventListener("click", e => {
    if (!e.target.matches("button")) return;
    const f = e.target.dataset.f;
    box.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b === e.target));
    paths.forEach(x => { const d = P[x.dataset.id]; x.classList.toggle("off", !!f && !(d && d.th === f)); });
  });
  const start = location.hash.slice(1);
  if (BASE[start]) show(start); else intro();
})();
