document.addEventListener("DOMContentLoaded", function() {
  let conditionList = Array.from({ length: 96 }, (_, i) => i + 1);

  function botanClick() {
    if (conditionList.length === 0) {
      alert("１つ以上の条件を指定してください。");
      return;
    }
    const audioElement = document.getElementById('audiosaisei');
    audioElement.currentTime = 0;
    audioElement.play();
    const randcourse = document.getElementById('randcourse');
    for (let i = 0; i <= 26; i++) {
      setTimeout(() => {
        if (conditionList.length === 0) return;
        const randomIndex = Math.floor(Math.random() * conditionList.length);
        const imageId = conditionList[randomIndex];
        randcourse.innerHTML = `<img id="randimageArea" src="./image/mariokartcourse/${imageId}.jpg" alt="Course" width="410" height="280" style="display: block; margin: auto;"/>`;
      }, i * 100);
    }
  }

  const randbtn = document.getElementById('randbtn');
  randbtn.addEventListener('click', botanClick);

  const courseContainer = document.getElementById("course-container");
  let cupCounter = 0;
  for (let i = 1; i <= 96; i++) {
    if ((i - 1) % 4 === 0) {
      cupCounter++;
      courseContainer.innerHTML += `
        <div class="cup-container">
          <div class="cup">
            <img src="./image/mariokartcup/${cupCounter}.jpg" alt="カップ画像">
          </div>
          <div class="courses" id="cup-${cupCounter}"></div>
        </div>
      `;
    }
    const currentCup = document.getElementById(`cup-${cupCounter}`);
    currentCup.innerHTML += `
      <div class="item">
        <img src="./image/mariokartcourse/${i}.jpg" alt="画像${i}">
        <button class="toggle-button" data-id="${i}">ON</button>
      </div>
    `;
  }

  const buttons = document.querySelectorAll(".toggle-button");

  buttons.forEach(button => {
    button.addEventListener("click", function() {
      const id = parseInt(button.dataset.id, 10);
      if (button.textContent === "ON") {
        button.textContent = "OFF";
        conditionList = conditionList.filter(item => item !== id);
      } else {
        button.textContent = "ON";
        if (!conditionList.includes(id)) {
          conditionList.push(id);
        }
      }
      console.log("現在の条件リスト:", conditionList);
    });
  });

  document.getElementById('allOnBtn').addEventListener('click', () => {
    buttons.forEach(button => {
      button.textContent = "ON";
      const id = parseInt(button.dataset.id, 10);
      if (!conditionList.includes(id)) {
        conditionList.push(id);
      }
    });
    console.log("全てのボタンをONにしました。");
  });

  document.getElementById('allOffBtn').addEventListener('click', () => {
    buttons.forEach(button => {
      button.textContent = "OFF";
      const id = parseInt(button.dataset.id, 10);
      conditionList = conditionList.filter(item => item !== id);
    });
    console.log("全てのボタンをOFFにしました。");
  });
});
