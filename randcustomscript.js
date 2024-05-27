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

    const characterNames = ["マリオ", "ルイージ", "ピーチ", "デイジー", "ロゼッタ", "タヌキマリオ", "ネコピーチ", "キャサリン", "ヨッシー", "キノピオ", "ノコノコ", "ヘイホー", "ジュゲム", "キノピコ", "キングテレサ", "ボスパックン", "ベビィマリオ", "ベビィルイージ", "ベビィピーチ", "ベビィデイジー", "ベビィロゼッタ", "メタルマリオ", "ピンクゴールドピーチ", "ハナチャン", "ワリオ", "ワルイージ", "ドンキーコング", "クッパ", "カロン", "クッパJr.", "ほねクッパ", "カメック", "レミー", "ラリー", "ウェンディ", "ルドウィッグ", "イギー", "ロイ", "モートン", "キノピーチ", "インクリング（ボーイ）", "インクリング（ガール）", "むらびと（男）", "むらびと（女）", "しずえ", "リンク", "ディディーコング", "ファンキーコング", "ポリーン", "軽量Mii", "中量Mii", "重量Mii"];
    
    const kartNames = ["カート1", "カート2", "スタンダードカート", "スティールダイバー", "ターボ・ワン", "スニーカート", "わくわくビートル", "スケルトン", "Gフォース", "ネコクラシカル", "トライマッシュ", "ビートデイモン", "プリンセスコーチ", "パタテンテン", "クッパシップ", "スーパースター", "GLA", "W25 シルバーアロー", "300 SL ロードスター", "ブルーファルコン", "タヌキバギー", "Bダッシュ", "Pウイング", "クッパクラウン", "ゴールドカート", "スタンダードバイク", "きせかえスクーター", "マスターバイク零式", "マキシマム", "バーニングボール", "モトドーザー", "そらまめ", "スーパーコメット", "マッハGP", "ジェットライダー", "ヨッシーバイク", "マスターバイク", "スタンダードATV", "スプラバギー", "トルネード", "ハナチャンバギー", "くまライド", "バウザートライク"];

    const tireNames = ["ノーマルタイヤ", "ワイルドタイヤ", "ローラータイヤ", "リングタイヤ", "ブロックタイヤ", "スポンジタイヤ", "古代のタイヤ", "スリックタイヤ", "メタルタイヤ", "ボタンタイヤ", "ウッドリング", "クッションタイヤ", "ノーマルブルー", "ワイルドホット", "スカイローラー", "スパイシーリング", "サイバースリック", "クリームブロック", "GLA ホイール", "トライフォースタイヤ", "リーフタイヤ", "ゴールドタイヤ"];

    const gliderNames = ["スーパーカイト", "パラシュート", "パラフォイル", "セイルプレーン", "パラセール", "もくもくバルーン", "ワリオカイト", "ズングリカイト", "ピーチパラソル", "フラワーカイト", "クッパだこ", "パラフォイル MKTV", "ハイラルカイト", "かみひこうき", "ゴールドカイト"];

    function selectRandomImage(array) {
        const selectedImages = array.filter(item => item.selected);
        if (selectedImages.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * selectedImages.length);
        return selectedImages[randomIndex];
    }

    // ランダムボタンのイベントリスナー
    document.getElementById('random-button').addEventListener('click', function() {
        const character = selectRandomImage(characters);
        const kart = selectRandomImage(karts);
        const tire = selectRandomImage(tires);
        const glider = selectRandomImage(gliders);

        if (character) {
            document.getElementById('character-image').innerHTML = `<img src="${character.src}" alt="キャラ画像">`;
            document.getElementById('character-name').textContent = characterNames[characters.indexOf(character)];
        }
        if (kart) {
            document.getElementById('kart-image').innerHTML = `<img src="${kart.src}" alt="カート画像">`;
            document.getElementById('kart-name').textContent = kartNames[karts.indexOf(kart)];
        }
        if (tire) {
            document.getElementById('tire-image').innerHTML = `<img src="${tire.src}" alt="タイヤ画像">`;
            document.getElementById('tire-name').textContent = tireNames[tires.indexOf(tire)];
        }
        if (glider) {
            document.getElementById('glider-image').innerHTML = `<img src="${glider.src}" alt="グライダー画像">`;
            document.getElementById('glider-name').textContent = gliderNames[gliders.indexOf(glider)];
        }
    });

    // 全ての要素のON/OFF切り替えボタンのイベントリスナー
    document.getElementById('toggle-all-button').addEventListener('click', function() {
        const allGroups = [characters, karts, tires, gliders];
        allGroups.forEach(group => {
            const allSelected = group.every(item => item.selected);
            group.forEach(item => item.selected = !allSelected);
        });
        updateOptionButtons();
    });

    function updateOptionButtons() {
        const allGroups = [
            { group: characters, idPrefix: 'character' },
            { group: karts, idPrefix: 'kart' },
            { group: tires, idPrefix: 'tire' },
            { group: gliders, idPrefix: 'glider' }
        ];
        allGroups.forEach(({ group, idPrefix }) => {
            group.forEach((item, index) => {
                const button = document.getElementById(`${idPrefix}-button-${index}`);
                if (button) {
                    button.textContent = item.selected ? 'ON' : 'OFF';
                }
            });
        });
    }

    // 初期状態を更新
    updateOptionButtons();
});
