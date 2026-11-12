/* Local Version 2.3 additions: translated journal, side quests, and onboarding. */
const V23_TEXT = {
  fr: { journal:"Journal", journalTitle:"Journal de campagne", close:"Fermer", tabs:["Quêtes", "Décisions", "Bestiaire"], mainQuest:"Trame principale", progress:"Progression", active:"En cours", complete:"Accomplie", questList:[["Le passage des anciens gardiens", "Trouve le passage secret du Village oublié."],["Cartographe des terres brûlées", "Explore cinq routes différentes dans ce chapitre."],["Les runes du dernier royaume", "Emprunte les routes des runes, des valkyries et de la tempête."]], choiceYes:"Tu as choisi d’agir", choiceNo:"Tu as choisi de patienter", choicesNone:"Tes décisions importantes apparaîtront ici.", path:"Route actuelle", codexFound:"découverts", codexUnknown:"Inconnu", codexEnemy:"Ennemi", codexBoss:"Boss", tutorial:"Guide de l’aventure", tutorialIntro:"Bienvenue. Tes choix façonnent la route et rapportent de l’expérience.", tutorialChoice:"Dans une scène, lis les deux conséquences proposées avant de choisir. Certaines routes cachées ouvrent une quête secondaire.", tutorialCombat:"En combat, observe l’intention de l’adversaire. Défendre réduit les dégâts; la compétence de classe est puissante mais limitée par combat.", tutorialJournal:"Le Journal rassemble tes objectifs, tes décisions et les créatures rencontrées. Le sac et l’arbre de compétences restent accessibles dans la barre du haut.", tutorialClose:"Compris, partir à l’aventure", tutorialHelp:"Guide", bossPhase:"Phase II · Enragé", bossPhaseStart:"Le boss entre dans sa seconde phase ! Ses attaques lourdes arrivent désormais plus souvent.", questCompleted:"Quête secondaire accomplie ! +20 EXP et une potion." },
  en: { journal:"Journal", journalTitle:"Campaign journal", close:"Close", tabs:["Quests", "Choices", "Bestiary"], mainQuest:"Main story", progress:"Progress", active:"Active", complete:"Complete", questList:[["Path of the ancient guardians", "Find the hidden passage in the Forgotten Village."],["Cartographer of the scorched lands", "Explore five different routes in this chapter."],["Runes of the last kingdom", "Travel the rune, valkyrie, and storm routes."]], choiceYes:"You chose to act", choiceNo:"You chose to wait", choicesNone:"Your important choices will appear here.", path:"Current route", codexFound:"discovered", codexUnknown:"Unknown", codexEnemy:"Enemy", codexBoss:"Boss", tutorial:"Adventure guide", tutorialIntro:"Welcome. Your choices shape the road and earn experience.", tutorialChoice:"Read both outcomes before choosing. Hidden routes can unlock side quests.", tutorialCombat:"Watch the enemy's intent. Defending reduces damage; your class skill is powerful but limited per fight.", tutorialJournal:"The Journal tracks objectives, choices, and creatures met. Your bag and skill tree are in the top bar.", tutorialClose:"Understood, begin adventure", tutorialHelp:"Guide", bossPhase:"Phase II · Enraged", bossPhaseStart:"The boss enters its second phase! Heavy attacks now come more often.", questCompleted:"Side quest complete! +20 XP and one potion." },
  de: { journal:"Chronik", journalTitle:"Kampagnenchronik", close:"Schließen", tabs:["Aufgaben", "Entscheidungen", "Bestiarium"], mainQuest:"Hauptgeschichte", progress:"Fortschritt", active:"Aktiv", complete:"Abgeschlossen", questList:[["Pfad der alten Wächter", "Finde den verborgenen Durchgang im Vergessenen Dorf."],["Kartograf der verbrannten Lande", "Erkunde in diesem Kapitel fünf verschiedene Wege."],["Runen des letzten Königreichs", "Nimm die Runen-, Walküren- und Sturmroute."]], choiceYes:"Du hast gehandelt", choiceNo:"Du hast abgewartet", choicesNone:"Wichtige Entscheidungen erscheinen hier.", path:"Aktueller Weg", codexFound:"entdeckt", codexUnknown:"Unbekannt", codexEnemy:"Gegner", codexBoss:"Boss", tutorial:"Abenteuerführer", tutorialIntro:"Willkommen. Deine Entscheidungen prägen den Weg und bringen Erfahrung.", tutorialChoice:"Lies beide Folgen, bevor du entscheidest. Verborgene Wege öffnen Nebenaufgaben.", tutorialCombat:"Achte auf die Absicht des Gegners. Verteidigen verringert Schaden; Klassenfähigkeiten sind pro Kampf begrenzt.", tutorialJournal:"Die Chronik zeigt Ziele, Entscheidungen und entdeckte Kreaturen. Tasche und Fähigkeitenbaum findest du oben.", tutorialClose:"Verstanden, Abenteuer beginnen", tutorialHelp:"Hilfe", bossPhase:"Phase II · Wütend", bossPhaseStart:"Der Boss geht in die zweite Phase! Schwere Angriffe kommen nun häufiger.", questCompleted:"Nebenaufgabe abgeschlossen! +20 EP und ein Trank." },
  es: { journal:"Diario", journalTitle:"Diario de campaña", close:"Cerrar", tabs:["Misiones", "Decisiones", "Bestiario"], mainQuest:"Historia principal", progress:"Progreso", active:"Activa", complete:"Completada", questList:[["El paso de los antiguos guardianes", "Encuentra el pasaje secreto de la Aldea Olvidada."],["Cartógrafo de las tierras calcinadas", "Explora cinco rutas diferentes en este capítulo."],["Runas del último reino", "Recorre las rutas de runas, valquirias y tormenta."]], choiceYes:"Elegiste actuar", choiceNo:"Elegiste esperar", choicesNone:"Tus decisiones importantes aparecerán aquí.", path:"Ruta actual", codexFound:"descubiertos", codexUnknown:"Desconocido", codexEnemy:"Enemigo", codexBoss:"Jefe", tutorial:"Guía de aventura", tutorialIntro:"Bienvenido. Tus decisiones cambian el camino y otorgan experiencia.", tutorialChoice:"Lee ambos resultados antes de elegir. Las rutas ocultas pueden abrir misiones secundarias.", tutorialCombat:"Observa la intención del enemigo. Defender reduce el daño; la habilidad de clase tiene un uso limitado por combate.", tutorialJournal:"El Diario reúne objetivos, decisiones y criaturas encontradas. La mochila y las habilidades están arriba.", tutorialClose:"Entendido, comenzar aventura", tutorialHelp:"Guía", bossPhase:"Fase II · Enfurecido", bossPhaseStart:"¡El jefe entra en su segunda fase! Los ataques fuertes llegan más a menudo.", questCompleted:"¡Misión secundaria completada! +20 EXP y una poción." },
  pl: { journal:"Dziennik", journalTitle:"Dziennik kampanii", close:"Zamknij", tabs:["Zadania", "Decyzje", "Bestiariusz"], mainQuest:"Główna historia", progress:"Postęp", active:"Aktywne", complete:"Ukończone", questList:[["Ścieżka dawnych strażników", "Znajdź ukryte przejście w Zapomnianej Wiosce."],["Kartograf spopielonych ziem", "Odkryj pięć różnych tras w tym rozdziale."],["Runy ostatniego królestwa", "Wybierz trasy run, walkirii i burzy."]], choiceYes:"Postanawiasz działać", choiceNo:"Postanawiasz poczekać", choicesNone:"Ważne decyzje pojawią się tutaj.", path:"Obecna trasa", codexFound:"odkryto", codexUnknown:"Nieznany", codexEnemy:"Wróg", codexBoss:"Boss", tutorial:"Przewodnik przygody", tutorialIntro:"Witaj. Twoje wybory kształtują drogę i dają doświadczenie.", tutorialChoice:"Przeczytaj oba skutki przed wyborem. Ukryte drogi odblokowują zadania poboczne.", tutorialCombat:"Obserwuj zamiary wroga. Obrona zmniejsza obrażenia; umiejętność klasy ma limit na walkę.", tutorialJournal:"Dziennik pokazuje cele, wybory i napotkane stworzenia. Torba i drzewko umiejętności są u góry.", tutorialClose:"Rozumiem, zaczynam przygodę", tutorialHelp:"Pomoc", bossPhase:"Faza II · Szał", bossPhaseStart:"Boss wchodzi w drugą fazę! Ciężkie ataki pojawiają się częściej.", questCompleted:"Ukończono zadanie poboczne! +20 PD i mikstura." },
  "zh-CN": { journal:"旅程日志", journalTitle:"战役日志", close:"关闭", tabs:["任务", "抉择", "图鉴"], mainQuest:"主线剧情", progress:"进度", active:"进行中", complete:"已完成", questList:[["古代守卫者之路", "找到被遗忘村庄的秘密通道。"],["焦土绘图师", "在本章探索五条不同路线。"],["末代王国的符文", "踏上符文、女武神和风暴路线。"]], choiceYes:"你选择了行动", choiceNo:"你选择了等待", choicesNone:"重要抉择会显示在这里。", path:"当前路线", codexFound:"已发现", codexUnknown:"未知", codexEnemy:"敌人", codexBoss:"首领", tutorial:"冒险指南", tutorialIntro:"欢迎。你的选择会改变道路并获得经验。", tutorialChoice:"选择前请阅读两种结果。隐藏路线可能开启支线任务。", tutorialCombat:"观察敌人的意图。防御可减少伤害；职业技能每场战斗有限次使用。", tutorialJournal:"日志记录目标、选择和遇到的生物。背包和技能树位于顶部。", tutorialClose:"明白，开始冒险", tutorialHelp:"指南", bossPhase:"第二阶段 · 狂暴", bossPhaseStart:"首领进入第二阶段！重击现在出现得更频繁。", questCompleted:"支线任务完成！+20经验和一瓶药水。" },
};
const V23_EXTRA_TEXT = {
  fr: { questCompletedFull:"Quête secondaire accomplie ! +20 EXP et +5 PV maximum.", questReward:"Récompense : +20 EXP et une potion (ou +5 PV max si les potions sont pleines)." },
  en: { questCompletedFull:"Side quest complete! +20 XP and +5 maximum HP.", questReward:"Reward: +20 XP and one potion (or +5 max HP if your potions are full)." },
  de: { questCompletedFull:"Nebenaufgabe abgeschlossen! +20 EP und +5 maximale LP.", questReward:"Belohnung: +20 EP und ein Trank (oder +5 maximale LP bei vollem Vorrat)." },
  es: { questCompletedFull:"¡Misión secundaria completada! +20 EXP y +5 PV máximos.", questReward:"Recompensa: +20 EXP y una poción (o +5 PV máx. si no queda espacio)." },
  pl: { questCompletedFull:"Ukończono zadanie poboczne! +20 PD i +5 maks. PŻ.", questReward:"Nagroda: +20 PD i mikstura (lub +5 maks. PŻ przy pełnym zapasie)." },
  "zh-CN": { questCompletedFull:"支线任务完成！+20经验和+5最大生命。", questReward:"奖励：+20经验和一瓶药水（药水已满时改为+5最大生命）。" },
};
function v23(key) { return V23_EXTRA_TEXT[settings.language]?.[key] ?? V23_TEXT[settings.language]?.[key] ?? V23_EXTRA_TEXT.fr[key] ?? V23_TEXT.fr[key] ?? key; }

