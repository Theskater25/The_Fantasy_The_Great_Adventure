/*
 * Catalogue des traductions de l'histoire.
 * Les événements sont indexés [question, réponse Oui, réponse Non].
 */
window.TF_TRANSLATIONS = {
  "zh-CN": { events: {1:[],2:[],3:[]}, content: { chapters: [], achievements: [], classes: [], bossNames: [], basicEnemies: [] }, paths: {} },
  de: { events: {1:[],2:[],3:[]}, content: { chapters: [], achievements: [], classes: [], bossNames: [], basicEnemies: [] }, paths: {} },
  es: { events: {1:[],2:[],3:[]}, content: { chapters: [], achievements: [], classes: [], bossNames: [], basicEnemies: [] }, paths: {} },
  pl: { events: {1:[],2:[],3:[]}, content: { chapters: [], achievements: [], classes: [], bossNames: [], basicEnemies: [] }, paths: {} },
  en: {
    paths: {
      1: { village: "You move through the heart of the Forgotten Village", brume: "You follow the road buried in mist", "forêt": "You enter the Whispering Forest", "rivière": "You follow the black river", montagne: "You climb toward the ancient mountain", secret: "You take the secret passages of the old guardians", relique: "You draw closer to the ancestral relic" },
      2: { frontiere: "You reach the gates of the scorched lands", cendres: "You follow the path of ashes", oubli: "You advance along the forgotten trail", forge: "You join the road to the infernal forges", marais: "You enter the black marshes", forteresse: "You climb toward the ancient fortresses", catacombes: "You descend toward the royal catacombs", couronne: "You walk beneath the sign of the black crown", abime: "You skirt the edge of the Abyss", treasure: "You approach the Demon King's treasure", sacrifice: "You follow the path of sacrifice" },
      3: { fjord: "You follow the fjords of the last kingdom", hiver: "You advance through the frozen realm", runes: "You follow the trail of the ancient runes", clans: "You walk beneath the banners of the clans", jarl: "You infiltrate the jarl's court", mer: "You cross the North Sea", tempete: "You face the road of the storm", valkyrie: "You follow the signs of the Valkyries", "trône": "You approach the last king's throne" },
    },
    chapters: {
      1: { title: "The Forgotten Village", kicker: "Chapter I", text: "The mist withdraws before the gates of a village missing from every map.", tone: "The original story of The Fantasy: 50 choices, five bosses and the ancestral relic." },
      2: { title: "The Demon King's Treasure", kicker: "Chapter II", text: "The treasure trail crosses scorched lands where ancient oaths have not been forgotten.", tone: "The second chapter of the trilogy keeps the same hero if they survive." },
      3: { title: "Eivor, the Last King of Norway", kicker: "Chapter III", text: "To the north, the fjords close in and the last kingdom calls for its champion.", tone: "100 Nordic questions, five bosses and the final duel against Eivor." },
    },
    paths: {
      1: { village: "You move through the heart of the Forgotten Village", mist: "You follow the road buried in mist", forest: "You enter the Whispering Forest", river: "You follow the black river", mountain: "You climb toward the ancient mountain", secret: "You take the secret passages of the old guardians", relic: "You draw closer to the ancestral relic" },
      2: { frontiere: "You reach the gates of the scorched lands", cendres: "You follow the path of ashes", oubli: "You advance along the forgotten trail", forge: "You join the road to the infernal forges", marais: "You enter the black marshes", forteresse: "You climb toward the ancient fortresses", catacombes: "You descend toward the royal catacombs", couronne: "You walk beneath the sign of the black crown", abime: "You skirt the edge of the Abyss", treasure: "You approach the Demon King's treasure", sacrifice: "You follow the path of sacrifice" },
      3: { fjord: "You follow the fjords of the last kingdom", hiver: "You advance through the frozen realm", runes: "You follow the trail of the ancient runes", clans: "You walk beneath the banners of the clans", jarl: "You infiltrate the jarl's court", mer: "You cross the North Sea", tempete: "You face the road of the storm", valkyrie: "You follow the signs of the Valkyries", trône: "You approach the last king's throne" },
    },
    events: {
      1: [
        ["You cross the gate of the Forgotten Village. Still mist hangs over the main street. Do you enter?", "You enter the village and the houses seem to recognize your presence.", "You circle the first houses and watch the mist from the fields."],
        ["An old guardian offers you a worn map covered in blue marks. Do you take it?", "The map reveals the road to the forbidden library.", "You refuse the map, but the guardian points toward Lantern Street."],
        ["A bell rings from a tower without a bell, and every raven takes flight. Do you follow the sound?", "You discover a square where time seems to have stopped.", "You leave the square and follow tracks toward the forest."],
        ["A lost child asks you to find the light of their home. Do you help?", "The child leads you toward the village archives.", "The child vanishes into the mist and drops a key."],
        ["The central square is empty, but a statue holds a warm lantern. Do you light it?", "The lantern reveals the symbol of the ancestral relic.", "You leave the lantern dark and hear a step behind you."],
        ["A black river blocks the road to the old district. Do you cross it?", "You cross on stones that appear beneath your feet.", "You follow the current to an abandoned mill."],
        ["A small chapel keeps a blue flame beneath a broken altar. Do you pray before it?", "The flame shows you a passage into the village secrets.", "You take an unlit torch and return toward the square."],
        ["A door covered in mist bears your name in the wood. Do you open it?", "The door leads to the street where the villagers disappeared.", "You search for a side entrance behind the houses."],
        ["The ruins of a house hide stairs descending beneath the village. Do you go down?", "You find the first archives of the Forgotten Village.", "You stay above ground and follow a path toward the trees."],
        ["A sealed crypt bears the same rune as the guardian's map. Do you break the seal?", "The first guardian of oblivion awakens beneath the earth.", "You memorize the rune and search for another entrance."],

        ["A path enters a forest where the trees whisper your name. Do you go in?", "The branches open and reveal the road to the relic.", "You remain at the edge and search for a safer trail."],
        ["A ghost hunter offers to follow his glowing arrows. Do you trust him?", "His arrows lead you to a protected clearing.", "You leave alone and find the old village road."],
        ["A standing stone bears four symbols and an invisible lock. Do you touch it?", "The stone opens a vision of the ancestral mountain.", "You circle the stones and find fresh footprints."],
        ["A huge tree shelters a blue light in its trunk. Do you reach inside?", "The light gives you a fragment of the forgotten map.", "You carve the symbol into your weapon and move on."],
        ["A raven watches you with a key in its beak. Do you follow it?", "The bird leads you to an ancient cemetery.", "You wait for it to leave and find another path through the ferns."],
        ["An abandoned camp holds food and a fire that refuses to die. Do you rest there?", "The fire reveals the journal of an ancient hero.", "You leave before the shadows notice your presence."],
        ["An altar covered in runes asks for an offering of light. Do you raise your torch?", "The runes open a road toward the heart of the forest.", "You keep your fire and return toward the mist."],
        ["A white wolf guards a passage between two rocks. Do you speak to it?", "The wolf accepts you and shows you a hidden trail.", "You avoid its eyes and pass through a ravine."],
        ["Burned footprints cross the leaves toward a hill. Do you follow them?", "You find the trail of the village's first explorer.", "You erase your tracks and continue without drawing attention."],
        ["A clearing opens beneath a starless sky. An empty armor waits there. Do you approach?", "The armor comes alive and guards the mountain entrance.", "You pass behind the trees looking for another route."],

        ["A hidden road climbs toward the mountain where the relic was made. Do you take it?", "You reach the heights and see an abandoned tower.", "You remain in the forest and look for a lower entrance."],
        ["A ruined bridge hangs above an underground river. Do you cross it?", "You cross before the stones collapse.", "You descend toward the water and find a passage beneath the bridge."],
        ["An abandoned mine still echoes with the picks of vanished workers. Do you enter?", "The tunnels bring you closer to the map chamber.", "You circle the mine along an exposed path."],
        ["A petrified knight guards a door and asks your purpose. Do you answer?", "Your answer awakens his last memory.", "You pass without speaking and find a mark on his shield."],
        ["A cave opens in the mountain. A light shines from within. Do you enter?", "You find the chamber where the ancients hid their oaths.", "You search for a path around the cave."],
        ["A blue torch burns without wood beside a vertical stairway. Do you brighten it?", "The light reveals the steps leading to the tower.", "You leave the flame untouched and follow the tracks on the ground."],
        ["The mountain runes tell of the first guardian's sacrifice. Do you translate them?", "You learn that the relic also protects the village.", "You memorize only the final symbol."],
        ["A stone golem blocks the way with a key in its chest. Do you fight it?", "You recover the key after breaking its core.", "You search for a detour through the old tunnels."],
        ["At the summit, five stones point toward five roads to the tower. Do you choose the blue stone?", "The blue stone reveals the true road to the relic.", "A dark stone opens a more dangerous stairway."],
        ["An old tower overlooks the Forgotten Village, and every window is lit. Do you climb?", "You reach the observatory of the last guardian.", "You search for a door at the foot of the tower."],

        ["The observatory shows the village as it was before it vanished. Do you look through the lens?", "You see the exact place where the relic was sealed.", "You break the lens before the vision can trap you."],
        ["Stairs descend from the tower toward an underground library. Do you follow them?", "You discover the names of the ancient guardians.", "You stay in the tower and study the maps of the sky."],
        ["An ancient book says the relic chooses a hero who can renounce power. Do you read it to the end?", "You understand the trial that awaits you.", "You tear out the page bearing the seal and close the book."],
        ["A portal opens behind the shelves onto a place without sunlight. Do you cross it?", "You enter the hidden sanctuary.", "You keep the portal closed and search for its mechanism."],
        ["The ghost of an old guardian asks you to lay down your weapon. Do you obey?", "She reveals the name of the final seal.", "You keep your weapon and she disappears into the walls."],
        ["A lockless chest contains half of a stone crown. Do you open it with the golem's key?", "The crown shows you the passage to the final chamber.", "You carry the closed chest so you do not wake its guardian."],
        ["An underground river flows toward the surface and carries pieces of memory. Do you cross it?", "You reach the crypt beneath the village.", "You build a walkway and remain on the dry bank."],
        ["A broken altar still smokes with dark magic. Do you draw your weapon?", "You destroy the sanctuary's last trap.", "You use the blue light to clear the smoke."],
        ["A sleeping creature guards the last stairway. Do you pass without waking it?", "You move through its shadow without a sound.", "You wake it and discover that it guards the relic."],
        ["The final door bears three symbols: village, forest and mountain. Do you place your hand on it?", "The seal recognizes the roads you have travelled.", "You search for another entrance behind the tower."],

        ["The relic sanctuary is silent, but footsteps circle the stone throne. Do you advance?", "You enter the chamber where the village's fate was sealed.", "You watch from the shadows to locate the guardian."],
        ["Two statues guard the path and ask for the name of your village. Do you tell the truth?", "The statues bow before the forgotten name.", "You give a false name and take a side passage."],
        ["An inscription says the relic can save the village or erase its people. Do you continue?", "You accept the weight of the final choice.", "You search the sanctuary archives for an answer."],
        ["A crown of light floats above a pedestal. Do you touch it?", "The crown opens the heart of the relic.", "You leave it floating and search for the true object."],
        ["The first guardian's shadow accuses you of awakening the curse. Do you answer?", "You defend the village and the shadow retreats.", "You remain silent and the shadow lets you pass."],
        ["A round chamber contains the ancestral relic beneath a glass bell. Do you break the bell?", "The relic reveals the memories of the Forgotten Village.", "You search for a way to free it without violence."],
        ["You see the villagers sacrifice their existence to protect the world. Do you watch to the end?", "You understand why no one should own the relic.", "You interrupt the vision before it takes your name."],
        ["The pedestal asks for a precious memory to free the relic. Do you give one?", "You abandon a memory, but the village recognizes you.", "You refuse the sacrifice and search for another solution."],
        ["The final seal asks you to choose between power and the village's freedom. Do you choose the village?", "The seal breaks and the mist begins to disappear.", "You keep the relic under control to prevent another disaster."],
        ["The ancestral relic finally rests in your hands and the village awaits your decision. Do you release it?", "You release the relic: the Forgotten Village returns to the world's memory.", "You seal the relic: the village survives, but its secret will follow you."],
      ],
      2: [
        ["The old man's map reveals a road to the scorched lands. Do you follow it?", "You follow the royal convoy's footprints.", "You leave the road and take the forgotten trail."],
        ["An abandoned caravan bears the Demon King's seal. Do you search the wagons?", "You find a black key beneath the ashes.", "You avoid the trap and circle the wagons."],
        ["A stone beacon marks two passages toward the fortress. Do you light the red flame?", "The flame reveals the soldiers' passage.", "Darkness leads you toward an ancient aqueduct."],
        ["Water beneath your feet carries coins stamped with the demon's face. Do you reach into it?", "You retrieve a coin whispering the password.", "You move on without waking what sleeps in the water."],
        ["A portcullis blocks the valley. An old mechanism awaits an offering. Do you use the black coin?", "The gate opens and the torches flare.", "You climb the wall through a narrow crack."],
        ["Ravens circle a torn banner. Do you pull it down?", "The banner hides a map of the galleries.", "The ravens still show you the northern road."],
        ["Two galleries cross the mountain: one smells of smoke, the other of salt. Do you choose smoke?", "The heat brings you closer to the Demon King's forges.", "The salt tunnel leads beneath the fortress kitchens."],
        ["Ghost miners still strike the rock. Do you listen to them?", "Their song reveals treasure beneath the citadel.", "You move silently among their rusted tools."],
        ["A bell rings without a rope and shakes the walls. Do you silence it?", "Silence reveals an inscription on the floor.", "The ringing attracts a patrol of ash creatures."],
        ["The inscription promises a safe passage in exchange for a memory. Do you sacrifice it?", "A memory fades, but the passage opens.", "You keep your past and force the door by hand."],
        ["A godless chapel keeps three ember vials. Do you take one?", "The ember illuminates lies carved into the walls.", "You leave the vials and find stairs behind the altar."],
        ["The staircase divides between the tower and the dungeons. Do you climb?", "From above, you spot the fortress heart.", "The dungeons lead beneath the foundations."],
        ["A stone sentry watches the valley. Do you walk past it?", "You cross its gaze without looking away.", "You wait for the mist and pass through the shadows."],
        ["Red mist hides a door carved with a crown. Do you touch it?", "The door recognizes the mark of the Forgotten Village.", "You follow a current of air toward the secret exit."],
        ["The Demon King's citadel finally appears behind the hills. Do you enter its ashes?", "You enter beneath blackened banners.", "You circle the walls to find a weakness."],

        ["Beyond the walls, two doors lead into the citadel's heart. Do you open the golden door?", "The golden door leads to the royal halls.", "The lower door opens onto forgotten stores."],
        ["An empty throne holds a glass crown. Do you take it?", "The crown projects an image of the treasure.", "You inspect the throne and find a hidden compartment."],
        ["The stores are filled with black grain that seems to breathe. Do you burn it?", "Smoke draws the road to the infernal forge.", "You pass between the sacks without waking the curse."],
        ["A mirror shows your hero wearing the demonic crown. Do you break it?", "The shards reveal hidden symbols.", "You look away and the image lets you pass."],
        ["A prisoner claims to know where the treasure lies. Do you trust him?", "He gives you the name of an ancient guardian.", "You take his key without freeing his shadow."],
        ["A royal voice offers a bargain in the dark. Do you answer?", "The voice promises an exit in exchange for your sword.", "Silence protects you from the pact."],
        ["The hammers of a forge strike a red blade by themselves. Do you seize it?", "The blade accepts your hand and burns the demon's mark.", "You watch the blade until you understand its rhythm."],
        ["An anvil bears three runes: debt, blood and freedom. Do you choose freedom?", "The rune frees the spirits of the smiths.", "You reject the choice and leave all three runes intact."],
        ["A lava channel separates the forge from a staircase. Do you activate the bridge?", "The chain bridge descends with a roar.", "You cross through the cooling ducts."],
        ["Ghost alchemists mix gold dust. Do you examine their recipe?", "The recipe says the treasure is not material.", "You take a vial before the ghosts vanish."],
        ["Blind fish swim in an underground pool. Do you feed them?", "Their movement reveals a hatch beneath the water.", "You follow the pool and find a dry exit."],
        ["The hatch opens onto a marsh suspended inside the fortress. Do you descend?", "Marsh roots form a path toward the archives.", "You stay on the walkways and circle the black water."],
        ["The archives contain the contract binding the Demon King to his treasure. Do you read it?", "You discover the demon's true name.", "You memorize only the contract's seal."],
        ["The seal pulses and calls a guardian from the depths. Do you follow it?", "You descend toward the mirror chamber.", "You lock the seal and prepare your escape."],
        ["The mirror chamber has one exit, guarded by a silhouette. Do you advance?", "The silhouette reveals the road to the second guardian.", "You find a crack behind your own reflection."],

        ["The road leaves the citadel and crosses a glass desert. Do you walk beneath the sun?", "You follow the shards toward an ancient observatory.", "You travel at night and spot fires in the distance."],
        ["A telescope shows a kingdom hidden behind the moon. Do you turn it?", "The stars draw a map of the treasure.", "You dismantle the device and recover its lens."],
        ["A dune moves like a sleeping creature. Do you dig?", "You discover the entrance to a buried palace.", "You circle the dune before it wakes."],
        ["The buried palace holds statues of faceless kings. Do you give them faces?", "The statues show you the treasure's first fragment.", "You pass behind them without speaking a name."],
        ["The gold fragment points to a door beneath the desert. Do you place it in the altar?", "The altar opens stairs toward the catacombs.", "You hide the fragment and follow fresh tracks."],
        ["Dead knights guard a passage. Do you ask for an audience?", "Their captain lets you pass in exchange for a promise.", "You slip between their motionless armor."],
        ["The promise demands that you never use the treasure's gold. Do you accept?", "The dead give you an ivory key.", "You break the circle and the key falls to the ground."],
        ["The ivory key opens a room where empty armor floats. Do you put it on?", "The armor protects you from the Demon King's visions.", "You leave it behind and watch it walk alone."],
        ["A vision shows the Demon King sacrificing his own kingdom. Do you watch to the end?", "You understand why the treasure was hidden.", "You break the vision before it marks you."],
        ["A canyon splits the desert and a chain links its two sides. Do you cross the chain?", "You cross above the void.", "You descend to the bottom of the canyon."],
        ["A black obelisk absorbs the light. Do you write the demon's name on it?", "The name opens a road toward the sand crown.", "The obelisk points you toward a lightless path."],
        ["An underground passage echoes with reversed prayers. Do you light your torch?", "The torch repels the shadows guarding the third fragment.", "You advance in darkness guided by the prayers."],
        ["The third fragment is guarded by a two-faced statue. Do you choose the smiling face?", "The smiling face grants you passage.", "The stern face gives you a riddle."],
        ["The riddle asks what remains when gold disappears. Do you answer memory?", "The statue bows and frees the road.", "Your silence brings down a rain of sand."],
        ["A sand crown opens the way to the underground palace. Do you wear it?", "The palace recognizes you as the heir of the quest.", "You walk behind the crown without touching it."],

        ["The underground palace reveals stairs toward the Abyss. Do you descend?", "You go beneath the world's roots.", "You seek a safer entrance through the dead gardens."],
        ["Metal flowers grow around a dry fountain. Do you drink its black water?", "The water shows you the road to the fourth fragment.", "You break the fountain and recover a golden seed."],
        ["The Abyss answers your steps with children's voices. Do you answer them?", "The voices promise a crown in exchange for your name.", "You keep your identity and the voices retreat."],
        ["A blind scribe asks you to write your name in the black book. Do you do it?", "The book reveals Azharkan's secret name.", "The scribe gives you a torn page."],
        ["The torn page describes a door behind the inverted river. Do you follow it?", "You reach the river flowing toward the sky.", "You find a gallery beneath its bed."],
        ["The inverted river carries memories toward the vault. Do you cross it?", "The current leaves you before an obsidian door.", "You build a bridge from dead roots."],
        ["The obsidian door asks for a tear or a drop of blood. Do you give a tear?", "The door opens onto the Prince of the Abyss's palace.", "You give blood and the door cracks."],
        ["A ghost banquet invites you to its table. Do you sit?", "The guests reveal where the chest lies.", "You steal a key while the ghosts sing."],
        ["The main dish contains a map made of ash. Do you eat it?", "The map appears in your memory.", "You carry it away before it burns."],
        ["Ash draws three arches: sword, crown and tomb. Do you choose the sword?", "The sword arch leads to the royal armories.", "You choose the crown and reach the throne rooms."],
        ["An ancient weapon bears the first king's seal. Do you awaken it?", "The weapon recognizes your courage.", "You let it sleep and recover its sheath."],
        ["The throne of the Abyss offers your hero a seat. Do you sit?", "You hear the Demon King's heart beating beneath the stone.", "You discover a hatch beneath the steps."],
        ["A stone heart protects the fourth fragment. Do you strike it?", "The crack reveals the fragment beneath the rock.", "You search for a mechanism that opens it without violence."],
        ["The fourth fragment joins the others and forms a key. Do you assemble it?", "The key reveals a road to the final chamber.", "You keep the fragments apart to avoid their curse."],
        ["A golden threshold marks the Demon King's palace. Do you cross it?", "You enter beneath the black crown.", "You circle the palace and find a side door."],

        ["The final chamber is guarded by two stairways: one rises, one descends. Do you climb?", "You climb toward the treasure chamber.", "You descend toward Azharkan's tomb."],
        ["Mountains of gold hide a lockless chest. Do you move the gold?", "You discover the chest at the center of the room.", "You find an inscription beneath the coins."],
        ["The chest contains a crown and a letter from the Demon King. Do you read the letter?", "The letter reveals that Azharkan wants freedom, not victory.", "You keep the letter closed and take the crown."],
        ["The tomb breathes and calls for a willing sacrifice. Do you answer?", "A door opens without taking your life.", "You force the door with the fragments."],
        ["The black crown promises command over shadows. Do you place it on your head?", "The shadows recognize you as the king's opponent.", "You wrap it in the old man's map."],
        ["All the trilogy's maps are carved into the floor. Do you search for the Forgotten Village?", "A road connects your first adventure to the treasure.", "You notice a road toward the fjords of the next chapter."],
        ["A cold wind crosses the palace carrying a song from the north. Do you follow it?", "The song already announces your next destiny.", "You remain focused on the treasure chamber."],
        ["A compass points to the chest and then breaks. Do you follow its last direction?", "You reach a pedestal covered in frost.", "You inspect the shards and find a royal symbol."],
        ["The pedestal asks for the key formed by the four fragments. Do you insert it?", "The floor shakes and the Demon King's chamber opens.", "You keep the key and search for another passage."],
        ["An army of shadows kneels before a red door. Do you open it?", "The door leads to the heart of the demonic kingdom.", "You pass through a crack beneath the shadows."],
        ["The demonic kingdom unfolds beneath the palace. Do you look at the starless sky?", "You glimpse the imprisoned soul of the Demon King.", "You advance without letting the kingdom hypnotize you."],
        ["Azharkan's soul offers the treasure in exchange for your freedom. Do you negotiate?", "You demand an escape for the entire kingdom.", "You refuse the gold and prepare your weapon."],
        ["An ancient oath can break the black crown. Do you speak it?", "The oath reveals the final chamber.", "You break the crown with the fragments."],
        ["Behind the last door, the treasure lies before an empty throne. Do you advance?", "You walk toward Azharkan's throne.", "You wait for the throne to reveal its trap."],
        ["Azharkan, the Demon King, finally rises and asks for your last choice. Do you claim the treasure?", "You claim the treasure to free the kingdoms.", "You refuse the power and challenge the Demon King."],
      ],
      3: [
        ["The fjords close beneath the snow and a banner calls for your hero. Do you land?", "You set foot on the shore of the last kingdom.", "You remain aboard the ship and watch the cliffs."],
        ["An old longship is trapped in the ice. Do you help free it?", "The ship returns to the sea and guides you toward the village.", "You follow the coast on foot through the blizzard."],
        ["Eivor's village is silent, but smoke rises from one house. Do you enter?", "You find villagers hiding beneath the floorboards.", "You inspect the tracks around the house first."],
        ["A family protects a royal ember in an iron bowl. Do you relight the hearth?", "The royal fire warms the village and reveals a map.", "You keep the ember for a more dangerous moment."],
        ["A child says they saw the King pass through the mountain. Do you believe them?", "The child leads you to an old hunting trail.", "You question the elders before leaving."],
        ["A raven carries a ring bearing the royal seal. Do you follow it?", "The bird leads you to a circle of stones.", "You keep the ring and search for the mountain pass."],
        ["The stones tell of an ancient king's fall. Do you translate them?", "You learn that a traitor still walks among the clans.", "You memorize the symbols without waking their magic."],
        ["Two frost-covered statues guard the pass. Do you walk between them?", "The statues bow before your determination.", "You climb along a narrow ledge."],
        ["Huge wolf tracks circle your camp. Do you follow them?", "You find white fur beside an altar.", "You reinforce the camp before continuing."],
        ["The altar bears an offering for Skadi, the snow hunter. Do you place it there?", "A shining trail appears in the snow.", "You take the offering and hear a distant growl."],
        ["The trail leads to a carved ice door. Do you touch it?", "The door reveals the road to an ancient sanctuary.", "You circle the wall looking for a crack."],
        ["A sanctuary keeps the helmet of a vanished queen. Do you wear it?", "The helmet shows you Eivor's first vision.", "You leave the helmet untouched and find an inscription."],
        ["The vision shows an empty throne and five black flames. Do you watch to the end?", "You see the road leading to the last king.", "You break the vision before it marks your mind."],
        ["The mountain shakes and an avalanche threatens the village. Do you warn the people?", "The villagers take shelter in safe caves.", "You run toward the heights to escape the snow."],
        ["A cave holds shields engraved with the names of kings. Do you examine them?", "A shield reveals Eivor's clan mark.", "You find an exit opening onto the fjord."],
        ["The royal shield is cracked but still filled with magic. Do you repair it?", "Its magic protects you from the cold and awakens an oath.", "You carry away a fragment of the shield."],
        ["An ancient oath asks you to choose between glory and the people. Do you choose the people?", "The spirits of the fjord recognize your heart.", "You keep glory to lure the traitor."],
        ["A rope bridge links the village to an ice fortress. Do you cross it?", "You reach the fortress before nightfall.", "You search for a way beneath the bridge."],
        ["The white fortress opens onto a hall where a bow echoes. Do you enter?", "Skadi awaits you in the snowy courtyard.", "You pass through the dungeons beneath the fortress."],
        ["The clans gather around a blue fire and refuse to speak. Do you address them?", "You call for the clans to unite against the traitor.", "You listen to the accusations without revealing your plan."],

        ["The council asks for proof of your loyalty. Do you show the royal shield?", "The symbol silences the elders.", "You offer to earn their trust through a brave deed."],
        ["Jarl Hrafn invites you into his longhouse. Do you accept?", "You enter the home of a possible traitor.", "You make camp before his guards."],
        ["The jarl's feast has an empty seat reserved for Eivor. Do you sit there?", "The warriors recognize you as a rival.", "You remain standing and watch the doors."],
        ["A cup of mead bears a poison rune. Do you overturn it?", "You stop an assassination attempt.", "You leave the poison and follow whoever prepared it."],
        ["A shadow escapes across the longhouse roof. Do you pursue it?", "The trail leads to the rival clan's docks.", "You question the guards who saw its face."],
        ["An unmanned ship waits beneath the moon. Do you board it?", "The ship holds weapons stolen from the clans.", "You inspect its hull and find a secret passage."],
        ["All the stolen weapons bear Hrafn's mark. Do you show them to the council?", "The clans stand behind your accusation.", "You keep the proof to surprise the jarl."],
        ["A champion challenges you in the name of clan honor. Do you accept?", "Your victory attracts the undecided warriors.", "Your refusal makes the champion reveal his master."],
        ["The warriors offer to form a shield wall. Do you train them?", "The wall becomes an army ready to retake the capital.", "You ask the warriors to protect the villages."],
        ["A mountain map marks a hidden fortress. Do you follow it?", "You discover Hrafn's secret armory.", "You use the map to warn the neighboring villages."],
        ["The armory contains a black banner and a broken crown. Do you take them?", "The banner reveals the road to the capital.", "You leave them in place to lure the traitor."],
        ["The black banner moves and whispers Hrafn's name. Do you burn it?", "The whisper stops and the clans regain their courage.", "You keep it as proof of the black pact."],
        ["A war horn can call every clan in one night. Do you blow it?", "The valleys answer with hundreds of torches.", "You save the horn for the final assault."],
        ["The capital gates are closed and Hrafn already rules inside. Do you request an audience?", "The gates open and lead you to the great hall.", "You enter through the sewers beneath the walls."],
        ["Eivor's throne is covered by a black cloth. Do you remove it?", "A message from the last king appears beneath the cloth.", "You study the footprints around the throne."],
        ["The message orders you to seek the crown beneath the root of the world. Do you obey?", "You understand that Hrafn is only the first guardian.", "You decide to defeat Hrafn before any other quest."],
        ["Hrafn offers to return the crown in exchange for your silence. Do you negotiate?", "You gain time and discover his allies.", "You refuse the pact and demand the truth."],
        ["The walls shake as an army of ravens arrives. Do you open the gates to the clans?", "The clans enter and surround the traitor jarl.", "You fight the guards in the capital corridors."],
        ["The broken crown names Hrafn as the guardian of the next trial. Do you take it from him?", "You force him from the throne.", "You leave the crown and travel toward the root of the world."],

        ["The ancient forest begins where the mountains fall into mist. Do you enter?", "The trees part before the bearer of the royal shield.", "You follow the edge searching for a safe passage."],
        ["Roots rise from the ground and form ancient letters. Do you read them?", "They reveal the name Níðhöggr.", "You move on without disturbing the sleeping roots."],
        ["A blind skald sings of a serpent's birth beneath the world. Do you listen?", "The song points toward the heart of the tree.", "You ask only for the direction of north."],
        ["A cairn protects the bones of an ancient explorer. Do you move the stones?", "You recover a compass pointing toward the roots.", "You respect the grave and find a second path."],
        ["A black wolf watches you without showing its teeth. Do you offer it meat?", "It becomes your guide through the forest.", "It disappears and leaves you facing larger tracks."],
        ["A tree bears marks identical to those in Eivor's village. Do you place your hand on it?", "The tree shares the last king's memory.", "You carve the sign into your shield."],
        ["A silver serpent guards a hot spring. Do you let it pass?", "The spring heals you and reveals a door.", "You circle the spring through the rocks."],
        ["A chain of runes descends into a chasm. Do you follow it?", "You descend toward the network of roots.", "You search for a bridge above the chasm."],
        ["A stone troll blocks the road and asks for a memory. Do you give it the royal ring?", "The troll lets you pass and keeps the king's memory.", "You answer its riddle to continue."],
        ["A blue torch burns without wood beside an underground door. Do you light it?", "The light reveals thousands of roots.", "You pass the door without revealing your presence."],
        ["The roots form stairs descending toward a vast voice. Do you go down?", "Níðhöggr's voice shakes the earth.", "You stay above and search for its weakness."],
        ["A black spring reflects the faces of every dead king. Do you cross it?", "You cross the water and see the heart of the tree.", "You build a bridge from dead branches."],
        ["The cavern echoes with heartbeats beneath the rock. Do you call the creature?", "The root wyrm answers from the depths.", "You search for the passage behind its nest."],
        ["A root bridge crosses a void filled with mist. Do you run to the other side?", "You reach the world tree before it closes.", "You move slowly and test every branch."],
        ["Ancient coins are set into the roots. Do you remove them?", "The coins bear the names of Norway's kings.", "You leave the gold and follow the glowing veins."],
        ["A dragon's bones rest around a red rune. Do you touch it?", "The rune gives you a vision of Fenrir.", "You mark its location before continuing."],
        ["Green vapor escapes from a crack. Do you hold your breath and pass?", "You reach the heart chamber without breathing the poison.", "You go back to find a mask in the ruins."],
        ["A huge branch blocks the heart chamber. Do you cut it?", "The branch bleeds and the root wyrm awakens.", "You find a hidden knot that opens the chamber."],
        ["The world tree bears a door in its trunk. Do you open it?", "Níðhöggr waits behind the bark.", "You ready your weapon before the closed door."],
        ["The tree's heart beats like a drum beneath your feet. Do you strike it to wake the guardian?", "The third guardian rises from the roots.", "You seek a way through the heart without breaking it."],

        ["Beyond the forest, a black coast stretches toward the North Sea. Do you reach the docks?", "You find a ship ready to face the storm.", "You follow the cliffs toward an ancient lighthouse."],
        ["The ship bears a raven-shaped figurehead. Do you take to the sea?", "The sails fill despite the lack of wind.", "You inspect the hold before leaving the coast."],
        ["A wall of black clouds advances toward the fjords. Do you cross it?", "You enter the storm to save time.", "You seek shelter between the rocks."],
        ["A white whale circles the ship. Do you follow it?", "It leads you to an island hidden by mist.", "You keep course toward the sky fortress."],
        ["A siren song rises beneath the waves. Do you answer?", "The song reveals an underwater route.", "You cover your ears and hold your course."],
        ["The abandoned lighthouse holds a flame that never dies. Do you take it?", "The flame becomes a signal for allied ships.", "You leave it at the lighthouse and mark its position."],
        ["The hidden island shelters a circle of shields planted in the sand. Do you remove one?", "The shield bears a Valkyrie's sign.", "You respect the circle and discover a boat."],
        ["A sea sanctuary asks for an offering to the wind. Do you give it your banner?", "The wind calms and opens a route toward the clouds.", "You keep your banner and search for another passage."],
        ["A Valkyrie appears above the waves and asks your name. Do you tell her?", "She promises you a place in the heroes' feast.", "You refuse the glory of the dead and continue."],
        ["An empty armor floats on the sea. Do you pull it aboard?", "The armor assembles and becomes your bodyguard.", "You let it sink into the depths."],
        ["A crown of clouds forms above the ship. Do you cross it?", "The ship rises toward the sky realm.", "You stay on the water to avoid the lightning."],
        ["The song of the dead guides the ship to a graveyard of longships. Do you enter?", "Ancient captains reveal Fenrir's location.", "You circle the haunted wrecks."],
        ["An abandoned shipyard keeps an obsidian keel. Do you repair it?", "The keel turns your ship into an icebreaker.", "You recover only the black metal nails."],
        ["The oars begin moving without a crew. Do you let them sail?", "They lead you toward a door in the sea.", "You take control of the ship again."],
        ["A harbor suspended between two cliffs waits in the mist. Do you dock there?", "The harbor guardians recognize you as an ally.", "You pass beneath the docks unseen."],
        ["Black flags fly on the harbor ships. Do you replace them?", "The sailors rise against their master.", "You memorize their symbols before leaving."],
        ["A giant raven carries a key in its beak. Do you ask it for the key?", "The key opens the road to the sky fortress.", "You follow the raven to its nest."],
        ["A whirlpool forms a staircase toward the clouds. Do you take it?", "You climb toward Fenrir's palace.", "You wait for the sea to become calm."],
        ["A thunder door blocks the way to the heavens. Do you knock three times?", "Thunder answers and opens the door.", "You search for the mechanism behind the clouds."],
        ["The sky fortress is guarded by a wolf whose eyes are stars. Do you advance?", "Fenrir descends from his cloud throne.", "You prepare a trap beneath the sky walls."],

        ["The cloud palace opens onto an ice-covered staircase. Do you climb?", "You climb toward the last king's hall.", "You search through the sky foundations."],
        ["An empty throne casts Eivor's shadow on the wall. Do you approach it?", "The shadow shows you the road back to the earthly realm.", "You search the hall for the crown."],
        ["Eivor's crown rests beneath a bell of ice. Do you free it?", "The ice splits and reveals the final oath.", "You leave the crown imprisoned and search for a key."],
        ["A royal sword is planted in the palace floor. Do you pull it free?", "The sword whispers the true heir's name.", "You respect the weapon and take only its sheath."],
        ["A fresco shows Eivor facing a face identical to yours. Do you touch it?", "The fresco reveals the link between your quest and the last king.", "You step back before the face can speak."],
        ["Eivor's banner still flies in a room without wind. Do you raise it?", "Dead warriors rise to follow you.", "You fold it to protect it from demonic fire."],
        ["A voice claims Fenrir was freed by the clan council. Do you believe it?", "You discover the guilty councilor's name.", "You reject the rumor and look for proof."],
        ["The royal hall is covered in claw marks. Do you follow them?", "They lead to a door beneath the throne.", "You follow the blood trail on the steps."],
        ["Eivor's last oath demands protecting Norway instead of his crown. Do you speak it?", "The kingdom's doors open at your voice.", "You keep the oath to challenge the king himself."],
        ["An ice bridge links the palace to the royal mountain peak. Do you cross it?", "You reach the summit before night returns.", "You descend toward a tunnel of cold lava."],
        ["The ghost of an ancient king asks you to return his sword. Do you obey?", "The ghost tells you Eivor's weakness.", "The ghost vanishes and leaves you his ring."],
        ["The royal horn can call Eivor from his tomb. Do you blow it?", "The last king hears your challenge.", "You remain silent and approach the tomb."],
        ["A red aurora lights the road to the mountain. Do you follow it?", "The aurora becomes a road of light.", "You travel beneath ordinary stars."],
        ["The royal mountain is guarded by two white wolves. Do you pass between them?", "The wolves recognize the bearer of the oath.", "You climb along a frozen cliff."],
        ["Eivor's tomb is sealed by a black ice door. Do you open it with the crown?", "The crown melts the ice and reveals the final throne.", "You search beneath the mountain roots."],
        ["The door runes ask for the last king's name. Do you speak Eivor?", "The mountain answers with a roar.", "You write the name with the shield fragment."],
        ["The snow stops around a perfectly dry hall. Do you enter?", "You enter the heart of the Norwegian realm.", "You wait for dawn before crossing the threshold."],
        ["The last door bears a crown and wolf. Do you push it open?", "Eivor's throne appears behind the ice.", "You prepare your weapon before the inevitable opening."],
        ["Eivor waits on the throne with the crown in one hand. Do you ask him to return the kingdom?", "You demand Norway's freedom.", "You refuse every crown and challenge him for the clans."],
        ["The last King of Norway rises and places a hand on his sword. Do you fight the final duel?", "You accept the duel that will decide the North.", "You lower your weapon and offer one last oath."],
        ["The kingdom holds its breath while the crown chooses its final bearer. Do you speak your oath?", "You swear to return Norway to its people, even if the last king must fall.", "You remain silent and let Eivor decide the North's fate."],
      ],
    },
  },
};


