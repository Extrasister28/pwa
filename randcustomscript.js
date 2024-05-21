document.getElementById('random-button').addEventListener('click', function() {
    const characters = ['./image/mk8dxchara/character1.png', './image/mk8dxchara/character2png', './image/mk8dxchara/character3.png'];
    const karts = ['./image/mk8dxkart/kart1.png', './image/mk8dxkart/kart2.png', './image/mk8dxkart/kart3.png'];
    const tires = ['./image/mk8dxtire/tire1.png', './image/mk8dxtire/tire2.png', './image/mk8dxtire/tire3.png'];
    const gliders = ['./image/mk8dxglider/glider1.png', './image/mk8dxglider/glider2.png', './image/mk8dxglider/glider3.png'];

    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    const randomKart = karts[Math.floor(Math.random() * karts.length)];
    const randomTire = tires[Math.floor(Math.random() * tires.length)];
    const randomGlider = gliders[Math.floor(Math.random() * gliders.length)];

    document.getElementById('character-image').innerHTML = `<img src="${randomCharacter}" alt="Character">`;
    document.getElementById('kart-image').innerHTML = `<img src="${randomKart}" alt="Kart">`;
    document.getElementById('tire-image').innerHTML = `<img src="${randomTire}" alt="Tire">`;
    document.getElementById('glider-image').innerHTML = `<img src="${randomGlider}" alt="Glider">`;
});
