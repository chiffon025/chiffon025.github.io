let omikiujis = [{image:"image/radhitto.png", name:`ラディット吉`},
{image:"image/usakichi.png", name:`うさ吉`},
{image:"image/katsura.png", name:`カツラ吉`},
{image:"image/pyonpyon.png", name:`ぴょんぴょん吉`},
{image:"image/mogumogu.png", name:`もぐもぐ吉`},
{image:"image/nonbiri.png", name:`のんびり吉`},
{image:"image/suyasuya.png", name:`すやすや吉`},
{image:"image/urara.png", name:`うらら吉`}];

function pickOne() {
    let n = Math.floor(Math.random() * omikiujis.length);
    return omikiujis[n];
}

let pickOneBtn = document.querySelector("#pickOne");
let title = document.querySelector("h2");
let omikujiImage = document.querySelector("#omikujiImage");

pickOneBtn.addEventListener("click", function() {
    let result = pickOne();
    omikujiImage.src = result.image;
    title.textContent = result.name;
});
