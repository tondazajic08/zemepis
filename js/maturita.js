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
  /* Odpovědi: řádek „## “ = mezititulek, „- “ = odrážka, ostatní řádky = odstavce, **text** = tučně. */
  const OTAZKY = [
    ["Charakterizujte přírodní podmínky USA.", `
USA mají rozlohu asi 9,8 milionu km² a patří ke čtyřem největším státům světa. Území se táhne od Atlantiku po Tichý oceán, k tomu patří **Aljaška** na severozápadě kontinentu a **Havaj** uprostřed Tichého oceánu. Povrch je uspořádaný v pásech od severu k jihu, proto se nejlépe popisuje od západu na východ.
## Povrch od západu k východu
- **Kordillery** na západě: mladé pásemné pohoří. Patří k nim Skalnaté hory (Mount Elbert 4 401 m), Kaskádové pohoří se sopkami (Mount Rainier 4 392 m, výbuch Mount St. Helens 1980), Sierra Nevada (Mount Whitney 4 421 m, nejvyšší vrchol 48 sousedících států) a Pobřežní pásma. Mezi pásmy leží plošiny a pánve: Velká pánev, Koloradská plošina s Grand Canyonem a Kolumbijská plošina.
- **Velké planiny**: suché travnaté plošiny východně od Skalnatých hor, mírně se svažují k východu.
- **Centrální nížiny**: úrodná rovina kolem Mississippi a Velkých jezer s černozeměmi, hlavní zemědělská oblast.
- **Apalačské pohoří** na východě: staré vrásové pohoří (vrásnění před více než 250 miliony let), erozí snížené, nejvyšší Mount Mitchell 2 037 m, bohaté na černé uhlí.
- **Pobřežní nížiny** podél Atlantiku a Mexického zálivu, na jihu Floridy mokřady Everglades.
- **Aljaška**: Denali (6 190 m), nejvyšší hora Severní Ameriky. **Havaj**: sopečné ostrovy nad horkou skvrnou (Mauna Kea, aktivní Kīlauea).
## Podnebí
USA leží ve většině podnebných pásů: polární a subarktické na Aljašce, mírné vlhké kontinentální na severovýchodě a Středozápadě, vlhké subtropické na jihovýchodě, středomořské v Kalifornii, suché pouštní na jihozápadě (Mojave, Sonora, Chihuahua) a tropické na Havaji a jihu Floridy. Protože hory běží od severu k jihu, studený a teplý vzduch se ve vnitrozemí volně střetává.
## Vodstvo
- Říční systém **Mississippi–Missouri** je nejdelší v Severní Americe a ústí deltou do Mexického zálivu.
- **Colorado** vyhloubilo Grand Canyon, **Columbia** má velké přehrady (Grand Coulee), **Rio Grande** tvoří hranici s Mexikem.
- **Velká jezera** USA sdílejí s Kanadou, jsou to největší soustava sladkovodních jezer na světě.
- **Velké Solné jezero** je zbytek bezodtoké oblasti Velké pánve.
## Přírodní hrozby
- **Hurikány** na pobřeží Atlantiku a Mexického zálivu od června do listopadu (Katrina 2005).
- **Tornáda** hlavně v Tornado Alley na Velkých planinách, USA mají nejvíc tornád na světě.
- **Zemětřesení** na zlomu San Andreas v Kalifornii a na Aljašce (1964, magnituda 9,2).
- **Lesní požáry** na západě, **sucha** na jihozápadě, **povodně** na Mississippi.
## Přírodní parky
Yellowstone (1872, první národní park na světě, gejzíry), Grand Canyon, Yosemite, Everglades, Denali.
**Na závěr:** povrch tvoří tři hlavní pásy (Kordillery, vnitrozemské roviny, Apalače), což ovlivňuje podnebí, rozmístění obyvatel i zemědělství.`],

    ["Popište politický systém USA.", `
USA jsou **federativní prezidentská republika** složená z 50 států a federálního distriktu Columbia (Washington, D.C.). Základem je **ústava z roku 1787**, nejstarší dosud platná psaná ústava. Prvních deset dodatků z roku 1791 tvoří **Listinu práv** (svoboda slova, náboženství, tisku, právo na spravedlivý proces).
## Dělba moci a brzdy a protiváhy
Moc je rozdělena na tři složky, které se navzájem kontrolují (systém checks and balances).
- **Výkonná moc – prezident**: je hlavou státu i vlády a vrchním velitelem armády. Volí se nepřímo přes **sbor volitelů** (538 volitelů, k vítězství je potřeba 270) na 4 roky, nejvýše dvakrát (22. dodatek). Jmenuje ministry a soudce, může vetovat zákony.
- **Zákonodárná moc – Kongres**: má dvě komory. **Senát** má 100 senátorů, dva za každý stát, volí se na 6 let a každé dva roky se obměňuje třetina. **Sněmovna reprezentantů** má 435 členů podle počtu obyvatel států, volí se na 2 roky. Kongres schvaluje zákony a rozpočet a dvoutřetinovou většinou může přehlasovat prezidentské veto.
- **Soudní moc – Nejvyšší soud**: devět soudců jmenovaných prezidentem se souhlasem Senátu, zpravidla doživotně. Může zrušit zákon, který odporuje ústavě.
## Federalismus
Každý stát má vlastní ústavu, guvernéra, zákonodárný sbor a soudy. Státy rozhodují o školství, policii, dopravě nebo trestech, proto se zákony mezi státy liší (například trest smrti, daně, pravidla řízení). Federace má na starosti zahraniční politiku, obranu, měnu a mezistátní obchod.
## Politické strany a volby
Politice dominují **dvě strany**: Demokratická a Republikánská. Volební systém, kde vítěz bere vše, malým stranám nedává šanci. Prezidentské volby jsou každé čtyři roky, volby do Kongresu každé dva roky.
## Mezinárodní postavení
USA jsou stálým členem Rady bezpečnosti OSN, zakládajícím členem NATO (1949), členem G7 a G20. Sídlí v nich OSN (New York), Světová banka a Mezinárodní měnový fond (Washington).
**Na závěr:** systém stojí na silném prezidentovi, dvoukomorovém Kongresu, nezávislých soudech a velké samostatnosti států.`],

    ["Co ovlivňuje rozmístění obyvatel v USA?", `
USA mají asi **342 milionů obyvatel** a jsou třetím nejlidnatějším státem světa. Průměrná hustota je asi 36 obyvatel na km², ale osídlení je velmi nerovnoměrné.
## Historické faktory
- Evropané osídlovali kontinent **od východu**, první kolonie vznikly na atlantském pobřeží (Jamestown 1607). Proto je severovýchod osídlen nejhustěji.
- V 19. století se hranice osídlení posouvala na západ, pomohla tomu transkontinentální železnice (1869) a zlatá horečka v Kalifornii.
- Přistěhovalci přicházeli nejprve z Británie a Irska, potom z Německa, Itálie a východní Evropy, dnes nejvíce z Latinské Ameriky (hlavně z Mexika) a Asie. Přistěhovalci tvoří zhruba 14 % obyvatel.
## Přírodní faktory
- Lidé žijí hlavně na **pobřežích** a u **Velkých jezer**, kde je dobrá doprava a mírné podnebí.
- Řídce osídlené jsou **hory a pouště západu**, Velké planiny a Aljaška.
## Hospodářské faktory
- Lidé se stěhují za prací do průmyslových a obchodních center.
- Od 70. let se obyvatelstvo přesouvá z upadajícího **Rust Beltu** na severovýchodě do **Sun Beltu** na jihu a jihozápadě (Texas, Florida, Arizona, Kalifornie), kde je teplé podnebí, nižší daně a nová pracovní místa. Těžiště obyvatel USA se tak dlouhodobě posouvá na jihozápad.
## Města a megalopole
- Ve městech žije přes **80 %** obyvatel. Rozvinutá je **suburbanizace**, stěhování do předměstí.
- **BosWash**: megalopole od Bostonu přes New York, Filadelfii a Baltimore po Washington, přes 50 milionů lidí.
- **ChiPitts** u Velkých jezer (Chicago, Detroit, Cleveland, Pittsburgh) a **SanSan** v Kalifornii (San Francisco až San Diego).
- Největší města: New York (asi 8,8 milionu), Los Angeles, Chicago, Houston, Phoenix.
## Složení obyvatel
Podle sčítání 2020 tvoří 57,8 % nehispánští běloši, 18,7 % Hispánci, 12,1 % Afroameričané a 5,9 % Asiaté. Hispánci jsou nejrychleji rostoucí skupinou, Afroameričané žijí hodně na jihu a ve velkých městech severu.
**Na závěr:** rozmístění je výsledkem historie osídlení z východu, přírodních podmínek a hospodářského vývoje, dnes je patrný hlavně přesun do Sun Beltu.`],

    ["Charakterizujte hospodářství USA.", `
USA jsou **největší ekonomikou světa** podle nominálního HDP. Patří mezi nejvyspělejší státy s vysokým HDP na obyvatele (podle Světové banky asi 90 tisíc USD). Americký dolar je hlavní světovou rezervní měnou.
## Struktura hospodářství
- **Služby (terciér a kvartér)** tvoří asi tři čtvrtiny HDP: finance (Wall Street v New Yorku), obchod, zdravotnictví, cestovní ruch, film (Hollywood), věda a výzkum.
- **Průmysl** tvoří necelou pětinu HDP: high-tech, letecký, automobilový, chemický a zbrojní průmysl.
- **Zemědělství** tvoří jen asi 1 % HDP a pracují v něm 1–2 % lidí, přesto jsou USA jedním z největších vývozců potravin na světě.
## Hlavní hospodářské oblasti
- **Severovýchod (BosWash)**: finance, obchod, univerzity (Harvard, MIT), sídla firem.
- **Oblast Velkých jezer – Rust Belt**: tradiční hutnictví a automobilový průmysl (Detroit: Ford, General Motors), od 70. let úpadek, dnes přeměna na služby.
- **Sun Belt**: rychlý růst, elektronika, letectví, kosmonautika (Houston, Florida), energetika.
- **Tichomořské pobřeží**: Silicon Valley (Apple, Google, Nvidia), Seattle (Microsoft, Amazon, Boeing), film v Los Angeles, obchod s Asií.
- **Tech Hubs**: kromě Silicon Valley také Austin a Boston.
## Suroviny a energie
- USA jsou **největším producentem ropy a zemního plynu na světě**, hlavně díky těžbě z břidlic (Permská pánev v Texasu, Bakken v Severní Dakotě), dále Aljaška a Mexický záliv.
- Uhlí ve Wyomingu a Apalačích, železná ruda v Minnesotě, měď v Arizoně, zlato v Nevadě.
## Doprava a obchod
Hustá síť dálnic (Interstate), železnice pro nákladní dopravu, nejvytíženější letiště světa (Atlanta). Největšími obchodními partnery jsou Mexiko, Kanada a Čína. S Mexikem a Kanadou tvoří USA zónu volného obchodu USMCA.
## Problémy
Velký zahraniční obchodní deficit, vysoký státní dluh, rozdíly v příjmech, přesun průmyslové výroby do zahraničí.
**Na závěr:** USA jsou postindustriální ekonomikou založenou na službách, technologiích a inovacích, s velmi výkonným zemědělstvím a energetikou.`],

    ["Vysvětlete princip zemědělských pásů v USA.", `
Zemědělství USA je **velkovýrobní, vysoce mechanizované a specializované**. Pracují v něm jen 1–2 % lidí, a přesto jsou USA jedním z největších vývozců potravin na světě. Specializace podle **podnebí a půd** vytvořila tzv. pásy (belts). Dnes jsou méně vyhraněné než dřív, ale princip platí.
## Hlavní pásy
- **Corn Belt (kukuřičný pás)**: Středozápad, hlavně Iowa, Illinois, Indiana, Ohio a Nebraska. Úrodné černozemě, dostatek srážek a teplé léto. Pěstuje se kukuřice a sója a navazuje na ně chov prasat a skotu na výkrm. Kukuřice slouží jako krmivo i na výrobu bioetanolu. Nejdůležitější zemědělská oblast USA.
- **Wheat Belt (pšeničný pás)**: Velké planiny (Kansas, Nebraska, Severní a Jižní Dakota, Oklahoma, Montana). Sušší podnebí, kde se kukuřici tolik nedaří. Na jihu se pěstuje ozimá pšenice, na severu jarní. Oblast se označuje jako „obilnice světa“.
- **Cotton Belt (bavlníkový pás)**: historicky jih USA (Texas, Georgie, Mississippi, Alabama, Arkansas). Dlouhé teplé léto. Dnes je největším pěstitelem bavlny Texas a pěstuje se také tabák, arašídy, rýže a sója, chová se drůbež.
- **Dairy Belt (mléčný pás)**: severovýchod a okolí Velkých jezer (Wisconsin, Minnesota, Michigan, New York, Pensylvánie, Vermont). Chladnější a vlhčí podnebí, kratší vegetační doba, vhodné pro pastviny a chov dojnic. Wisconsin je známý sýry.
- **Fruit & Vegetable Belt**: Kalifornie (Centrální údolí) a Florida. Díky zavlažování a teplu ovoce, zelenina, ořechy a víno. Kalifornie pěstuje mandle a hrozny, Florida citrusy.
- **Pastevectví (ranching)**: extenzivní chov skotu na suchých pastvinách západu a v Texasu.
## Proč pásy vznikly
Rozhodovaly teplota a délka vegetační doby (sever–jih), srážky (vlhký východ – suchý západ), kvalita půd a blízkost trhů. Pásy proto běží převážně od východu na západ.
## Současné rysy
Farmy jsou velké, vlastní je často velké firmy (agrobyznys), používají techniku, hnojiva, závlahy a geneticky modifikované plodiny. Problémem je eroze půdy, vyčerpávání podzemní vody (Ogallala na Velkých planinách) a závislost na dotacích.
**Na závěr:** pásy jsou ukázkou specializace zemědělství podle přírodních podmínek ve velkém měřítku.`],

    ["Porovnejte USA a Kanadu.", `
USA a Kanada jsou sousední státy s nejdelší společnou hranicí na světě (8 891 km). Mají podobnou historii britské kolonizace, jsou propojené obchodem i obranou, přesto se v mnohém liší.
## Rozloha a obyvatelstvo
- **Rozloha**: Kanada asi 9,98 milionu km² (2. největší stát světa), USA asi 9,8 milionu km².
- **Obyvatelé**: USA asi 342 milionů, Kanada asi 41,7 milionu, tedy zhruba osmina.
- **Hustota**: USA asi 36 obyvatel na km², Kanada jen 4,7. Většina Kanaďanů žije na jihu do několika set kilometrů od hranice s USA.
- **Složení**: obě země jsou přistěhovalecké. V USA jsou výraznou menšinou Hispánci a Afroameričané, v Kanadě frankofonní Québec, jižní Asiaté a Číňané. Původní obyvatelé tvoří v Kanadě 5,0 %, v USA asi 1 %, se smíšeným původem asi 3 %.
## Politický systém
- **USA**: federativní prezidentská republika, prezident je hlavou státu i vlády, 50 států.
- **Kanada**: federativní **konstituční monarchie** s parlamentní demokracií. Hlavou státu je britský panovník (král Karel III.), zastupuje ho generální guvernér, vládu vede premiér. 10 provincií a 3 teritoria. Členem Commonwealthu.
- **Jazyky**: USA nemají úřední jazyk na federální úrovni, převládá angličtina. Kanada má dva úřední jazyky, angličtinu a francouzštinu.
## Příroda
Obě země sdílejí Kordillery, vnitrozemské roviny, Velká jezera a Apalače. Kanada je chladnější, má rozsáhlý Kanadský štít, tundru, tajgu a permafrost. USA mají i subtropické a pouštní oblasti.
## Hospodářství
- **USA**: největší ekonomika světa, převaha služeb, high-tech a financí, velká domácí spotřeba.
- **Kanada**: výrazněji závislá na **surovinách** (ropa, zemní plyn, dřevo, kovy, vodní energie) a na vývozu do USA, kam míří asi tři čtvrtiny kanadského zboží.
- HDP na obyvatele je vyšší v USA (podle Světové banky asi 90 tisíc USD) než v Kanadě (asi 56 tisíc USD).
## Společnost
Kanada má veřejné zdravotní pojištění pro všechny, v USA převažuje soukromé pojištění. Kanada oficiálně prosazuje multikulturalismus (od roku 1971, „mozaika“), USA tradičně „tavicí kotel“.
## Co je spojuje
Spolupráce v obraně (NATO, společné velení NORAD), obchodní dohoda USMCA, propojený automobilový průmysl a energetika, společná správa Velkých jezer.
**Na závěr:** USA jsou lidnatější a hospodářsky silnější, Kanada je větší, řidčeji osídlená a více surovinová, obě jsou ale velmi úzce propojené.`],

    ["Charakterizujte přírodní podmínky Kanady.", `
Kanada má rozlohu asi 9,98 milionu km² a je **druhým největším státem světa** po Rusku. Omývají ji tři oceány: Atlantský, Tichý a Severní ledový. Má nejdelší pobřeží na světě.
## Povrch
- **Kanadský štít**: prahorní jádro kontinentu z hornin starých přes 2,5 miliardy let, zaujímá asi polovinu území kolem Hudsonova zálivu. Pevninský ledovec ho obrousil a zanechal tisíce jezer. Je bohatý na nerosty (nikl, zlato, železo, uran), ale málo úrodný.
- **Kordillery** na západě: Skalnaté hory, Pobřežní hory, Mackenzieho pohoří. Nejvyšší horou je **Mount Logan** (5 959 m) v Yukonu.
- **Vnitřní nížiny a Prérie**: mezi Kordillerami a štítem, na jihu úrodné Prérie (Alberta, Saskatchewan, Manitoba), na severu nížina podél řeky Mackenzie.
- **Nížina sv. Vavřince a jižní Ontario**: malá, ale nejhustěji osídlená a nejúrodnější oblast.
- **Hudsonova nížina**: rozsáhlé mokřady a rašeliniště.
- **Apalače** na jihovýchodě (Gaspé, Nový Brunšvik, Nové Skotsko, Newfoundland).
- **Arktické souostroví** na severu, největší je Baffinův ostrov. Na Ellesmerově ostrově leží Innuitské pohoří.
## Podnebí
Převládá **kontinentální podnebí** s dlouhými mrazivými zimami a krátkými léty. Na sever přechází v subarktické a polární. Mírné a deštivé je jen pobřeží Britské Kolumbie díky Pacifiku a teplým západním větrům. V závětří Skalnatých hor vane teplý vítr **chinook**. Velkou část severu, zhruba polovinu území, pokrývá **permafrost**.
## Přírodní zóny (od jihu k severu)
Smíšené a listnaté lesy (jihovýchod), stepi a prérie (vnitrozemí), **tajga – boreální les** (největší zóna), lesotundra, **tundra** a arktické pouště na severu.
## Vodstvo
- **Řeka sv. Vavřince** spojuje Velká jezera s Atlantikem, od roku 1959 vodní cesta Seaway.
- **Mackenzie** je nejdelší řekou Kanady a teče do Severního ledového oceánu.
- **Yukon**, **Fraser**, **Nelson**, **La Grande** (vodní elektrárny).
- Kanada má statisíce jezer: Velká jezera (s USA), Velké Medvědí a Velké Otročí jezero, Winnipežské jezero. Niagarské vodopády na hranici s USA.
- **Hudsonův záliv** je rozsáhlé vnitrozemské moře.
## Význam pro člověka
Drsné podnebí a štít omezují osídlení i zemědělství na úzký pás na jihu. Příroda je ale zdrojem surovin, dřeva, vodní energie a cestovního ruchu (Banff, nejstarší národní park Kanady z roku 1885, Niagara).
**Na závěr:** Kanada je obrovská, chladná a bohatá na vodu a suroviny, většina území je téměř neosídlená.`],

    ["Vysvětlete jazykovou situaci v Kanadě.", `
Kanada má **dva úřední jazyky: angličtinu a francouzštinu**. Federace je oficiálně dvojjazyčná od **zákona o úředních jazycích z roku 1969**. Jazyková otázka souvisí s historií dvou zakládajících národů, Britů a Francouzů.
## Historie
- Francouzi založili **Novou Francii**, roku 1608 Samuel de Champlain založil město Québec.
- Po sedmileté válce připadla Nová Francie v roce **1763 Británii**. Québecké obyvatelstvo si ale zachovalo francouzštinu, katolickou víru a vlastní občanské právo.
- V 60. letech proběhla v Québecu **Tichá revoluce**, modernizace společnosti a posílení québecké identity.
## Québec
- Je jedinou provincií s francouzštinou jako **jediným úředním jazykem** (od roku 1974). **Zákon č. 101 z roku 1977** (Charta francouzského jazyka) zavedl francouzštinu do škol, úřadů, práce a obchodních nápisů. V roce 2022 ji dále posílil zákon č. 96.
- Podle sčítání 2021 je francouzština mateřským jazykem **74,8 %** obyvatel Québecu. Anglofonní menšina žije hlavně v Montréalu.
- Québec usiloval o nezávislost. V referendech **1980** a **1995** zvítězili odpůrci, v roce 1995 jen těsně, **50,58 %** hlasů.
## Ostatní frankofonní oblasti
- **Nový Brunšvik** je jedinou oficiálně **dvojjazyčnou provincií**, francouzština je mateřským jazykem 29,5 % obyvatel. Žijí tu **Akadiáni**, potomci francouzských osadníků.
- Francouzsky mluvící menšiny žijí také v Ontariu (Frankoontarijci, 3,3 %), Manitobě a Novém Skotsku.
## Celá Kanada
- Mateřský jazyk (2021): angličtina **54,9 %**, francouzština **19,6 %**, jiný jazyk **21,4 %**. Podíl francouzštiny pomalu klesá.
- Anglicky i francouzsky umí asi 18 % Kanaďanů, v Québecu téměř polovina obyvatel.
- Díky přistěhovalectví roste podíl jiných jazyků: pandžábština, mandarínština, kantonština, arabština, tagalog.
## Jazyky původních obyvatel
V Kanadě se mluví více než 70 jazyky původních obyvatel. V **Nunavutu** jsou jazyky Inuitů (inuktut) mateřským jazykem 62,7 % obyvatel a patří mezi úřední jazyky teritoria. Severozápadní teritoria uznávají 11 úředních jazyků.
**Na závěr:** dvojjazyčnost je základem kanadské identity, ale vztah anglofonní většiny a frankofonního Québecu je dodnes citlivým politickým tématem.`],

    ["Čím je Kanada významná jako producent surovin?", `
Kanada je jedním z **nejvýznamnějších producentů surovin na světě**. Suroviny tvoří velkou část jejího vývozu a většina míří do USA.
## Ropa a zemní plyn
- Kanada má **třetí největší zásoby ropy na světě**, většina leží v **ropných píscích Athabasca** v Albertě. Patří ke čtyřem největším producentům ropy na světě.
- **Bitumen** (velmi hustá ropa) se těží povrchově nebo vtláčením páry do ložiska. Těžba je drahá, energeticky náročná, spotřebuje hodně vody a ničí krajinu i lesy.
- Ropa a plyn se těží také v Saskatchewanu, Britské Kolumbii a v moři u Newfoundlandu (pole **Hibernia**). Centrem firem je **Calgary**, rafinerie jsou v Edmontonu.
- Kanada je **největším dodavatelem ropy do USA**, ropa proudí ropovody na jih.
## Nerostné suroviny (hlavně Kanadský štít)
- **Potaš** (draselné soli na hnojiva): Saskatchewan, Kanada je největším producentem na světě.
- **Uran**: oblast Athabasca v Saskatchewanu, jedna z nejbohatších na světě.
- **Nikl a měď**: Sudbury v Ontariu, ložisko v kráteru po dopadu meteoritu.
- **Železná ruda**: Labrador a severní Québec.
- **Zlato** (Ontario, Québec), **diamanty** (Severozápadní teritoria), **uhlí** pro hutě (Britská Kolumbie).
## Lesy a dřevo
Lesy pokrývají velkou část území, hlavně boreální tajga. Kanada je velkým vývozcem řeziva, celulózy a papíru (Britská Kolumbie, Québec, Ontario).
## Voda a energie
- Kanada má obrovské zásoby sladké vody. **Vodní elektrárny** vyrábějí asi **60 % elektřiny**: James Bay (La Grande) v Québecu, Churchill Falls v Labradoru, řeka Nelson v Manitobě, Peace River v Britské Kolumbii.
- Levná elektřina umožnila výrobu **hliníku** v Québecu. Elektřina se vyváží i do USA.
## Rybolov a zemědělství
Rybolov u Atlantiku a Pacifiku, ale lov tresky na Newfoundlandské mělčině se v roce 1992 zhroutil a vláda ho zakázala. Prérie produkují pšenici a řepku, Kanada patří k největším vývozcům obou.
## Problémy
Závislost na cenách surovin a na jednom odběrateli (USA), dopady těžby na přírodu a na původní obyvatele, spory o ropovody.
**Na závěr:** suroviny jsou pilířem kanadské ekonomiky a hlavním důvodem úzkého hospodářského propojení s USA.`],

    ["Jaké jsou vzájemné vztahy USA a Kanady?", `
USA a Kanada mají jeden z **nejužších vztahů dvou států na světě**. Sdílejí nejdelší společnou hranici na světě, **8 891 km** (včetně hranice s Aljaškou), která je převážně nestřeženou hranicí dvou spojenců.
## Hospodářství a obchod
- Jsou si navzájem jedněmi z **největších obchodních partnerů**. Do USA míří asi tři čtvrtiny kanadského vývozu zboží. Od roku 2023 je největším obchodním partnerem USA Mexiko, Kanada je těsně za ním.
- Postupná liberalizace obchodu: **Auto Pact (1965)** pro automobily, dohoda o volném obchodu **CUSFTA (1989)**, **NAFTA (1994)** s Mexikem a od roku 2020 **USMCA** (v Kanadě CUSMA).
- **Automobilový průmysl** je propojený přes hranici: díly přejíždějí mezi Ontariem a Michiganem několikrát, než vznikne hotové auto. Nejvytíženější přechod je mezi Detroitem a Windsorem.
- **Energetika**: Kanada je největším dodavatelem ropy, zemního plynu, elektřiny a uranu do USA, sítě i ropovody jsou propojené.
## Bezpečnost a obrana
- Obě země jsou **zakládajícími členy NATO (1949)**.
- **NORAD** (od roku 1958) je společné velení protivzdušné obrany Severní Ameriky.
- Spolupracují v boji proti terorismu a při kontrole hranice.
## Příroda a voda
- Velká jezera spravují společně. **Mezinárodní společná komise** vznikla na základě smlouvy o hraničních vodách z roku 1909, dohoda o kvalitě vody Velkých jezer pochází z roku 1972.
- Společná řeka sv. Vavřince a Seaway (1959), spolupráce v Arktidě.
## Společnost a kultura
Úzké kulturní vazby, společný jazyk většiny obyvatel, sport (NHL), média. Miliony cest přes hranici ročně.
## Spory
- Obchodní spory o **řezivo** (softwood lumber), **mléčné výrobky** a cla na ocel a hliník. V roce 2025 zavedly USA cla na část kanadského zboží a Kanada odpověděla vlastními cly.
- Spory o ropovody (zrušení Keystone XL v roce 2021), o status Severozápadního průjezdu v Arktidě a o hranice v moři.
- Kanadská obava z přílišné závislosti na USA.
**Na závěr:** vztahy jsou založené na spojenectví, propojené ekonomice a sdílené přírodě, občas je ale zatěžují obchodní spory.`],

    ["Co byla NAFTA a jaké měla dopady?", `
**NAFTA (North American Free Trade Agreement, Severoamerická dohoda o volném obchodu)** byla dohoda mezi **USA, Kanadou a Mexikem**. Podepsána byla v roce 1992 a platila od **1. ledna 1994** do roku 2020, kdy ji nahradila dohoda USMCA. Navazovala na dohodu o volném obchodu mezi USA a Kanadou z roku 1989.
## Co dohoda zavedla
- **Zónu volného obchodu**: postupné zrušení cel a dalších překážek obchodu mezi třemi státy.
- **Ochranu investic** a mechanismus řešení sporů mezi investory a státy.
- Pravidla původu: bez cla se obchodovalo jen se zbožím vyrobeným převážně v regionu.
- Vedlejší dohody o **pracovních podmínkách** a o **životním prostředí**.
- NAFTA **nebyla celní unií**: každý stát si ponechal vlastní cla vůči ostatním zemím a nevznikla společná měna ani volný pohyb osob.
## Kladné dopady
- **Obchod** mezi členy rychle rostl, za dobu platnosti se několikanásobně zvýšil.
- Vznikly **propojené výrobní řetězce**, hlavně v automobilovém průmyslu: díly přecházejí přes hranice několikrát.
- Do Mexika proudily **investice**, rozvinuly se montážní závody **maquiladoras** u hranice s USA.
- Spotřebitelé získali levnější zboží, firmy větší trh.
- Kanada a Mexiko se staly největšími obchodními partnery USA.
## Záporné dopady
- V USA se část průmyslové výroby přesunula do Mexika, kde jsou nižší mzdy. Odbory dohodu viní ze ztráty pracovních míst, hlavně ve **Rust Beltu**.
- V Mexiku dovoz levné americké **kukuřice** poškodil drobné zemědělce a přispěl k migraci do měst a do USA.
- Výhody nebyly rozložené rovnoměrně, rostly rozdíly mezi severem a jihem Mexika.
- Kritika slabé ochrany pracovníků a životního prostředí a toho, že firmy mohly žalovat státy.
## Proč skončila
Prezident Donald Trump označil NAFTA za nevýhodnou pro USA a prosadil nové vyjednávání. Výsledkem byla dohoda USMCA platná od 1. července 2020.
**Na závěr:** NAFTA výrazně propojila ekonomiky Severní Ameriky a zvýšila obchod, ale přinesla i ztráty některým skupinám, což vedlo k jejímu nahrazení.`],

    ["V čem se USMCA liší od NAFTA?", `
**USMCA (United States–Mexico–Canada Agreement)** nahradila NAFTA. Podepsána byla v listopadu 2018 a platí od **1. července 2020**. V Kanadě se nazývá **CUSMA**, v Mexiku **T-MEC**. Zachovává zónu volného obchodu, ale mění řadu pravidel.
## Automobilový průmysl
- Aby auto nepodléhalo clu, musí z regionu pocházet **75 % jeho hodnoty** (v NAFTA 62,5 %).
- **70 % oceli a hliníku**, které výrobce nakupuje, musí pocházet ze Severní Ameriky.
- **Mzdové pravidlo**: 40–45 % hodnoty auta musí vyrobit dělníci s hodinovou mzdou alespoň **16 USD**. Cílem je omezit přesun výroby do Mexika kvůli levné práci.
## Práce a životní prostředí
- Ochrana pracovníků a životního prostředí je **přímo součástí dohody** a je vymahatelná, ne jen ve vedlejších dohodách.
- Mexiko se zavázalo k reformě zákoníku práce a ke svobodným odborům. Existuje rychlý mechanismus pro kontrolu porušování pracovních práv v konkrétních továrnách.
## Nové oblasti
- Kapitola o **digitálním obchodu**: zákaz cel na elektronické produkty, volný tok dat.
- Silnější ochrana **duševního vlastnictví** (autorská práva).
- Kanada otevřela část trhu s **mléčnými výrobky** americkým farmářům.
## Řešení sporů
Mechanismus, kterým mohou investoři žalovat státy, byl mezi USA a Kanadou zrušen a mezi USA a Mexikem omezen.
## Doba platnosti
Dohoda platí 16 let a **po 6 letech, tedy v roce 2026, ji státy společně přezkoumají** a rozhodnou o prodloužení. NAFTA žádné takové omezení neměla.
## Co zůstalo stejné
Zóna volného obchodu bez cel na většinu zboží mezi třemi státy, žádná celní unie ani společná měna.
**Na závěr:** USMCA je modernizovaná a přísnější NAFTA, která chrání pracovní místa v USA a Kanadě, posiluje práva pracovníků a přidává digitální obchod.`]
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
  const inl = t => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  const fmtAns = txt => { let h = "", ul = false; txt.trim().split("\n").forEach(l => { l = l.trim(); if (!l) return; if (l.startsWith("- ")) { if (!ul) { h += "<ul>"; ul = true; } h += `<li>${inl(l.slice(2))}</li>`; return; } if (ul) { h += "</ul>"; ul = false; } h += l.startsWith("## ") ? `<h4>${inl(l.slice(3))}</h4>` : `<p>${inl(l)}</p>`; }); return h + (ul ? "</ul>" : ""); };
  const terms = l => `<dl class="terms">${l.map(t => `<div><dt>${esc(t[0])}</dt><dd>${esc(t[1])}</dd></div>`).join("")}</dl>`;
  const c = document.getElementById("content"), tabs = document.getElementById("tabs");
  const TABS = {
    pojmy: ["Nejdůležitější pojmy", () => { c.innerHTML = terms(POJMY); }],
    slovnik: ["Slovníček", () => {
      c.innerHTML = '<input class="search" id="s" type="search" placeholder="Hledat pojem" aria-label="Hledat pojem"><div id="l"></div>';
      const r = q => { document.getElementById("l").innerHTML = terms(SLOV.filter(t => (t[0] + t[1]).toLowerCase().includes(q.toLowerCase()))); };
      document.getElementById("s").oninput = e => r(e.target.value); r("");
    }],
    otazky: ["Maturitní otázky", () => { c.innerHTML = `<p class="muted">Klikni na otázku a rozbalí se vzorová odpověď. Odpovědi jsou podrobné, k maturitě stačí umět hlavní body a příklady.</p><div class="qtools"><button type="button" id="qall">Rozbalit vše</button><button type="button" id="qnone">Sbalit vše</button></div>` + OTAZKY.map((o, i) => `<details class="ans"><summary><span class="qn">${i + 1}.</span> ${esc(o[0])}</summary><div>${fmtAns(o[1])}</div></details>`).join(""); document.getElementById("qall").onclick = () => c.querySelectorAll("details.ans").forEach(d => d.open = true); document.getElementById("qnone").onclick = () => c.querySelectorAll("details.ans").forEach(d => d.open = false); }],
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
