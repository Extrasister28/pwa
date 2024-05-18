function botanClick(){
    var img = document.getElementById("image_file");

img.src = "./image/mariokartcourse/1.jpg";
}

let button = document.getElementById('randbtn');

// addEventListener( 'イベント', 処理)で要素にイベントが発火した際に処理を実行する
button.addEventListener('click', botanClick);
