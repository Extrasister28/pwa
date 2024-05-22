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
                const items = {characters, karts, tires, gliders}[group];
                const item = items.find(item => item.src === src);
                item.selected = !item.selected;
                this.textContent = item.selected ? 'ON' : 'OFF';
            });
        });
    }

    function getRandomItem(items) {
        const filteredItems = items.filter(item => item.selected);
        if (filteredItems.length === 0) return null;
        return filteredItems[Math.floor(Math.random() * filteredItems.length)].src;
    }

    document.getElementById('random-button').addEventListener('click', function() {
        const randomCharacter = getRandomItem(characters);
        const randomKart = getRandomItem(karts);
        const randomTire = getRandomItem(tires);
        const randomGlider = getRandomItem(gliders);

        document.getElementById('character-image').innerHTML = randomCharacter ? `<img src="${randomCharacter}" alt="Character">` : 'No selection';
        document.getElementById('kart-image').innerHTML = randomKart ? `<img src="${randomKart}" alt="Kart">` : 'No selection';
        document.getElementById('tire-image').innerHTML = randomTire ? `<img src="${randomTire}" alt="Tire">` : 'No selection';
        document.getElementById('glider-image').innerHTML = randomGlider ? `<img src="${randomGlider}" alt="Glider">` : 'No selection';
    });

    document.querySelectorAll('.toggle-all-button').forEach(button => {
        button.addEventListener('click', function() {
            const group = this.getAttribute('data-group');
            const items = {characters, karts, tires, gliders}[group];
            const allSelected = items.every(item => item.selected);
            items.forEach(item => item.selected = !allSelected);
            document.querySelectorAll(`.toggle-button[data-group="${group}"]`).forEach(button => {
                button.textContent = !allSelected ? 'ON' : 'OFF';
            });
        });
    });

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
