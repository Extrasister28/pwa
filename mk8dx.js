// 条件リストの配列を初期化
const conditionList = Array.from({ length: 96 }, (_, i) => i + 1);

function botanClick(){
    const imageArea = document.getElementById('randimageArea');
    if (conditionList.length === 0) {
        alert("表示できる画像がありません。");
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
