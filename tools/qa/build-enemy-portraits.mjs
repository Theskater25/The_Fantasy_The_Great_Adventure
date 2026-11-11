import fs from "node:fs";
import path from "node:path";

const output = path.resolve("assets/enemies");
const portraits = [
  ["zombie", "Zombie", "#557c58", "#a8ce76", "#273f38", "undead", `<path d="M190 131l-22 12 12 14-15 13 19 6M257 178l15 12-14 14 19 8" fill="none" stroke="#472f31" stroke-width="7" stroke-linecap="round"/><path d="M190 190l18 5m19 2 19-8m-36 35 29 6" stroke="#d6bc87" stroke-width="4"/>`],
  ["skeleton", "Skeleton Warden", "#aaa780", "#f5e9bc", "#29303c", "bone", `<path d="M183 267q57-34 114 0M179 281q62-39 122 0M187 299q53-31 106 0M194 316q47-24 92 0" fill="none" stroke="#dacfa8" stroke-width="9"/><path d="M221 133l-10 20 16 13-20 19 19 15" fill="none" stroke="#b8aa88" stroke-width="7"/>`],
  ["raider", "Raider Captain", "#a76645", "#f4c878", "#263746", "warrior", `<path d="M119 198l-42-42m-5-6 19-19m-19 19-19-19m352 67 36-52m7-6-18-13m18 13 18-17" stroke="#d1b271" stroke-width="9" stroke-linecap="round"/><path d="M203 159h72v19h-72z" fill="#4b2830" stroke="#e6bb70" stroke-width="5"/>`],
  ["goblin", "Goblin Hexblade", "#5aab6f", "#d9f17d", "#26443a", "goblin", `<path d="M175 153l-67-48 6 82 53 17m138-51 67-48-6 82-53 17" fill="#486e43" stroke="#a9df79" stroke-width="7"/><path d="M203 219l18 32 20-29 20 29 18-32" fill="#e4cd98" stroke="#3b3828" stroke-width="4"/>`],
  ["rat", "Plague Rat", "#857c67", "#f4b966", "#33313b", "rat", `<path d="M189 164q-44-67-63-12t34 42m132-30q44-67 63-12t-34 42" fill="#766777" stroke="#d8b4a8" stroke-width="8"/><path d="M205 211q-38 18-65 44m126-44q38 18 65 44M209 226q-38 8-69 2m131-2q38 8 69 2" fill="none" stroke="#d6c7b3" stroke-width="4"/><ellipse cx="240" cy="222" rx="17" ry="12" fill="#b76461"/>`],
  ["jack-chistophe", "Jack Chistophe", "#a94b46", "#ffcf78", "#2b2435", "priest", `<path d="M183 110l57-85 57 85-19 17h-76z" fill="#7d3139" stroke="#f2ca76" stroke-width="8"/><path d="M240 46v75m-24-45h48" stroke="#ffe5a0" stroke-width="8"/><path d="M226 178l-28 37 42 39 42-39-28-37" fill="#891f32" stroke="#ffdc88" stroke-width="6"/>`],
  ["yhorm", "Yhorm the Ash Giant", "#ba633d", "#ffd276", "#253a49", "giant", `<path d="M160 229l26-61 40 16-14 63m108-18-26-61-40 16 14 63" fill="#323b47" stroke="#f1a65c" stroke-width="8"/><path d="M201 172l18 18-13 31m73-49-18 18 13 31" fill="none" stroke="#ffbb66" stroke-width="8"/><path d="M160 85l-39-45m199 45 39-45" stroke="#c5a66b" stroke-width="12"/>`],
  ["lothric", "Twin Princes", "#6f9ec4", "#e9f1ff", "#31344f", "twins", `<path d="M164 125q-34-80 20-94l44 42m88 52q34-80-20-94l-44 42" fill="#7f81a7" stroke="#f0d89b" stroke-width="7"/><path d="M111 281q-33-100 18-147l42 59m198 88q33-100-18-147l-42 59" fill="#8a91a7" opacity=".75" stroke="#d2e5ed" stroke-width="7"/>`],
  ["ilyan", "Ilyan the Blood Hunter", "#a8444b", "#ffb078", "#2b293a", "hunter", `<path d="M202 117q-85-16-62-87 19 46 71 54m67 33q85-16 62-87-19 46-71 54" fill="#3e2731" stroke="#dc7772" stroke-width="9"/><path d="M215 180l-20 32 26 20m44-52 20 32-26 20" fill="none" stroke="#ef956c" stroke-width="7"/><path d="M128 255l-24 85m248-85 24 85" stroke="#aa7e68" stroke-width="11"/>`],
  ["roi-sans-nom", "Nameless King", "#6c9fb1", "#bdeaff", "#202f43", "king", `<path d="M191 111l-22-75 47 30 24-48 25 48 45-30-22 75" fill="#4b6272" stroke="#ffe08c" stroke-width="9"/><path d="M240 31v83m-35-42h70" stroke="#c7f1ff" stroke-width="7"/><path d="M110 206q-18-52 15-87m245 87q18-52-15-87" fill="none" stroke="#84e4ff" stroke-width="8"/>`],
];

