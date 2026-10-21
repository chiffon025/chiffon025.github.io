let name = "まつおかひとみ";
let num = 25;
console.log(name);
console.log(num);

num = 30;
console.log(num);

console.log(typeof 123);
console.log(typeof "123");

let x;
console.log(x);

function welcome(name) {
  console.log(name + "さん、ようこそ");
}

welcome("はなこ");
welcome("たろう");
welcome("じろう");

function welcome2(name, favorite) {
  console.log(name + "さんの好きな食べ物は" + favorite + "です");
}

welcome2("はなこ", "すし");
welcome2("たろう", "ラーメン");
welcome2("じろう", "ピザ");

welcome();
welcome2();

console.log("------------------");

function multiply(a, b) {
  return a * b;
}
function splitBill(a, b) {
  return Math.ceil(a / b);
}
console.log(multiply(3, 4));
console.log(splitBill(1000, 3));

