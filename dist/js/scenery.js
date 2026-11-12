/* The two original PNG sheets are used as CSS atlases; their pixels are never rewritten. */
(() => {
  const atlases = {
  "forest": {
    "file": "forest-village.png",
    "width": 159,
    "height": 160
  },
  "ruins": {
    "file": "ruins-north.png",
    "width": 154,
    "height": 160
  }
};
  const props = {
  "oak": {
    "atlas": "forest",
    "x": 2,
    "y": 2,
    "width": 51,
    "height": 54
  },
  "dead-tree": {
    "atlas": "forest",
    "x": 62,
    "y": 2,
    "width": 38,
    "height": 53
  },
  "shrub": {
    "atlas": "forest",
    "x": 111,
    "y": 15,
    "width": 46,
    "height": 40
  },
  "moss-rock": {
    "atlas": "forest",
    "x": 2,
    "y": 62,
    "width": 47,
    "height": 39
  },
  "mushrooms": {
    "atlas": "forest",
    "x": 60,
    "y": 63,
    "width": 40,
    "height": 38
  },
  "fence": {
    "atlas": "forest",
    "x": 112,
    "y": 66,
    "width": 45,
    "height": 34
  },
  "gravestone": {
    "atlas": "forest",
    "x": 8,
    "y": 110,
    "width": 37,
    "height": 46
  },
  "well": {
    "atlas": "forest",
    "x": 59,
    "y": 107,
    "width": 40,
    "height": 50
  },
  "lantern": {
    "atlas": "forest",
    "x": 118,
    "y": 108,
    "width": 29,
    "height": 49
  },
  "arch": {
    "atlas": "ruins",
    "x": 3,
    "y": 2,
    "width": 45,
    "height": 50
  },
  "column": {
    "atlas": "ruins",
    "x": 62,
    "y": 2,
    "width": 31,
    "height": 50
  },
  "brazier": {
    "atlas": "ruins",
    "x": 116,
    "y": 10,
    "width": 31,
    "height": 38
  },
  "altar": {
    "atlas": "ruins",
    "x": 2,
    "y": 62,
    "width": 45,
    "height": 35
  },
  "chest": {
    "atlas": "ruins",
    "x": 58,
    "y": 66,
    "width": 39,
    "height": 30
  },
  "banner": {
    "atlas": "ruins",
    "x": 114,
    "y": 51,
    "width": 35,
    "height": 53
  },
  "runestone": {
    "atlas": "ruins",
    "x": 5,
    "y": 104,
    "width": 38,
    "height": 52
  },
  "snow-pine": {
    "atlas": "ruins",
    "x": 60,
    "y": 100,
    "width": 36,
    "height": 57
  },
  "snow-rock": {
    "atlas": "ruins",
    "x": 108,
    "y": 109,
    "width": 44,
    "height": 46
  }
};
  // id, horizontal position (%), baseline above floor (%), integer scale, depth.
  const layouts = {
    village: [
      ['oak', 7, 15, 4, 'far'], ['dead-tree', 92, 20, 4, 'far'],
      ['well', 59, 12, 3, 'feature'], ['lantern', 17, 6, 3, 'feature'],
      ['fence', 5, 0, 2, 'accent'], ['shrub', 56, 1, 2, 'accent'],
    ],
    forest: [
      ['oak', 7, 15, 5, 'far'], ['oak', 64, 18, 4, 'far'], ['dead-tree', 94, 24, 4, 'far'],
      ['moss-rock', 12, 4, 3, 'feature'], ['shrub', 57, 4, 2, 'feature'],
      ['mushrooms', 5, 0, 2, 'accent'], ['fence', 63, 0, 2, 'accent'],
    ],
    graveyard: [
      ['arch', 7, 14, 4, 'far'], ['dead-tree', 63, 17, 4, 'far'],
      ['lantern', 94, 19, 3, 'far'], ['gravestone', 17, 5, 2, 'feature'],
      ['gravestone', 57, 10, 2, 'feature'], ['mushrooms', 5, 0, 2, 'accent'],
    ],
    ruins: [
      ['arch', 8, 16, 4, 'far'], ['column', 64, 17, 4, 'far'], ['banner', 91, 29, 3, 'far'],
      ['brazier', 17, 4, 2, 'feature'], ['chest', 56, 4, 2, 'feature'],
      ['altar', 93, 0, 2, 'accent'],
    ],
    forge: [
      ['column', 7, 14, 4, 'far'], ['arch', 62, 14, 4, 'far'], ['banner', 92, 28, 3, 'far'],
      ['brazier', 16, 3, 3, 'feature'], ['brazier', 57, 3, 3, 'feature'],
      ['chest', 94, 0, 2, 'accent'],
    ],
    fjord: [
      ['snow-pine', 8, 12, 4, 'far'], ['snow-pine', 64, 20, 4, 'far'],
      ['snow-pine', 94, 24, 4, 'far'], ['snow-rock', 14, 2, 3, 'feature'],
      ['runestone', 57, 3, 3, 'feature'], ['snow-rock', 94, 0, 2, 'accent'],
    ],
    shrine: [
      ['column', 7, 14, 4, 'far'], ['snow-pine', 64, 17, 4, 'far'], ['banner', 92, 27, 3, 'far'],
      ['runestone', 15, 4, 3, 'feature'], ['altar', 57, 6, 3, 'feature'],
      ['brazier', 5, 0, 2, 'accent'], ['snow-rock', 93, 0, 2, 'accent'],
    ],
  };
  function themeFor(chapter, decor = '') {
    const place = String(decor).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (Number(chapter) === 2) return /forge|feu|braise|lave|cendre/.test(place) ? 'forge' : 'ruins';
    if (Number(chapter) === 3) return /rune|temple|autel|trone|forteresse|serment/.test(place) ? 'shrine' : 'fjord';
    if (/crypte|cimetiere|croix|ossements|fantome/.test(place)) return 'graveyard';
    return /foret|arbre|sentier|riviere|cascade|chemin|bois/.test(place) ? 'forest' : 'village';
  }
  function render(theme, background, decor = "") {
    const layout = layouts[theme] || layouts.village;
    const scenery = layout.map(([id, x, floor, scale, depth]) => {
      const prop = props[id], atlas = atlases[prop.atlas];
      const style = `--prop-x:${x}%;--prop-floor:${floor}%;--prop-scale:${scale};--prop-compact:${Math.max(1, Math.floor(scale / 2))};--prop-width:${prop.width}px;--prop-height:${prop.height}px;--atlas-width:${atlas.width}px;--atlas-height:${atlas.height}px;--atlas-x:${-prop.x}px;--atlas-y:${-prop.y}px`;
      return `<span class="scene-prop scene-prop--${prop.atlas} is-${depth}" data-prop="${id}" style="${style}"></span>`;
    }).join('');
    const supplied = background ? `<img class="arena-backdrop" src="assets/backgrounds/v27/${background}.png" alt="" draggable="false">` : "";
    return `<div class="arena-scenery ${background ? "has-art" : ""}" aria-hidden="true"><div class="scenery-ridge scenery-ridge--far"></div><div class="scenery-ridge scenery-ridge--near"></div><div class="scenery-wall"></div><div class="scenery-floor"></div><div class="scenery-path"></div>${scenery}${supplied}${window.TF_ART.props(theme,decor)}</div>`;
  }
  window.TF_SCENERY = Object.freeze({ themeFor, render });
})();
