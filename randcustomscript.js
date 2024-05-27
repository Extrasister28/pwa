document.addEventListener('DOMContentLoaded', function() {
    // 画像パスを生成する関数
    function generateImageArray(basePath, count) {
        const arr = [];
        for (let i = 1; i <= count; i++) {
            arr.push({ src: `${basePath}${i}.png`, selected: true });
        }
        return arr;
    }

    // 配列を生成
    const characters = generateImageArray('./image/mariokartchara/character', 52);
    const karts = generateImageArray('./image/mariokartmachine/kart', 41);
    const tires = generateImageArray('./image/mariokarttire/tire', 22);
    const gliders = generateImageArray('./image/mariokartglider/glider', 15);

    // キャラクター名の配列
    const characterNames = ["マリオ", "ルイージ", "ピーチ", "デイジー", "ロゼッタ", "タヌキマリオ", "ネコピーチ", "キャサリン", "ヨッシー", "キノピオ", "ノコノコ", "ヘイホー", "ジュゲム", "キノピコ", "キングテレサ", "ボスパックン", "ベビィマリオ", "ベビィルイージ", "ベビィピーチ", "ベビィデイジー", "ベビィロゼッタ", "メタルマリオ", "ピンクゴールドピーチ", "ハナチャン", "ワリオ", "ワルイージ", "ドンキーコング", "クッパ", "カロン", "クッパJr.", "ほねクッパ", "カメック", "レミー", "ラリー", "ウェンディ", "ルドウィッグ", "イギー", "ロイ", "モートン", "キノピーチ", "インクリング", "むらびと", "しずえ", "リンク", "ディディーコング", "ファンキーコング", "ポリーン", "軽量Mii", "中量Mii", "重量Mii"];

    // カート名の配列
    const kartNames = ["カート1", "カート2", /* 他のカート名 */];

    // タイヤ名の配列
    const tireNames = ["タイヤ1", "タイヤ2", /* 他のタイヤ名 */];

    // グライダー名の配列
    const gliderNames = ["グライダー1", "グライダー2", /* 他のグライダー名 */];

    function createOptionHTML(item, group, names) {
        const name = names[item.src - 1] || 'No name'; //インデックスを調整
        return `
            <div class="option-item">
                <img src="${item.src}" alt="${group}">
                <p class="name">${name}</p>
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

        // 全体のグループのON/OFFボタンにイベントリスナーを追加する
        document.querySelectorAll('.toggle-all-button').forEach(button => {
            button.addEventListener('click', function() {
                const group = this.getAttribute('data-group');
                const items = { characters, karts, tires, gliders }[group];
                const allSelected = items.every(item => item.selected);
                items.forEach(item => item.selected = !allSelected);
                document.querySelectorAll(`.toggle-button[data-group="${group}"]`).forEach(button => {
                    button.textContent = !allSelected ? 'ON' : 'OFF';
                });
            });
        });
    }

    function getRandomItem(items) {
        if (!items) return null;
        const filteredItems = items.filter(item => item.selected);
        if (filteredItems.length === 0) return null;
        return filteredItems[Math.floor(Math.random() * filteredItems.length)].src;
    }

    function setButtonsDisabled(disabled) {
        document.querySelectorAll('.toggle-button').forEach(button => {
            button.disabled = disabled;
        });
        document.querySelectorAll('.toggle-all-button').forEach(button => {
            button.disabled = disabled;
        });
        document.getElementById('toggle-all-button').disabled = disabled;
        document.getElementById('random-button').disabled = disabled; // ランダムボタンも無効化
    }

    function validateSelections() {
    const groups = { characters, karts, tires, gliders };
    for (const groupName in groups) {
        const items = groups[groupName];
        if (items.every(item => !item.selected)) {
            const japaneseGroupName = {
                characters: 'キャラクター',
                karts: 'カート',
                tires: 'タイヤ',
                gliders: 'グライダー'
            }[groupName];
            alert(`エラー: ${japaneseGroupName}が選択されていません。少なくとも1つの項目を選択してください。`);
            return false;
        }
    }
    return true;
}



    function startRoulette() {
        if (!validateSelections()) return; // すべてのグループに少なくとも1つの選択があることを確認

        const displayTime = 100; // 各画像が表示される時間（ミリ秒）
        const stopIntervals = [1000, 1500, 2000, 2500]; // 各画像が停止するまでの時間（ミリ秒）

        const elements = [
            { id: 'character-image', items: characters },
            { id: 'kart-image', items: karts },
            { id: 'tire-image', items: tires },
            { id: 'glider-image', items: gliders }
        ];

        setButtonsDisabled(true); // ボタンを無効化

        elements.forEach((element, index) => {
            let intervalId = setInterval(() => {
                const randomSrc = getRandomItem(element.items);
                document.getElementById(element.id).innerHTML = randomSrc ? `<img src="${randomSrc}" alt="${element.id.split('-')[0]}">` : 'No selection';
            }, displayTime);

            setTimeout(() => {
                clearInterval(intervalId);
                const finalSrc = getRandomItem(element.items);
                document.getElementById(element.id).innerHTML = finalSrc ? `<img src="${finalSrc}" alt="${element.id.split('-')[0]}">` : 'No selection';
                
                if (index === elements.length - 1) {
                    setButtonsDisabled(false); // すべてのルーレットが停止したらボタンを有効化
                }
            }, stopIntervals[index]);
        });
    }

    document.getElementById('random-button').addEventListener('click', startRoulette);

    document.getElementById('toggle-all-button').addEventListener('click', function() {
        const allGroups = [characters, karts, tires, gliders];
        const allSelected = allGroups.every(group => group.every(item => item.selected));
        allGroups.forEach(group => group.forEach(item => item.selected = !allSelected));
        document.querySelectorAll('.toggle-button').forEach(button => {
            button.textContent = !allSelected ? 'ON' : 'OFF';
        });
    });

    renderOptions();
});
