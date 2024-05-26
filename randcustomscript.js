document.addEventListener('DOMContentLoaded', function() {
    function generateImageArray(basePath, count, names) {
        const arr = [];
        for (let i = 1; i <= count; i++) {
            arr.push({ src: `${basePath}${i}.png`, selected: true, name: names[i - 1] });
        }
        return arr;
    }

    const characterNames = ['マリオ', 'ルイージ', 'ピーチ', 'ヨッシー', /* 省略 */ 'リンク'];
    const kartNames = ['スタンダードカート', 'マッハGP', 'ワイルドスター', /* 省略 */ 'トルネード'];
    const tireNames = ['スタンダードタイヤ', 'スリックタイヤ', 'ワイルドタイヤ', /* 省略 */ 'ローラータイヤ'];
    const gliderNames = ['スーパーグライダー', 'かみなりカイト', 'パラフォイル', /* 省略 */ 'ワリオのひげ'];

    const characters = generateImageArray('./image/mariokartchara/character', 52, characterNames);
    const karts = generateImageArray('./image/mariokartmachine/kart', 41, kartNames);
    const tires = generateImageArray('./image/mariokarttire/tire', 22, tireNames);
    const gliders = generateImageArray('./image/mariokartglider/glider', 15, gliderNames);

    function createOptionHTML(item, group) {
        return `
            <div class="option-item">
                <img src="${item.src}" alt="${group}">
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
        const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)];
        return { src: randomItem.src, name: randomItem.name };
    }

    function setButtonsDisabled(disabled) {
        document.querySelectorAll('.toggle-button').forEach(button => {
            button.disabled = disabled;
        });
        document.querySelectorAll('.toggle-all-button').forEach(button => {
            button.disabled = disabled;
        });
        document.getElementById('toggle-all-button').disabled = disabled;
        document.getElementById('random-button').disabled = disabled;
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
        if (!validateSelections()) return;

        const displayTime = 100;
        const stopIntervals = [1000, 1500, 2000, 2500];

        const elements = [
            { id: 'character-image', nameId: 'character-name', items: characters },
            { id: 'kart-image', nameId: 'kart-name', items: karts },
            { id: 'tire-image', nameId: 'tire-name', items: tires },
            { id: 'glider-image', nameId: 'glider-name', items: gliders }
        ];

        setButtonsDisabled(true);

        elements.forEach((element, index) => {
            let intervalId = setInterval(() => {
                const randomItem = getRandomItem(element.items);
                if (randomItem) {
                    document.getElementById(element.id).innerHTML = `<img src="${randomItem.src}" alt="${element.id.split('-')[0]}">`;
                    document.getElementById(element.nameId).textContent = randomItem.name;
                }
            }, displayTime);

            setTimeout(() => {
                clearInterval(intervalId);
                const finalItem = getRandomItem(element.items);
                if (finalItem) {
                    document.getElementById(element.id).innerHTML = `<img src="${finalItem.src}" alt="${element.id.split('-')[0]}">`;
                    document.getElementById(element.nameId).textContent = finalItem.name;
                }

                if (index === elements.length - 1) {
                    setButtonsDisabled(false);
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
