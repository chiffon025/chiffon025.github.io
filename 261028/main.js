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