/* Traductions complémentaires pour toutes les langues sélectionnables. */
(function () {
  const frContent = window.TF_CONTENT;
  const enExisting = window.TF_TRANSLATIONS.en;
  const deepCopy = (value) => JSON.parse(JSON.stringify(value));
  const english = {
    chapters: enExisting.chapters,
    paths: enExisting.paths,
    events: enExisting.events,
    content: {
      chapterEndings: ["You reach the end of the Forgotten Village, and the ancestral relic recognizes you.", "Azharkan is defeated. The Demon King's treasure is freed, and the kingdoms regain their future.", "The chapter ends, and your name joins the legend of the North."],
      basicEnemies: ["Zombie", "Skeleton", "Raider Group", "Goblin", "Rat"],
      classes: [
        ["Wizard", "Freeze", "Enemy deals no damage for 1 turn."], ["Archer", "Explosive Arrow", "Your next attack deals +50% damage."], ["Knight", "Divine Shield", "Reduces damage received by 70% 2 turns."], ["Barbarian", "Odin's Fury", "Increases damage by 50% for 2 turns."], ["Assassin", "Ultimate Dodge", "You take no damage this turn."], ["Artificer", "Homemade Explosives", "An explosion deals 250 damage."], ["Bard", "Stunning Music", "Stuns the enemy for 3 turns."], ["Monk", "Monk's Fury", "Delivers 3 powerful hits in 1 turn."], ["Necromancer", "Life Drain", "Deals 100% damage and heals for 50% of damage dealt."], ["King's Jester", "Jester's Chaos", "A random action is triggered."], ["Samurai", "Iaijutsu", "Deals double damage with a lightning-fast strike."], ["Shinobi", "Shadow Step", "Turn invisible and prepare a stronger attack."], ["Onmyoji", "Shikigami", "Summons a spirit that damages and freezes the enemy for 2 turns."], ["Miko", "Purification", "Damages the enemy and restores some of your HP."], ["Rōnin", "Perfect Counter", "Negates incoming damage and empowers your next strike."], ["Berserker", "Bear Rage", "Unleashes a wild strike that deals double damage."], ["Huscarl", "Shield Wall", "Reduces damage received by 80% for 2 turns."], ["Valkyrie", "Wings of Freyja", "Strikes the enemy and restores 25% of your maximum HP."], ["Völva Seiðr", "Rune Prophecy", "Deals mystical damage and freezes the enemy for 2 turns."], ["Skald", "War Saga", "Stuns the enemy for 3 turns and empowers your next strike."],
      ],
      enemies: ["Zombie", "Skeleton", "Raider Group", "Goblin", "Rat", "Jack Chistophe, Priest of the Gospel of Ulmer Münster Church", "Yhorm the Giant", "Lothric, Younger Prince and Lorian, Elder Prince", "Ilyan, the Bloodthirsty Tamer of Dieuv's Tricky Tower", "The Nameless King"],
      chapters: [{ title:"The Forgotten Village",kicker:"Chapter I",text:"The mist withdraws before the gates of a village missing from every map.",tone:"The original story of The Fantasy: 50 stages, five bosses and the ancestral relic." },{ title:"The Demon King's Treasure",kicker:"Chapter II",text:"Where samurai blood was spilled, the treasure still waits.",tone:"75 Japanese-themed choices, five bosses and the final duel against Azharkan." },{ title:"Eivor, the Last King of Norway",kicker:"Chapter III",text:"To the north, the fjords close in and the last kingdom calls for its champion.",tone:"100 Nordic choices, five bosses and the final duel against Eivor." }],
      achievements: [
        ["Ultimate Legend","Unlock every other The Fantasy trophy."],["First Royal Blood","Defeat your first boss."],["Crown Breaker","Defeat five different bosses."],["Crown Slayer","Defeat ten different bosses."],["Crown Annihilator","Defeat fifteen different bosses."],["The Nameless King Falls into Oblivion","Defeat the Nameless King."],["The Demon King Falls","Defeat Azharkan, the Demon King."],["Norway's Last Jarl","Defeat Eivor, the last King of Norway."],["Hero of the Forgotten Village","Complete Chapter I."],["Treasure Hunter","Complete Chapter II."],["The Legend of Eivor","Complete Chapter III."],["The Great Adventure","Complete all three chapters."],["The Immortal","Complete every chapter without dying."],["Ten Faces of Fate","Complete Chapter I with each of the ten original classes."],["Master of the Ways","Complete Chapter II with all fifteen available classes."],["Raven of the North","Complete Chapter III with all twenty available classes."],["Pathwalker","Complete Chapter II after exploring five different routes."],["Novice Adventurer","Reach level 5 during an adventure."],["Realm Traveler","Reach level 10 during an adventure."],["World Traveler","Reach level 20 during an adventure."],["Renowned Adventurer","Reach level 50 during an adventure."],["Legendary Veteran Adventurer","Reach level 100 during an adventure."],
        ["Path of the Wizard","Complete an adventure as a Wizard."],["Path of the Archer","Complete an adventure as an Archer."],["Path of the Knight","Complete an adventure as a Knight."],["Path of the Barbarian","Complete an adventure as a Barbarian."],["Path of the Assassin","Complete an adventure as an Assassin."],["Path of the Artificer","Complete an adventure as an Artificer."],["Path of the Bard","Complete an adventure as a Bard."],["Path of the Monk","Complete an adventure as a Monk."],["Path of the Necromancer","Complete an adventure as a Necromancer."],["Path of the King's Jester","Complete an adventure as the King's Jester."],["Samurai's Blade","Complete an adventure as a Samurai."],["Shadow of the Shinobi","Complete an adventure as a Shinobi."],["Spirit of the Onmyoji","Complete an adventure as an Onmyoji."],["Light of the Miko","Complete an adventure as a Miko."],["Rōnin's Final Duel","Complete an adventure as a Rōnin."],["Berserker's Rage","Complete an adventure as a Berserker."],["Huscarl's Shield","Complete an adventure as a Huscarl."],["Valkyrie's Wings","Complete an adventure as a Valkyrie."],["Völva's Prophecy","Complete an adventure as a Völva Seiðr."],["Skald's Saga","Complete an adventure as a Skald."],
      ],
    },
  };
  const genericPaths = {
    en: null,
    de: {1:{village:"Du durchquerst das Herz des Vergessenen Dorfes",brume:"Du folgst dem im Nebel versunkenen Weg",forêt:"Du betrittst den Flüsterwald",rivière:"Du folgst dem schwarzen Fluss",montagne:"Du steigst zum uralten Berg hinauf",secret:"Du nimmst die geheimen Pfade der alten Wächter",relique:"Du näherst dich der Ahnenreliquie"},2:{frontiere:"Du erreichst die Tore des verbrannten Landes",cendres:"Du folgst dem Aschepfad",oubli:"Du gehst den vergessenen Pfad entlang",forge:"Du erreichst den Weg zu den höllischen Schmieden",marais:"Du betrittst die schwarzen Sümpfe",forteresse:"Du steigst zu den alten Festungen hinauf",catacombes:"Du steigst zu den königlichen Katakomben hinab",couronne:"Du wandelst unter dem Zeichen der schwarzen Krone",abime:"Du streifst am Rand des Abgrunds entlang",treasure:"Du näherst dich dem Schatz des Dämonenkönigs",sacrifice:"Du folgst dem Pfad des Opfers"},3:{fjord:"Du folgst den Fjorden des letzten Königreichs",hiver:"Du schreitest durch das gefrorene Reich",runes:"Du folgst der Spur der alten Runen",clans:"Du gehst unter den Bannern der Clans",jarl:"Du schleichst dich in den Hof des Jarls",mer:"Du überquerst die Nordsee",tempete:"Du stellst dich dem Weg des Sturms",valkyrie:"Du folgst den Zeichen der Walküren","trône":"Du näherst dich dem Thron des letzten Königs"}},
    es: {1:{village:"Avanzas por el corazón del Pueblo Olvidado",brume:"Sigues el camino sepultado en la niebla",forêt:"Entras en el Bosque de los Susurros",rivière:"Sigues el río negro",montagne:"Subes hacia la montaña ancestral",secret:"Tomas los pasadizos secretos de los antiguos guardianes",relique:"Te acercas a la reliquia ancestral"},2:{frontiere:"Llegas a las puertas de las tierras abrasadas",cendres:"Sigues el camino de las cenizas",oubli:"Avanzas por el sendero olvidado",forge:"Te unes al camino de las forjas infernales",marais:"Entras en los pantanos negros",forteresse:"Subes hacia las antiguas fortalezas",catacombes:"Desciendes hacia las catacumbas reales",couronne:"Caminas bajo el signo de la corona negra",abime:"Bordeas el Abismo",treasure:"Te acercas al tesoro del Rey Demonio",sacrifice:"Sigues el camino del sacrificio"},3:{fjord:"Sigues los fiordos del último reino",hiver:"Avanzas por el reino helado",runes:"Sigues el rastro de las runas antiguas",clans:"Caminas bajo los estandartes de los clanes",jarl:"Te infiltras en la corte del jarl",mer:"Cruzas el mar del Norte",tempete:"Te enfrentas al camino de la tormenta",valkyrie:"Sigues las señales de las valquirias","trône":"Te acercas al trono del último rey"}},
    pl: {1:{village:"Przemierzas serce Zapomnianej Wioski",brume:"Podążasz drogą skrytą we mgle",forêt:"Wkraczasz do Szepczącego Lasu",rivière:"Podążasz wzdłuż czarnej rzeki",montagne:"Wspinasz się ku pradawnej górze",secret:"Wybierasz sekretne przejścia dawnych strażników",relique:"Zbliżasz się do pradawnej relikwii"},2:{frontiere:"Docierasz do bram spalonej krainy",cendres:"Podążasz ścieżką popiołów",oubli:"Idziesz zapomnianym szlakiem",forge:"Dołączasz do drogi ku piekielnym kuźniom",marais:"Wkraczasz na czarne bagna",forteresse:"Wspinasz się ku pradawnym twierdzom",catacombes:"Schodzisz do królewskich katakumb",couronne:"Kroczysz pod znakiem czarnej korony",abime:"Obchodzisz skraj Otchłani",treasure:"Zbliżasz się do skarbu Króla Demonów",sacrifice:"Podążasz ścieżką poświęcenia"},3:{fjord:"Podążasz fiordami ostatniego królestwa",hiver:"Przemierzasz zamarznięte królestwo",runes:"Podążasz śladem pradawnych run",clans:"Kroczysz pod sztandarami klanów",jarl:"Przenikasz na dwór jarla",mer:"Przeprawiasz się przez Morze Północne",tempete:"Stawiasz czoła drodze burzy",valkyrie:"Podążasz za znakami walkirii","trône":"Zbliżasz się do tronu ostatniego króla"}},
  };
  const achievementIds = frContent.achievements.map((item) => item.id);
  const classRows = english.content.classes;
  const enemyRows = english.content.enemies;
  const chapterRows = english.content.chapters;
  const achievementRows = english.content.achievements;
  function buildLanguage(code, labels, paths, translate) {
    const content = {
      chapterEndings: labels.chapterEndings,
      classes: frContent.classes.map((item, i) => ({name:labels.classes[i][0],skill:labels.classes[i][1],skillText:labels.classes[i][2],origin:labels.origins[i]})),
      enemies: [...(labels.basicEnemies || []), ...labels.enemies.slice(5)],
      basicEnemies: frContent.basicEnemies.map((enemy, i) => ({source:enemy.name,target:labels.basicEnemies?.[i] || enemy.name})),
      bossNames: frContent.bosses.concat(frContent.treasureBosses, frContent.nordicBosses || []).map((boss, i) => ({source:boss.name,target:labels.bosses?.[i] || boss.name})),
      chapters: chapterRows.map((_, i) => labels.chapters[i]),
      achievements: achievementRows.map((_, i) => labels.achievements[i]),
    };
    const events = {};
    ["storyEvents", "treasureEvents", "nordicEvents"].forEach((key, chapterIndex) => {
      events[chapterIndex + 1] = frContent[key].map((event) => [translate(event.text), translate(event.yes), translate(event.no)]);
    });
    const bossRows = frContent.bosses.concat(frContent.treasureBosses, frContent.nordicBosses || []).map((boss, i) => ({source:boss.name, target:labels.bosses?.[i] || translate(boss.name)}));
    return {
      paths,
      events,
      chapters:Object.fromEntries(frContent.chapters.map((ch, i) => [ch.id,{...ch,...Object.fromEntries(["title","kicker","text","tone"].map((key) => [key,labels.chapters[i][["title","kicker","text","tone"].indexOf(key)] || labels.chapters[i].title]))}])),
      content,
      bosses:bossRows,
    };
  }
  const identity = (text) => text;
  const deText = new Map();
  const esText = new Map();
  const plText = new Map();
  const mapText = (map) => (text) => map.get(text) || text;
  const labels = {
    de:{chapterEndings:["Du erreichst das Ende des vergessenen Dorfes, und die Ahnenreliquie erkennt dich.", "Azharkan ist besiegt. Der Schatz des Dämonenkönigs ist befreit, und die Königreiche erhalten ihre Zukunft zurück.", "Das Kapitel endet, und dein Name wird Teil der Legende des Nordens."],basicEnemies:["Zombie","Skelett","Räubergruppe","Goblin","Ratte"],bosses:["Jack Chistophe, Priester des Evangeliums der Ulmer-Münster-Kirche","Yhorm der Riese","Lothric, jüngerer Prinz und Lorian, älterer Prinz","Ilyan, der blutdürstige Bezwinger des Tricky Towers von Dieuv","Der Namenlose König","Der Aschewächter","Die Königin der Illusionen","Der höllische Schmied","Der Fürst des Abgrunds","Azharkan, der Dämonenkönig"],classes:classRows.map(r=>r.slice(0,3)),origins:["Magie","Waldläufer","Ritterorden","Nordische Krieger","Schattenbund","Handwerksgilde","Barden","Kloster","Dunkle Künste","Königshof","Feudales Japan","Feudales Japan","Feudales Japan","Feudales Japan","Feudales Japan","Wikingerclans","Königliche Garde","Himm Töchter","Nordische Magie","Sagasänger"],enemies:["Zombie","Skelett","Räubergruppe","Goblin","Ratte","Jack Chistophe, Priester des Evangeliums der Ulmer-Münster-Kirche","Yhorm der Riese","Lothric, jüngerer Prinz und Lorian, älterer Prinz","Ilyan, der blutdürstige Bezwinger des Tricky Towers von Dieuv","Der Namenlose König"],chapters:[["Das vergessene Dorf","Kapitel I","Der Nebel weicht vor den Toren eines Dorfes, das auf keiner Karte verzeichnet ist.","Die Originalgeschichte von The Fantasy: 50 Entscheidungen, fünf Bosse und die Ahnenreliquie."],["Der Schatz des Dämonenkönigs","Kapitel II","Wo das Blut der Samurai floss, wartet noch immer der Schatz.","75 japanisch inspirierte Entscheidungen, fünf Bosse und das letzte Duell gegen Azharkan."],["Eivor, der letzte König von Norwegen","Kapitel III","Im Norden schließen sich die Fjorde, und das letzte Königreich ruft seinen Helden.","100 nordische Entscheidungen, fünf Bosse und das letzte Duell gegen Eivor."]],achievements:achievementRows.map((_,i)=>({title:["Ultimative Legende","Erstes königliches Blut","Kronenbrecher","Kronenbezwinger","Kronenvernichter","Der namenlose König versinkt im Vergessen","Der Dämonenkönig fällt","Norwegens letzter Jarl","Held des vergessenen Dorfes","Schatzsucher","Eivors Legende","Das große Abenteuer","Der Unsterbliche","Zehn Gesichter des Schicksals","Meister der Wege","Rabe des Nordens","Wanderer der Pfade","Abenteurer-Neuling","Reisender zwischen Reichen","Weltenwanderer","Berühmter Abenteurer","Legendärer Veteran","Weg des Zauberers","Weg des Bogenschützen","Weg des Ritters","Weg des Barbaren","Weg des Assassinen","Weg des Artifiziers","Weg des Barden","Weg des Mönchs","Weg des Nekromanten","Weg des Hofnarren","Klinge des Samurai","Schatten des Shinobi","Geist des Onmyoji","Licht der Miko","Letztes Duell des Rōnin","Zorn des Berserkers","Schild des Huscarl","Flügel der Walküre","Prophezeiung der Völva","Saga des Skald"][i],description:["Schalte alle anderen The-Fantasy-Trophäen frei.","Besiege deinen ersten Boss.","Besiege fünf verschiedene Bosse.","Besiege zehn verschiedene Bosse.","Besiege fünfzehn verschiedene Bosse.","Besiege den Namenlosen König.","Besiege Azharkan, den Dämonenkönig.","Besiege Eivor, den letzten König von Norwegen.","Schließe Kapitel I ab.","Schließe Kapitel II ab.","Schließe Kapitel III ab.","Schließe alle drei Kapitel ab.","Schließe jedes Kapitel ab, ohne zu sterben.","Schließe Kapitel I mit jeder der zehn ursprünglichen Klassen ab.","Schließe Kapitel II mit allen fünfzehn verfügbaren Klassen ab.","Schließe Kapitel III mit allen zwanzig verfügbaren Klassen ab.","Schließe Kapitel II ab, nachdem du fünf verschiedene Wege erkundet hast.","Erreiche während eines Abenteuers Stufe 5.","Erreiche während eines Abenteuers Stufe 10.","Erreiche während eines Abenteuers Stufe 20.","Erreiche während eines Abenteuers Stufe 50.","Erreiche während eines Abenteuers Stufe 100."][Math.min(i,21)]||"Schließe ein Abenteuer mit dieser Klasse ab."}))},
    es:{chapterEndings:["Llegas al final del Pueblo Olvidado y la reliquia ancestral te reconoce.", "Azharkan ha sido derrotado. El tesoro del Rey Demonio queda libre y los reinos recuperan su futuro.", "El capítulo concluye y tu nombre se une a la leyenda del Norte."],basicEnemies:["Zombi","Esqueleto","Grupo de saqueadores","Goblin","Rata"],bosses:["Jack Chistophe, sacerdote del Evangelio de la Iglesia Ulmer Münster","Yhorm el Gigante","Lothric, príncipe menor y Lorian, príncipe mayor","Ilyan, el domador sanguinario de la Tricky Tower de Dieuv","El Rey sin Nombre","El Guardián de las Cenizas","La Reina de los Espejismos","El Herrero Infernal","El Príncipe del Abismo","Azharkan, el Rey Demonio"],classes:[["Mago","Congelación","El enemigo no causa daño durante 1 turno."],["Arquero","Flecha explosiva","Tu próximo ataque inflige un 50 % más de daño."],["Caballero","Escudo divino","Reduce un 70 % el daño recibido durante 2 turnos."],["Bárbaro","Furia de Odín","Aumenta el daño un 50 % durante 2 turnos."],["Asesino","Esquiva definitiva","No recibes daño este turno."],["Artificiero","Explosivos caseros","Una explosión inflige 250 de daño."],["Bardo","Música aturdidora","Aturde al enemigo durante 3 turnos."],["Monje","Furia del monje","Asesta 3 golpes potentes en 1 turno."],["Nigromante","Drenaje vital","Inflige un 100 % de daño y cura el 50 % del daño causado."],["Bufón del rey","Caos del bufón","Se activa una acción aleatoria."],["Samurái","Iaijutsu","Inflige el doble de daño con un golpe relámpago."],["Shinobi","Paso de sombra","Te vuelves invisible y preparas un ataque potenciado."],["Onmyoji","Shikigami","Invoca un espíritu que daña y congela al enemigo durante 2 turnos."],["Miko","Purificación","Daña al enemigo y recupera parte de tus PV."],["Rōnin","Contra perfecto","Anula el daño recibido y potencia el siguiente golpe."],["Berserker","Furia del oso","Desata un golpe salvaje que inflige el doble de daño."],["Húskarl","Muro de escudos","Reduce un 80 % el daño recibido durante 2 turnos."],["Valquiria","Alas de Freyja","Golpea al enemigo y recupera el 25 % de tus PV máximos."],["Völva Seiðr","Profecía de las runas","Inflige daño místico y congela al enemigo durante 2 turnos."],["Skald","Saga de guerra","Aturde al enemigo durante 3 turnos y potencia tu siguiente golpe."]],origins:["Magia","Exploradores","Orden de caballería","Guerreros nórdicos","Hermandad de las sombras","Gremio de artesanos","Bardos","Monasterio","Artes oscuras","Corte real","Japón feudal","Japón feudal","Japón feudal","Japón feudal","Japón feudal","Clanes vikingos","Guardia real","Hijas del cielo","Magia nórdica","Cantores de sagas"],enemies:["Zombi","Esqueleto","Grupo de saqueadores","Goblin","Rata","Jack Chistophe, sacerdote del Evangelio de la Iglesia Ulmer Münster","Yhorm el Gigante","Lothric, príncipe menor y Lorian, príncipe mayor","Ilyan, el domador sanguinario de la Tricky Tower de Dieuv","El Rey sin Nombre"],chapters:[["El Pueblo Olvidado","Capítulo I","La niebla se retira ante las puertas de un pueblo ausente de todos los mapas.","La historia original de The Fantasy: 50 decisiones, cinco jefes y la reliquia ancestral."],["El Tesoro del Rey Demonio","Capítulo II","Donde se derramó la sangre de los samuráis, el tesoro aún espera.","75 decisiones de temática japonesa, cinco jefes y el duelo final contra Azharkan."],["Eivor, el último Rey de Noruega","Capítulo III","Al norte, los fiordos se cierran y el último reino llama a su campeón.","100 decisiones nórdicas, cinco jefes y el duelo final contra Eivor."]],achievements:achievementRows.map((_,i)=>({title:["Leyenda definitiva","Primera sangre real","Rompecoronas","Aniquilador de coronas","Destructor de coronas","El Rey sin Nombre cae en el olvido","Cae el Rey Demonio","El último jarl de Noruega","Héroe del Pueblo Olvidado","Buscatesoros","La leyenda de Eivor","La Gran Aventura","El inmortal","Diez rostros del destino","Maestro de los caminos","Cuervo del Norte","Caminante de rutas","Aventurero novato","Viajero de reinos","Viajero del mundo","Aventurero célebre","Veterano legendario","Camino del mago","Camino del arquero","Camino del caballero","Camino del bárbaro","Camino del asesino","Camino del artificiero","Camino del bardo","Camino del monje","Camino del nigromante","Camino del bufón del rey","Hoja del samurái","Sombra del shinobi","Espíritu del onmyoji","Luz de la miko","Duelo final del rōnin","Furia del berserker","Escudo del húskarl","Alas de la valquiria","Profecía de la völva","Saga del skald"][i],description:["Desbloquea todos los demás trofeos de The Fantasy.","Derrota a tu primer jefe.","Derrota a cinco jefes diferentes.","Derrota a diez jefes diferentes.","Derrota a quince jefes diferentes.","Derrota al Rey sin Nombre.","Derrota a Azharkan, el Rey Demonio.","Derrota a Eivor, el último Rey de Noruega.","Completa el capítulo I.","Completa el capítulo II.","Completa el capítulo III.","Completa los tres capítulos.","Completa todos los capítulos sin morir.","Completa el capítulo I con cada una de las diez clases originales.","Completa el capítulo II con las quince clases disponibles.","Completa el capítulo III con las veinte clases disponibles.","Completa el capítulo II tras explorar cinco rutas diferentes.","Alcanza el nivel 5 durante una aventura.","Alcanza el nivel 10 durante una aventura.","Alcanza el nivel 20 durante una aventura.","Alcanza el nivel 50 durante una aventura.","Alcanza el nivel 100 durante una aventura."][Math.min(i,21)]||"Completa una aventura con esta clase."}))},
    pl:{chapterEndings:["Docierasz do końca Zapomnianej Wioski, a pradawna relikwia cię rozpoznaje.", "Azharkan zostaje pokonany. Skarb Króla Demonów zostaje uwolniony, a królestwa odzyskują przyszłość.", "Rozdział dobiega końca, a twoje imię dołącza do legend Północy."],basicEnemies:["Zombie","Szkielet","Grupa rabusiów","Goblin","Szczur"],bosses:["Jack Chistophe, kapłan Ewangelii Kościoła Ulmer Münster","Yhorm Olbrzym","Lothric, młodszy książę i Lorian, starszy książę","Ilyan, krwiożerczy poskramiacz Tricky Tower w Dieuv","Bezimienny Król","Strażnik Popiołów","Królowa Miraży","Piekielny Kowal","Książę Otchłani","Azharkan, Król Demonów"],classes:[["Czarodziej","Zamrożenie","Wróg nie zadaje obrażeń przez 1 turę."],["Łucznik","Wybuchowa strzała","Następny atak zadaje o 50% więcej obrażeń."],["Rycerz","Boska tarcza","Zmniejsza otrzymywane obrażenia o 70% przez 2 tury."],["Barbarzyńca","Furia Odyna","Zwiększa obrażenia o 50% na 2 tury."],["Skrytobójca","Unik doskonały","W tej turze nie otrzymujesz obrażeń."],["Artificer","Domowe materiały wybuchowe","Eksplozja zadaje 250 obrażeń."],["Bard","Ogłuszająca muzyka","Ogłusza wroga na 3 tury."],["Mnich","Furia mnicha","Zadaje 3 potężne ciosy w 1 turze."],["Nekromanta","Wysanie życia","Zadaje 100% obrażeń i leczy za 50% zadanych obrażeń."],["Królewski błazen","Błazeński chaos","Uruchamia losową akcję."],["Samuraj","Iaijutsu","Zadaje podwójne obrażenia błyskawicznym ciosem."],["Shinobi","Krok cienia","Znika w cieniu i przygotowuje wzmocniony atak."],["Onmyoji","Shikigami","Przywołuje ducha, który rani i zamraża wroga na 2 tury."],["Miko","Oczyszczenie","Rani wroga i przywraca część PŻ."],["Rōnin","Doskonała kontra","Całkowicie redukuje otrzymane obrażenia i wzmacnia następny cios."],["Berserker","Furia niedźwiedzia","Wyprowadza dziki cios zadający podwójne obrażenia."],["Húskarl","Mur tarcz","Zmniejsza otrzymywane obrażenia o 80% przez 2 tury."],["Walkiria","Skrzydła Freji","Rani wroga i przywraca 25% maksymalnego PŻ."],["Völva Seiðr","Przepowiednia run","Zadaje mistyczne obrażenia i zamraża wroga na 2 tury."],["Skald","Saga wojenna","Ogłusza wroga na 3 tury i wzmacnia następny cios."]],origins:["Magia","Leśni zwiadowcy","Zakon rycerski","Nordyccy wojownicy","Bractwo cieni","Gildia rzemieślników","Bardowie","Klasztor","Mroczne sztuki","Dwór królewski","Feudalna Japonia","Feudalna Japonia","Feudalna Japonia","Feudalna Japonia","Feudalna Japonia","Klany wikingów","Gwardia królewska","Córki niebios","Nordycka magia","Śpiewacy sag"],enemies:["Zombie","Szkielet","Grupa rabusiów","Goblin","Szczur","Jack Chistophe, kapłan Ewangelii Kościoła Ulmer Münster","Yhorm Olbrzym","Lothric, młodszy książę i Lorian, starszy książę","Ilyan, krwiożerczy poskramiacz z Tricky Tower w Dieuv","Bezimienny Król"],chapters:[["Zapomniana Wioska","Rozdział I","Mgła ustępuje przed bramami wioski, której nie ma na żadnej mapie.","Oryginalna opowieść The Fantasy: 50 wyborów, pięciu bossów i pradawna relikwia."],["Skarb Króla Demonów","Rozdział II","Tam, gdzie przelano krew samurajów, skarb wciąż czeka.","75 wyborów inspirowanych Japonią, pięciu bossów i finałowy pojedynek z Azharkanem."],["Eivor, ostatni Król Norwegii","Rozdział III","Na północy fiordy się zamykają, a ostatnie królestwo wzywa swojego czempiona.","100 nordyckich wyborów, pięciu bossów i finałowy pojedynek z Eivorem."]],achievements:achievementRows.map((_,i)=>({title:["Legenda ostateczna","Pierwsza królewska krew","Pogromca koron","Niszczyciel koron","Annihilator koron","Bezimienny Król popada w zapomnienie","Król Demonów upada","Ostatni jarl Norwegii","Bohater Zapomnianej Wioski","Łowca skarbów","Legenda Eivora","Wielka Przygoda","Nieśmiertelny","Dziesięć twarzy losu","Mistrz dróg","Kruk Północy","Wędrowiec szlaków","Początkujący poszukiwacz przygód","Podróżnik krain","Podróżnik świata","Sławny poszukiwacz przygód","Legendarny weteran","Droga Czarodzieja","Droga Łucznika","Droga Rycerza","Droga Barbarzyńcy","Droga Skrytobójcy","Droga Artificera","Droga Barda","Droga Mnicha","Droga Nekromanty","Droga Królewskiego Błazna","Ostrze Samuraja","Cień Shinobi","Duch Onmyoji","Światło Miko","Ostatni pojedynek Rōnina","Furia Berserkera","Tarcza Húskarļa","Skrzydła Walkirii","Przepowiednia Völvy","Saga Skalda"][i],description:["Odblokuj wszystkie pozostałe trofea The Fantasy.","Pokonaj pierwszego bossa.","Pokonaj pięciu różnych bossów.","Pokonaj dziesięciu różnych bossów.","Pokonaj piętnastu różnych bossów.","Pokonaj Bezimiennego Króla.","Pokonaj Azharkana, Króla Demonów.","Pokonaj Eivora, ostatniego Króla Norwegii.","Ukończ rozdział I.","Ukończ rozdział II.","Ukończ rozdział III.","Ukończ wszystkie trzy rozdziały.","Ukończ każdy rozdział bez śmierci.","Ukończ rozdział I każdą z dziesięciu oryginalnych klas.","Ukończ rozdział II wszystkimi piętnastoma dostępnymi klasami.","Ukończ rozdział III wszystkimi dwudziestoma dostępnymi klasami.","Ukończ rozdział II po zbadaniu pięciu różnych tras.","Osiągnij poziom 5 podczas przygody.","Osiągnij poziom 10 podczas przygody.","Osiągnij poziom 20 podczas przygody.","Osiągnij poziom 50 podczas przygody.","Osiągnij poziom 100 podczas przygody."][Math.min(i,21)]||"Ukończ przygodę tą klasą."}))},
  };
  const enTranslate = (text) => {
    const map = new Map([
      ["Vous êtes ","You are "],[". L'aventure commence.",". Your adventure begins."],
      ["Vous choisissez d'agir. +7 EXP.","You choose to act. +7 XP."],["Vous avancez sans rencontrer d'ennemis pour l'instant.","You move on without encountering any enemies for now."],
      ["Vous choisissez de ne pas agir : vous perdez ","You choose not to act: you lose "],[" PV. PV restants : "," HP. HP remaining: "],["Vous êtes mort·e à cause d'une mauvaise décision...","You died because of a bad decision..."],
      ["Rencontre majeure","Major encounter"],["Rencontre","Encounter"],["Étape ","Stage "],["Vous attaquez et infligez ","You attack and deal "],[" dégâts."," damage."],["Vous attendez : l'ennemi aura l'occasion de vous frapper.","You wait: the enemy will have a chance to strike."],
      ["Compétence déjà utilisée ce combat : votre action est perdue.","Skill already used this battle: your action is wasted."],["BOOM ! Vous infligez 250 dégâts.","BOOM! You deal 250 damage."],["Coup critique du deuxième coup !","Critical hit on the second strike!"],["Le troisième coup étourdit l'ennemi !","The third strike stuns the enemy!"],["Vous ratez complètement votre attaque...","You completely miss your attack..."],["Oups ! Le chaos vous blesse.","Oops! Chaos hurts you."],["L'ennemi est mort de rire et ne peut pas attaquer !","The enemy is laughing too hard to attack!"],["Iaijutsu tranche l'air : ","Iaijutsu cuts through the air: "],["Votre shikigami inflige ","Your shikigami deals "],[" dégâts et fige l'ennemi."," damage and freezes the enemy."],["La purification inflige ","Purification deals "],[" dégâts et restaure "," damage and restores "],[" PV."," HP."],["Vous adoptez la posture du contre parfait.","You take the perfect-counter stance."],["Votre mur de boucliers absorbe la prochaine attaque.","Your shield wall absorbs the next attack."],["Les ailes de Freyja infligent ","Freyja's wings deal "],["La prophétie des runes inflige ","The rune prophecy deals "],[" dégâts et gèle l'ennemi."," damage and freezes the enemy."],["Votre saga de guerre étourdit l'ennemi et inspire votre prochaine frappe.","Your war saga stuns the enemy and inspires your next strike."],["L'ennemi est gelé et ne peut pas attaquer.","The enemy is frozen and cannot attack."],["L'ennemi est étourdi et ne peut pas attaquer.","The enemy is stunned and cannot attack."],["Vous êtes invincible ce tour : aucun dégât subi.","You are invincible this turn: no damage taken."],[" vous inflige "," deals you "],["Vous atteignez la fin du Village oublié et la relique ancestrale vous reconnaît.","You reach the end of the Forgotten Village, and the ancestral relic recognizes you."],["Azharkan est vaincu. Le trésor du Roi démon est libéré et les royaumes retrouvent leur avenir.","Azharkan is defeated. The Demon King's treasure is freed, and the kingdoms regain their future."],["Le chapitre s'achève et votre nom rejoint la légende du Nord.","The chapter ends, and your name joins the legend of the North."],
    ]);
    if (enExisting.events) {
      const all = Object.values(enExisting.events).flat();
      const found = all.find((row) => row.some((part) => part === text));
      if (found) return text;
    }
    if (map.has(text)) return map.get(text);
    for (const [source, target] of map) if (text.includes(source)) return text.replace(source,target);
    return text;
  };
  const languages = {};
  english.content.bossNames = frContent.bosses.concat(frContent.treasureBosses, frContent.nordicBosses || []).map((boss, index) => ({source:boss.name,target:labels.en?.bosses?.[index] || enTranslate(boss.name)}));
  window.TF_TRANSLATIONS.en.content = english.content;
  window.TF_TRANSLATIONS.en.content.basicEnemies = english.content.basicEnemies.map((name,index) => ({source:frContent.basicEnemies[index].name,target:name}));
  window.TF_TRANSLATIONS.en.content.bossNames = english.content.bossNames;
  window.TF_TRANSLATIONS.en.bosses = english.content.bossNames;
  window.TF_TRANSLATIONS.en.completeEvents = true;
  // Baseline source text is retained for French; machine/curated locale overlays are used for all other supported languages.
})();


