document.addEventListener('DOMContentLoaded', function() {
    const characters = [
        {src: './image/mk8dxchara/character1.png', selected: true},
        {src: './image/mk8dxchara/character2.png', selected: true},
        {src: './image/mk8dxchara/character3.png', selected: true}
    ];
    const karts = [
        {src: './image/mk8dxkart/kart1.png', selected: true},
        {src: './image/mk8dxkart/kart2.png', selected: true},
        {src: './image/mk8dxkart/kart3.png', selected: true}
    ];
    const tires = [
        {src: './image/mk8dxtire/tire1.png', selected: true},
        {src: './image/mk8dxtire/tire2.png', selected: true},
        {src: './image/mk8dxtire/tire3.png', selected: true}
    ];
    const gliders = [
        {src: './image/mk8dxglider/glider1.png', selected: true},
        {src: './image/mk8dxglider/glider2.png', selected: true},
        {src: './image/mk8dxglider/glider3.png', selected: true}
    ];

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

    renderOptions();
});
