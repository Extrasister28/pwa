// 条件リストの配列を初期化
let conditionList = Array.from({ length: 96 }, (_, i) => i + 1);

function botanClick(){
    const imageArea = document.getElementById('randimageArea');
    if (conditionList.length === 0) {
        alert("１つ以上の条件を指定してください。");
        return;
    }
    const randomIndex = Math.floor(Math.random() * conditionList.length);
    const imageId = conditionList[randomIndex];
    imageArea.src = `./image/mariokartcourse/${imageId}.jpg`;
}

let button = document.getElementById('randbtn');

// addEventListener( 'イベント', 処理)で要素にイベントが発火した際に処理を実行する
button.addEventListener('click', botanClick);

document.addEventListener("DOMContentLoaded", function() {
    // 全てのボタンを取得
    const buttons = document.querySelectorAll(".toggle-button");

    // 各ボタンにクリックイベントリスナーを追加
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            // ボタンのテキストを切り替え
            const id = parseInt(button.dataset.id, 10);
            if (button.textContent === "ON") {
                button.textContent = "OFF";
                // 条件リストから要素を削除
                conditionList = conditionList.filter(item => item !== id);
            } else {
                button.textContent = "ON";
                // 条件リストに要素を追加
                if (!conditionList.includes(id)) {
                    conditionList.push(id);
                }
            }
            console.log("現在の条件リスト:", conditionList);
        });
    });

    // すべてONボタンにクリックイベントを追加
    document.getElementById('allOnBtn').addEventListener('click', function() {
        buttons.forEach(button => {
            button.textContent = "ON";
            const id = parseInt(button.dataset.id, 10);
            if (!conditionList.includes(id)) {
                conditionList.push(id);
            }
        });
        console.log("全てのボタンをONにしました。");
    });

    // すべてOFFボタンにクリックイベントを追加
    document.getElementById('allOffBtn').addEventListener('click', function() {
        buttons.forEach(button => {
            button.textContent = "OFF";
            const id = parseInt(button.dataset.id, 10);
            conditionList = conditionList.filter(item => item !== id);
        });
        console.log("全てのボタンをOFFにしました。");
    });
});

// カップ全てON/OFFボタンにクリックイベントを追加
    const cupButtons = document.querySelectorAll('.cup-button');
    cupButtons.forEach(cupButton => {
        cupButton.addEventListener('click', function() {
            const cupId = parseInt(cupButton.dataset.cupId, 10);
            const startCourseId = (cupId - 1) * 4 + 1;
            const endCourseId = cupId * 4;

            for (let id = startCourseId; id <= endCourseId; id++) {
                const courseButton = document.querySelector(`.toggle-button[data-id='${id}']`);
                if (courseButton.textContent === "ON") {
                    courseButton.textContent = "OFF";
                    conditionList = conditionList.filter(item => item !== id);
                } else {
                    courseButton.textContent = "ON";
                    if (!conditionList.includes(id)) {
                        conditionList.push(id);
                    }
                }
            }
            console.log(`カップ${cupId}に対応するコースを全て切り替えました。`);
        });
    });