(function () {
  const source = window.TF_CONTENT;
  const en = window.TF_TRANSLATIONS.en;
  const locales = [];
  const sourceEvents={1:source.storyEvents,2:source.treasureEvents,3:source.nordicEvents};
  // Rebuild chapter cards using complete chapter metadata, not partial headline-only entries.
  for (const locale of locales) {
    const language=window.TF_TRANSLATIONS[locale];
    language.chapters=Object.fromEntries(source.chapters.map((chapter,index)=>[chapter.id,{...chapter,...language.content.chapters[index]}]));
    language.content.achievements=language.content.achievements.map((row,index)=>({id:source.achievements[index].id,title:row.title,description:row.description}));
    const translatedEvents=language.events;
    language.events={};
    for (const [chapter,items] of Object.entries(sourceEvents)) language.events[chapter]=items.map((event,index)=>{
      return translatedEvents[chapter]?.[index] || [event.text,event.yes,event.no];
    });
    language.paths=language.paths || {};
  }
  // English includes every event in the existing original translation arrays already.
  en.content.achievements=source.achievements.map((achievement,index)=>({id:achievement.id,title:en.content.achievements[index][0],description:en.content.achievements[index][1]}));
  en.chapters=Object.fromEntries(source.chapters.map((chapter,index)=>[chapter.id,{...chapter,...en.content.chapters[index]}]));
  en.events={
    1:source.storyEvents.map((event,index)=>en.events[1]?.[index]||[event.text,event.yes,event.no]),
    2:source.treasureEvents.map((event,index)=>en.events[2]?.[index]||[event.text,event.yes,event.no]),
    3:source.nordicEvents.map((event,index)=>en.events[3]?.[index]||[event.text,event.yes,event.no]),
  };
})();

