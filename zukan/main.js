console.log(characters.length);

let selectedType = "すべて"; // 選んでいるタブ
let searchWord = ""; // 検索欄の文字
let selectedSort = "default";
let favoriteCharacters = []; // お気に入りのキャラを集める

function render(){
    let visibleCharacters = []; // 表示するキャラを集める
    characterList.innerHTML = "";
    characters.forEach((character) => {
        let matchesType = selectedType === "すべて" || character.type === selectedType;
        let matchesWord = character.name.includes(searchWord);  
        if (matchesType && matchesWord) {
            visibleCharacters.push(character);
        }
    });  

    if(selectedSort === "attackHigh") {
        visibleCharacters.sort((a, b) => b.attack - a.attack);
    }else if(selectedSort === "attackLow") {
        visibleCharacters.sort((a, b) => a.attack - b.attack);
    }
    
    typeTabs.forEach((tab) => {
        if(tab.textContent === selectedType) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });    


    
    visibleCharacters.forEach((character) => {
        let rarityStar = "";
        for(let i = 0; i < character.rarity; i++) {
            rarityStar += "★";
        }
        let imageTag = `<img src="${character.image}" width="80">`;
        characterList.innerHTML += 
        `<li class="col-md-3 col-sm-4 col-6">
        <div class="card">
        <div class="card-body">
            ${imageTag} <button class="favorite-button">♡</button><br>
        <p class="card-text">
            ${character.emoji} ${character.name} <br>
            ${character.type}/ 攻撃力 ${character.attack} <br>
            ${rarityStar}
        </p>
        </div>
        </div>
        </li>`;   
             
        let favoriteButtons = document.querySelectorAll(".favorite-button");
        favoriteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                button.classList.toggle("favorited");
                if (button.classList.contains("favorited")) {
                    favoriteCharacters.push(character);
                }

            });
        });
    });

    



    if(visibleCharacters.length === 0) {
        characterList.innerHTML = "<li>キャラクターが見つかりません</li>";
    }
    let displayCount = document.querySelector("#displayCount");
    displayCount.textContent = visibleCharacters.length;
};


let typeTabs = document.querySelectorAll(".type-tab");
typeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        selectedType = tab.textContent;
        render();
    });
});


let sortSelect = document.querySelector("#sortSelect");
sortSelect.addEventListener("change", () => {
    console.log(sortSelect.value);
    selectedSort = sortSelect.value;
    render();
});

