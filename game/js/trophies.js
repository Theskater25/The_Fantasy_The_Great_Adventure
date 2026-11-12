/* Shared trophy rules: the unlocks and the progress display use the same goals. */
(function () {
  const branches = { blade: ["duelist", "lifetaker"], guardian: ["bulwark", "warden"], alchemy: ["distiller", "warchemist"] };
  const chapters = [1, 2, 3];
  const finite = (value) => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
  const list = (value) => Array.isArray(value) ? value : [];
  const required = (content) => content.achievements.filter((item) => item.tier !== "platinum" && !item.optional);

  function completedClasses(profile, content, chapter) {
    if (!list(profile.completedChapters).map(Number).includes(chapter)) return [];
    const recorded = [
      ...list(profile.chapterClasses?.[chapter]),
      ...list(profile.rawChapterClasses?.[chapter]),
      ...list(profile.chapterClassesByChapter?.[chapter]),
      ...list(profile.legacyChapterClasses?.[chapter]),
    ];
    return [...new Set(recorded)].filter((id) => content.classes.some((hero) => hero.id === id && (hero.minChapter || 1) <= chapter));
  }

  function collectMilestones(profile, snapshot) {
    const old = profile.trophyMilestones || {};
    const next = {
      equipment: Math.min(5, finite(old.equipment)),
      skill: Math.min(1, finite(old.skill)),
      specialization: Math.min(1, finite(old.specialization)),
      ultimate: Math.min(1, finite(old.ultimate)),
      quests: chapters.filter((chapter) => list(old.quests).includes(chapter)),
    };
    const hero = snapshot?.hero;
    if (hero) {
      const equipped = list(hero.inventory).filter((item) => item?.equipped && ["weapon", "armor", "relic"].includes(item.kind));
      next.equipment = Math.max(next.equipment, Math.min(5, new Set(equipped.map((item) => item.id)).size));
      for (const chapter of chapters) {
        if (snapshot.sideQuestsCompleted?.[chapter] === true || (chapter === 2 && snapshot.chapter === 2 && snapshot.routeQuestComplete === true)) {
          if (!next.quests.includes(chapter)) next.quests.push(chapter);
        }
      }
    }
    const masteries = Object.values(profile.skillMastery || {}).filter((value) => value && typeof value === "object");
    const builds = [...masteries.map((skills) => ({ skills, specializations: Object.fromEntries(Object.keys(branches).map((branch) => [branch, skills[branch + "Specialization"]])) })), ...(hero ? [hero] : [])];
    for (const build of builds) {
      for (const [branch, options] of Object.entries(branches)) {
        const rank = finite(build.skills?.[branch]);
        if (rank >= 1) next.skill = 1;
        if (options.includes(build.specializations?.[branch])) {
          if (rank >= 4) next.specialization = 1;
          if (rank >= 5) next.ultimate = 1;
        }
      }
    }
    next.quests.sort();
    profile.trophyMilestones = next;
    return JSON.stringify(old) !== JSON.stringify(next);
  }

  function progress(achievement, profile, content, translations = {}) {
    const goal = achievement.goal || {};
    let target = goal.target || 1;
    let current = 0;
    const completed = new Set(list(profile.completedChapters).map(Number));
    const aliases = Object.values(translations).flatMap((translation) => translation.content?.bossNames || []);
    const knownBosses = new Set([...content.bosses, ...content.treasureBosses, ...content.nordicBosses].map((boss) => boss.name));
    const bosses = new Set(list(profile.defeatedBosses).map((name) => aliases.find((entry) => entry.target === name)?.source || name).filter((name) => knownBosses.has(name)));
    switch (goal.type) {
      case "bosses": current = bosses.size; break;
      case "boss": current = Number(bosses.has(goal.name)); break;
      case "chapters": {
        const expected = goal.chapters || chapters;
        target = expected.length; current = expected.filter((chapter) => completed.has(chapter)).length; break;
      }
      case "clean-chapters": target = 3; current = chapters.filter((chapter) => list(profile.noDeathChapters).map(Number).includes(chapter)).length; break;
      case "chapter-classes": current = completedClasses(profile, content, goal.chapter).length; break;
      case "class": current = Number(chapters.some((chapter) => completedClasses(profile, content, chapter).includes(goal.classId))); break;
      case "routes": current = completed.has(2) ? new Set(list(profile.chapter2Routes)).size : 0; break;
      case "level": current = finite(profile.highestLevel); break;
      case "milestone": current = finite(profile.trophyMilestones?.[goal.key]); break;
      case "quests": current = new Set(list(profile.trophyMilestones?.quests).filter((chapter) => chapters.includes(chapter))).size; break;
      case "platinum": {
        const main = required(content);
        target = main.length;
        current = main.filter((item) => list(profile.unlocked).includes(item.id)).length;
        break;
      }
    }
    return { current: Math.min(current, target), target, reached: target > 0 && current >= target };
  }
  window.TF_TROPHIES = Object.freeze({ collectMilestones, progress, required });
})();