/* Legacy generated locale patch retained as documentation; inactive. */
(function(){
  return;
 const content=window.TF_CONTENT;
 const es={
 1:[
 ["Cruzas la puerta del Pueblo Olvidado. Una niebla inmóvil cubre la calle principal. ¿Entras?","Entras en el pueblo y las casas parecen reconocer tu presencia.","Rodeas las primeras casas y observas la niebla desde los campos."],
 ["Un viejo guardián te ofrece un mapa gastado, cubierto de marcas azules. ¿Lo aceptas?","El mapa revela el camino a la biblioteca prohibida.","Rechazas el mapa, pero el guardián te señala la calle de las Linternas."],
 ["Suena una campana en una torre sin campanario y todos los cuervos alzan el vuelo. ¿Sigues el sonido?","Descubres una plaza donde el tiempo parece haberse detenido.","Abandonas la plaza y sigues unas huellas hacia el bosque."],
 ["Un niño perdido te pide que encuentres la luz de su hogar. ¿Le ayudas?","El niño te conduce hasta los archivos del pueblo.","El niño desaparece entre la niebla y deja caer una llave."],
 ["La plaza central está vacía, pero una estatua sostiene una linterna cálida. ¿La enciendes?","La linterna revela el símbolo de la reliquia ancestral.","Dejas la linterna apagada y oyes pasos a tu espalda."],
 ["Un río negro bloquea el camino al barrio antiguo. ¿Lo cruzas?","Cruzas sobre piedras que aparecen bajo tus pies.","Sigues la corriente hasta un molino abandonado."],
 ["Una pequeña capilla guarda una llama azul bajo un altar roto. ¿Rezas ante ella?","La llama te muestra un pasadizo hacia los secretos del pueblo.","Tomas una antorcha apagada y regresas a la plaza."],
 ["Una puerta cubierta de niebla lleva tu nombre grabado en la madera. ¿La abres?","La puerta conduce a la calle donde desaparecieron los aldeanos.","Buscas una entrada lateral detrás de las casas."],
 ["Las ruinas de una casa esconden unas escaleras bajo el pueblo. ¿Bajas?","Encuentras los primeros archivos del Pueblo Olvidado.","Te quedas en la superficie y sigues un sendero hacia los árboles."],
 ["Una cripta sellada tiene la misma runa que el mapa del guardián. ¿Rompes el sello?","El primer guardián del olvido despierta bajo tierra.","Memorizas la runa y buscas otra entrada."],
 ["Un sendero se adentra en un bosque donde los árboles susurran tu nombre. ¿Entras?","Las ramas se abren y revelan el camino a la reliquia.","Te quedas en el límite y buscas una ruta más segura."],
 ["Un cazador de fantasmas te propone seguir sus flechas luminosas. ¿Confías en él?","Sus flechas te conducen a un claro protegido.","Sigues solo y encuentras el antiguo camino del pueblo."],
 ["Una piedra erguida muestra cuatro símbolos y una cerradura invisible. ¿La tocas?","La piedra abre una visión de la montaña ancestral.","Rodeas las piedras y encuentras huellas recientes."],
 ["Un árbol enorme protege una luz azul en su tronco. ¿Metes la mano?","La luz te entrega un fragmento del mapa olvidado.","Grabás el símbolo en tu arma y continúas."],
 ["Un cuervo te observa con una llave en el pico. ¿Lo sigues?","El ave te guía hasta un cementerio antiguo.","Esperas a que se marche y encuentras otro camino entre los helechos."],
 ["Un campamento abandonado conserva comida y un fuego que no se apaga. ¿Descansas?","El fuego revela el diario de un héroe antiguo.","Te marchas antes de que las sombras adviertan tu presencia."],
 ["Un altar cubierto de runas pide una ofrenda de luz. ¿Alzas tu antorcha?","Las runas abren un camino hacia el corazón del bosque.","Conservas el fuego y regresas hacia la niebla."],
 ["Un lobo blanco custodia un paso entre dos rocas. ¿Le hablas?","El lobo te acepta y te muestra un sendero oculto.","Evitas su mirada y cruzas por un desfil."],
 ["Huellas quemadas cruzan las hojas hacia una colina. ¿Las sigues?","Encuentras el rastro del primer explorador del pueblo.","Borras tus huellas y sigues sin llamar la atención."],
 ["Un claro se abre bajo un cielo sin estrellas. Allí espera una armadura vacía. ¿Te acercas?","La armadura cobra vida y protege la entrada de la montaña.","Pasas detrás de los árboles buscando otra ruta."],
 ["Un camino oculto asciende a la montaña donde se creó la reliquia. ¿Lo tomas?","Llegas a las alturas y ves una torre abandonada.","Te quedas en el bosque y buscas una entrada más baja."],
 ["Un puente en ruinas cuelga sobre un río subterráneo. ¿Lo cruzas?","Lo cruzas antes de que las piedras se desplomen.","Bajas hasta el agua y encuentras un pasadizo bajo el puente."],
 ["Una mina abandonada aún resuena con los picos de los trabajadores desaparecidos. ¿Entras?","Los túneles te acercan a la cámara del mapa.","Rodeas la mina por un sendero expuesto."],
 ["Un caballero petrificado custodia una puerta y pregunta tus intenciones. ¿Respondes?","Tu respuesta despierta su último recuerdo.","Pasas sin hablar y encuentras una marca en su escudo."],
 ["Una cueva se abre en la montaña y una luz brilla en su interior. ¿Entras?","Encuentras la cámara donde los antiguos ocultaron sus juramentos.","Buscas un camino que rodee la cueva."],
 ["Una antorcha azul arde sin leña junto a una escalera vertical. ¿La avivas?","La luz revela los peldaños que llevan a la torre.","Dejas la llama intacta y sigues las huellas del suelo."],
 ["Las runas de la montaña hablan del sacrificio del primer guardián. ¿Las descifras?","Descubres que la reliquia también protege el pueblo.","Memorizas únicamente el símbolo final."],
 ["Un gólem de piedra bloquea el paso y lleva una llave en el pecho. ¿Lo combates?","Recuperas la llave tras romper su núcleo.","Buscas un desvío por los túneles antiguos."],
 ["En la cima, cinco piedras señalan cinco caminos hacia la torre. ¿Eliges la piedra azul?","La piedra azul revela el verdadero camino a la reliquia.","Una piedra oscura abre una escalera más peligrosa."],
 ["Una torre antigua domina el Pueblo Olvidado y todas sus ventanas están iluminadas. ¿Subes?","Llegas al observatorio del último guardián.","Buscas una puerta al pie de la torre."],
 ["El observatorio muestra el pueblo tal como era antes de desaparecer. ¿Miras por la lente?","Ves el lugar exacto donde se selló la reliquia.","Rompes la lente antes de que la visión te atrape."],
 ["Unas escaleras bajan desde la torre hasta una biblioteca subterránea. ¿Las sigues?","Descubres los nombres de los antiguos guardianes.","Te quedas en la torre estudiando los mapas del cielo."],
 ["Un libro antiguo dice que la reliquia elige a quien puede renunciar al poder. ¿Lo lees hasta el final?","Comprendes la prueba que te espera.","Arrancas la página con el sello y cierras el libro."],
 ["Un portal se abre tras las estanterías hacia un lugar sin luz solar. ¿Lo cruzas?","Entras en el santuario oculto.","Mantienes cerrado el portal y buscas su mecanismo."],
 ["El fantasma de una guardiana te pide que dejes tu arma. ¿Obedeces?","Te revela el nombre del sello final.","Conservas el arma y ella desaparece entre los muros."],
 ["Un cofre sin cerradura contiene media corona de piedra. ¿Lo abres con la llave del gólem?","La corona te muestra el pasaje a la cámara final.","Te llevas el cofre cerrado para no despertar a su guardián."],
 ["Un río subterráneo fluye hacia la superficie y arrastra fragmentos de recuerdos. ¿Lo cruzas?","Llegas a la cripta bajo el pueblo.","Construyes una pasarela y permaneces en la orilla seca."],
 ["Un altar roto aún humea con magia oscura. ¿Desenvainas?","Destruyes la última trampa del santuario.","Usas la luz azul para disipar el humo."],
 ["Una criatura dormida guarda la última escalera. ¿Pasas sin despertarla?","Te deslizas por su sombra sin hacer ruido.","La despiertas y descubres que protege la reliquia."],
 ["La puerta final muestra tres símbolos: pueblo, bosque y montaña. ¿Pones la mano sobre ella?","El sello reconoce los caminos que has recorrido.","Buscas otra entrada detrás de la torre."],
 ["El santuario de la reliquia está en silencio, pero unos pasos rodean el trono de piedra. ¿Avanzas?","Entras en la cámara donde se selló el destino del pueblo.","Observas desde las sombras para localizar al guardián."],
 ["Dos estatuas custodian el camino y preguntan el nombre de tu pueblo. ¿Dices la verdad?","Las estatuas se inclinan ante el nombre olvidado.","Das un nombre falso y tomas un pasadizo lateral."],
 ["Una inscripción dice que la reliquia puede salvar el pueblo o borrar a sus habitantes. ¿Continúas?","Aceptas el peso de la decisión final.","Buscas una respuesta en los archivos del santuario."],
 ["Una corona de luz flota sobre un pedestal. ¿La tocas?","La corona abre el corazón de la reliquia.","La dejas flotando y buscas el objeto verdadero."],
 ["La sombra del primer guardián te acusa de despertar la maldición. ¿Respondes?","Defiendes al pueblo y la sombra retrocede.","Guardas silencio y la sombra te deja pasar."],
 ["Una cámara circular contiene la reliquia ancestral bajo una campana de cristal. ¿La rompes?","La reliquia revela los recuerdos del Pueblo Olvidado.","Buscas cómo liberarla sin recurrir a la violencia."],
 ["Ves a los aldeanos sacrificar su existencia para proteger el mundo. ¿Miras hasta el final?","Comprendes por qué nadie debería poseer la reliquia.","Interrumpes la visión antes de que se lleve tu nombre."],
 ["El pedestal exige un recuerdo precioso para liberar la reliquia. ¿Entregas uno?","Renuncias a un recuerdo, pero el pueblo te reconoce.","Rechazas el sacrificio y buscas otra solución."],
 ["El sello final te obliga a elegir entre el poder y la libertad del pueblo. ¿Eliges al pueblo?","El sello se rompe y la niebla empieza a desaparecer.","Mantienes la reliquia bajo control para evitar otra catástrofe."],
 ["La reliquia ancestral descansa por fin en tus manos y el pueblo espera tu decisión. ¿La liberas?","Liberas la reliquia: el Pueblo Olvidado vuelve a la memoria del mundo.","Sellas la reliquia: el pueblo sobrevive, pero su secreto te acompañará."],
 ],
 2:[],3:[]
 };
 const translateRows=(rows,language)=>rows.map((row,i)=>row||[language===1?content.storyEvents[i]?.text:language===2?content.treasureEvents[i]?.text:content.nordicEvents[i]?.text,language===1?content.storyEvents[i]?.yes:language===2?content.treasureEvents[i]?.yes:content.nordicEvents[i]?.yes,language===1?content.storyEvents[i]?.no:language===2?content.treasureEvents[i]?.no:content.nordicEvents[i]?.no]);
 for(const lang of ["es","de","pl"]) {
  const existing=window.TF_TRANSLATIONS[lang].events;
  window.TF_TRANSLATIONS[lang].events={
    1:content.storyEvents.map((e,i)=>lang==="es" && es[1][i] ? es[1][i] : existing[1][i] || [e.text,e.yes,e.no]),
    2:content.treasureEvents.map((e,i)=>existing[2][i] || [e.text,e.yes,e.no]),
    3:content.nordicEvents.map((e,i)=>existing[3][i] || [e.text,e.yes,e.no]),
  };
 }
})();

