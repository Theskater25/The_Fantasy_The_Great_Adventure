const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require(process.env.TF_PLAYWRIGHT_MODULE||'playwright');
const {gameRoot,resultsRoot}=require('./project.cjs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const errors=[]; const failed=[]; const report={classes:0,localizedPortraits:0,backgrounds:0,atlasCells:0,errors,failed};
 try{
  const context=await browser.newContext({viewport:{width:1280,height:900},serviceWorkers:'block'});
  await context.addInitScript(()=>{
   localStorage.setItem('the-fantasy-version-2-7-settings',JSON.stringify({language:'fr',music:false,motion:false,volume:0}));
   localStorage.setItem('the-fantasy-v27-guide-seen','true');
  });
  const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));
  page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
  await page.goto('http://127.0.0.1:8123/index.html');
  await page.screenshot({path:path.join(resultsRoot,'v27-title.png')});
  // Each locale must preserve all class IDs when translating the labels.
  for(const language of ['fr','en','de','es','pl','zh-CN']){
   await page.evaluate(language=>{settings.language=language;state.chapter=3;state.screen='select';render();},language);
   const images=page.locator('.class-portrait img');assert.equal(await images.count(),20);
   await images.evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
   const sources=await images.evaluateAll(imgs=>imgs.map(img=>img.getAttribute('src')));
   assert.equal(new Set(sources).size,20);report.localizedPortraits+=20;
  }
  await page.evaluate(()=>{settings.language='fr';render();});
  await page.screenshot({path:path.join(resultsRoot,'v27-classes-desktop.png'),fullPage:true});
  const ids=await page.evaluate(()=>TF_CONTENT.classes.map(c=>c.id));
  for(const id of ids){
   await page.evaluate(id=>{state.chapter=3;state.screen='select';state.selectedClass=id;render();startNewGame();},id);
   const img=page.locator('.hero-avatar img');await img.evaluate(img=>img.decode());
   assert.match(await img.getAttribute('src'),new RegExp('/'+id+'\\.png$'));
   report.classes++;
  }
  const samples=[['forest',1,'Forêt'],['courtyard',2,'Temple'],['castle',2,'Salle finale'],['cave',1,'Grotte'],['ice-cave',3,'Grotte'],['moor',1,'Nuit'],['mountain',1,'Sommet'],['snow',3,'Fjord'],['ruins',2,'Portail'],['graveyard',1,'Cimetière'],['valley',1,'Village'],['aurora',3,'Runes'],['lava',2,'Forge'],['mist',1,'Brume']];
  for(const [expected,chapter,decor] of samples){
   await page.evaluate(({chapter,decor})=>{state.chapter=chapter;state.scenes=createScenes(getChapter(chapter));state.scene=0;state.scenes[0].decor=decor;state.hero.classId='chevalier';startBattle('basic');renderGame();},{chapter,decor});
   const img=page.locator('.arena-backdrop');await img.evaluate(img=>img.decode());
   assert.match(await img.getAttribute('src'),new RegExp('/'+expected+'\\.png$'));
   assert.equal(await page.locator('.enemy-portrait img').count(),1);
   report.backgrounds++;
   if(['lava','castle','forest'].includes(expected))await page.screenshot({path:path.join(resultsRoot,`v27-${expected}.png`)});
  }
  await page.evaluate(()=>{state.hero.inventory=[{id:'art-sword',kind:'weapon',bonus:4,rarity:'rare',equipped:true,effect:'crit',effectValue:5},{id:'art-armor',kind:'armor',bonus:8,rarity:'common',equipped:false,effect:'ward',effectValue:1},{id:'route-compass',kind:'relic',bonus:2,rarity:'epic',equipped:true,effect:'none',effectValue:0}];recalculateHeroStats();openGamePanel('inventory');});
  assert.equal(await page.locator('.inventory-item-icon [data-art]').count(),3);
  assert.equal(await page.locator('.inventory-item-icon [data-art="adventure-6"]').count(),1);
  await page.screenshot({path:path.join(resultsRoot,'v27-inventory.png')});
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{closeGamePanels();state.screen='select';state.chapter=3;render();});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);
  await page.screenshot({path:path.join(resultsRoot,'v27-classes-mobile.png')});
  // Inspect every cropped atlas region in a dedicated QA view; original sheets stay intact.
  await page.setViewportSize({width:1100,height:900});
  report.atlasCells=await page.evaluate(()=>{
   document.body.innerHTML='<main style="padding:24px;background:#253d3b;color:#fff">'+Object.entries(TF_ART.atlases).map(([sheet,a])=>'<h2>'+sheet+'</h2><div style="display:flex;gap:12px">'+a.cells.map((c,i)=>'<div style="border:1px solid #697863;width:100px;text-align:center">'+TF_ART.icon(sheet,i,80)+'<p>'+i+'</p></div>').join('')+'</div>').join('')+'</main>';
   return document.querySelectorAll('[data-art]').length;
  });
  assert.equal(report.atlasCells,45);
  await page.screenshot({path:path.join(resultsRoot,'v27-atlas-review.png'),fullPage:true});
  const sourceManifest=JSON.parse(fs.readFileSync(path.join(gameRoot,'../docs/asset-manifest-v27.json'),'utf8'));
  const crypto=require('node:crypto');
  for(const asset of sourceManifest.sources)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(gameRoot,asset.file))).digest('hex'),asset.sha256);
  report.originalImagesUnchanged=sourceManifest.sources.length;
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
  fs.writeFileSync(path.join(resultsRoot,'v27-art-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
