"""One-time source migration from the separate 2.6 copy; leaves original PNGs intact."""
import pathlib, json, struct
root = pathlib.Path(__file__).resolve().parents[1]
game = root / 'game'
if (game/'js/art-v27.js').exists():
    raise SystemExit('Migration already applied. Do not rerun on the completed 2.7 project.')
for folder in [game, root/'tools/qa']:
    for p in folder.rglob('*'):
        if p.suffix not in ['.js','.cjs','.mjs','.html','.css','.webmanifest']: continue
        s=p.read_text(encoding='utf8')
        s=s.replace('2.6','2.7').replace('v26','v27').replace('2-6-','2-7-').replace('20261111-v27-layout-r2','20261112-v27-art-r1')
        p.write_text(s,encoding='utf8')
atlas=json.loads((game/'assets/atlases/manifest.json').read_text())
heroes={p.stem:dict(zip(['width','height'],struct.unpack('>II',p.read_bytes()[16:24]))) for p in (game/'assets/heroes').glob('*.png')}
(game/'assets/heroes/manifest.json').write_text(json.dumps(heroes,indent=2))
(game/'js/art-v27.js').write_text('/* Original images are displayed through CSS; no sprite pixels are rewritten. */\n(() => {\nconst atlases = '+json.dumps(atlas)+';\nconst heroes = '+json.dumps(heroes)+';\n'+r'''
const weaponByClass = {chevalier:0,barbare:1,archer:2,assassin:3,sorcier:4,necromancien:4,samurai:5,shinobi:3,onmyoji:4,miko:4,ronin:5,berserker:1,huskarl:6,valkyrie:6,seidr:4,skald:8,bard:8,artificier:7,bouffon:3,moine:4};
function hero(id) {
  const h=heroes[id]; if(!h) return '';
  return `<img class="hero-sprite" src="assets/heroes/${id}.png" width="${h.width}" height="${h.height}" alt="" aria-hidden="true" draggable="false">`;
}
function icon(sheet,index,size=28) {
  const a=atlases[sheet],c=a?.cells[index]; if(!c)return '';
  const z=Math.min(size/c.width,size/c.height);
  return `<span class="art-icon" data-art="${sheet}-${index}" aria-hidden="true" style="width:${size}px;height:${size}px"><span style="width:${c.width*z}px;height:${c.height*z}px;background-image:url('assets/atlases/${sheet}.png');background-size:${a.width*z}px ${a.height*z}px;background-position:${-c.x*z}px ${-c.y*z}px"></span></span>`;
}
function item(item,classId,size=36) {
  if(item.kind==='weapon') return icon('weapons',weaponByClass[classId]??0,size);
  if(item.kind==='armor') {
    const light=['archer','assassin','shinobi','barbare','berserker','artificier','bard','skald','bouffon'];
    const magic=['sorcier','necromancien','onmyoji','miko','seidr','moine'];
    return icon('equipment',item.rarity==='legendary'?5:item.rarity==='epic'?3:item.rarity==='rare'?4:magic.includes(classId)?2:light.includes(classId)?1:0,size);
  }
  return icon('equipment',item.effect==='mending'?7:item.effect==='crit'?8:6,size);
}
function backdrop(chapter,decor='',theme='village') {
  const s=String(decor).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(/forge|feu|braise|lave|cendre|demon/.test(s))return 'lava';
  if(/grotte|golem|cristal|galerie|souterrain/.test(s))return chapter===3?'ice-cave':'cave';
  if(/crypte|cimetiere|croix|ossements|fantome/.test(s))return 'graveyard';
  if(/bibliotheque|livre|salle|trone|chateau|forteresse|tour|observatoire/.test(s))return 'castle';
  if(/temple|autel|sanctuaire|serment/.test(s))return 'courtyard';
  if(chapter===3)return /nuit|aurore|etoile|rune/.test(s)?'aurora':/vallee|village|camp/.test(s)?'valley':'snow';
  if(/montagne|sommet|escalier|pierre/.test(s))return 'mountain';
  if(/brume|ombre|peur|secret/.test(s))return 'mist';
  if(/nuit|marais|corbeau/.test(s))return 'moor';
  if(chapter===2)return 'ruins';
  return theme==='forest'?'forest':'valley';
}
function props(theme,decor='') {
  const sheet=theme==='forge'?'forge':theme==='village'?'village':null;
  if(!sheet)return '';
  const offset=[...decor].reduce((n,c)=>n+c.charCodeAt(0),0)%9;
  return [0,3,6].map((n,i)=>`<span class="v27-prop v27-prop-${i}" data-prop="${sheet}-${(offset+n)%9}">${icon(sheet,(offset+n)%9,theme==='village'?92:78)}</span>`).join('');
}
function panorama(background) {return `<div class="journey-panorama" aria-hidden="true"><img src="assets/backgrounds/v27/${background}.png" alt="" draggable="false"></div>`;}
function storyIcon(decor='') {
  const s=decor.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const index=/potion/.test(s)?0:/coffre|tresor|marche/.test(s)?1:/porte|cle|sceau/.test(s)?2:/carte|chemin|sentier/.test(s)?3:/lettre|message/.test(s)?4:/livre|bibliotheque|memoire/.test(s)?5:/sommet|observatoire|voyage/.test(s)?6:/relique|autel|rune|couronne/.test(s)?7:8;
  return icon('adventure',index,22);
}
window.TF_ART=Object.freeze({heroes,atlases,hero,icon,item,backdrop,props,panorama,storyIcon});
})();
''',encoding='utf8')
p=game/'js/app.js';s=p.read_text(encoding='utf8')
s=s.replace('${heroClass.icon}','${window.TF_ART.hero(heroClass.id)}')
s=s.replace('${item.kind === "weapon" ? "⚔" : item.kind === "armor" ? "🛡" : "✧"}','${window.TF_ART.item(item,state.hero.classId)}')
s=s.replace('🧪 ${t("potionUses")}', '${window.TF_ART.icon("adventure",0,22)} ${t("potionUses")}')
s=s.replace('<span>🧪 ${t("potion")}', '<span>${window.TF_ART.icon("adventure",0,22)} ${t("potion")}')
s=s.replace('<span>✧ ${relicLabel}', '<span>${window.TF_ART.icon("adventure",7,22)} ${relicLabel}')
s=s.replace('<span>${t("weapon")}:', '<span>${window.TF_ART.item({kind:"weapon"},state.hero.classId,22)} ${t("weapon")}:')
s=s.replace('<span>${t("armor")}:', '<span>${window.TF_ART.item({kind:"armor"},state.hero.classId,22)} ${t("armor")}:')
s=s.replace('${DECOR_ICONS[displayScene.decor] || "✦"}', '${window.TF_ART.storyIcon(displayScene.decor)}')
s=s.replace('const arenaTheme = window.TF_SCENERY.themeFor(state.chapter, displayScene?.decor);','const arenaTheme = window.TF_SCENERY.themeFor(state.chapter, displayScene?.decor);\n  const backdrop = window.TF_ART.backdrop(state.chapter, displayScene?.decor, arenaTheme);')
s=s.replace('${window.TF_SCENERY.render(arenaTheme)}','${window.TF_SCENERY.render(arenaTheme,backdrop,displayScene?.decor)}')
s=s.replace('${enemy ? enemyMarkup : currentSceneMarkup}', '${enemy ? enemyMarkup : (!state.completed && !state.gameOver ? window.TF_ART.panorama(backdrop) : "") + currentSceneMarkup}')
s=s.replace('state.log.join("") + currentSceneMarkup + enemyMarkup','state.log.join("") + (!enemy && !state.completed && !state.gameOver ? window.TF_ART.panorama(backdrop) : "") + currentSceneMarkup + enemyMarkup')
s=s.replace('>📜 ${v23("journal")}', '>${window.TF_ART.icon("adventure",8,22)} ${v23("journal")}')
s=s.replace('>🎒 ${t("inventory")}', '>${window.TF_ART.icon("adventure",1,22)} ${t("inventory")}')
s=s.replace('<span aria-hidden="true">🎒</span>', '${window.TF_ART.icon("adventure",1,28)}')
s=s.replace('<span aria-hidden="true">📜</span>', '${window.TF_ART.icon("adventure",8,28)}')
s=s.replace('<span class="modal-symbol" aria-hidden="true">📜</span>', '${window.TF_ART.icon("adventure",8,28)}')
s=s.replace('<span class="modal-symbol" aria-hidden="true">🎒</span>', '${window.TF_ART.icon("adventure",1,28)}')
s=s.replace('<button class="btn" data-action="back">${t("back")}</button></section></main>`;\n  app.querySelector("[data-action=back]").addEventListener("click", () => { state.screen = "title"; render(); });\n}\n\nfunction renderAchievements', '<div class="credit-block"><span>Pixel art</span><strong>SpriteLab · CraftPix · Ansimuz</strong><small>CraftPix Freebie License · Ansimuz CC0</small></div><button class="btn" data-action="back">${t("back")}</button></section></main>`;\n  app.querySelector("[data-action=back]").addEventListener("click", () => { state.screen = "title"; render(); });\n}\n\nfunction renderAchievements')
p.write_text(s,encoding='utf8')
p=game/'js/scenery.js';s=p.read_text(encoding='utf8').replace('function render(theme) {','function render(theme, background, decor = "") {')
s=s.replace('return `<div class="arena-scenery"', 'const supplied = background ? `<img class="arena-backdrop" src="assets/backgrounds/v27/${background}.png" alt="" draggable="false">` : "";\n    return `<div class="arena-scenery ${background ? "has-art" : ""}"')
s=s.replace('${scenery}</div>`;', '${scenery}${supplied}${window.TF_ART.props(theme,decor)}</div>`;')
p.write_text(s,encoding='utf8')
p=game/'index.html';s=p.read_text(encoding='utf8').replace('</head>','  <link rel="stylesheet" href="css/art-v27.css?v=20261112-v27-art-r1">\n</head>').replace('<script src="js/scenery.js','<script src="js/art-v27.js?v=20261112-v27-art-r1"></script>\n<script src="js/scenery.js');p.write_text(s,encoding='utf8')
p=game/'service-worker.js';s=p.read_text(encoding='utf8').replace('the-fantasy-v27-shell-20261111-layout-r2','the-fantasy-v27-shell-20261112-art-r1')
new=['./css/art-v27.css','./js/art-v27.js']+[ './'+str(p.relative_to(game)).replace('\\','/') for directory in ['assets/heroes','assets/atlases','assets/backgrounds/v27'] for p in (game/directory).glob('*.png')]
s=s.replace('const APP_SHELL = [','const APP_SHELL = [\n'+''.join('  '+json.dumps(n)+',\n' for n in new));p.write_text(s,encoding='utf8')
print('Prepared 2.7 source, 20 heroes, 45 atlas cells and 14 backgrounds.')
