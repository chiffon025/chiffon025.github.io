console.log(characters.length);

let selectedType = "すべて"; // 選んでいるタブ
let searchWord = ""; // 検索欄の文字
let selectedSort = "default";
let favoriteCharacters = []; // お気に入りのキャラを集める

function render(){
    let visibleCharacters = []; // 表示するキャラを集める
    //let defultfav = favoriteCharacters.slice();
    characterList.innerHTML = "";
    characters.forEach((character) => {
        let matchesType = selectedType === "すべて" || character.type === selectedType;
        let matchesWord = character.name.includes(searchWord) 
        if (matchesType && matchesWord) {
            visibleCharacters.push(character);
        }
    });  


    if(selectedSort === "attackHigh") {
        visibleCharacters.sort((a, b) => b.attack - a.attack);
        favoriteCharacters.sort((a, b) => b.attack - a.attack);
    }else if(selectedSort === "attackLow") {
        visibleCharacters.sort((a, b) => a.attack - b.attack);
        favoriteCharacters.sort((a, b) => a.attack - b.attack);
    }else if(selectedSort === "rarityHigh"){
        visibleCharacters.sort((a, b) => b.rarity - a.rarity);
        favoriteCharacters.sort((a, b) => b.rarity - a.rarity);
    }
    
    typeTabs.forEach((tab) => {
        if(tab.textContent === selectedType) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });    

    if(selectedType === "おきにいり") {
        let favDisplayCount = 0;
        favoriteCharacters.forEach((character) => {
            let matchesWord = character.name.includes(searchWord);          
            if(matchesWord){
                favDisplayCount += 1;
                let rarityStar = "";
                for(let i = 0; i < character.rarity; i++) {
                    rarityStar += "⭐";
                }
                let favoriteClass;          
                if(favoriteCharacters.includes(character)){
                    favoriteClass = "favorited";
                }else{
                    favoriteClass = "";
                }
            
                let imageTag = `<img src="${character.image}" width="100">`;
                characterList.innerHTML += 
                `<li class="col-md-3 col-sm-4 col-6">
                <div class="card" data-type="${character.type}"> 
                <div class="card-body">
                    ${imageTag} <button class="favorite-button ${favoriteClass}" data-name = "${character.name}">♡</button><br>
                <p class="card-text">
                    ${character.emoji} ${character.name} <br>
                    ${character.type}/ 攻撃力 ${character.attack} <br>
                    ${rarityStar}
                </p>
                </div>
                </div>
                </li>`; 
            }
        });

            let favoriteButtons = document.querySelectorAll(".favorite-button");
            favoriteButtons.forEach((button) => {
                let favoriteChara = characters.find((character)=> character.name === button.dataset.name)
                button.addEventListener("click", () => {
                    button.classList.toggle("favorited");
                if (button.classList.contains("favorited")) {
                    if(!favoriteCharacters.includes(favoriteChara)){
                        favoriteCharacters.push(favoriteChara);        
                    }
                }else {
                    let num = favoriteCharacters.indexOf(favoriteChara)
                    favoriteCharacters.splice(num,1);
                    render();
                    }
                });
                
            });

        if( favDisplayCount === 0 ) {
            characterList.innerHTML = "<li>キャラクターが見つかりません</li>";
            }
        let displayCount = document.querySelector("#displayCount");
        displayCount.textContent = favDisplayCount; 
    }else{ 
        visibleCharacters.forEach((character) => {
            let rarityStar = "";
            for(let i = 0; i < character.rarity; i++) {
                rarityStar += "⭐";
            }
            let favoriteClass;          
            if(favoriteCharacters.includes(character)){
                favoriteClass = "favorited";
            }else{
                favoriteClass = "";
            }
            let imageTag = `<img src="${character.image}" width="100">`;
            characterList.innerHTML += 
            `<li class="col-md-3 col-sm-4 col-6">
            <div class="card" data-type="${character.type}">
            <div class="card-body">
                ${imageTag} <button class="favorite-button ${favoriteClass}" data-name="${character.name}">♡</button><br>
            <p class="card-text">
                ${character.emoji} ${character.name} <br>
                ${character.type}/ 攻撃力 ${character.attack} <br>
                ${rarityStar}
            </p>
            </div>
            </div>
            </li>`;            
        });   
         
         let favoriteButtons = document.querySelectorAll(".favorite-button");
            favoriteButtons.forEach((button) => {
                let favoriteChara = characters.find((character) => character.name === button.dataset.name);
                button.addEventListener("click", () => {
                    button.classList.toggle("favorited");
                    if (button.classList.contains("favorited")) {
                        if(!favoriteCharacters.includes(favoriteChara)){
                        favoriteCharacters.push(favoriteChara);        
                        }
                    }else {
                            let num = favoriteCharacters.indexOf(favoriteChara)
                            favoriteCharacters.splice(num,1);
                        }
                });
            });

        if(visibleCharacters.length === 0 ) {
        characterList.innerHTML = "<li>キャラクターが見つかりません</li>";
        }
        let displayCount = document.querySelector("#displayCount");
        displayCount.textContent = visibleCharacters.length;
    }   
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


let searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input",() =>{
    searchWord = searchInput.value;
    render();
});

render();