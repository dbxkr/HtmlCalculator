let result = document.querySelector("#result_div");
let buttons = document.querySelectorAll(".buttons div");
let input = document.querySelector("#num_input");
let keyCheckSym = /^[*\/+-]+$/;
let keyCheckNum = /^[0-9]+$/;
let inputCount = 0;
let bracket = 0;
let dot = false;

// ===================창 전체에 이벤트 리스너 달아주기.==================================
window.addEventListener("keydown", function (event) {
  inputText(event.key);
});
// =============== inputText를 호출한다==============================================

// ================만약 숫자나 계산 기호가 맞다면 계산 창에 반영========================
function inputText(e) {
  if (e == "Backspace") {
    if (input.textContent.slice(-1) == ".") {
      dot = false;
    }
    input.textContent = input.textContent.slice(0, -1);
  } else if (e == "Enter" || e == "=") {
    showResult();
  } else {
    addToInput(e);
  }
}
// =================엔터나 백스페이스에도 따로 동작 할당 ================================

// =================버튼에 그림자 주는 아무래도 좋은 함수 ================================
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("mousedown", function () {
    this.style = "box-shadow: inset 4px 4px 15px 0px rgb(85, 83, 83)";
  });
  buttons[i].addEventListener("mouseup", function () {
    this.style = "box-shadow: ";
  });
}
//=============================진짜 별거 아님 ㅇㅇ=====================================

//================각 버튼 누르면 자기가 품은 텍스트를 계산창에 반영하도록==================
for (let i = 1; i < buttons.length - 1; i++) {
  buttons[i].onclick = function () {
    addToInput(this.textContent);
  };
}
buttons[0].onclick = function () {
  input.textContent = "";
  result.textContent = "results";
  inputCount = 0;
};
buttons[2].onclick = function () {
  addToInput("/");
};
buttons[10].onclick = function () {
  addToInput("*");
};
buttons[buttons.length - 1].onclick = function () {
  showResult();
};
//======================일부 버튼은 따로 구분해줬음============================

//====================== = 을 누르거나 엔터를 누르면 결과 나오게=============
function showResult() {
  if (input.textContent != "") {
    result.textContent = input.textContent + " = " + eval(input.textContent);
    dot = false;
    input.textContent = "";
    inputCount = 0;
  }
}
//==========================================================================

//================== 계산창에 숫자나 기호 업데이트 =========================
function addToInput(t) {
  const inputLast = input.textContent.slice(-1);
  if (keyCheckSym.test(t)) {
    console.log(inputLast);
    if (keyCheckSym.test(inputLast) || inputLast == "(" || inputLast == "") {
      return;
    }
    dot = false;
  } else if (keyCheckNum.test(t)) {
    if (inputLast == ")") {
      return;
    }
    if (inputLast == "0") {
      if (
        keyCheckSym.test(input.textContent.slice(-2, -1)) ||
        input.textContent.slice(-2, -1) == ""
      ) {
        if (t == "0") {
          return;
        } else {
          input.textContent = input.textContent.slice(0, -1);
        }
      }
    }
  } else if (t == ")") {
    if (inputLast == "(" || keyCheckSym.test(inputLast) || bracket == 0) {
      return;
    }
    dot = false;
    bracket -= 1;
  } else if (t == "(") {
    if (inputLast == ")" || keyCheckNum.test(inputLast)) {
      return;
    }
    bracket += 1;
  } else if (t == ".") {
    if (!keyCheckNum.test(inputLast) || dot) {
      return;
    }
    dot = true;
  } else {
    return;
  }
  if (input.textContent.length > 19) {
    input.textContent = input.textContent.slice(1) + t;
  } else {
    input.textContent += t;
  }
  if (input.textContent == "00" || input.textContent == "000") {
    input.textContent = 0;
  }
  inputCount += 1;
  if (inputCount > 150) {
    explosion();
  } else if (inputCount > 147) {
    result.textContent = "안돼!!!!!!!!";
  } else if (inputCount > 120) {
    result.textContent = "계산기가 터진다니까요!!!";
  } else if (inputCount > 100) {
    result.textContent = "빨리 계산기를 비워주세요!!";
  } else if (inputCount > 80) {
    result.textContent = "계산기가 폭발할지도 몰라요";
  } else if (inputCount > 60) {
    result.textContent = "슬슬 계산기에 무리가...";
  } else if (inputCount > 40) {
    result.textContent = "너무 많이 입력하셨습니다.";
  }
}
//========================== 길이라던가 계산식이 유효한지라던가 체크 함 ===================================

// ===========================숫자를 너무 입력한다면 계산기가 폭발할지도====================================
function explosion() {
  document.write(
    '<img src="https://www.pngarts.com/files/10/Bomb-Explode-PNG-Image-Transparent-Background.png" style="position: absolute;width: 70%;height: 70%; border-radius: 1em; top: 50%; left: 50%; transform: translate(-50%, -50%)">'
  );
}
// ====================================================================================================
