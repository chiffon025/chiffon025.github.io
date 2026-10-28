function changeTitle() {
    let title = document.querySelector("h1");
    title.textContent = "ボタン1が押された――";  
}

function changeTitle2() {
    let title = document.querySelector("h1");
    title.textContent = "ボタン2が押された――";  
}

function addNum(){
    let title = document.querySelector("h1");
    //title.textContent = parseInt(title.textContent) + 1;
    count++;
    title.textContent = count;
}

let btn = document.querySelector("#btn");
btn.addEventListener("click", changeTitle);

let btn2 = document.querySelector("#btn2");
btn2.addEventListener("click", changeTitle2);

let count = 0;
let btn3 = document.querySelector("#btn3");
btn3.addEventListener("click", addNum);


console.log("------------------");

for (let i = 1; i <= 10; i++) {
    console.log(i);
}

console.log("------------------");

let sum = 0;
for (let i = 1; i <= 100; i++){
    sum = sum + i;
}
console.log(sum);

console.log("------------------");

for (let i = 5; i <= 50; i =i + 5) {
    console.log(i);
}

console.log("------------------");

for(let i = 1; i <=30; i++){
    if(i % 3 === 0 && i % 5 === 0){
        console.log("FizzBuzz");
    }
    else if(i % 3 === 0){
        console.log("Fizz");
    }
    else if(i % 5 === 0){
        console.log("Buzz");
    }
    else{
        console.log(i);
    }
}

console.log("------------------");

let favalites = ["ピカチュウ", "エース", "レトルト", "M!LK", "牛沢"];
for (let i = 0; i < favalites.length; i++) {
    console.log(`${i}番目は${favalites[i]}`);
}

console.log("------------------");

let testScores = ["72", "85", "64", "90", "58"];
let sum2 = 0;
for (let i = 0; i < testScores.length; i++) {
    sum2 += +testScores[i];
}
console.log(`合計点: ${sum2}`);
console.log(`平均点: ${sum2 / testScores.length}`);

console.log("------------------");

function pickOne() {
    let title = document.querySelector("h1");
    let n = Math.floor(Math.random() * favalites.length);
    title.textContent = favalites[n];
}

let pickOneBtn = document.querySelector("#pickOne");
pickOneBtn.addEventListener("click", pickOne);