const svg = ([key, title, skin, glow, armor, form, detail]) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360" role="img" aria-label="${title}">
<defs>
  <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#101b2b"/><stop offset=".58" stop-color="#263344"/><stop offset="1" stop-color="#10151d"/></linearGradient>
  <radialGradient id="aura"><stop stop-color="${glow}" stop-opacity=".46"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e6d9b2"/><stop offset=".22" stop-color="${armor}"/><stop offset=".58" stop-color="#394351"/><stop offset="1" stop-color="#171e2b"/></linearGradient>
  <linearGradient id="flesh" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#f2d5ad"/><stop offset=".4" stop-color="${skin}"/><stop offset="1" stop-color="#453a42"/></linearGradient>
  <linearGradient id="cloth" x2="1" y2="1"><stop stop-color="${armor}"/><stop offset=".45" stop-color="#343646"/><stop offset="1" stop-color="#111725"/></linearGradient>
  <filter id="soft"><feGaussianBlur stdDeviation="18"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".78" numOctaves="2" seed="${key.length * 7}"/><feColorMatrix values=".35 0 0 0 .12 .3 .35 0 0 .1 .2 .25 .4 0 .08 0 0 0 .14 0"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
</defs>
<rect width="480" height="360" rx="24" fill="url(#sky)"/>
<path d="M0 266l70-57 48 31 56-62 57 71 68-52 67 65 62-43 52 39v102H0z" fill="#131d29"/><circle cx="240" cy="133" r="148" fill="url(#aura)"/>
<circle cx="240" cy="123" r="99" fill="none" stroke="${glow}" stroke-opacity=".36" stroke-width="2"/><circle cx="240" cy="123" r="110" fill="none" stroke="#e6cf91" stroke-opacity=".18" stroke-width="1" stroke-dasharray="4 9"/>
<path d="M67 360l20-95q18-48 69-64l40-14h88l40 14q51 16 69 64l20 95z" fill="url(#cloth)" stroke="#d4c38e" stroke-opacity=".6" stroke-width="5"/>
<path d="M99 265l58-64 51 10 32 43-37 106H84zm282 0-58-64-51 10-32 43 37 106h119z" fill="url(#metal)" stroke="#9faeb3" stroke-opacity=".72" stroke-width="5"/>
<path d="M173 222l36-30 31 22 31-22 36 30-26 48-41-21-41 21z" fill="#263849" stroke="#d7c693" stroke-width="4"/>
<path d="M207 143h66l20 65-53 35-53-35z" fill="url(#flesh)" stroke="#342f33" stroke-width="5"/>
<path d="M193 151q-3-87 47-96 50 9 47 96l-19-24-28-14-28 14z" fill="url(#metal)" stroke="#d5c999" stroke-width="6"/>
${form === "goblin" ? `<path d="M198 133l-86-42 21 88 60 6m89-52 86-42-21 88-60 6" fill="${skin}" stroke="#b9e28c" stroke-width="5"/>` : ""}
${form === "twins" ? `<path d="M151 147q0-58 39-62 42 4 41 62l-18 40-45-5zm98 0q0-58 41-62 39 4 39 62l-17 40-46-5z" fill="url(#flesh)" stroke="#d5c999" stroke-width="5"/><path d="M211 166l24 7m34-7-24 7" stroke="${glow}" stroke-width="8"/>` : ""}
${form !== "twins" ? `<path d="M204 153l20 5 10 8m42-13-20 5-10 8" fill="none" stroke="#201d28" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M209 165l18 1m26 0 18-1" stroke="#141722" stroke-width="6" stroke-linecap="round"/><ellipse cx="220" cy="166" rx="6" ry="4" fill="${glow}"/><ellipse cx="260" cy="166" rx="6" ry="4" fill="${glow}"/><path d="M240 165l-8 25 10 3m-26 20q24-20 48 0" fill="none" stroke="#302630" stroke-width="6" stroke-linecap="round"/><path d="M224 209h32" stroke="#cbb998" stroke-width="3" stroke-dasharray="4 4"/>` : ""}
${detail}
<path d="M221 239l19 18 19-18v121h-38z" fill="#151d2a" stroke="#d6bd7e" stroke-width="3"/><path d="M240 249l-12 18 12 14 12-14z" fill="${glow}" stroke="#fff0bd" stroke-width="2"/>
<g fill="${glow}" opacity=".75"><circle cx="82" cy="113" r="3"/><circle cx="393" cy="84" r="2"/><circle cx="352" cy="170" r="3"/><path d="M118 66l-5 16 10-7zm244 124-6 19 12-8z"/></g>
<rect x="1.5" y="1.5" width="477" height="357" rx="22" fill="none" stroke="#f1e2b6" stroke-opacity=".42" stroke-width="3"/>
<path d="M18 290h444" stroke="${glow}" stroke-opacity=".25" stroke-width="2"/>
<g filter="url(#grain)" opacity=".12"><rect width="480" height="360" fill="#fff"/></g>
</svg>`;

for (const portrait of portraits) fs.writeFileSync(path.join(output, `${portrait[0]}-v3.svg`), svg(portrait));
console.log(`Built ${portraits.length} original fantasy portrait SVGs in ${output}`);
