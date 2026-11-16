console.log(characters);

characters.sort(function(a, b) {
    return b.attack - a.attack;
});

for (let i = 0; i < characters.length; i++) {
    let character = characters[i];
    console.log(`${character.name}の攻撃力は${character.attack}`);
}

console.log("--------------------");

let sortedCharacters = characters.slice();
sortedCharacters.sort(function(a, b) {
    return a.attack - b.attack;
});

for (let i = 0; i < characters.length; i++) {
    let character = characters[i];
    console.log(`${character.name}のレアリティは ${character.rarity}`);
}

for (let i = 0; i < sortedCharacters.length; i++) {
    let character = sortedCharacters[i];
    console.log(`${character.name}の攻撃力は ${character.attack}`);
}

console.log("--------------------");

function showByType(type) {
    characters.sort(function(a, b) {
        return a.rarity - b.rarity;
    });

    characterList.innerHTML = "";
    characters.forEach((character) =>{
        let imageTag = `<img src="${character.image}" width="80">`;
        if (type === "すべて" || character.type === type) {
        characterList.innerHTML += `<li>${imageTag} <br>${character.emoji} ${character.name}</li>`;
        }
    })
}

let typetabs = document.querySelectorAll("#type-tab");
typetabs.forEach(function(tab) {
    tab.addEventListener("click", () => {
        showByType(tab.textContent);
    });
});
