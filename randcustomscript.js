document.addEventListener('DOMContentLoaded', function() {
    // 画像パスを生成する関数
    function generateImageArray(basePath, count) {
        const arr = [];
        for (let i = 1; i <= count; i++) {
            arr.push({ src: `${basePath}${i}.png`, selected: true });
        }
        return arr;
    }

    // 名前を定義するオブジェクト
    const characterNames = [
        "キャラクター1",
        "キャラクター2",
        // 他のキャラクター名を追加
    ];

    const kartNames = [
        "カート1",
        "カート2",
        // 他のカート名を追加
    ];

    const tireNames = [
        "タイヤ1",
        "タイヤ2",
        // 他のタイヤ名を追加
    ];

    const gliderNames = [
        "グライダー1",
        "グライダー2",
        // 他のグライダー名を追加
    ];

    // 配列を生成
    const characters = generateImageArray('./image/mariokartchara/character', 52);
    const karts = generateImageArray('./image/mariokartmachine/kart', 41);
    const tires = generateImageArray('./image/mariokarttire/tire', 22);
    const gliders = generateImageArray('./image/mariokartglider/glider', 15);

    function createOptionHTML(item, group) {
        return `
            <div class="option-item">
                <img src="${item.src}" alt="${group}">
                <div class="name">${item.name}</div> <!-- 名前を表示 -->
                <button class="toggle-button" data-group="${group}" data-src="${item.src}">
                    ${item.selected ? 'ON' : 'OFF'}
                </button>
            </div>
        `;
    }

    function renderOptions() {
        const characterOptions = characters.map(item => createOptionHTML(item, 'characters')).join('');
        document.getElementById('character-options').innerHTML += characterOptions;

        const kartOptions = karts.map(item => createOptionHTML(item, 'karts')).join('');
        document.getElementById('kart-options').innerHTML += kartOptions;

        const tireOptions = tires.map(item => createOptionHTML(item, 'tires')).join('');
        document.getElementById('tire-options').innerHTML += tireOptions;

        const gliderOptions = gliders.map(item => createOptionHTML(item, 'gliders')).join('');
        document.getElementById('glider-options').innerHTML += gliderOptions;

        // オプションボタンにイベントリスナーを追加する
        document.querySelectorAll('.toggle-button').forEach(button => {
            button.addEventListener('click', function() {
                const group = this.getAttribute('data-group');
                const src = this.getAttribute('data-src');
                const items = { characters, karts, tires, gliders }[group];
                const item = items.find(item => item.src === src);
                item.selected = !item.selected;
                this.textContent = item.selected ? 'ON' : 'OFF';
            });
        });
    }

    renderOptions();
});