/* Core locale metadata is initialized separately from narrative event catalogues. */
(function(){
 const c=window.TF_CONTENT; const locales={
 en:{paths:{1:{village:"You move through the heart of the Forgotten Village",brume:"You follow the road buried in mist","forêt":"You enter the Whispering Forest","rivière":"You follow the black river",montagne:"You climb toward the ancient mountain",secret:"You take the secret passages of the old guardians",relique:"You draw closer to the ancestral relic"},2:{frontiere:"You reach the gates of the scorched lands",cendres:"You follow the path of ashes",oubli:"You advance along the forgotten trail",forge:"You join the road to the infernal forges",marais:"You enter the black marshes",forteresse:"You climb toward the ancient fortresses",catacombes:"You descend toward the royal catacombs",couronne:"You walk beneath the sign of the black crown",abime:"You skirt the edge of the Abyss",treasure:"You approach the Demon King's treasure",sacrifice:"You follow the path of sacrifice"},3:{fjord:"You follow the fjords of the last kingdom",hiver:"You advance through the frozen realm",runes:"You follow the trail of the ancient runes",clans:"You walk beneath the banners of the clans",jarl:"You infiltrate the jarl's court",mer:"You cross the North Sea",tempete:"You face the road of the storm",valkyrie:"You follow the signs of the Valkyries","trône":"You approach the last king's throne"}},chapters:[{title:"The Forgotten Village",kicker:"Chapter I",text:"The mist withdraws before the gates of a village missing from every map.",tone:"The original story of The Fantasy: 50 stages, five bosses and the ancestral relic."},{title:"The Demon King's Treasure",kicker:"Chapter II",text:"Where samurai blood was spilled, the treasure still waits.",tone:"75 Japanese-themed choices, five bosses and the final duel against Azharkan."},{title:"Eivor, the Last King of Norway",kicker:"Chapter III",text:"To the north, the fjords close in and the last kingdom calls for its champion.",tone:"100 Nordic choices, five bosses and the final duel against Eivor."}]},
 de:{paths:{1:{village:"Du durchquerst das Herz des vergessenen Dorfes",brume:"Du folgst dem im Nebel versunkenen Weg","forêt":"Du betrittst den Flüsterwald","rivière":"Du folgst dem schwarzen Fluss",montagne:"Du steigst zum uralten Berg hinauf",secret:"Du nimmst die geheimen Pfade der alten Wächter",relique:"Du näherst dich der Ahnenreliquie"},2:{frontiere:"Du erreichst die Tore des verbrannten Landes",cendres:"Du folgst dem Aschepfad",oubli:"Du gehst den vergessenen Pfad entlang",forge:"Du erreichst den Weg zu den höllischen Schmieden",marais:"Du betrittst die schwarzen Sümpfe",forteresse:"Du steigst zu den alten Festungen hinauf",catacombes:"Du steigst zu den königlichen Katakomben hinab",couronne:"Du wandelst unter dem Zeichen der schwarzen Krone",abime:"Du streifst am Rand des Abgrunds entlang",treasure:"Du näherst dich dem Schatz des Dämonenkönigs",sacrifice:"Du folgst dem Pfad des Opfers"},3:{fjord:"Du folgst den Fjorden des letzten Königreichs",hiver:"Du schreitest durch das gefrorene Reich",runes:"Du folgst der Spur der alten Runen",clans:"Du gehst unter den Bannern der Clans",jarl:"Du schleichst dich in den Hof des Jarls",mer:"Du überquerst die Nordsee",tempete:"Du stellst dich dem Weg des Sturms",valkyrie:"Du folgst den Zeichen der Walküren","trône":"Du näherst dich dem Thron des letzten Königs"}},chapters:[{title:"Das vergessene Dorf",kicker:"Kapitel I",text:"Der Nebel weicht vor den Toren eines Dorfes, das auf keiner Karte verzeichnet ist.",tone:"Die Originalgeschichte von The Fantasy: 50 Entscheidungen, fünf Bosse und die Ahnenreliquie."},{title:"Der Schatz des Dämonenkönigs",kicker:"Kapitel II",text:"Wo das Blut der Samurai floss, wartet noch immer der Schatz.",tone:"75 japanisch inspirierte Entscheidungen, fünf Bosse und das letzte Duell gegen Azharkan."},{title:"Eivor, der letzte König von Norwegen",kicker:"Kapitel III",text:"Im Norden schließen sich die Fjorde, und das letzte Königreich ruft seinen Helden.",tone:"100 nordische Entscheidungen, fünf Bosse und das letzte Duell gegen Eivor."}]},
 es:{paths:{1:{village:"Avanzas por el corazón del Pueblo Olvidado",brume:"Sigues el camino sepultado en la niebla","forêt":"Entras en el Bosque de los Susurros","rivière":"Sigues el río negro",montagne:"Subes hacia la montaña ancestral",secret:"Tomas los pasadizos secretos de los antiguos guardianes",relique:"Te acercas a la reliquia ancestral"},2:{frontiere:"Llegas a las puertas de las tierras abrasadas",cendres:"Sigues el camino de las cenizas",oubli:"Avanzas por el sendero olvidado",forge:"Te unes al camino de las forjas infernales",marais:"Entras en los pantanos negros",forteresse:"Subes hacia las antiguas fortalezas",catacombes:"Desciendes a las catacumbas reales",couronne:"Caminas bajo el signo de la corona negra",abime:"Bordeas el Abismo",treasure:"Te acercas al tesoro del Rey Demonio",sacrifice:"Sigues el camino del sacrificio"},3:{fjord:"Sigues los fiordos del último reino",hiver:"Avanzas por el reino helado",runes:"Sigues el rastro de las runas antiguas",clans:"Caminas bajo los estandartes de los clanes",jarl:"Te infiltras en la corte del jarl",mer:"Cruzas el mar del Norte",tempete:"Te enfrentas al camino de la tormenta",valkyrie:"Sigues las señales de las valquirias","trône":"Te acercas al trono del último rey"}},chapters:[{title:"El Pueblo Olvidado",kicker:"Capítulo I",text:"La niebla se retira ante las puertas de un pueblo ausente de todos los mapas.",tone:"La historia original de The Fantasy: 50 etapas, cinco jefes y la reliquia ancestral."},{title:"El Tesoro del Rey Demonio",kicker:"Capítulo II",text:"Donde se derramó la sangre de los samuráis, el tesoro aún espera.",tone:"75 decisiones de temática japonesa, cinco jefes y el duelo final contra Azharkan."},{title:"Eivor, el último Rey de Noruega",kicker:"Capítulo III",text:"Al norte, los fiordos se cierran y el último reino llama a su campeón.",tone:"100 decisiones nórdicas, cinco jefes y el duelo final contra Eivor."}]},
 pl:{paths:{1:{village:"Przemierzasz serce Zapomnianej Wioski",brume:"Podążasz drogą skrytą we mgle","forêt":"Wkraczasz do Szepczącego Lasu","rivière":"Podążasz wzdłuż czarnej rzeki",montagne:"Wspinasz się ku pradawnej górze",secret:"Wybierasz sekretne przejścia dawnych strażników",relique:"Zbliżasz się do pradawnej relikwii"},2:{frontiere:"Docierasz do bram spalonej krainy",cendres:"Podążasz ścieżką popiołów",oubli:"Idziesz zapomnianym szlakiem",forge:"Dołączasz do drogi ku piekielnym kuźniom",marais:"Wkraczasz na czarne bagna",forteresse:"Wspinasz się ku pradawnym twierdzom",catacombes:"Schodzisz do królewskich katakumb",couronne:"Kroczysz pod znakiem czarnej korony",abime:"Obchodzisz skraj Otchłani",treasure:"Zbliżasz się do skarbu Króla Demonów",sacrifice:"Podążasz ścieżką poświęcenia"},3:{fjord:"Podążasz fiordami ostatniego królestwa",hiver:"Przemierzasz zamarznięte królestwo",runes:"Podążasz śladem pradawnych run",clans:"Kroczysz pod sztandarami klanów",jarl:"Przenikasz na dwór jarla",mer:"Przeprawiasz się przez Morze Północne",tempete:"Stawiasz czoła drodze burzy",valkyrie:"Podążasz za znakami walkirii","trône":"Zbliżasz się do tronu ostatniego króla"}},chapters:[{title:"Zapomniana Wioska",kicker:"Rozdział I",text:"Mgła ustępuje przed bramami wioski, której nie ma na żadnej mapie.",tone:"Oryginalna opowieść The Fantasy: 50 wyborów, pięciu bossów i pradawna relikwia."},{title:"Skarb Króla Demonów",kicker:"Rozdział II",text:"Tam, gdzie przelano krew samurajów, skarb wciąż czeka.",tone:"75 wyborów inspirowanych Japonią, pięciu bossów i finałowy pojedynek z Azharkanem."},{title:"Eivor, ostatni Król Norwegii",kicker:"Rozdział III",text:"Na północy fiordy się zamykają, a ostatnie królestwo wzywa swojego czempiona.",tone:"100 nordyckich wyborów, pięciu bossów i finałowy pojedynek z Eivorem."}]}
 };
 for(const [lang,data] of Object.entries(locales)){
   if(lang==="en" || !window.TF_TRANSLATIONS[lang]) continue;
   const tr=window.TF_TRANSLATIONS[lang];
   tr.chapters=Object.fromEntries(c.chapters.map((chapter,index)=>[chapter.id,{...chapter,...data.chapters[index]}]));
   tr.paths=data.paths||tr.paths||{};
   tr.content.classes=tr.content.classes.map((x,i)=>({...c.classes[i],...x}));
   tr.content.achievements=tr.content.achievements.map((x,i)=>({...c.achievements[i],...x}));
   tr.content.chapterEndings = tr.content.chapterEndings || data.chapterEndings || [];
   tr.content.bossNames = tr.content.bossNames || [];
   tr.content.basicEnemies = tr.content.basicEnemies || [];
   tr.bosses = tr.content.bossNames;
 }
})();

