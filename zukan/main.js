console.log(characters.length);

/*
let selectedType = "すべて"; // 選んでいるタブ
let searchWord = ""; // 検索欄の文字
function render() {
let visibleCharacters = []; // 表示するキャラを集める
for (let i = 0; i < characters.length; i++) {
let character = characters[i];
let matchesType = selectedType === "すべて" || character.type === selectedType;
let matchesWord = character.name.includes(searchWord);
if (matchesType && matchesWord) {
visibleCharacters.push(character);
}
}
}
// visibleCharacters を並べ替え（次回）、カードで表示し、件数を出す

}
*/
let characterList = document.querySelector("#characterList");
function showByType(type) {
    characterList.innerHTML = "";
    for (let i = 0; i < characters.length; i++) {
        let character = characters[i];
        let imageTag = `<img src="${character.image}" width="80">`;
        if (type === "すべて" || character.type === type) {
            characterList.innerHTML += `<li>${imageTag} <br>${character.emoji} ${character.name}</li>`;
        }
    }
}


function showAll() { showByType("すべて"); }
function showFire() { showByType("炎"); }
function showWater() { showByType("水"); }
function showGrass() { showByType("草"); }
document.querySelector("#allButton").addEventListener("click", showAll);
document.querySelector("#fireButton").addEventListener("click", showFire);
document.querySelector("#waterButton").addEventListener("click", showWater);
document.querySelector("#grassButton").addEventListener("click", showGrass);
