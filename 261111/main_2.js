console.log(characters);

characters.sort(function(a, b) {
    return b.attack - a.attack;
});

for (let i = 0; i < characters.length; i++) {
    let character = characters[i];
    console.log(`${character.name}の攻撃力は${character.attack}`);
}

console.log("--------------------");

characters.sort(function(a, b) {
    return a.attack - b.attack;
});

for (let i = 0; i < characters.length; i++) {
    let character = characters[i];
    console.log(`${character.name}の攻撃力は${character.attack}`);
}

console.log("--------------------");
function showByType() {
characters.sort(function(a, b) {
    return a.rarity - b.rarity;
});
    for (let i = 0; i < characters.length; i++) {
        let character = characters[i];
        let imageTag = `<img src="${character.image}" width="80">`;
        
            characterList.innerHTML += `<li>${character.name}の攻撃力は${character.attack}</li>`;
        
    }
}

for (let i = 0; i < characters.length; i++) {
    let character = characters[i];
    console.log(`${character.name}のレアリティは ${character.rarity}`);
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

characters.sort(function(a, b) {
    return a.rarity - b.rarity;
});


document.querySelector("#waterButton").addEventListener("click", showByType);