/* Event catalogues use one locale/chapter structure, indexed [question, yes, no]. */
(function(){
 const locales=window.TF_TRANSLATIONS;
 const source=window.TF_CONTENT;
 const rows={
 de:{1:[
 ["Du durchschreitest das Tor des vergessenen Dorfes. Regungsloser Nebel liegt über der Hauptstraße. Willst du eintreten?","Du betrittst das Dorf, und die Häuser scheinen deine Anwesenheit zu erkennen.","Du umrundest die ersten Häuser und beobachtest den Nebel von den Feldern aus."],["Ein alter Wächter reicht dir eine abgenutzte Karte voller blauer Markierungen. Nimmst du sie?","Die Karte zeigt den Weg zur verbotenen Bibliothek.","Du lehnst die Karte ab, doch der Wächter weist dir die Lanternengasse."],["Eine Glocke läutet in einem Turm ohne Glockenstuhl, und alle Raben fliegen auf. Folgst du dem Klang?","Du entdeckst einen Platz, auf dem die Zeit stillzustehen scheint.","Du verlässt den Platz und folgst Spuren in Richtung Wald."],["Ein verlorenes Kind bittet dich, das Licht seines Zuhauses zu finden. Hilfst du?","Das Kind führt dich zu den Archiven des Dorfes.","Das Kind verschwindet im Nebel und lässt einen Schlüssel fallen."],["Der zentrale Platz ist leer, doch eine Statue hält eine warme Laterne. Zündest du sie an?","Die Laterne enthüllt das Zeichen der Ahnenreliquie.","Du lässt die Laterne dunkel und hörst Schritte hinter dir."],["Ein schwarzer Fluss versperrt den Weg zum alten Viertel. Überquerst du ihn?","Du überquerst ihn auf Steinen, die unter deinen Füßen erscheinen.","Du folgst der Strömung zu einer verlassenen Mühle."],["Eine kleine Kapelle bewahrt unter einem zerbrochenen Altar eine blaue Flamme. Betest du davor?","Die Flamme zeigt dir einen Durchgang zu den Geheimnissen des Dorfes.","Du nimmst eine unentzündete Fackel und kehrst zum Platz zurück."],["Eine nebelverhangene Tür trägt deinen Namen im Holz. Öffnest du sie?","Die Tür führt zu der Straße, in der die Dorfbewohner verschwanden.","Du suchst hinter den Häusern nach einem Seiteneingang."],["Die Ruinen eines Hauses verbergen eine Treppe unter dem Dorf. Steigst du hinab?","Du findest die ersten Archive des vergessenen Dorfes.","Du bleibst an der Oberfläche und folgst einem Pfad zu den Bäumen."],["Eine versiegelte Gruft trägt dieselbe Rune wie die Karte des Wächters. Brichst du das Siegel?","Der erste Wächter des Vergessens erwacht unter der Erde.","Du prägst dir die Rune ein und suchst einen anderen Eingang."]
 ],2:[],3:[]},
 es:{1:[],2:[],3:[]},pl:{1:[],2:[],3:[]},"zh-CN":{1:[],2:[],3:[]}
 };
 const zh1=[
 ["你穿过被遗忘村庄的大门，主街上弥漫着静止不动的雾气。你要进去吗？","你走进村庄，房屋似乎认出了你的到来。","你绕过最初的几间房屋，从田野观察雾气。"],["一位年迈的守卫递给你一张布满蓝色标记的旧地图。你要接过来吗？","地图显现出通往禁忌图书馆的道路。","你拒绝了地图，但守卫为你指出灯笼街。"],["一座没有钟楼的塔中传来钟声，所有乌鸦都振翅飞起。你要循声而去吗？","你发现一处仿佛时间静止的广场。","你离开广场，沿着足迹朝森林走去。"],["一个迷路的孩子请你找回家中的灯火。你要帮忙吗？","孩子带你前往村庄档案室。","孩子消失在雾中，掉下了一把钥匙。"],["中央广场空无一人，但一尊雕像手里拿着一盏温热的灯笼。你要点亮它吗？","灯笼显现出远古圣物的标记。","你没有点灯，听见身后传来脚步声。"],["一条黑色河流挡住了通往旧城区的路。你要渡河吗？","你踩着脚下浮现的石块渡过河流。","你沿着水流走到一座废弃磨坊。"],["一座小礼拜堂在破碎祭坛下保存着蓝色火焰。你要在火焰前祈祷吗？","火焰为你显出通往村庄秘密的通道。","你拿起一支未点燃的火把，返回广场。"],["一扇被雾笼罩的门上刻着你的名字。你要打开它吗？","门通向村民消失的那条街。","你在房屋后寻找侧门。"],["一所房屋的废墟中藏着通往村庄地下的楼梯。你要下去吗？","你找到了被遗忘村庄最初的档案。","你留在地面，沿着小路走向树林。"],["一座封印的地下墓穴刻着与守卫地图相同的符文。你要打破封印吗？","第一位遗忘守卫在地底苏醒。","你记下符文，继续寻找另一处入口。"]
 ];
 rows["zh-CN"][1]=source.storyEvents.map((e,i)=>zh1[i]||[e.text,e.yes,e.no]);
 for(const lang of ["de","es","pl"]) rows[lang][1]=source.storyEvents.map((e,i)=>rows[lang][1][i]||[e.text,e.yes,e.no]);
 for(const lang of ["de","es","pl"]) for(const chapter of [2,3]) rows[lang][chapter]= (chapter===2?source.treasureEvents:source.nordicEvents).map((e,i)=>rows[lang][chapter][i]||[e.text,e.yes,e.no]);
 rows["zh-CN"][2]=source.treasureEvents.map(e=>[e.text,e.yes,e.no]);
 rows["zh-CN"][3]=source.nordicEvents.map(e=>[e.text,e.yes,e.no]);
 for(const lang of ["de","es","pl","zh-CN"]) if(locales[lang]) for(const chapter of [1,2,3]) locales[lang].events[chapter]=rows[lang][chapter];
})();
(function(){
 const c=window.TF_CONTENT;
 const de2=[
 ["Die Karte des alten Mannes zeigt einen Weg in die verbrannten Lande. Folgst du ihm?","Du folgst den Spuren des königlichen Trosses.","Du verlässt die Straße und nimmst den vergessenen Pfad."],["Ein verlassener Karawanenwagen trägt das Siegel des Dämonenkönigs. Durchsuchst du ihn?","Unter der Asche findest du einen schwarzen Schlüssel.","Du weichst der Falle aus und umrundest die Wagen."],["Ein steinerner Leuchtfeuer markiert zwei Wege zur Festung. Entzündest du die rote Flamme?","Die Flamme zeigt den Soldatenweg.","Die Dunkelheit führt dich zu einem alten Aquädukt."],["Wasser zu deinen Füßen trägt Münzen mit dem Gesicht des Dämons. Greifst du danach?","Du holst eine Münze hervor, die das Passwort flüstert.","Du gehst weiter, ohne das Wesen im Wasser zu wecken."],["Ein Fallgitter versperrt das Tal. Ein alter Mechanismus verlangt ein Opfer. Verwendest du die schwarze Münze?","Das Tor öffnet sich und die Fackeln lodern auf.","Du kletterst durch einen schmalen Riss in der Mauer."],["Raben kreisen über einem zerrissenen Banner. Reißt du es herunter?","Das Banner verbirgt eine Karte der Gänge.","Die Raben weisen dir dennoch den Weg nach Norden."],["Zwei Stollen durchqueren den Berg: einer riecht nach Rauch, der andere nach Salz. Wählst du den Rauch?","Die Hitze bringt dich den Schmieden des Dämonenkönigs näher.","Der Salzstollen führt unter die Küchen der Festung."],["Geisterhafte Bergleute schlagen noch immer auf den Fels. Hörst du ihnen zu?","Ihr Lied offenbart einen Schatz unter der Zitadelle.","Du bewegst dich lautlos zwischen ihren verrosteten Werkzeugen."],["Eine Glocke läutet ohne Seil und erschüttert die Mauern. Bringst du sie zum Schweigen?","Die Stille enthüllt eine Inschrift auf dem Boden.","Das Läuten lockt eine Patrouille aus Aschewesen an."],["Die Inschrift verspricht einen sicheren Weg im Tausch gegen eine Erinnerung. Opferst du sie?","Eine Erinnerung verblasst, doch der Weg öffnet sich.","Du bewahrst deine Vergangenheit und stemmst die Tür auf."],
 ];
 const es2=[
 ["El mapa del anciano revela un camino a las tierras abrasadas. ¿Lo sigues?","Sigues las huellas del convoy real.","Dejas el camino y tomas el sendero olvidado."],["Una caravana abandonada lleva el sello del Rey Demonio. ¿Registras los carros?","Encuentras una llave negra bajo las cenizas.","Evitas la trampa y rodeas los carros."],["Un faro de piedra señala dos pasos hacia la fortaleza. ¿Enciendes la llama roja?","La llama revela el paso de los soldados.","La oscuridad te conduce a un acueducto antiguo."],["El agua a tus pies arrastra monedas con el rostro del demonio. ¿Metes la mano?","Recuperas una moneda que susurra la contraseña.","Sigues adelante sin despertar lo que duerme en el agua."],["Una reja bloquea el valle. Un mecanismo antiguo exige una ofrenda. ¿Usas la moneda negra?","La puerta se abre y las antorchas se encienden.","Escalas el muro por una grieta estrecha."],["Los cuervos vuelan en círculos sobre un estandarte rasgado. ¿Lo arrancas?","El estandarte oculta un mapa de las galerías.","Los cuervos aún te muestran el camino del norte."],["Dos galerías cruzan la montaña: una huele a humo y la otra a sal. ¿Eliges la del humo?","El calor te acerca a las forjas del Rey Demonio.","El túnel salino conduce bajo las cocinas de la fortaleza."],["Los mineros fantasma siguen golpeando la roca. ¿Los escuchas?","Su canción revela un tesoro bajo la ciudadela.","Avanzas en silencio entre sus herramientas oxidadas."],["Una campana suena sin cuerda y sacude los muros. ¿La silencias?","El silencio revela una inscripción en el suelo.","El repique atrae a una patrulla de criaturas de ceniza."],["La inscripción promete un paso seguro a cambio de un recuerdo. ¿Lo sacrificas?","Un recuerdo se desvanece, pero el paso se abre.","Conservas tu pasado y fuerzas la puerta."],
 ];
 const pl2=[
 ["Mapa starca wskazuje drogę do spalonej krainy. Czy podążysz nią?","Idziesz śladami królewskiego orszaku.","Schodzisz z drogi i wybierasz zapomniany szlak."],["Porzucona karawana nosi pieczęć Króla Demonów. Czy przeszukasz wozy?","Pod popiołem znajdujesz czarny klucz.","Unikasz pułapki i obchodzisz wozy."],["Kamienny drogowskaz oznacza dwa przejścia do twierdzy. Czy zapalisz czerwony płomień?","Płomień wskazuje drogę żołnierzy.","Ciemność prowadzi cię do pradawnego akweduktu."],["Woda pod stopami niesie monety z twarzą demona. Czy sięgniesz po jedną?","Wyciągasz monetę, która szepcze hasło.","Idziesz dalej, nie budząc tego, co śpi w wodzie."],["Brona blokuje dolinę. Stary mechanizm żąda ofiary. Czy użyjesz czarnej monety?","Brama się otwiera, a pochodnie rozbłyskują.","Wspinasz się po murze przez wąską szczelinę."],["Kruki krążą nad podartym sztandarem. Czy zerwiesz go?","Sztandar skrywa mapę galerii.","Kruki i tak wskazują ci północną drogę."],["Dwie galerie przecinają górę: jedna pachnie dymem, druga solą. Czy wybierzesz dym?","Żar przybliża cię do kuźni Króla Demonów.","Solny tunel prowadzi pod kuchnie twierdzy."],["Duchy górników wciąż uderzają w skałę. Czy ich wysłuchasz?","Ich pieśń ujawnia skarb pod cytadelą.","Przemykasz cicho między ich zardzewiałymi narzędziami."],["Dzwon rozbrzmiewa bez sznura i wstrząsa murami. Czy go uciszysz?","Cisza odsłania napis na podłodze.","Dźwięk przyciąga patrol popielnych stworów."],["Napis obiecuje bezpieczne przejście w zamian za wspomnienie. Czy je poświęcisz?","Wspomnienie blednie, ale przejście się otwiera.","Zachowujesz przeszłość i wyważasz drzwi."],
 ];
 const de3=[["Die Fjorde schließen sich unter dem Schnee, und ein Banner ruft nach deinem Helden. Gehst du an Land?","Du betrittst das Ufer des letzten Königreichs.","Du bleibst an Bord und beobachtest die Klippen."],["Ein altes Langschiff steckt im Eis fest. Hilfst du, es zu befreien?","Das Schiff kehrt aufs Meer zurück und weist dir den Weg zum Dorf.","Du folgst zu Fuß durch den Schneesturm der Küste."],["Eivors Dorf ist still, doch aus einem Haus steigt Rauch auf. Betrittst du es?","Du findest Dorfbewohner, die sich unter den Dielen verstecken.","Du untersuchst zuerst die Spuren um das Haus."],["Eine Familie bewahrt eine königliche Glut in einer Eisenschale. Entfachst du den Herd neu?","Das königliche Feuer wärmt das Dorf und enthüllt eine Karte.","Du hebst die Glut für einen gefährlicheren Moment auf."],["Ein Kind sagt, es habe den König durch den Berg gehen sehen. Glaubst du ihm?","Das Kind führt dich zu einem alten Jagdpfad.","Du befragst die Ältesten, bevor du aufbrichst."],["Ein Rabe trägt einen Ring mit königlichem Siegel. Folgst du ihm?","Der Vogel führt dich zu einem Steinkreis.","Du behältst den Ring und suchst den Bergpass."],["Die Steine erzählen vom Fall eines alten Königs. Entzifferst du sie?","Du erfährst, dass ein Verräter noch immer unter den Clans wandelt.","Du prägst dir die Zeichen ein, ohne ihre Magie zu wecken."],["Zwei frostbedeckte Statuen bewachen den Pass. Gehst du zwischen ihnen hindurch?","Die Statuen verneigen sich vor deiner Entschlossenheit.","Du kletterst über einen schmalen Felsvorsprung."],["Riesige Wolfsspuren umkreisen dein Lager. Folgst du ihnen?","Neben einem Altar findest du weißes Fell.","Du sicherst das Lager, bevor du weiterziehst."],["Der Altar trägt eine Opfergabe für Skadi, die Jägerin des Schnees. Legst du sie nieder?","Eine leuchtende Spur erscheint im Schnee.","Du nimmst die Opfergabe und hörst ein fernes Knurren."]];
 const es3=[["Los fiordos se cierran bajo la nieve y un estandarte llama a tu héroe. ¿Desembarcas?","Pisas la orilla del último reino.","Permaneces a bordo y observas los acantilados."],["Un drakkar antiguo está atrapado en el hielo. ¿Ayudas a liberarlo?","El barco vuelve al mar y te guía hacia el pueblo.","Sigues a pie la costa durante la ventisca."],["La aldea de Eivor está en silencio, pero sale humo de una casa. ¿Entras?","Encuentras aldeanos escondidos bajo el suelo.","Primero examinas las huellas alrededor de la casa."],["Una familia protege una brasa real en un cuenco de hierro. ¿Reavivas el hogar?","El fuego real calienta el pueblo y revela un mapa.","Guardas la brasa para un momento más peligroso."],["Un niño dice que vio al rey cruzar la montaña. ¿Le crees?","El niño te conduce a un antiguo sendero de caza.","Preguntas a los ancianos antes de partir."],["Un cuervo lleva un anillo con el sello real. ¿Lo sigues?","El ave te guía hasta un círculo de piedras.","Conservas el anillo y buscas el paso de montaña."],["Las piedras cuentan la caída de un antiguo rey. ¿Las descifras?","Descubres que un traidor aún camina entre los clanes.","Memorizas los símbolos sin despertar su magia."],["Dos estatuas cubiertas de escarcha custodian el paso. ¿Caminas entre ellas?","Las estatuas se inclinan ante tu determinación.","Escalas por una cornisa estrecha."],["Enormes huellas de lobo rodean tu campamento. ¿Las sigues?","Encuentras pelo blanco junto a un altar.","Refuerzas el campamento antes de continuar."],["El altar guarda una ofrenda para Skadi, cazadora de la nieve. ¿La depositas?","Aparece un rastro brillante en la nieve.","Te llevas la ofrenda y oyes un gruñido lejano."]];
 const pl3=[["Fiordy zamykają się pod śniegiem, a sztandar wzywa twojego bohatera. Czy schodzisz na ląd?","Stawiasz stopę na brzegu ostatniego królestwa.","Zostajesz na pokładzie i obserwujesz klify."],["Stary długi okręt utknął w lodzie. Czyżesz go uwolnić?","Statek wraca na morze i prowadzi cię ku wiosce.","Idziesz pieszo wzdłuż wybrzeża przez śnieżycę."],["Wioska Eivora milczy, lecz z jednego domu unosi się dym. Czy wejdziesz?","Znajdujesz mieszkańców ukrytych podłogą.","Najpierw oglądasz ślady wokół domu."],["Rodzina chroni królewski żar w żelaznej misie. Czy rozpalasz palenisko?","Królewski ogień ogrzewa wioskę i odsłania mapę.","Zachowujesz żar na groźniejszą chwilę."],["Dziecko twierdzi, że widziało króla przechodzącego przez góry. Wierzysz mu?","Dziecko prowadzi cię na dawny szlak łowiecki.","Przed odejściem wypytujesz starszyznę."],["Kruk niesie pierścień z królewską pieczęcią. Czy za nim podążysz?","Ptak prowadzi cię do kamiennego kręgu.","Zatrzymujesz pierścień i szukasz górskiej przełęczy."],["Kamienie opowiadają o upadku dawnego króla. Czy je odczytasz?","Dowiadujesz się, że zdrajca wciąż chodzi wśród klanów.","Zapamiętujesz symbole, nie budząc ich magii."],["Dwie oszronione posągi strzegą przełęczy. Czy przejdziesz między nimi?","Posągi kłaniają się twojej determinacji.","Wspinasz się wąską półką skalną."],["Olbrzymie ślady wilka okrążają obóz. Czy pójdziesz ich tropem?","Przy ołtarzu znajdujesz białe futro.","Zabezpieczasz obóz przed dalszą drogą."],["Ołtarz skrywa dar dla Skadi, łowczyni śniegu. Czy go złożysz?","Na śniegu pojawia się lśniący szlak.","Zabierasz dar i słysz odległy warkot."]];
 const update=(lang,chapter,translated)=>{const t=window.TF_TRANSLATIONS[lang];const src=chapter===2?c.treasureEvents:c.nordicEvents;t.events[chapter]=src.map((e,i)=>translated[i]||t.events[chapter][i]||[e.text,e.yes,e.no]);};
 for(const lang of ["de","es","pl"]) if(window.TF_TRANSLATIONS[lang]){update(lang,2,lang==="de"?de2:lang==="es"?es2:pl2);update(lang,3,lang==="de"?de3:lang==="es"?es3:pl3);}
})();

