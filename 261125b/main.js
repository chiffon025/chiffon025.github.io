
// HTMLの要素を取得
let areaSelect = document.getElementById("areaSelect");
let coldestDay = document.getElementById("coldestDay");
let ctx = document.getElementById("temperatureChart");

// グラフを管理する変数
let chartInstance = null;


// 気温データを取得する関数
function getWeather() {

    // 選択されている地域コードを取得
    let areaCode = areaSelect.value;

    // 気象庁のJSON URLを作る
    let url = "https://www.jma.go.jp/bosai/forecast/data/forecast/"
        + areaCode + ".json";

    coldestDay.textContent = "データを取得しています...";

    // fetchでデータを取得
    fetch(url)

        .then(function(response) {

            // 通信に失敗した場合
            if (!response.ok) {
                throw new Error("データを取得できませんでした");
            }

            return response.json();

        })

        .then(function(data) {

            // 週間予報のデータを取得
            let weeklyData = data[1].timeSeries[1];

            // 日付を取得
            let dates = weeklyData.timeDefines;

            // 気温データがある地域を探す
            let temperatureArea = null;

            for (let i = 0; i < weeklyData.areas.length; i++) {

                if (
                    weeklyData.areas[i].tempsMin &&
                    weeklyData.areas[i].tempsMax
                ) {
                    temperatureArea = weeklyData.areas[i];
                    break;
                }

            }

            // 気温データが見つからない場合
            if (temperatureArea === null) {
                throw new Error("気温データがありません");
            }

            // 最高気温と最低気温を取得
            let maxTemps = temperatureArea.tempsMax;
            let minTemps = temperatureArea.tempsMin;

            // グラフに使う配列
            let labels = [];
            let maxData = [];
            let minData = [];

            // 一番寒い日を記録する変数
            let lowestTemp = Infinity;
            let lowestDate = "";

            // 7日分のデータを確認
            for (let i = 0; i < dates.length; i++) {

                // 気温が空欄の場合はnullにする
                let max = maxTemps[i] === ""
                    ? null : Number(maxTemps[i]);

                let min = minTemps[i] === ""
                    ? null : Number(minTemps[i]);

                // 最高・最低ともにデータがない日は飛ばす
                if (max === null && min === null) {
                    continue;
                }

                // 日付を表示用に変換
                let date = new Date(dates[i]);

                let day = date.getMonth() + 1
                    + "/" + date.getDate()
                    + " (" + ["日", "月", "火", "水", "木", "金", "土"][date.getDay()] + ")";

                labels.push(day);

                // 気温を配列に追加
                maxData.push(max);
                minData.push(min);

                // 最低気温を比較
                if (min !== null && min < lowestTemp) {

                    lowestTemp = min;
                    lowestDate = day;

                }

            }

            // データがない場合
            if (labels.length === 0) {
                throw new Error("表示できる気温データがありません");
            }

            // グラフを描画
            drawChart(labels, maxData, minData);

            // 最も寒い日を表示
            if (lowestTemp !== Infinity) {

                coldestDay.textContent =
                    lowestDate + "：最低気温 " + lowestTemp + "℃";

            } else {

                coldestDay.textContent =
                    "最低気温のデータがありません";

            }

        })

        .catch(function(error) {

            console.error(error);

            coldestDay.textContent =
                "データの取得に失敗しました。時間をおいて再度お試しください。";

        });

}


// グラフを描画する関数
function drawChart(labels, maxData, minData) {

    // 以前のグラフがあればデータを更新
    if (chartInstance !== null) {

        chartInstance.data.labels = labels;

        chartInstance.data.datasets[0].data = maxData;
        chartInstance.data.datasets[1].data = minData;

        chartInstance.update();

    } else {

        // 初めての場合は新しくグラフを作る
        chartInstance = new Chart(ctx, {

            type: "line",

            data: {

                labels: labels,

                datasets: [

                    {
                        label: "最高気温",
                        data: maxData,
                        borderColor: "#ef767a",
                        backgroundColor: "#ef767a",
                        tension: 0.3,
                        spanGaps: false
                    },

                    {
                        label: "最低気温",
                        data: minData,
                        borderColor: "#5599d5",
                        backgroundColor: "#5599d5",
                        tension: 0.3,
                        spanGaps: false
                    }

                ]

            },

            options: {

                responsive: true,
                maintainAspectRatio: false,

                scales: {

                    y: {

                        title: {
                            display: true,
                            text: "気温（℃）"
                        }

                    }

                }

            }

        });

    }

}


// 地域が変更されたらデータを取得
areaSelect.addEventListener("change", function() {

    getWeather();

});


// 最初に東京のデータを取得
getWeather();