// Phone navigation uses the same six languages as the game.
const V23_MOBILE_TEXT = {
  "fr": {
    "mobileMenu": "Menu",
    "mobileMenuTitle": "Votre aventure",
    "mobileHero": "Héros",
    "mobileSkills": "Talents",
    "mobileHistory": "Historique",
    "mobileOutcomes": "Voir les conséquences",
    "mobileContext": "Relire la scène",
    "mobileRecent": "Dernières actions",
    "mobileSkillHint": "Choisissez une voie. Les talents se débloquent au fil des trois chapitres.",
    "mobileUsed": "Déjà utilisée",
    "mobileHelp": "Le menu donne accès au héros, au sac, aux talents et au journal.",
    "tutorialJournal": "Le Journal rassemble objectifs, décisions, historique et créatures rencontrées. Sur téléphone, ouvre le Menu pour retrouver ton héros, ton sac et tes talents."
  },
  "en": {
    "mobileMenu": "Menu",
    "mobileMenuTitle": "Your adventure",
    "mobileHero": "Hero",
    "mobileSkills": "Talents",
    "mobileHistory": "History",
    "mobileOutcomes": "Preview outcomes",
    "mobileContext": "Read the scene",
    "mobileRecent": "Recent actions",
    "mobileSkillHint": "Choose a path. Talents unlock across the three chapters.",
    "mobileUsed": "Already used",
    "mobileHelp": "Open the menu for your hero, bag, talents and journal.",
    "tutorialJournal": "The Journal tracks objectives, choices, history and creatures met. On a phone, open Menu to find your hero, bag and talents."
  },
  "de": {
    "mobileMenu": "Menü",
    "mobileMenuTitle": "Dein Abenteuer",
    "mobileHero": "Held",
    "mobileSkills": "Talente",
    "mobileHistory": "Verlauf",
    "mobileOutcomes": "Folgen ansehen",
    "mobileContext": "Szene nachlesen",
    "mobileRecent": "Letzte Aktionen",
    "mobileSkillHint": "Wähle einen Pfad. Talente werden im Laufe der drei Kapitel freigeschaltet.",
    "mobileUsed": "Bereits benutzt",
    "mobileHelp": "Im Menü findest du Held, Tasche, Talente und Chronik.",
    "tutorialJournal": "Die Chronik enthält Ziele, Entscheidungen, Verlauf und entdeckte Kreaturen. Öffne auf dem Handy das Menü für deinen Helden, die Tasche und Talente."
  },
  "es": {
    "mobileMenu": "Menú",
    "mobileMenuTitle": "Tu aventura",
    "mobileHero": "Héroe",
    "mobileSkills": "Talentos",
    "mobileHistory": "Historial",
    "mobileOutcomes": "Ver consecuencias",
    "mobileContext": "Releer la escena",
    "mobileRecent": "Últimas acciones",
    "mobileSkillHint": "Elige una senda. Los talentos se desbloquean a lo largo de los tres capítulos.",
    "mobileUsed": "Ya utilizada",
    "mobileHelp": "El menú reúne tu héroe, mochila, talentos y diario.",
    "tutorialJournal": "El Diario reúne objetivos, decisiones, historial y criaturas encontradas. En el móvil, abre el Menú para acceder al héroe, la mochila y los talentos."
  },
  "pl": {
    "mobileMenu": "Menu",
    "mobileMenuTitle": "Twoja przygoda",
    "mobileHero": "Bohater",
    "mobileSkills": "Talenty",
    "mobileHistory": "Historia",
    "mobileOutcomes": "Zobacz skutki",
    "mobileContext": "Przeczytaj scenę",
    "mobileRecent": "Ostatnie działania",
    "mobileSkillHint": "Wybierz ścieżkę. Talenty odblokowują się w trzech rozdziałach.",
    "mobileUsed": "Już użyto",
    "mobileHelp": "Menu zawiera bohatera, torbę, talenty i dziennik.",
    "tutorialJournal": "Dziennik zawiera cele, decyzje, historię i napotkane stworzenia. Na telefonie otwórz Menu, aby przejść do bohatera, torby i talentów."
  },
  "zh-CN": {
    "mobileMenu": "菜单",
    "mobileMenuTitle": "你的冒险",
    "mobileHero": "英雄",
    "mobileSkills": "天赋",
    "mobileHistory": "历程",
    "mobileOutcomes": "查看选择结果",
    "mobileContext": "重读场景",
    "mobileRecent": "最近行动",
    "mobileSkillHint": "选择一条路线。天赋会随三个章节逐步解锁。",
    "mobileUsed": "已使用",
    "mobileHelp": "菜单中可查看英雄、背包、天赋和日志。",
    "tutorialJournal": "日志记录目标、抉择、历程和遇到的生物。在手机上打开菜单，即可查看英雄、背包和天赋。"
  }
};
for (const language of Object.keys(V23_MOBILE_TEXT)) Object.assign(V23_EXTRA_TEXT[language], V23_MOBILE_TEXT[language]);
