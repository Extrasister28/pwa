function botanClick(){
    alert('ボタンがクリックされました');
}

let button = document.getElementById('randbtn');

// addEventListener( 'イベント', 処理)で要素にイベントが発火した際に処理を実行する
button.addEventListener('click', botanClick);

var img = document.getElementById(“image_file”);

img.src = “imagemariokartcourse/1.png”;
