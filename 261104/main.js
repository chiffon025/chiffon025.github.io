let character = [
    { name: "ラディット", type: "妖精", attack: 20, emoji: "🐰", rarity: "1"  },
    { name: "うさきち", type: "妖", attack: 80, emoji: "🐰", rarity: "3"  },
    { name: "コットン", type: "妖精", attack: 10, emoji: "🐈", rarity: "2"  }
];
//console.log(character[0].name);
//console.log(character[0].attack);
//console.log(`${character[0].emoji} (${character[0].type}) ${character[0].name}攻撃力 ${character[0].attack}`);


/*

for (let i = 0; i < character.length; i++) {
    let chara = character[i];
    console.log(chara.name);
    //characterList.innerHTML += `<li>${chara.emoji} ${chara.name}</li>`;

      let rarityStars = "";
  for(let j = 0; j < chara.rarity; j++) {
    rarityStars += "★";
  }

  characterList.innerHTML += `<li>${chara.emoji}${chara.name}(${chara.type}) 攻撃力 ${chara.attack} レアリティ ${rarityStars}</li>`;
}
*/
let characterList = document.querySelector("#characterList");
function showByType(type) {
    characterList.innerHTML = "";
    for (let i = 0; i < character.length; i++) {
        let chara = character[i];
        if (type === "すべて" || chara.type === type) {
            characterList.innerHTML += `<li>${chara.emoji} ${chara.name}</li>`;
        }
    }
}


function showAll() { showByType("すべて"); }
function showFairy() { showByType("妖精"); }
function showYoukai() { showByType("妖"); }
document.querySelector("#allButton").addEventListener("click", showAll);
document.querySelector("#fairyButton").addEventListener("click", showFairy);
document.querySelector("#yokaiButton").addEventListener("click", showYoukai);
