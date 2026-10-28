

let favalites = ["ピカチュウ", "エース", "レトルト", "M!LK", "牛沢"];
for (let i = 0; i < favalites.length; i++) {
    console.log(`${i}番目は${favalites[i]}`);
}


function pickOne() {
    let title = document.querySelector("h1");
    let n = Math.floor(Math.random() * favalites.length);
    title.textContent = favalites[n];
}

let pickOneBtn = document.querySelector("#pickOne");
pickOneBtn.addEventListener("click", pickOne);