/* Opening chapter-I translations consolidated with the locale catalogues. */
(function(){
 const locales=window.TF_TRANSLATIONS;
 const source=window.TF_CONTENT;
 const fr=window.TF_CONTENT.storyEvents;
 const de=[
 ["Du durchschreitest das Tor des vergessenen Dorfes. Regungsloser Nebel liegt über der Hauptstraße. Willst du eintreten?","Du betrittst das Dorf, und die Häuser scheinen deine Anwesenheit zu erkennen.","Du umrundest die ersten Häuser und beobachtest den Nebel von den Feldern aus."],
 ["Ein alter Wächter reicht dir eine abgenutzte Karte voller blauer Markierungen. Nimmst du sie?","Die Karte zeigt den Weg zur verbotenen Bibliothek.","Du lehnst die Karte ab, doch der Wächter weist dir die Lanternengasse."],
 ["Eine Glocke läutet in einem Turm ohne Glockenstuhl, und alle Raben fliegen auf. Folgst du dem Klang?","Du entdeckst einen Platz, auf dem die Zeit stillzustehen scheint.","Du verlässt den Platz und folgst Spuren in Richtung Wald."],
 ["Ein verlorenes Kind bittet dich, das Licht seines Zuhauses zu finden. Hilfst du?","Das Kind führt dich zu den Archiven des Dorfes.","Das Kind verschwindet im Nebel und lässt einen Schlüssel fallen."],
 ["Der zentrale Platz ist leer, doch eine Statue hält eine warme Laterne. Zündest du sie an?","Die Laterne enthüllt das Zeichen der Ahnenreliquie.","Du lässt die Laterne dunkel und hörst Schritte hinter dir."],
 ["Ein schwarzer Fluss versperrt den Weg zum alten Viertel. Überquerst du ihn?","Du überquerst ihn auf Steinen, die unter deinen Füßen erscheinen.","Du folgst der Strömung zu einer verlassenen Mühle."],
 ["Eine kleine Kapelle bewahrt unter einem zerbrochenen Altar eine blaue Flamme. Betest du davor?","Die Flamme zeigt dir einen Durchgang zu den Geheimnissen des Dorfes.","Du nimmst eine unentzündete Fackel und kehrst zum Platz zurück."],
 ["Eine nebelverhangene Tür trägt deinen Namen im Holz. Öffnest du sie?","Die Tür führt zu der Straße, in der die Dorfbewohner verschwanden.","Du suchst hinter den Häusern nach einem Seiteneingang."],
 ["Die Ruinen eines Hauses verbergen eine Treppe unter dem Dorf. Steigst du hinab?","Du findest die ersten Archive des vergessenen Dorfes.","Du bleibst an der Oberfläche und folgst einem Pfad zu den Bäumen."],
 ["Eine versiegelte Gruft trägt dieselbe Rune wie die Karte des Wächters. Brichst du das Siegel?","Der erste Wächter des Vergessens erwacht unter der Erde.","Du prägst dir die Rune ein und suchst einen anderen Eingang."],
 ];
 const zh=[
 ["你穿过被遗忘村庄的大门，主街上弥漫着静止不动的雾气。你要进去吗？","你走进村庄，房屋似乎认出了你的到来。","你绕过最初的几间房屋，从田野观察雾气。"],
 ["一位年迈的守卫递给你一张布满蓝色标记的旧地图。你要接过来吗？","地图显现出通往禁忌图书馆的道路。","你拒绝了地图，但守卫为你指出灯笼街。"],
 ["一座没有钟楼的塔中传来钟声，所有乌鸦都振翅飞起。你要循声而去吗？","你发现一处仿佛时间静止的广场。","你离开广场，沿着足迹朝森林走去。"],
 ["一个迷路的孩子请你找回家中的灯火。你要帮忙吗？","孩子带你前往村庄档案室。","孩子消失在雾中，掉下了一把钥匙。"],
 ["中央广场空无一人，但一尊雕像手里拿着一盏温热的灯笼。你要点亮它吗？","灯笼显现出远古圣物的标记。","你没有点灯，听见身后传来脚步声。"],
 ["一条黑色河流挡住了通往旧城区的路。你要渡河吗？","你踩着脚下浮现的石块渡过河流。","你沿着水流走到一座废弃磨坊。"],
 ["一座小礼拜堂在破碎祭坛下保存着蓝色火焰。你要在火焰前祈祷吗？","火焰为你显出通往村庄秘密的通道。","你拿起一支未点燃的火把，返回广场。"],
 ["一扇被雾笼罩的门上刻着你的名字。你要打开它吗？","门通向村民消失的那条街。","你在房屋后寻找侧门。"],
 ["一所房屋的废墟中藏着通往村庄地下的楼梯。你要下去吗？","你找到了被遗忘村庄最初的档案。","你留在地面，沿着小路走向树林。"],
 ["一座封印的地下墓穴刻着与守卫地图相同的符文。你要打破封印吗？","第一位遗忘守卫在地底苏醒。","你记下符文，继续寻找另一处入口。"],
 ];
 const pl=[
 ["Przekraczasz bramę Zapomnianej Wioski. Nad główną ulicą zalega nieruchoma mgła. Czy wchodzisz?","Wchodzisz do wioski, a domy zdają się rozpoznawać twoją obecność.","Omijasz pierwsze domy i obserwujesz mgłę z pól."],
 ["Stary strażnik podaje ci zużytą mapę pokrytą niebieskimi znakami. Czy ją bierzesz?","Mapa wskazuje drogę do zakazanej biblioteki.","Odrzucasz mapę, lecz strażnik wskazuje ci Ulicę Latarni."],
 ["Dzwon rozbrzmiewa w wieży bez dzwonnicy, a wszystkie kruki wzbijają się w powietrze. Czy pójdziesz za dźwiękiem?","Odkrywasz plac, na którym czas zdaje się stać w miejscu.","Opuszczasz plac i podążasz śladami w stronę lasu."],
 ["Zagubione dziecko prosi cię o odnalezienie światła swojego domu. Czy mu pomożesz?","Dziecko prowadzi cię do wiejskich archiwów.","Dziecko znika we mgle, upuszczając klucz."],
 ["Na centralnym placu nikogo nie ma, lecz posąg trzyma ciepłą latarnię. Czy ją zapalisz?","Latarnią odsłaniasz symbol pradawnej relikwii.","Zostawiasz latarnię zgaszoną i słysz kroki za sobą."],
 ["Czarna rzeka odcina drogę do starej dzielnicy. Czy ją przekroczysz?","Przechodzisz po kamieniach pojawiających się pod twoimi stopami.","Idziesz wzdłuż nurtu aż do opuszczonego młyna."],
 ["Mała kaplica skrywa błękitny płomień pod zniszczonym ołtarzem. Czy pomodlisz się przy nim?","Płomień pokazuje ci przejście do tajemnic wioski.","Bierzesz niezapaloną pochodnię i wracasz na plac."],
 ["Drzwi spowite mgłą mają wyryte w drewnie twoje imię. Czy je otworzysz?","Drzwi prowadzą na ulicę, na której zniknęli mieszkańcy.","Szukasz bocznego wejścia za domami."],
 ["Ruiny domu skrywają schody prowadzące pod wioskę. Czy zejdziesz?","Odnajdujesz pierwsze archiwa Zapomnianej Wioski.","Zostajesz na powierzchni i ruszasz ścieżką ku drzewom."],
 ["Zapieczętowana krypta nosi tę samą runę co mapa strażnika. Czy złamiesz pieczęć?","Pierwszy strażnik zapomnienia budzi się pod ziemią.","Zapamiętujesz runę i szukasz innego wejścia."],
 ];
       locales.de.events[1]=fr.map((e,i)=>de[i]||[e.text,e.yes,e.no]);
       locales.pl.events[1]=fr.map((e,i)=>pl[i]||[e.text,e.yes,e.no]);
       const spanish=locales.es?.events?.[1]||[];
       if(locales.es) locales.es.events[1]=fr.map((e,i)=>spanish[i]||[e.text,e.yes,e.no]);
       locales["zh-CN"].events[1]=fr.map((e,i)=>zh[i]||[e.text,e.yes,e.no]);
       
     })();

 /* Measure narrative gaps without overwriting or hiding untranslated French source text. */
 (function () {
   const source = window.TF_CONTENT;
   const chapters = { 1: source.storyEvents, 2: source.treasureEvents, 3: source.nordicEvents };
   const missing = {};
   for (const lang of ["de", "es", "pl"]) {
     const locale = window.TF_TRANSLATIONS[lang];
     if (!locale) continue;
     missing[lang] = {};
     for (const [chapter, events] of Object.entries(chapters)) {
       missing[lang][chapter] = 0;
       locale.events[chapter] = events.map((event, index) => {
         const original = [event.text, event.yes, event.no];
         const translated = locale.events[chapter][index] || [];
         return original.map((text, field) => {
           if (translated[field] && translated[field] !== text) return translated[field];
           missing[lang][chapter] += 1;
           return text;
         });
       });
     }
   }
   window.TF_TRANSLATION_GAPS = missing;
 })();




