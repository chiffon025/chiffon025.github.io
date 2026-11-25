// HTML要素の取得
let areaSelect = document.getElementById("area-select");
let coldestInfo = document.getElementById("coldest-info");
let chartCanvas = document.getElementById("temp-chart");

// グラフのインスタンスを保持する変数（描き直し用）
let tempChart = null;

// 日付文字列（例: "2026-11-26T00:00:00+09:00"）を「11/26(木)」形式に変換する関数
function formatDate(dateString) {
  let dateObj = new Date(dateString);
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  let week = weekDays[dateObj.getDay()];
  return month + "/" + day + "(" + week + ")";
}

// 気象庁のJSONデータを取得して画面を更新する関数
function fetchWeatherAndDraw(areaCode) {
  let url = "https://www.jma.go.jp/bosai/forecast/data/forecast/" + areaCode + ".json";
  coldestInfo.textContent = "データを読み込み中...";

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("通信エラーが発生しました");
      }
      return response.json();
    })
    .then(function (data) {
      // data[1] に週間天気予報が入っている
      let weeklyForecast = data[1];
      let timeSeriesList = weeklyForecast.timeSeries;

      // 気温データ（tempsMin / tempsMax）を持つ要素を探す
      let tempSeries = null;
      for (let i = 0; i < timeSeriesList.length; i++) {
        if (timeSeriesList[i].areas[0].tempsMin !== undefined) {
          tempSeries = timeSeriesList[i];
          break;
        }
      }

      let timeDefines = tempSeries.timeDefines;
      let areaData = tempSeries.areas[0];
      let tempsMinRaw = areaData.tempsMin;
      let tempsMaxRaw = areaData.tempsMax;

      let labels = [];
      let minTemps = [];
      let maxTemps = [];

      // グラフ用の配列に整形（空文字 "" の場合は null にする）
      for (let i = 0; i < timeDefines.length; i++) {
        labels.push(formatDate(timeDefines[i]));

        if (tempsMinRaw[i] === "" || tempsMinRaw[i] === undefined) {
          minTemps.push(null);
        } else {
          minTemps.push(Number(tempsMinRaw[i]));
        }

        if (tempsMaxRaw[i] === "" || tempsMaxRaw[i] === undefined) {
          maxTemps.push(null);
        } else {
          maxTemps.push(Number(tempsMaxRaw[i]));
        }
      }

      // いちばん寒い日（最低気温が最も低い日）を探す
      updateColdestDay(labels, minTemps, areaData.area.name);

      // グラフを描画（すでにある場合は破棄して描き直し）
      drawChart(labels, maxTemps, minTemps);
    })
    .catch(function (error) {
      console.error(error);
      coldestInfo.textContent = "天気データの取得に失敗しました。";
    });
}

// いちばん寒い日を判定して文字で表示する関数
function updateColdestDay(labels, minTemps, areaName) {
  let lowestTemp = null;
  let coldestDayLabel = "";

  for (let i = 0; i < minTemps.length; i++) {
    let currentMin = minTemps[i];
    if (currentMin !== null) {
      if (lowestTemp === null || currentMin < lowestTemp) {
        lowestTemp = currentMin;
        coldestDayLabel = labels[i];
      }
    }
  }

  if (lowestTemp !== null) {
    coldestInfo.textContent =
      areaName + "でいちばん寒い日は " + coldestDayLabel + "（最低気温 " + lowestTemp + "℃）です！";
  } else {
    coldestInfo.textContent = "最低気温のデータがありません。";
  }
}

// Chart.js で折れ線グラフを描画する関数
function drawChart(labels, maxTemps, minTemps) {
  // すでにグラフが作られていたら一度削除する
  if (tempChart !== null) {
    tempChart.destroy();
  }

  tempChart = new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "最高気温 (℃)",
          data: maxTemps,
          borderColor: "#dc3545",
          backgroundColor: "#dc3545",
          tension: 0.2,
          spanGaps: true
        },
        {
          label: "最低気温 (℃)",
          data: minTemps,
          borderColor: "#0d6efd",
          backgroundColor: "#0d6efd",
          tension: 0.2,
          spanGaps: true
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
            text: "気温 (℃)"
          }
        }
      }
    }
  });
}

// セレクトボックスが変更されたときのイベント
areaSelect.addEventListener("change", function () {
  let selectedCode = areaSelect.value;
  fetchWeatherAndDraw(selectedCode);
});

// ページを開いたときに初期選択（東京）のデータを読み込む
fetchWeatherAndDraw(areaSelect.value);