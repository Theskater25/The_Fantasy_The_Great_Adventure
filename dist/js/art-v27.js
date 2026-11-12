/* Original images are displayed through CSS; no sprite pixels are rewritten. */
(() => {
const atlases = {"weapons": {"width": 158, "height": 160, "cells": [{"x": 2, "y": 5, "width": 43, "height": 43}, {"x": 56, "y": 2, "width": 44, "height": 45}, {"x": 113, "y": 2, "width": 42, "height": 47}, {"x": 3, "y": 57, "width": 39, "height": 40}, {"x": 56, "y": 54, "width": 43, "height": 51}, {"x": 106, "y": 57, "width": 50, "height": 45}, {"x": 2, "y": 109, "width": 46, "height": 47}, {"x": 63, "y": 116, "width": 34, "height": 35}, {"x": 114, "y": 109, "width": 41, "height": 48}]}, "equipment": {"width": 159, "height": 160, "cells": [{"x": 2, "y": 3, "width": 47, "height": 42}, {"x": 63, "y": 3, "width": 36, "height": 43}, {"x": 115, "y": 3, "width": 42, "height": 44}, {"x": 8, "y": 57, "width": 36, "height": 45}, {"x": 59, "y": 57, "width": 44, "height": 44}, {"x": 119, "y": 53, "width": 34, "height": 51}, {"x": 14, "y": 111, "width": 23, "height": 45}, {"x": 71, "y": 111, "width": 17, "height": 45}, {"x": 119, "y": 116, "width": 34, "height": 33}]}, "forge": {"width": 121, "height": 123, "cells": [{"x": 2, "y": 8, "width": 31, "height": 30}, {"x": 43, "y": 3, "width": 32, "height": 35}, {"x": 83, "y": 2, "width": 34, "height": 36}, {"x": 3, "y": 45, "width": 27, "height": 32}, {"x": 43, "y": 46, "width": 32, "height": 31}, {"x": 87, "y": 45, "width": 27, "height": 34}, {"x": 2, "y": 83, "width": 30, "height": 38}, {"x": 42, "y": 81, "width": 34, "height": 40}, {"x": 84, "y": 90, "width": 35, "height": 28}]}, "adventure": {"width": 162, "height": 160, "cells": [{"x": 11, "y": 3, "width": 26, "height": 40}, {"x": 57, "y": 8, "width": 47, "height": 36}, {"x": 118, "y": 3, "width": 36, "height": 42}, {"x": 2, "y": 54, "width": 48, "height": 47}, {"x": 61, "y": 61, "width": 42, "height": 34}, {"x": 114, "y": 55, "width": 46, "height": 47}, {"x": 6, "y": 110, "width": 38, "height": 45}, {"x": 62, "y": 113, "width": 37, "height": 43}, {"x": 114, "y": 114, "width": 46, "height": 43}]}, "village": {"width": 159, "height": 160, "cells": [{"x": 2, "y": 6, "width": 45, "height": 47}, {"x": 58, "y": 1, "width": 44, "height": 51}, {"x": 115, "y": 14, "width": 42, "height": 39}, {"x": 1, "y": 66, "width": 50, "height": 34}, {"x": 60, "y": 62, "width": 41, "height": 39}, {"x": 112, "y": 66, "width": 45, "height": 34}, {"x": 4, "y": 119, "width": 46, "height": 35}, {"x": 62, "y": 110, "width": 36, "height": 48}, {"x": 120, "y": 107, "width": 30, "height": 52}]}};
const heroes = {"archer": {"width": 59, "height": 126}, "artificier": {"width": 90, "height": 123}, "assassin": {"width": 87, "height": 125}, "barbare": {"width": 99, "height": 125}, "bard": {"width": 66, "height": 113}, "berserker": {"width": 109, "height": 110}, "bouffon": {"width": 111, "height": 158}, "chevalier": {"width": 67, "height": 124}, "huskarl": {"width": 77, "height": 125}, "miko": {"width": 80, "height": 126}, "moine": {"width": 77, "height": 124}, "necromancien": {"width": 78, "height": 127}, "onmyoji": {"width": 71, "height": 125}, "ronin": {"width": 61, "height": 126}, "samurai": {"width": 74, "height": 125}, "seidr": {"width": 72, "height": 126}, "shinobi": {"width": 87, "height": 125}, "skald": {"width": 67, "height": 124}, "sorcier": {"width": 83, "height": 124}, "valkyrie": {"width": 68, "height": 124}};

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
  if(String(item.id||'').includes('compass'))return icon('adventure',6,size);
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
