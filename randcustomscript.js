document.addEventListener('DOMContentLoaded', function() {
    function generateImageArray(basePath, count) {
        const arr = [];
        for (let i = 1; i <= count; i++) {
            arr.push({ src: `${basePath}${i}.png`, selected: true });
        }
        return arr;
    }

    const characters = generateImageArray('./image/mariokartchara/character', 52);
    const karts = generateImageArray('./image/mariokartmachine/kart', 41);
    const tires = generateImageArray('./image/mariokarttire/tire', 22);
    const gliders = generateImageArray('./image/mariokartglider/glider', 15);

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

        document.querySelectorAll('.toggle-all-on-button').forEach(button => {
            button.addEventListener('click', function() {
                const group = this.getAttribute('data-group');
                const items = { characters, karts, tires, gliders }[group];
                items.forEach(item => item.selected = true);
                document.querySelectorAll(`.toggle-button[data-group="${group}"]`).forEach(button => {
                    button.textContent = 'ON';
                });
            });
        });

        document.querySelectorAll('.toggle-all-off-button').forEach(button => {
            button.addEventListener('click', function() {
                const group = this.getAttribute('data-group');
                const items = { characters, karts, tires, gliders }[group];
                items.forEach(item => item.selected = false);
                document.querySelectorAll(`.toggle-button[data-group="${group}"]`).forEach(button => {
                    button.textContent = 'OFF';
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
        document.querySelectorAll('.toggle-all-on-button, .toggle-all-off-button').forEach(button => {
            button.disabled = disabled;
        });
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
        const stopIntervals = [2000, 2500, 3000, 3500];

        const elements = [
            { id: 'character-image', items: characters },
            { id: 'kart-image', items: karts },
            { id: 'tire-image', items: tires },
            { id: 'glider-image', items: gliders }
        ];

        setButtonsDisabled(true);

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
                    setButtonsDisabled(false);
                }
            }, stopIntervals[index]);
        });
    }

    document.getElementById('random-button').addEventListener('click', startRoulette);

    document.getElementById('toggle-all-on-button').addEventListener('click', function() {
        const allGroups = [characters, karts, tires, gliders];
        allGroups.forEach(group => group.forEach(item => item.selected = true));
        document.querySelectorAll('.toggle-button').forEach(button => {
            button.textContent = 'ON';
        });
    });

    document.getElementById('toggle-all-off-button').addEventListener('click', function() {
        const allGroups = [characters, karts, tires, gliders];
        allGroups.forEach(group => group.forEach(item => item.selected = false));
        document.querySelectorAll('.toggle-button').forEach(button => {
            button.textContent = 'OFF';
        });
    });

    renderOptions();
});
