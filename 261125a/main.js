
// HTMLの要素を取得する
let zipcode = document.getElementById("zipcode");
let searchButton = document.getElementById("searchButton");
let message = document.getElementById("message");

let prefecture = document.getElementById("prefecture");
let city = document.getElementById("city");
let town = document.getElementById("town");
let address = document.getElementById("address");


// 住所検索ボタンを押したときの処理
searchButton.addEventListener("click", function() {

    // 入力された郵便番号を取得
    let postalCode = zipcode.value;
    // 前後の空白を取り除く
    postalCode = postalCode.trim();

    // 未入力か確認
    if (postalCode === "") {
        message.textContent = "郵便番号を入力してください。";
        message.classList.add("message-error");
        return;
    }

    // ハイフンを取り除く
    postalCode = postalCode.replace(/-/g, "");

    // 住所欄を一度空にする
    let addressFields = [prefecture, city, town];

    for (let i = 0; i < addressFields.length; i++) {
        addressFields[i].value = "";
    }

    // メッセージをリセット
    message.textContent = "";
    message.className = "mb-4";

    // 郵便番号が半角数字7桁か確認
    if (!/^\d{7}$/.test(postalCode)) {
        message.textContent = "郵便番号は半角数字7桁で入力してください。";
        message.classList.add("message-error");
        return;
    }
    // APIのURLを作成
    let url = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + postalCode;

    // APIにアクセスする
    fetch(url)

        // 返ってきたデータをJSONに変換
        .then(function(response) {
            if (!response.ok) {
                throw new Error("通信に失敗しました。");
            }
            return response.json();
        })

        // 取得した住所データを使う
        .then(function(data) {

            // 住所が見つからなかった場合
            if (data.results === null || data.results.length === 0) {
                message.textContent = "住所が見つかりませんでした。郵便番号を確認してください。";
                message.classList.add("message-error");
                return;
            }

            // 検索結果の最初の住所を取得
            let result = data.results[0];

            // 住所を入力欄に入れる
            prefecture.value = result.address1;
            city.value = result.address2;
            town.value = result.address3;

            // 成功メッセージを表示
            message.textContent = "住所が見つかりました！";
            message.classList.add("message-success");

        })

        // 通信エラーなどが起きた場合
        .catch(function(error) {
            message.textContent = "通信に失敗しました。時間をおいて再度お試しください。";
            message.classList.add("message-error");
            console.log(error);
        });

});
