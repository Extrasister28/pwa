function botanClick(){
    const imageArea = document.getElementById('randimageArea');
    const images = ['./image/mariokartcourse/1', './image/mariokartcourse/2', './image/mariokartcourse/3','./image/mariokartcourse/4'];
    const imageNo = Math.floor( Math.random() * images.length)
    randimageArea.src = images[imageNo];
}

let button = document.getElementById('randbtn');

// addEventListener( 'イベント', 処理)で要素にイベントが発火した際に処理を実行する
button.addEventListener('click', botanClick);
