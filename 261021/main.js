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

console.log("------------------");

function jugdeAge(age) {
  let result;
  if (age <= 0) {
    result = "エラー";
    //console.log(`${age}歳はエラーです`);
  } else if (age < 18) {
    result = "未成年";
    //console.log(`${age}歳は未成年です`);
  } else if (age >= 65) {
    result = "高齢者";
    //console.log(`${age}歳は高齢者です`);
  } else {
    result = "成人";
    //console.log(`${age}歳は成人です`);
  }
  console.log(`${age}歳は${result}です`);
}

jugdeAge(25);
jugdeAge(15);
jugdeAge(0);
jugdeAge(70);

console.log("------------------");

function jugdeYear(year) {
  if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
    console.log("366日");
  } else if (year % 4 === 0) {
    console.log("366日");
  } else {
    console.log("365日");
  }
}
jugdeYear(2020);
jugdeYear(2000);
jugdeYear(1989);
