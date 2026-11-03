let omikiujis = [{image:"image/radhitto.png", name:"ラディット吉"},
{image:"image/usakichi.png", name:"うさ吉"},
{image:"image/katsura.png", name:"カツラ吉"},
{image:"image/pyonpyon.png", name:"ぴょんぴょん吉"},
{image:"image/mogumogu.png", name:"もぐもぐ吉"},
{image:"image/nonbiri.png", name:"のんびり吉"},
{image:"image/suyasuya.png", name:"すやすや吉"},
{image:"image/urara.png", name:"うらら吉"}];

function pickOne() {
    let n = Math.floor(Math.random() * omikiujis.length);
    return omikiujis[n];
}

function AddCount() {
    let countElement = document.querySelector("#count");
    currentCount++;
    countElement.textContent = `引いた回数: ${currentCount}`;
}

let pickOneBtn = document.querySelector("#pickOne");
let title = document.querySelector("h2");
let omikujiImage = document.querySelector("#omikujiImage");
let currentCount = 0;

pickOneBtn.addEventListener("click", function() {
    let result = pickOne();
    omikujiImage.src = result.image;
    title.textContent = result.name;
    AddCount();
    if (title.textContent === "ラディット吉") {
    title.style.color = "red";
}
else{
    title.style.color = "black";
}
});


