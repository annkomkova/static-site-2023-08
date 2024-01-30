import "./adcgame.css";

const messages = [
  "Ghbdtn! Rfr ltkf?", //0
  "Ой", //1
  "Привет! Как дела?", //2
  "Ладно, знаешь меня?", //3
];

function showMessage(message) {
  const element = document.createElement("div");
  element.innerText = message;
  element.classList.add("message");
  document.body.appendChild(element);
}

document.addEventListener("DOMContentLoaded", () => {
  let timeout = 2000;

  messages.forEach((message, i) => {
    if (i == 0) {
      showMessage(message);
    } else {
      setTimeout(() => {
        showMessage(message);
      }, timeout);

      // timeout = timeout + 2000;
      timeout += 2000;
    }
  });
});