/* Build chapter metadata for translated locale overlays. */
(function () {
  const locales = window.TF_TRANSLATIONS;
  const story = window.TF_CONTENT;
  const ensure = (locale) => {
    locale.events ||= {1:[],2:[],3:[]};
    locale.paths ||= {};
    locale.content ||= {chapters:[],achievements:[]};
    locale.events[1] ||= [];
    locale.events[2] ||= [];
    locale.events[3] ||= [];
    return locale;
  };
  Object.values(locales).forEach(ensure);
  const zh1 = [
    ["你穿过被遗忘村庄的大门，主街上弥漫着静止不动的雾气。你要进去吗？","你走进村庄，房屋似乎认出了你的到来。","你绕过最初的几间房屋，从田野观察雾气。"],
    ["一位年迈的守卫递给你一张布满蓝色标记的旧地图。你要接过来吗？","地图显现出通往禁忌图书馆的道路。","你拒绝了地图，但守卫为你指出灯笼街。"],
    ["一座没有钟楼的塔中传来钟声，所有乌鸦都振翅飞起。你要循声而去吗？","你发现一处仿佛时间静止的广场。","你离开广场，沿着足迹朝森林走去。"],
    ["一个迷路的孩子请你找回家中的灯火。你要帮忙吗？","孩子带你前往村庄档案室。","孩子消失在雾中，掉下了一把钥匙。"],
    ["中央广场空无一人，但一尊雕像手里拿着一盏温热的灯笼。你要点亮它吗？","灯笼显现出远古圣物的标记。","你没有点灯，听见身后传来脚步声。"],
    ["一条黑色河流挡住了通往旧城区的路。你要渡河吗？","你踩着脚下浮现的石块渡过河流。","你沿着水流走到一座废弃磨坊。"],
    ["一座小礼拜堂在破碎祭坛下保存着蓝色火焰。你要在火焰前祈祷吗？","火焰为你显出通往村庄秘密的通道。","你拿起一支未点燃的火把，返回广场。"],
    ["一扇被雾笼罩的门上刻着你的名字。你要打开它吗？","门通向村民消失的那条街。","你在房屋后寻找侧门。"],
    ["一所房屋的废墟中藏着通往村庄地下的楼梯。你要下去吗？","你找到了被遗忘村庄最初的档案。","你留在地面，沿着小路走向树林。"],
    ["一座封印的地下墓穴刻着与守卫地图相同的符文。你要打破封印吗？","第一位遗忘守卫在地底苏醒。","你记下符文，继续寻找另一处入口。"]
  ];
  locales["zh-CN"].events[1] = story.storyEvents.map((event,index)=>zh1[index]||[event.text,event.yes,event.no]);
  locales["zh-CN"].events[1] = story.storyEvents.map((event,index)=>zh1[index]||[event.text,event.yes,event.no]);
  for(const lang of ["de","es","pl"]) if(locales[lang]) locales[lang].events[1]=story.storyEvents.map((event,index)=>locales[lang].events[1][index]||[event.text,event.yes,event.no]);
  locales["zh-CN"].events[2] = story.treasureEvents.map(event=>[event.text,event.yes,event.no]);
  locales["zh-CN"].events[3] = story.nordicEvents.map(event=>[event.text,event.yes,event.no]);
})();


/* Canonical event rows [question, yes, no], grouped by locale. */
/* Event catalogues are assembled once, below, from the consolidated rows. */


/* Install the generated locale catalogue after its data script has loaded. */
(function () {
  const catalog = window.TF_TRANSLATION_CATALOG;
  const content = window.TF_CONTENT;
  const locales = window.TF_TRANSLATIONS;
  if (!catalog || !catalog.events) return;
  const sourceEvents = { 1: content.storyEvents, 2: content.treasureEvents, 3: content.nordicEvents };
  const languages = ["en", "de", "es", "pl", "zh-CN"];
  for (const language of languages) {
    const locale = locales[language];
    if (!locale) continue;
    locale.events ||= {};
    for (const [chapter, events] of Object.entries(sourceEvents)) {
      const rows = catalog.events[chapter]?.[language];
      if (Array.isArray(rows) && rows.length === events.length && rows.every((row) => row && [row.question, row.yes, row.no].every((text) => typeof text === "string" && text.trim()))) {
        locale.events[chapter] = rows.map((row) => [row.question, row.yes, row.no]);
      }
    }
    locale.chapters ||= {};
    for (const chapter of content.chapters) {
      const translated = catalog.chapters?.[chapter.id]?.[language];
      if (translated) locale.chapters[chapter.id] = { ...locale.chapters[chapter.id], ...Object.fromEntries(Object.entries(translated).filter(([, value]) => typeof value === "string" && value.trim())) };
    }
    locale.paths = catalog.paths?.[language] || locale.paths || {};
  }
  const bosses = [...content.bosses, ...content.treasureBosses, ...content.nordicBosses];
  for (const language of languages) {
    const locale = locales[language];
    locale.content ||= {};
    locale.content.classes = content.classes.map((item) => catalog.classes?.[item.id]?.[language] || {});
    locale.content.achievements = content.achievements.map((item) => catalog.achievements?.[item.id]?.[language] || {});
    locale.content.basicEnemies = content.basicEnemies.map((item, index) => ({ target: catalog.enemies?.["enemy." + String(index + 1).padStart(3, "0")]?.[language]?.name || item.name }));
    locale.content.bossNames = bosses.map((item, index) => ({ source: item.name, target: catalog.enemies?.["enemy." + String(index + content.basicEnemies.length + 1).padStart(3, "0")]?.[language]?.name || item.name }));
  }
  const gaps = {};
  for (const language of ["en", "de", "es", "pl", "zh-CN"]) {
    const locale = locales[language];
    gaps[language] = {};
    for (const [chapter, events] of Object.entries(sourceEvents)) {
      gaps[language][chapter] = 0;
      events.forEach((event, index) => {
        const source = [event.text, event.yes, event.no];
        const translated = locale?.events?.[chapter]?.[index] || [];
        source.forEach((text, field) => {
          if (!translated[field] || translated[field] === text) gaps[language][chapter]++;
        });
      });
    }
  }
  window.TF_TRANSLATION_GAPS = gaps;
  window.TF_TRANSLATION_COVERAGE = catalog.coverage;
})();
